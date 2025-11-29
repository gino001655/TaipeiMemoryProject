import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { HistoricalSite } from '../types'

interface ModelViewerProps {
  selectedSite?: HistoricalSite | null
  allSites?: HistoricalSite[]
  width?: string
  height?: string
}

/**
 * 載入中提示組件 - 簡約風格
 */
function Loader() {
  return (
    <Html center>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border border-gray-400 border-t-transparent"></div>
        <p className="mt-3 text-xs text-gray-500 font-light tracking-wide">載入中</p>
      </div>
    </Html>
  )
}

/**
 * 將經緯度轉換為3D世界座標
 * 芝山地區的中心點約為：25.102°N, 121.523°E
 * 我們需要將這個座標系映射到3D空間
 */
function latLonToWorld3D(
  latitude: number,
  longitude: number,
  height: number = 0,
  centerLat: number = 25.102,
  centerLon: number = 121.523
): THREE.Vector3 {
  // 計算相對於中心點的偏移（度）
  const deltaLat = latitude - centerLat
  const deltaLon = longitude - centerLon

  // 將度轉換為米（粗略估算）
  // 1度緯度 ≈ 111,000米
  // 1度經度（在25度緯度）≈ 111,000 * cos(25°) ≈ 100,600米
  const metersPerDegreeLat = 111000
  const metersPerDegreeLon = 111000 * Math.cos((centerLat * Math.PI) / 180)

  // 轉換為米
  const x = deltaLon * metersPerDegreeLon
  const z = -deltaLat * metersPerDegreeLat // 注意：Z軸是負的，因為通常Z軸向上
  const y = height // Y軸是高度

  return new THREE.Vector3(x, y, z)
}

/**
 * 標記點組件 - 顯示景點位置
 * 包含紅點和範圍圓圈
 */
function SiteMarker({ 
  position, 
  selected, 
  site 
}: { 
  position: THREE.Vector3
  selected: boolean
  site: HistoricalSite
}) {
  const markerRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // 標記點的基礎縮放比例（預設大小的 1/4，讓紅點與範圍圈整體縮小）
  const BASE_SCALE = 0.25

  // 標記點動畫
  useFrame((state) => {
    if (markerRef.current) {
      // 上下浮動動畫
      const time = state.clock.elapsedTime
      markerRef.current.position.y = position.y + Math.sin(time * 2) * 0.1
      
      // 選中時增加脈衝效果
      if (selected) {
        // 在較小的基礎尺寸上做輕微放大脈衝
        const scale = BASE_SCALE * (1 + Math.sin(time * 4) * 0.2)
        markerRef.current.scale.setScalar(scale)
      } else {
        markerRef.current.scale.setScalar(BASE_SCALE)
      }
    }
  })

  return (
    <group
      ref={markerRef}
      position={[position.x, position.y, position.z]}
    >
      {/* 範圍圓圈 - 選中時顯示 */}
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
          <ringGeometry args={[3, 8, 32]} />
          <meshBasicMaterial 
            color="#ff0000" 
            transparent 
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* 紅點標記 */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        {/* 球體標記點 */}
        {/* 半徑縮小到原本的 1/4，搭配整體縮放讓紅點視覺上小很多 */}
        <sphereGeometry args={[selected ? 0.375 : 0.2, 16, 16]} />
        <meshStandardMaterial 
          color={selected ? "#ff0000" : hovered ? "#ff6666" : "#cc0000"}
          emissive={selected ? "#ff0000" : "#330000"}
          emissiveIntensity={selected ? 0.5 : 0.2}
        />
      </mesh>

      {/* 文字標籤 */}
      <Html
        position={[0, 3, 0]}
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className={`px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap transition-all ${
            selected ? 'bg-red-600' : 'bg-gray-800 bg-opacity-70'
          }`}
          style={{
            transform: 'translate3d(-50%, -50%, 0)',
          }}
        >
          {site.name}
        </div>
      </Html>
    </group>
  )
}

/**
 * 載入單個tile模型
 */
function TileModel({ url, onLoaded }: { url: string; onLoaded?: () => void }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!scene || !groupRef.current) return

    // 克隆場景以避免修改原始場景
    const clonedScene = scene.clone()

    // 等待幾何體解碼
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!clonedScene || !groupRef.current) return

        clonedScene.updateMatrixWorld(true)
        
        if (groupRef.current) {
          groupRef.current.add(clonedScene)
          if (onLoaded) onLoaded()
        }
      })
    })
  }, [scene, url, onLoaded])

  return <group ref={groupRef} />
}

