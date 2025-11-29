import { useRef, useEffect } from 'react'
import * as Cesium from 'cesium'

/**
 * 3D模型查看器
 * 白色背景，只顯示一個3D模型
 */
const Map3D: React.FC = () => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Cesium.Viewer | null>(null)

  /**
   * 初始化 Cesium Viewer
   */
  useEffect(() => {
    if (!cesiumContainerRef.current || viewerRef.current) return

    // 創建 Cesium Viewer，移除所有不必要的控制項
    const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      selectionIndicator: false,
      terrainProvider: undefined,
    })

    // 移除底圖
    viewer.imageryLayers.removeAll()
    
    // 設置背景為白色
    viewer.scene.backgroundColor = Cesium.Color.WHITE

    // 隱藏地球、天空盒等
    viewer.scene.globe.show = false
    viewer.scene.skyBox.show = false
    viewer.scene.sun.show = false
    viewer.scene.moon.show = false
    viewer.scene.globe.enableLighting = false

    // 設置光源（讓模型有光照效果）
    viewer.scene.lightSource = new Cesium.SunLight()

    viewerRef.current = viewer

    // 載入第一個3D模型（從資料中找第一個有模型的）
    const modelUrl = '/mountain3D/9e7dca72aae0_1.gltf'
    const position = new Cesium.Cartesian3(0, 0, 0)

    const entity = viewer.entities.add({
      position: position,
      name: '3D Model',
    })

    // 載入3D模型
    entity.model = {
      uri: modelUrl,
      scale: 1.0,
      minimumPixelSize: 64,
      maximumScale: 20000,
      shadows: Cesium.ShadowMode.ENABLED,
    }

    // 等待模型載入後，自動調整相機視角
    const checkModel = () => {
      if (entity.model && entity.model.ready) {
        // 模型載入完成，調整相機以顯示整個模型
        viewer.zoomTo(entity, new Cesium.HeadingPitchRange(0, -0.5, 0))
      } else {
        // 繼續等待
        setTimeout(checkModel, 100)
      }
    }
    setTimeout(checkModel, 100)

    // 如果模型一直沒載入，設置一個默認視角
    setTimeout(() => {
      if (viewerRef.current) {
        viewerRef.current.camera.setView({
          destination: new Cesium.Cartesian3(0, 0, 50),
          orientation: {
            heading: 0,
            pitch: -Cesium.Math.PI / 4,
            roll: 0,
          },
        })
      }
    }, 2000)

    // 清理函數
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full bg-white">
      {/* Cesium 3D模型容器 */}
      <div ref={cesiumContainerRef} className="w-full h-full" />
    </div>
  )
}

export default Map3D
