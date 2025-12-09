// 圖片顯示配置
export interface ImageDisplayConfig {
  // 圖片位置 (百分比: 0-100, 50 = 居中)
  // x: 水平位置 (0 = 左, 100 = 右)
  // y: 垂直位置 (0 = 上, 100 = 下)
  position?: { x: number; y: number }
  // 縮放比例 (1.0 = 100%, 大於1 = 放大, 小於1 = 縮小)
  scale?: number
}

// 歷史遺跡/景點的資料結構
export interface HistoricalSite {
  id: string
  name: string
  description: string
  type: '石碑' | '歷史遺跡' | '建築' | '其他' | '步道'
  // 經緯度座標 (芝山地區約在 25.102°N, 121.523°E)
  longitude: number
  latitude: number
  height?: number // 可選：標記點的高度（米）
  // 圖片配置：可以是簡單的字符串數組，或包含顯示配置的對象數組
  images?: (string | { url: string; display?: ImageDisplayConfig })[]
  year?: string // 可選：年代
  category?: string // 可選：分類標籤
  // 3D模型相關（如果該遺跡有3D模型）
  modelUrl?: string // GLTF/GLB 模型文件路徑（推薦格式）
  modelScale?: number // 模型縮放比例，預設為 1.0
  modelHeading?: number // 模型旋轉角度（弧度），預設為 0
  position?: [number, number, number] // 3D場景中的座標 [x, y, z]
}

