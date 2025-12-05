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
    longitude: 121.5329406,
    latitude: 25.1016861,
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
    name: '芝山合約碑記 (Zhishan Contract Stele)',
    description: '此碑立於清代，記載了芝山岩在林爽文事件中的重要角色。當時漳州人以此為避難所，成功抵禦了外來的攻擊。碑文詳細描述了當時的戰況與居民的團結，是研究清代台灣社會動亂與族群關係的重要史料。石碑本身經過歲月洗禮，字跡雖有磨損，但仍能感受到歷史的厚重感。',
    type: '石碑',
    longitude: 121.5321262,
    latitude: 25.1017997,
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
    longitude: 121.53073,
    latitude: 25.1028652,
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
    id: '5',
    name: '西砲台 (Artillery Battery Ruins)',
    description: '位於芝山岩制高點的砲台遺址，是戰後初期國民政府為了防衛士林官邸而設立的軍事設施。當時芝山岩被劃為軍事管制區，禁止一般民眾進入，也因此保留了相當完整的自然生態。砲台的混凝土結構依然堅固，牆上還留有當年的射擊孔，訴說著那段冷戰時期的緊張氛圍。',
    type: '歷史遺跡',
    longitude: 121.5296903,
    latitude: 25.1037676,
    //25.1037676,121.5296903
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
    name: '學務官僚遭難碑',
    description: '遭難之碑是在芝山岩事件之後，由殖民政府為紀念六位遇害教師而豎立的碑石。碑文面向刻著「學務官僚遭難之碑」，是由當時日本內閣總理大臣伊藤博文親自題字。此碑不僅紀錄這場教師遇害事件，同時也象徵殖民政權欲透過紀念與儀式，強化在台教育的正當性與殖民統治的合法性。在後來的歷史中，這塊碑曾被毀壞、遺棄，但也因為社會與學界對於歷史教育保存的重視，於1990年代後重建復原。現在它與墓地一起，被視為芝山岩文化史蹟的重要遺跡。\n\n對於探訪者來說，遭難之碑是理解「芝山岩神社時代」與「日本殖民教育歷史」的重要入口——紀念碑文、碑身風化與復原，都是值得細看與反思的歷史痕跡。',
    type: '石碑',
    longitude: 121.5328722,
    latitude: 25.103088,
    
    height: 60,
    year: '清代 (Qing Dynasty)',
    category: '石碑',
    images: [
      '/images/ruins.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_6.gltf',
    modelScale: 1.0,
    modelHeading: 0,
    position: [0.5, 0.8, 3]
  },
  
  
  {
    id: '10',
    name: '六氏先生之墓 (Liu Shi Xian Sheng Zhi Mu)',
    description: '「六氏先生」是當年（1896年1月1日）在芝山岩學堂任教的六位日本籍教師集體遇害的總稱。這場事件後來被稱為芝山岩事件。為了紀念這六名教師，日本政府將他們的骨灰安葬於芝山岩山頂附近的一棵大樟樹下，並豎立紀念碑。這座墓地，就是現在被稱為六氏先生墓的所在。\n\n隨著歷史變遷，這塊墓地與相關紀念碑曾被毀損或荒廢。直到1990年代後期，地方人士才於原址重新立碑，追認這段歷史，使墓地得以被保存與重視。\n\n六氏先生墓對研究者與訪客而言，是當年殖民教化與抗日衝突、文化同化與在地反抗交錯史的一個具體見證。即使今天墓園形式已不復當年的莊嚴，但其歷史意義與悲劇性，仍是芝山岩不可忽視的重要組成部分。',
    type: '歷史遺跡',
    longitude: 121.5322362,
    latitude: 25.103145,
    //25.103145,121.5322362
    height: 20,
    year: '清代 (Qing Dynasty)',
    category: '墓地',
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
    longitude: 121.5328622,
    latitude: 25.103048,
    //25.103048,121.5328622
    height: 60,
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
    name: '百二崁 (Bai Er Kan)',
    description: '百二崁是通往芝山岩山頂的古老石階步道／參道。根據遊記與導覽資訊，當年若要從山下上到山頂（包括祭祀場所或神社／墓地），往往要透過這段約 120 階左右的石階。\n\n現在百二崁是芝山岩文化史蹟公園的一部分，遊客可以沿著石階或附近木棧道攀登。走上去雖有坡度，但對多數人來說並不困難，是結合自然、地質、人文與運動的輕鬆登山和散步路線。',
    type: '步道',
    longitude: 121.5303593,
    latitude: 25.1015783,
    //25.1015783,121.5303593
    height: 8,
    year: '清代 (Qing Dynasty)',
    category: '步道',
    images: [
      '/images/monument.jpg'
    ],
    modelUrl: '/mountain3D/9e7dca72aae0_12.gltf',
    modelScale: 0.5,
    modelHeading: 0,
    position: [2.5, 0.1, 0.5]
  }
]
