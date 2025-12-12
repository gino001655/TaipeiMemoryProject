# 專案編輯指南

本文件說明如何修改專案中的各個部分。

## 📍 如何修改空間探索區塊的景點位置

### 檔案位置
`src/data/sites.ts`

### 修改步驟

1. 打開 `src/data/sites.ts` 檔案

2. 找到你要修改的景點，例如：
```typescript
{
  id: '1',
  name: '芝山岩遺址',
  longitude: 121.5329406,  // ← 修改這個（經度）
  latitude: 25.1016861,     // ← 修改這個（緯度）
  height: 50,                // ← 修改這個（高度，單位：米）
  // ...
}
```

3. 調整參數：
   - **longitude (經度)**: 控制東西方向位置
     - 數值越大 = 越往東（右）
     - 數值越小 = 越往西（左）
     - 芝山地區約在 121.52°E - 121.54°E
   
   - **latitude (緯度)**: 控制南北方向位置
     - 數值越大 = 越往北（上）
     - 數值越小 = 越往南（下）
     - 芝山地區約在 25.10°N - 25.11°N
   
   - **height (高度)**: 控制標記點在3D地圖中的垂直位置（單位：米）
     - 數值越大 = 標記點越高
     - 建議範圍：5-100 米

4. 地圖中心點：25.103060°N, 121.530781°E
   - 所有位置都是相對於這個中心點計算的

### 範例
```typescript
{
  id: '1',
  name: '芝山岩遺址',
  longitude: 121.5329406,  // 原本位置
  latitude: 25.1016861,
  height: 50,
  // 如果要往東移動，增加 longitude
  // longitude: 121.5339406,  // 往東移動約 100 米
  // 如果要往北移動，增加 latitude
  // latitude: 25.1026861,    // 往北移動約 100 米
}
```

---

## 🔗 如何新增參考連結

### 檔案位置
`src/data/references.ts`

### 修改步驟

1. 打開 `src/data/references.ts` 檔案

2. 在 `references` 陣列中新增一個物件：
```typescript
export const references: Reference[] = [
  {
    title: '芝山岩維基百科',
    url: 'https://zh.wikipedia.org/zh-tw/%E8%8A%9D%E5%B1%B1%E5%B2%A9',
    description: '芝山岩的詳細介紹與歷史背景',
    category: '百科全書'
  },
  // 👇 在這裡新增你的連結
  {
    title: '你的連結標題',
    url: 'https://example.com',
    description: '連結的描述（選填）',
    category: '分類標籤（選填）'
  }
];
```

3. 欄位說明：
   - **title** (必填): 連結標題
   - **url** (必填): 連結網址
   - **description** (選填): 連結描述
   - **category** (選填): 分類標籤，例如：'學術論文'、'官方網站'、'新聞報導' 等

### 範例
```typescript
{
  title: '台北市文化局 - 芝山岩',
  url: 'https://www.culture.gov.taipei/',
  description: '官方文化資訊網站',
  category: '官方網站'
},
{
  title: '芝山岩考古研究論文',
  url: 'https://example.com/paper.pdf',
  description: '關於芝山岩考古發現的學術研究',
  category: '學術論文'
}
```

---

## 📝 如何新增歷史迴廊/戰後的內容

### 檔案位置
`src/pages/PostWar.tsx`

### 修改步驟

1. 打開 `src/pages/PostWar.tsx` 檔案

2. 找到 `slides` 陣列，修改或新增內容：
```typescript
const slides = [
    {
        id: 1,
        image: '/images/post_war_era.png',  // ← 修改圖片路徑
        description: '你的描述文字...'        // ← 修改描述
    },
    {
        id: 2,
        image: '/images/你的圖片.png',
        description: '第二段描述...'
    },
    // 可以繼續新增更多 slides
];
```

3. 圖片路徑格式：
   - 將圖片放在 `public/images/` 目錄下
   - 路徑格式：`/images/檔案名稱.副檔名`
   - 例如：`/images/post_war_era.png`

4. 修改跳轉連結（選填）：
   在 `handleReadMore` 函數中，可以設定點擊「點我查看更多」按鈕後要跳轉到哪裡：
```typescript
const handleReadMore = () => {
    // 跳轉到時空軌跡的特定事件
    navigate('/chronology', { state: { activeId: 'post-war' } });
    // 或跳轉到其他頁面
    // navigate('/spatial-map');
};
```

### 範例
```typescript
const slides = [
    {
        id: 1,
        image: '/images/post_war_era.png',
        description: '1945年戰後，國民政府接收台灣，芝山岩的歷史記憶被重新詮釋。'
    },
    {
        id: 2,
        image: '/images/new_image.jpg',
        description: '1958年，新的「芝山岩事件碑記」立成，主角從六氏先生轉為抗日民眾。'
    },
    {
        id: 3,
        image: '/images/another_image.png',
        description: '今日的芝山岩轉型為史蹟公園，成為市民親近自然與歷史的場域。'
    }
];
```

---

## 🎨 如何修改其他歷史時期頁面

歷史時期頁面都使用相同的結構：
- `src/pages/Prehistoric.tsx` - 史前時代
- `src/pages/QingDynasty.tsx` - 清領時期
- `src/pages/JapaneseColonial.tsx` - 日治時期
- `src/pages/PostWar.tsx` - 戰後

修改方式與「戰後」頁面相同，只需：
1. 修改 `slides` 陣列中的內容
2. 更新圖片路徑
3. 調整描述文字

---

## 📸 圖片響應式設計說明

所有歷史時期頁面的圖片現在都使用 `backgroundSize: 'contain'`，這意味著：
- 圖片會完整顯示，不會被裁切
- 在橫向螢幕上，圖片會完整顯示，周圍會顯示背景色（深色）
- 在縮小視窗時，圖片會自動縮放以完整顯示
- 如果圖片區域沒有圖片，會顯示深色背景（`bg-ink-black`）

---

## 🎯 其他注意事項

1. **圖片格式建議**：
   - 支援格式：PNG, JPG, JPEG, WebP
   - 建議尺寸：寬度 1920px 以上，以確保高解析度顯示

2. **文字長度建議**：
   - 描述文字建議在 50-150 字之間，以確保良好的閱讀體驗

3. **檔案命名**：
   - 使用有意義的檔案名稱，例如：`post_war_era.png` 而不是 `image1.png`

4. **測試**：
   - 修改後記得測試不同螢幕尺寸的顯示效果
   - 使用瀏覽器的開發者工具測試響應式設計

---

## ❓ 遇到問題？

如果修改後出現問題：
1. 檢查檔案路徑是否正確
2. 檢查圖片是否存在於 `public/images/` 目錄
3. 檢查語法是否正確（逗號、引號等）
4. 查看瀏覽器控制台的錯誤訊息




