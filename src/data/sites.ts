import { HistoricalSite } from '../types'

/**
 * 芝山地區歷史遺跡資料
 * 所有資料都包含經緯度座標，方便後續定位真實景點
 */
export const historicalSites: HistoricalSite[] = [
  {
    id: '1',
    name: '芝山岩遺址',
    description: '芝山岩是台北市重要的史前遺址，發現了豐富的考古文物，包括石器、陶器等，見證了台灣早期人類活動的歷史。這裡是台灣考古學的重要發現地之一。',
    type: '歷史遺跡',
    longitude: 121.523,
    latitude: 25.102,
    height: 50,
    year: '史前時代',
    category: '考古遺址',
    images: [
      'https://images.unsplash.com/photo-1599833975787-5c143f373c30?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518182170546-0766ba6f6a56?q=80&w=2070&auto=format&fit=crop'
    ],
    // 使用 mountain3D 資料夾中的3D模型
    modelUrl: '/mountain3D/9e7dca72aae0_1.gltf',
    modelScale: 1.0,
    modelHeading: 0
  },
  {
    id: '2',
    name: '芝山岩碑',
    description: '記錄芝山岩歷史的重要石碑，記載了當地的重要歷史事件。石碑上刻有詳細的文字記錄，是研究當地歷史的重要文物。',
    type: '石碑',
    longitude: 121.524,
    latitude: 25.103,
    height: 5,
    year: '清代',
    category: '碑文',
    images: [
      'https://images.unsplash.com/photo-1605445272767-640149285039?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_2.gltf',
    modelScale: 0.5,
    modelHeading: 0
  },
  {
    id: '3',
    name: '惠濟宮',
    description: '芝山地區的重要廟宇，建於清代，具有悠久的歷史和豐富的文化內涵。廟內供奉多尊神像，是當地居民重要的信仰中心。',
    type: '建築',
    longitude: 121.522,
    latitude: 25.101,
    height: 20,
    year: '清代',
    category: '宗教建築',
    images: [
      'https://images.unsplash.com/photo-1542642839-84ad16a798cd?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d743?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_3.gltf',
    modelScale: 1.2,
    modelHeading: 0
  },
  {
    id: '4',
    name: '芝山岩步道',
    description: '環繞芝山岩的步道系統，全長約2公里，沿途可欣賞豐富的自然生態和歷史遺跡。步道維護良好，是市民休閒健行的好去處。',
    type: '歷史遺跡',
    longitude: 121.5235,
    latitude: 25.1025,
    height: 30,
    year: '現代',
    category: '步道',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_4.gltf',
    modelScale: 1.0,
    modelHeading: 0
  },
  {
    id: '5',
    name: '芝山岩砲台遺址',
    description: '清代時期建造的防禦砲台遺址，見證了台灣歷史上的軍事防禦建設。雖然現今僅存遺跡，但仍可看出當年的建築規模。',
    type: '歷史遺跡',
    longitude: 121.5245,
    latitude: 25.1015,
    height: 40,
    year: '清代',
    category: '軍事遺跡',
    images: [
      'https://images.unsplash.com/photo-1599590984817-0c15f45b64a0?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_5.gltf',
    modelScale: 0.8,
    modelHeading: 0
  },
  {
    id: '6',
    name: '芝山岩觀景台',
    description: '位於芝山岩高處的觀景台，可俯瞰整個士林地區和台北盆地。天氣晴朗時可遠眺陽明山、觀音山等山脈，視野極佳。',
    type: '建築',
    longitude: 121.5232,
    latitude: 25.1032,
    height: 60,
    year: '現代',
    category: '觀景設施',
    images: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2068&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_6.gltf',
    modelScale: 1.0,
    modelHeading: 0
  },
  {
    id: '7',
    name: '芝山岩生態池',
    description: '人工修築的生態池，提供多種水生動植物的棲息環境。池邊設有解說牌，介紹當地的生態環境，是生態教育的重要場所。',
    type: '其他',
    longitude: 121.5225,
    latitude: 25.1028,
    height: 15,
    year: '現代',
    category: '生態設施',
    images: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_7.gltf',
    modelScale: 0.6,
    modelHeading: 0
  },
  {
    id: '8',
    name: '芝山岩解說中心',
    description: '提供芝山岩歷史、生態、文化等相關資訊的解說中心。館內展示豐富的文物和資料，是了解芝山岩的最佳起點。',
    type: '建築',
    longitude: 121.5238,
    latitude: 25.1018,
    height: 25,
    year: '現代',
    category: '文化設施',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_8.gltf',
    modelScale: 1.0,
    modelHeading: 0
  },
  {
    id: '9',
    name: '芝山岩古樹',
    description: '芝山岩上生長著多棵百年以上的老樹，其中以榕樹和樟樹最為著名。這些古樹見證了芝山岩的歷史變遷，是重要的自然遺產。',
    type: '其他',
    longitude: 121.5233,
    latitude: 25.1023,
    height: 35,
    year: '百年以上',
    category: '自然遺產',
    images: [
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_9.gltf',
    modelScale: 0.7,
    modelHeading: 0
  },
  {
    id: '10',
    name: '芝山岩考古展示區',
    description: '展示芝山岩遺址出土文物的區域，包括石器、陶器、骨器等考古發現。透過這些文物，可以了解史前人類的生活方式和技術水平。',
    type: '歷史遺跡',
    longitude: 121.5236,
    latitude: 25.1026,
    height: 20,
    year: '史前時代',
    category: '考古展示',
    images: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_10.gltf',
    modelScale: 1.0,
    modelHeading: 0
  },
  {
    id: '11',
    name: '芝山岩入口牌坊',
    description: '進入芝山岩的主要入口牌坊，採用傳統中式建築風格。牌坊上刻有「芝山岩」三個大字，是芝山岩的重要地標。',
    type: '建築',
    longitude: 121.5228,
    latitude: 25.1012,
    height: 12,
    year: '現代',
    category: '入口設施',
    images: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_11.gltf',
    modelScale: 0.9,
    modelHeading: 0
  },
  {
    id: '12',
    name: '芝山岩紀念碑',
    description: '為紀念芝山岩歷史文化價值而設立的紀念碑。碑文記錄了芝山岩的重要歷史事件和文化意義，是了解當地歷史的重要資料。',
    type: '石碑',
    longitude: 121.5242,
    latitude: 25.1022,
    height: 8,
    year: '現代',
    category: '紀念設施',
    images: [
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2070&auto=format&fit=crop'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_12.gltf',
    modelScale: 0.5,
    modelHeading: 0
  }
]
