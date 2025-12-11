import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { MapControls, Environment, useGLTF, Html } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { HistoricalSite } from '../types'


interface ModelViewerProps {
  selectedSite?: HistoricalSite | null
  allSites?: HistoricalSite[]
  onSiteClick?: (site: HistoricalSite) => void
  onViewDetail?: (site: HistoricalSite) => void
  width?: string
  height?: string
  showLabels?: boolean // 控制是否顯示標記點名稱
  showCenterButton?: boolean // 控制是否顯示復位按鈕
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
 */
function latLonToWorld3D(
  latitude: number,
  longitude: number,
  height: number = 0,
  centerLat: number = 25.103060,
  centerLon: number = 121.530781
): THREE.Vector3 {
  const deltaLat = latitude - centerLat
  const deltaLon = longitude - centerLon
  const metersPerDegreeLat = 111000
  const metersPerDegreeLon = 111000 * Math.cos((centerLat * Math.PI) / 180)
  const x = deltaLon * metersPerDegreeLon
  const z = -deltaLat * metersPerDegreeLat
  const y = height
  return new THREE.Vector3(x, y, z)
}

/**
 * 標記點組件
 */
function SiteMarker({
  position,
  selected,
  site,
  onClick,
  onViewDetail,
  showLabel = true
}: {
  position: THREE.Vector3
  selected: boolean
  site: HistoricalSite
  onClick?: (site: HistoricalSite) => void
  onViewDetail?: (site: HistoricalSite) => void
  showLabel?: boolean
}) {
  const markerRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const BASE_SCALE = 0.25

  useFrame((state) => {
    if (markerRef.current) {
      const time = state.clock.elapsedTime
      markerRef.current.position.y = position.y + Math.sin(time * 2) * 0.1
      if (selected) {
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
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick(site)
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
        setHovered(true)
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
        setHovered(false)
      }}
    >
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
          <ringGeometry args={[3, 8, 32]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[selected ? 0.375 : 0.2, 16, 16]} />
        <meshStandardMaterial
          color={selected ? "#ff0000" : hovered ? "#ff6666" : "#cc0000"}
          emissive={selected ? "#ff0000" : "#330000"}
          emissiveIntensity={selected ? 0.5 : 0.2}
        />
      </mesh>
      {showLabel && (
        <Html position={[0, 3, 0]} center style={{ pointerEvents: 'none', userSelect: 'none', zIndex: selected ? 10 : 1 }}>
          <div className="flex flex-col items-center gap-1">
            <div className={`px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap transition-all ${selected ? 'bg-red-600' : 'bg-gray-800 bg-opacity-70'}`}>
              {site.name}
            </div>
            {selected && onViewDetail && (
              <button
                className="mt-1 px-3 py-1 bg-white text-gray-900 text-xs rounded shadow-lg hover:bg-gray-100 pointer-events-auto transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetail(site)
                }}
              >
                查看詳情
              </button>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

/**
 * 載入單個tile模型
 * 支援調整模型的大小、角度、位置
 * 支援 Draco 壓縮的模型
 */
function TileModel({
  url,
  onLoaded,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0]
}: {
  url: string
  onLoaded?: () => void
  scale?: number | [number, number, number] // 縮放：可以是單一數值（等比例）或 [x, y, z] 三軸分別縮放
  rotation?: [number, number, number] // 旋轉角度（弧度）：[x軸, y軸, z軸]
  position?: [number, number, number] // 位置：[x, y, z]
}) {
  const { scene } = useGLTF(url, true, true, (loader) => {
    // 配置 Draco 解壓縮器以支援壓縮模型
    if (loader instanceof GLTFLoader) {
      const dracoLoader = new DRACOLoader()
      // 使用 CDN 提供的 Draco 解碼器
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
      dracoLoader.setDecoderConfig({ type: 'js' })
      loader.setDRACOLoader(dracoLoader)
    }
  })
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!scene || !groupRef.current) return
    const clonedScene = scene.clone()

    // 使用 requestAnimationFrame 避免阻塞主線程
    let frameId: number

    const addScene = () => {
      if (!clonedScene || !groupRef.current) return

      // 應用縮放
      if (typeof scale === 'number') {
        clonedScene.scale.setScalar(scale)
      } else {
        clonedScene.scale.set(scale[0], scale[1], scale[2])
      }

      // 應用旋轉（以弧度為單位）
      clonedScene.rotation.set(rotation[0], rotation[1], rotation[2])

      // 應用位置
      clonedScene.position.set(position[0], position[1], position[2])

      clonedScene.updateMatrixWorld(true)
      groupRef.current.add(clonedScene)
      if (onLoaded) onLoaded()
    }

    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(addScene)
    })

    return () => {
      cancelAnimationFrame(frameId)
      if (groupRef.current) {
        groupRef.current.remove(clonedScene)
      }
      // 釋放資源
      clonedScene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          // 不釋放材質，因為可能被共用
        }
      })
    }
  }, [scene, onLoaded, scale, rotation, position])

  return <group ref={groupRef} />
}

