// 歷史遺跡/景點的資料結構
export interface HistoricalSite {
  id: string
  name: string
  description: string
  type: '石碑' | '歷史遺跡' | '建築' | '其他'
  // 經緯度座標 (芝山地區約在 25.102°N, 121.523°E)
  longitude: number
  latitude: number
  height?: number // 可選：標記點的高度（米）
  images?: string[] // 可選：相關圖片URL
  year?: string // 可選：年代
  category?: string // 可選：分類標籤
  // 3D模型相關（如果該遺跡有3D模型）
  modelUrl?: string // GLTF/GLB 模型文件路徑（推薦格式）
  modelScale?: number // 模型縮放比例，預設為 1.0
  modelHeading?: number // 模型旋轉角度（弧度），預設為 0
  position?: [number, number, number] // 3D場景中的座標 [x, y, z]
}