/**
 * 加載所有tile的組件
 */
function AllTiles({ onAllLoaded }: { onAllLoaded: () => void }) {
  const [loadedCount, setLoadedCount] = useState(0)
  const totalTiles = 100

  // 生成所有tile的URL（1-100）
  const tileUrls = useMemo(() => {
    return Array.from({ length: totalTiles }, (_, i) => 
      `/mountain3D/9e7dca72aae0_${i + 1}.gltf`
    )
  }, [])

  const handleTileLoaded = () => {
    setLoadedCount(prev => {
      const newCount = prev + 1
      if (newCount === totalTiles && onAllLoaded) {
        // 所有tile加載完成後再等待一點時間確保渲染完成
        setTimeout(() => onAllLoaded(), 500)
      }
      return newCount
    })
  }

  return (
    <>
      {tileUrls.map((url, index) => (
        <Suspense key={url} fallback={null}>
          <TileModel url={url} onLoaded={handleTileLoaded} />
        </Suspense>
      ))}
      {loadedCount < totalTiles && (
        <Html center>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border border-white border-t-transparent"></div>
            <p className="mt-3 text-xs text-white font-light tracking-wide opacity-80">
              載入中 {loadedCount}/{totalTiles}
            </p>
          </div>
        </Html>
      )}
    </>
  )
}

/**
 * 相機動畫控制器 - 平滑跳轉到指定位置
 */
function CameraAnimator({
  targetPosition,
  isAnimating,
  onAnimationComplete,
  controlsRef
}: {
  targetPosition: THREE.Vector3 | null
  isAnimating: boolean
  onAnimationComplete: () => void
  controlsRef: React.RefObject<any>
}) {
  const { camera } = useThree()
  const animationRef = useRef<number | null>(null)
  const startPosition = useRef<THREE.Vector3>(new THREE.Vector3())
  const startTarget = useRef<THREE.Vector3>(new THREE.Vector3())
  const animationStartTime = useRef<number>(0)

  useEffect(() => {
    if (!targetPosition || !isAnimating || !controlsRef.current) return

    // 記錄起始位置和目標點
    startPosition.current.copy(camera.position)
    startTarget.current.copy(controlsRef.current.target)

    // 計算目標相機位置（從斜上方看向標記點）
    const direction = new THREE.Vector3().subVectors(
      targetPosition,
      camera.position
    ).normalize()
    
    const distance = Math.max(
      Math.abs(targetPosition.x) * 2,
      Math.abs(targetPosition.z) * 2,
      20
    )
    
    const targetCameraPos = new THREE.Vector3(
      targetPosition.x + distance * 0.5,
      targetPosition.y + distance * 0.8,
      targetPosition.z + distance * 0.5
    )

    animationStartTime.current = performance.now()
    const duration = 1500 // 1.5秒動畫

    const animate = (currentTime: number) => {
      const elapsed = currentTime - animationStartTime.current
      const progress = Math.min(elapsed / duration, 1)

      // 使用緩動函數（easeInOutCubic）
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      // 插值相機位置
      camera.position.lerpVectors(
        startPosition.current,
        targetCameraPos,
        easeProgress
      )

      // 插值目標點
      const currentTarget = new THREE.Vector3().lerpVectors(
        startTarget.current,
        targetPosition,
        easeProgress
      )

      controlsRef.current.target.copy(currentTarget)
      controlsRef.current.update()

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // 動畫完成
        animationRef.current = null
        if (onAnimationComplete) onAnimationComplete()
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetPosition, isAnimating, camera, controlsRef, onAnimationComplete])

  return null
}

/**
 * 自動調整相機的初始位置
 */
function AutoCamera({ 
  groupRef, 
  controlsRef,
  modelsReady
}: {
  groupRef: React.RefObject<THREE.Group>
  controlsRef: React.RefObject<any>
  modelsReady: boolean
}) {
  const { camera } = useThree()
  const initialized = useRef(false)

  useEffect(() => {
    if (!modelsReady || initialized.current || !groupRef.current) return

    // 計算整個場景的邊界框
    const box = new THREE.Box3()
    let hasMeshes = false

    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        if (child.geometry.attributes.position && child.geometry.attributes.position.count > 0) {
          hasMeshes = true
          const childBox = new THREE.Box3().setFromObject(child)
          box.union(childBox)
        }
      }
    })

    if (hasMeshes && !box.isEmpty()) {
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)

      const fovRad = (camera.fov * Math.PI) / 180
      const distance = maxDim > 0 ? (maxDim / (2 * Math.tan(fovRad / 2))) * 1.5 : 50

      camera.position.set(
        center.x + distance * 0.7,
        center.y + distance * 0.7,
        center.z + distance * 0.7
      )

      camera.lookAt(center)
      camera.updateProjectionMatrix()

      if (controlsRef.current) {
        controlsRef.current.target.copy(center)
        controlsRef.current.update()
      }

      initialized.current = true
    }
  }, [modelsReady, camera, groupRef, controlsRef])

  return null
}