// 預載入 GLB 模型以提升效能
useGLTF.preload('/mountain3D_new/mtbigger.glb')


/**
 * 山模型的配置參數
 * 可以在這裡調整模型的大小、角度、位置
 */
const MOUNTAIN_CONFIG = {
  // 縮放比例：1.0 為原始大小，大於 1.0 放大，小於 1.0 縮小
  // 可以是單一數值（等比例縮放）或 [x, y, z] 三軸分別縮放
  scale: 170.0 as number | [number, number, number],

  // 旋轉角度（弧度）：[x軸旋轉, y軸旋轉, z軸旋轉]
  // 例如：[0, Math.PI / 4, 0] 表示繞 Y 軸旋轉 45 度
  // 注意：Math.PI = 180度，Math.PI / 2 = 90度，Math.PI / 4 = 45度
  rotation: [0, -90 * Math.PI / 180, 0] as [number, number, number],

  // 位置偏移：[x, y, z]
  // 例如：[10, 0, -5] 表示向右移動 10，向下移動 5
  position: [-20, 30, -20] as [number, number, number]
}

/**
 * 加載地形模型的組件
 */
function AllTiles({ onAllLoaded }: { onAllLoaded: () => void }) {
  // 使用新的單一模型文件
  const url = "/mountain3D_new/mtbigger.glb"

  // 因為只有一個模型，加載完成即可
  const handleLoaded = () => {
    if (onAllLoaded) {
      setTimeout(() => onAllLoaded(), 100)
    }
  }

  return (
    <TileModel
      url={url}
      onLoaded={handleLoaded}
      scale={MOUNTAIN_CONFIG.scale}
      rotation={MOUNTAIN_CONFIG.rotation}
      position={MOUNTAIN_CONFIG.position}
    />
  )
}

