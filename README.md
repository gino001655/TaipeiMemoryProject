# 芝山記憶 - 3D歷史地圖

一個互動式的3D地圖網頁應用，展示芝山地區的歷史遺跡與文化景點。

## 技術棧

- **前端框架**: React 18 + TypeScript
- **3D地圖引擎**: Cesium.js (透過 Resium)
- **建置工具**: Vite
- **樣式**: Tailwind CSS

## 功能特色

- 🗺️ 3D地圖展示（支援衛星圖、地形圖等多種圖層）
- 📍 互動式標記點（點擊查看詳細資訊）
- 📖 歷史遺跡資訊面板
- 🎨 現代化UI設計

## 安裝與執行

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

應用程式將在 `http://localhost:3000` 啟動

### 建置生產版本

```bash
npm run build
```

## 專案結構

```
src/
├── components/       # React 組件
│   ├── Map3D.tsx    # 3D地圖主組件
│   └── InfoPanel.tsx # 資訊面板組件
├── data/            # 資料檔案
│   └── sites.ts     # 歷史遺跡資料
├── types/           # TypeScript 類型定義
│   └── index.ts
├── App.tsx          # 主應用組件
├── main.tsx         # 應用程式入口
└── index.css        # 全域樣式
```

## 資料格式

歷史遺跡資料定義在 `src/data/sites.ts`，格式如下：

```typescript
{
  id: string
  name: string
  description: string
  type: '石碑' | '歷史遺跡' | '建築' | '其他'
  longitude: number  // 經度
  latitude: number   // 緯度
  height?: number    // 高度（米）
  images?: string[]  // 圖片URL陣列
  year?: string      // 年代
  category?: string  // 分類
}
```

## 需要決定的事項

1. **3D模型/地圖來源**
   - 是否已有芝山地區的3D模型？
   - 或使用 Cesium 的衛星圖/地形圖？

2. **資料來源**
   - 歷史遺跡的實際座標位置
   - 遺跡的詳細描述、圖片等資料

3. **標記點圖示**
   - 需要自訂標記點圖示嗎？
   - 不同類型的遺跡是否使用不同圖示？

4. **UI風格**
   - 色彩主題偏好
   - 資訊面板的展示方式

## 下一步

- [ ] 添加實際的歷史遺跡資料和座標
- [ ] 自訂標記點圖示
- [ ] 優化3D場景（地形、建築物等）
- [ ] 添加搜尋功能
- [ ] 添加篩選功能（按類型、年代等）
- [ ] 響應式設計優化