/**
 * 場景內容組件
 */
function SceneContent({
  selectedSite,
  allSites = [],
  modelsReady,
  setModelsReady,
  groupRef
}: {
  selectedSite?: HistoricalSite | null
  allSites?: HistoricalSite[]
  modelsReady: boolean
  setModelsReady: (ready: boolean) => void
  groupRef: React.RefObject<THREE.Group>
}) {
  const controlsRef = useRef<any>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // 計算選中景點的3D位置
  const targetPosition = useMemo(() => {
    if (!selectedSite) return null
    return latLonToWorld3D(
      selectedSite.latitude,
      selectedSite.longitude,
      selectedSite.height || 0
    )
  }, [selectedSite])

  // 當選中的景點改變時，觸發相機動畫
  useEffect(() => {
    if (targetPosition && modelsReady && !isAnimating) {
      setIsAnimating(true)
    }
  }, [targetPosition, modelsReady, isAnimating])

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  return (
    <>
      {/* 環境光 */}
      <ambientLight intensity={0.9} />
      {/* 主光源 - 從上方照射 */}
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      {/* 輔助光 - 補充陰影區域 */}
      <directionalLight position={[-5, 10, -5]} intensity={0.4} />

      {/* 載入所有tile */}
      <group ref={groupRef}>
        <Suspense fallback={<Loader />}>
          <AllTiles onAllLoaded={() => setModelsReady(true)} />
        </Suspense>
      </group>

      {/* 只顯示選中景點的標記點 */}
      {selectedSite && (() => {
        const position = latLonToWorld3D(
          selectedSite.latitude,
          selectedSite.longitude,
          selectedSite.height || 0
        )
        return (
          <SiteMarker
            key={selectedSite.id}
            position={position}
            selected={true}
            site={selectedSite}
          />
        )
      })()}

      {/* 軌道控制器 */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={500}
        target={[0, 0, 0]}
        dampingFactor={0.05}
        enableDamping={true}
      />

      {/* 自動調整初始相機位置 */}
      <AutoCamera
        groupRef={groupRef}
        controlsRef={controlsRef}
        modelsReady={modelsReady}
      />

      {/* 相機動畫 - 跳轉到選中的景點 */}
      {targetPosition && (
        <CameraAnimator
          targetPosition={targetPosition}
          isAnimating={isAnimating}
          onAnimationComplete={handleAnimationComplete}
          controlsRef={controlsRef}
        />
      )}

      {/* 環境貼圖 - 使用天空相關的preset */}
      <Environment preset="sunset" />
    </>
  )
}

/**
 * 3D模型查看器組件
 * 顯示所有tile並支持景點標記和相機跳轉
 */
const ModelViewer: React.FC<ModelViewerProps> = ({
  selectedSite,
  allSites = [],
  width = '100%',
  height = '500px'
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const [modelsReady, setModelsReady] = useState(false)

  return (
    <div
      className="relative overflow-hidden w-full h-full"
      style={{ 
        width, 
        height,
        // 簡單的天空藍色背景
        background: '#E0F2FE'
      }}
    >
      <Canvas
        camera={{ position: [0, 50, 100], fov: 50, near: 0.1, far: 2000 }}
        // 降低裝置像素比與關閉超高解析的抗鋸齒，讓 3D 渲染更順
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        <SceneContent
          selectedSite={selectedSite}
          allSites={allSites}
          modelsReady={modelsReady}
          setModelsReady={setModelsReady}
          groupRef={groupRef}
        />
      </Canvas>
    </div>
  )
}

export default ModelViewer