/**
 * 相機動畫控制器
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

    startPosition.current.copy(camera.position)
    startTarget.current.copy(controlsRef.current.target)

    const distance = Math.max(Math.abs(targetPosition.x) * 2, Math.abs(targetPosition.z) * 2, 20)
    const targetCameraPos = new THREE.Vector3(
      targetPosition.x + distance * 0.5,
      targetPosition.y + distance * 0.8,
      targetPosition.z + distance * 0.5
    )

    animationStartTime.current = performance.now()
    const duration = 1500

    const animate = (currentTime: number) => {
      const elapsed = currentTime - animationStartTime.current
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

      camera.position.lerpVectors(startPosition.current, targetCameraPos, easeProgress)
      const currentTarget = new THREE.Vector3().lerpVectors(startTarget.current, targetPosition, easeProgress)

      controlsRef.current.target.copy(currentTarget)
      controlsRef.current.update()

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
        if (onAnimationComplete) onAnimationComplete()
      }
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
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

    const box = new THREE.Box3()
    let hasMeshes = false

    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry && child.geometry.attributes.position && child.geometry.attributes.position.count > 0) {
        hasMeshes = true
        box.union(new THREE.Box3().setFromObject(child))
      }
    })

    if (hasMeshes && !box.isEmpty()) {
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const fovRad = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180
      const distance = maxDim > 0 ? (maxDim / (2 * Math.tan(fovRad / 2))) * 1.5 : 50

      camera.position.set(center.x + distance * 0.7, center.y + distance * 0.7, center.z + distance * 0.7)
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
  groupRef,
  onSiteClick,
  onViewDetail,
  showLabels = true,
  showCenterButton = true
}: {
  selectedSite?: HistoricalSite | null
  allSites?: HistoricalSite[]
  modelsReady: boolean
  setModelsReady: (ready: boolean) => void
  groupRef: React.RefObject<THREE.Group>
  onSiteClick?: (site: HistoricalSite) => void
  onViewDetail?: (site: HistoricalSite) => void
  showLabels?: boolean
  showCenterButton?: boolean
}) {
  const controlsRef = useRef<any>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const targetPosition = useMemo(() => {
    if (!selectedSite) return null
    return latLonToWorld3D(selectedSite.latitude, selectedSite.longitude, selectedSite.height || 0)
  }, [selectedSite])

  // 移除自動觸發動畫的 useEffect
  useEffect(() => {
    if (targetPosition && modelsReady && !isAnimating) {
      setIsAnimating(true)
    }
  }, [targetPosition, modelsReady])

  const handleAnimationComplete = () => setIsAnimating(false)

  const handleCenterView = () => {
    if (targetPosition) setIsAnimating(true)
  }

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <directionalLight position={[-5, 10, -5]} intensity={0.4} />

      <group ref={groupRef}>
        <Suspense fallback={<Loader />}>
          <AllTiles onAllLoaded={() => setModelsReady(true)} />
        </Suspense>
      </group>

      {allSites.map((site) => {
        const position = latLonToWorld3D(site.latitude, site.longitude, site.height || 0)
        return (
          <SiteMarker
            key={site.id}
            position={position}
            selected={selectedSite?.id === site.id}
            site={site}
            onClick={onSiteClick}
            onViewDetail={onViewDetail}
            showLabel={showLabels}
          />
        )
      })}

      <MapControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={500}
        maxPolarAngle={Math.PI / 2 - 0.1}
        dampingFactor={0.05}
        enableDamping={true}
        screenSpacePanning={false}
      />

      <AutoCamera groupRef={groupRef} controlsRef={controlsRef} modelsReady={modelsReady} />

      {targetPosition && (
        <CameraAnimator
          targetPosition={targetPosition}
          isAnimating={isAnimating}
          onAnimationComplete={handleAnimationComplete}
          controlsRef={controlsRef}
        />
      )}

      <Environment preset="sunset" />

      {/* 復位按鈕 - 根據 showCenterButton prop 決定是否顯示 */}
      {showCenterButton && (
        <Html position={[0, 0, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', pointerEvents: 'auto', zIndex: 1000 }}>
            <button
              onClick={handleCenterView}
              className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
              title="回到中心 / 聚焦景點"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11l-3 3m0 0l-3-3m3 3V8" />
              </svg>
            </button>
          </div>
        </Html>
      )}
    </>
  )
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  selectedSite,
  allSites = [],
  onSiteClick,
  onViewDetail,
  showLabels = true,
  showCenterButton = true
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const [modelsReady, setModelsReady] = useState(false)

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ background: '#E0F2FE' }}>
      <Canvas
        camera={{ position: [0, 50, 100], fov: 50, near: 0.1, far: 2000 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          // Add context loss/restore handlers
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost. Attempting to restore...');
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored successfully.');
          });
        }}
        style={{ background: 'transparent', width: '100%', height: '100%', display: 'block' }}
      >
        <SceneContent
          selectedSite={selectedSite}
          allSites={allSites}
          modelsReady={modelsReady}
          setModelsReady={setModelsReady}
          groupRef={groupRef}
          onSiteClick={onSiteClick}
          onViewDetail={onViewDetail}
          showLabels={showLabels}
          showCenterButton={showCenterButton}
        />
      </Canvas>
    </div>
  )
}

export default ModelViewer
