import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { MapControls, Environment, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { HistoricalSite } from '../types'

interface ModelViewerProps {
  selectedSite?: HistoricalSite | null
  allSites?: HistoricalSite[]
  onSiteClick?: (site: HistoricalSite) => void
  onViewDetail?: (site: HistoricalSite) => void
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
 */
function latLonToWorld3D(
  latitude: number,
  longitude: number,
  height: number = 0,
  centerLat: number = 25.102,
  centerLon: number = 121.523
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
  onViewDetail
}: {
  position: THREE.Vector3
  selected: boolean
  site: HistoricalSite
  onClick?: (site: HistoricalSite) => void
  onViewDetail?: (site: HistoricalSite) => void
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
    const clonedScene = scene.clone()

    // 使用 requestAnimationFrame 避免阻塞主線程
    let frameId: number

    const addScene = () => {
      if (!clonedScene || !groupRef.current) return
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
  }, [scene, onLoaded])

  return <group ref={groupRef} />
}

/**
 * 加載所有tile的組件
 */
function AllTiles({ onAllLoaded }: { onAllLoaded: () => void }) {
  const loadedCountRef = useRef(0)
  const totalTiles = 100
  const tileUrls = useMemo(() => Array.from({ length: totalTiles }, (_, i) => `/mountain3D/9e7dca72aae0_${i + 1}.gltf`), [])

  const handleTileLoaded = () => {
    loadedCountRef.current += 1
    if (loadedCountRef.current === totalTiles && onAllLoaded) {
      // 延遲一下以確保渲染完成
      setTimeout(() => onAllLoaded(), 100)
    }
  }

  return (
    <>
      {tileUrls.map((url) => (
        <TileModel key={url} url={url} onLoaded={handleTileLoaded} />
      ))}
    </>
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
      const fovRad = (camera.fov * Math.PI) / 180
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
  onViewDetail
}: {
  selectedSite?: HistoricalSite | null
  allSites?: HistoricalSite[]
  modelsReady: boolean
  setModelsReady: (ready: boolean) => void
  groupRef: React.RefObject<THREE.Group>
  onSiteClick?: (site: HistoricalSite) => void
  onViewDetail?: (site: HistoricalSite) => void
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

      {/* 復位按鈕 */}
      <Html position={[0, 0, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', pointerEvents: 'auto', zIndex: 1000 }}>
          <button
            onClick={handleCenterView}
            className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
            title="回到中心 / 聚焦景點"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11l-3 3m0 0l-3-3m3 3V8" />
            </svg>
          </button>
        </div>
      </Html>
    </>
  )
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  selectedSite,
  allSites = [],
  onSiteClick,
  onViewDetail,
  width = '100%',
  height = '500px'
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const [modelsReady, setModelsReady] = useState(false)

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ background: '#E0F2FE' }}>
      <Canvas
        camera={{ position: [0, 50, 100], fov: 50, near: 0.1, far: 2000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
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
        />
      </Canvas>
    </div>
  )
}

export default ModelViewer
