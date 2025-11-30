import { HistoricalSite } from '../types'

/**
 * 芝山地區歷史遺跡資料
 * 所有資料都包含經緯度座標，方便後續定位真實景點
 */
export const historicalSites: HistoricalSite[] = [
  {
    id: '1',
    name: '芝山岩遺址 (Zhishan Rock Site)',
    description: '芝山岩遺址是台北盆地中極具代表性的多文化層遺址，涵蓋了大坌坑文化、圓山文化、植物園文化等史前文化層。這裡發現了大量的陶器、石器、骨角器以及墓葬，顯示出數千年前人類在此居住的繁榮景象。特別是「芝山岩文化」的發現，填補了台北盆地史前史的重要缺口。遺址中還出土了碳化的稻米，證明了當時已有農業活動。',
    type: '歷史遺跡',
    longitude: 121.523,
    latitude: 25.102,
    height: 50,
    year: '史前時代 (Prehistoric)',
    category: '考古遺址',
    images: [
      '/images/ruins.jpg',
      '/images/chronology-old.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_1.gltf',
    modelScale: 1.0,
    modelHeading: 0,
    position: [0, 0.5, 0]
  },
  {
    id: '2',
    name: '芝山岩碑 (Zhishan Rock Stele)',
    description: '此碑立於清代，記載了芝山岩在林爽文事件中的重要角色。當時漳州人以此為避難所，成功抵禦了外來的攻擊。碑文詳細描述了當時的戰況與居民的團結，是研究清代台灣社會動亂與族群關係的重要史料。石碑本身經過歲月洗禮，字跡雖有磨損，但仍能感受到歷史的厚重感。',
    type: '石碑',
    longitude: 121.524,
    latitude: 25.103,
    height: 5,
    year: '清代 (Qing Dynasty)',
    category: '碑文',
    images: [
      '/images/monument.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_2.gltf',
    modelScale: 0.5,
    modelHeading: 0,
    position: [2, 0.2, 2]
  },
  {
    id: '3',
    name: '惠濟宮 (Huiji Temple)',
    description: '惠濟宮建於清乾隆年間，是芝山岩地區的信仰中心，供奉開漳聖王。廟宇建築保留了傳統的閩南風格，燕尾脊、剪黏裝飾精美絕倫。除了宗教功能外，惠濟宮也是早期的教育場所，設有「文昌祠」，許多學子在此求學。廟前的廣場是居民聚會的場所，見證了當地的社區發展。',
    type: '建築',
    longitude: 121.522,
    latitude: 25.101,
    height: 20,
    year: '清代 (Qing Dynasty)',
    category: '宗教建築',
    images: [
      '/images/temple.jpg',
      '/images/view.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_3.gltf',
    modelScale: 1.2,
    modelHeading: 0,
    position: [-2, 0.3, -1]
  },
  {
    id: '4',
    name: '芝山岩步道 (Zhishan Trail)',
    description: '這條環狀步道串聯了芝山岩的各個重要景點。步道兩旁古木參天，生態豐富，常可見到松鼠、五色鳥等野生動物。步道設計考量了地形起伏，部分路段保留了古老的石階，讓行走其間彷彿穿越時空。沿途設有多個解說牌，介紹地質景觀與歷史故事，是一條兼具休閒與教育功能的生態步道。',
    type: '歷史遺跡',
    longitude: 121.5235,
    latitude: 25.1025,
    height: 30,
    year: '現代 (Modern)',
    category: '步道',
    images: [
      '/images/nature.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_4.gltf',
    modelScale: 1.0,
    modelHeading: 0,
    position: [1, 0.4, 1]
  },
  {
    id: '5',
    name: '砲台遺址 (Artillery Battery Ruins)',
    description: '位於芝山岩制高點的砲台遺址，是戰後初期國民政府為了防衛士林官邸而設立的軍事設施。當時芝山岩被劃為軍事管制區，禁止一般民眾進入，也因此保留了相當完整的自然生態。砲台的混凝土結構依然堅固，牆上還留有當年的射擊孔，訴說著那段冷戰時期的緊張氛圍。',
    type: '歷史遺跡',
    longitude: 121.5245,
    latitude: 25.1015,
    height: 40,
    year: '戰後 (Post-War)',
    category: '軍事遺跡',
    images: [
      '/images/bunker.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_5.gltf',
    modelScale: 0.8,
    modelHeading: 0,
    position: [3, 0.6, -2]
  },
  {
    id: '6',
    name: '北隘門 (North Gate)',
    description: '清代為了防禦盜匪與民變而修築的隘門系統之一。北隘門扼守芝山岩北側的通道，地勢險要，有一夫當關萬夫莫敵之勢。牆體以當地的石材堆砌而成，堅固耐用。雖然木造的門扇已不復存在，但石砌的門框與牆垣仍保存完好，是台北地區少見的清代防禦工事遺跡。',
    type: '建築',
    longitude: 121.5232,
    latitude: 25.1032,
    height: 60,
    year: '清代 (Qing Dynasty)',
    category: '防禦設施',
    images: [
      '/images/ruins.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_6.gltf',
    modelScale: 1.0,
    modelHeading: 0,
    position: [0.5, 0.8, 3]
  },
  {
    id: '7',
    name: '生態池 (Ecological Pond)',
    description: '位於芝山岩山腳下的生態池，是利用天然湧泉與低窪地形營造而成的濕地環境。池中種植了睡蓮、莎草等水生植物，吸引了蜻蜓、青蛙等水生動物棲息。這裡也是鳥類的重要飲水與覓食地。生態池的設立不僅豐富了當地的生物多樣性，也調節了微氣候，為炎熱的城市提供了一處清涼的角落。',
    type: '其他',
    longitude: 121.5225,
    latitude: 25.1028,
    height: 15,
    year: '現代 (Modern)',
    category: '生態設施',
    images: [
      '/images/nature.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_7.gltf',
    modelScale: 0.6,
    modelHeading: 0,
    position: [-1.5, 0.1, 1.5]
  },
  {
    id: '8',
    name: '文化生態綠園 (Cultural & Ecological Garden)',
    description: '這是全台第一座文化生態公園，整合了芝山岩豐富的人文與自然資源。園區內設有展示館，詳細介紹了芝山岩的地質演變、史前文化、歷史事件與生態系統。透過互動式的展覽與導覽解說，讓遊客能深入了解這座「活的博物館」。園區也定期舉辦環境教育活動，推廣生態保育觀念。',
    type: '建築',
    longitude: 121.5238,
    latitude: 25.1018,
    height: 25,
    year: '現代 (Modern)',
    category: '文化設施',
    images: [
      '/images/view.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_8.gltf',
    modelScale: 1.0,
    modelHeading: 0,
    position: [1.5, 0.2, -1.5]
  },
  {
    id: '9',
    name: '百年老樟樹 (Centennial Camphor Tree)',
    description: '這棵樹齡超過三百年的老樟樹，是芝山岩的鎮山之寶。它見證了從清代、日治到現代的歷史變遷。巨大的樹冠如同一把綠色的大傘，為過往的旅人提供遮蔭。老樟樹的根系盤根錯節，緊緊抓住了岩石，展現了強韌的生命力。當地居民視其為神樹，常在樹下祈福。',
    type: '其他',
    longitude: 121.5233,
    latitude: 25.1023,
    height: 35,
    year: '百年以上 (Centennial)',
    category: '自然遺產',
    images: [
      '/images/nature.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_9.gltf',
    modelScale: 0.7,
    modelHeading: 0,
    position: [0.8, 0.5, 0.5]
  },
  {
    id: '10',
    name: '西隘門 (West Gate)',
    description: '西隘門位於通往惠濟宮的石階路口，是芝山岩四個隘門中保存最為完整的一個。門額上題有「芝山岩」三字，字體蒼勁有力。隘門兩側連接城牆，形成一道堅固的防線。在過去治安不靖的年代，隘門是保護聚落安全的重要屏障。如今，穿越西隘門，彷彿進入了一個時光隧道。',
    type: '歷史遺跡',
    longitude: 121.5236,
    latitude: 25.1026,
    height: 20,
    year: '清代 (Qing Dynasty)',
    category: '防禦設施',
    images: [
      '/images/ruins.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_10.gltf',
    modelScale: 1.0,
    modelHeading: 0,
    position: [1.2, 0.3, 1.8]
  },
  {
    id: '11',
    name: '雨農閱覽室 (Yunong Reading Room)',
    description: '這座閱覽室是為了紀念戴笠（字雨農）將軍而建。建築風格簡約典雅，周圍環境清幽，是讀書靜心的好地方。閱覽室前身為日治時期的神社附屬建築，戰後改建。這裡保存了許多關於戴笠將軍的史料與照片，也是研究民國史的一個重要據點。',
    type: '建築',
    longitude: 121.5228,
    latitude: 25.1012,
    height: 12,
    year: '戰後 (Post-War)',
    category: '紀念設施',
    images: [
      '/images/bunker.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_11.gltf',
    modelScale: 0.9,
    modelHeading: 0,
    position: [-0.5, 0.15, -2.5]
  },
  {
    id: '12',
    name: '同歸所 (Tonggui Shrine)',
    description: '同歸所是用來收容林爽文事件中無主骨骸的場所，體現了台灣人「死者為大」的傳統觀念。每年中元節，當地居民都會在此舉行盛大的普渡儀式，祭拜這些無名英雄。同歸所的存在，不僅是對逝者的尊重，也提醒後人和平的可貴。',
    type: '石碑',
    longitude: 121.5242,
    latitude: 25.1022,
    height: 8,
    year: '清代 (Qing Dynasty)',
    category: '紀念設施',
    images: [
      '/images/monument.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_12.gltf',
    modelScale: 0.5,
    modelHeading: 0,
    position: [2.5, 0.1, 0.5]
  }
]
