# 3D模型使用指南

## 推薦格式：**GLTF/GLB** ✅

### 為什麼選擇 GLTF？

1. **專為 Web 設計** - 文件小、加載快、性能優
2. **Cesium 原生支援** - 無需轉換，直接使用
3. **功能完整** - 支援材質、動畫、PBR 渲染
4. **廣泛支援** - 所有主流3D軟體都支援匯出

### 格式對比

| 格式 | 優點 | 缺點 | 推薦度 |
|------|------|------|--------|
| **GLTF/GLB** | 專為Web、文件小、功能完整 | - | ⭐⭐⭐⭐⭐ |
| OBJ | 簡單、通用 | 無動畫、材質簡單 | ⭐⭐⭐ |
| FBX | 功能豐富 | 需轉換、文件大 | ⭐⭐ |
| DAE | 支援材質 | 不如GLTF優化 | ⭐⭐ |
| STL | 簡單 | 僅幾何、無材質 | ⭐ |

## 如何匯出 GLTF/GLB

### Blender
1. 選擇模型
2. `File` → `Export` → `glTF 2.0`
3. 格式選擇：
   - **GLB** (推薦) - 單一文件，包含所有資源
   - **GLTF** - 分離文件（.gltf + .bin + 紋理）

### 3ds Max
1. 安裝 **Babylon.js Exporter** 或 **glTF Exporter** 插件
2. 匯出為 GLTF/GLB

### SketchUp
1. 使用 **SketchUp STL** 插件匯出為 STL
2. 在 Blender 中轉換為 GLTF

### Revit / Rhino
1. 匯出為 FBX 或 OBJ
2. 在 Blender 中轉換為 GLTF

## 轉換工具

如果您的模型是其他格式，可以使用以下工具轉換：

### 線上轉換
- **glTF.report** - https://gltf.report/
- **Babylon.js Sandbox** - https://sandbox.babylonjs.com/

### 桌面工具
- **Blender** (免費) - 支援多種格式匯入/匯出
- **FBX Converter** (Autodesk) - FBX → GLTF

## 在專案中使用

### 1. 放置模型文件

將 GLTF/GLB 文件放在 `public/models/` 目錄：

```
public/
└── models/
    ├── zhishan-site.glb
    ├── monument-1.glb
    └── building.glb
```

### 2. 更新資料檔案

在 `src/data/sites.ts` 中添加模型路徑：

```typescript
{
  id: '1',
  name: '芝山岩遺址',
  // ... 其他屬性
  modelUrl: '/models/zhishan-site.glb',  // GLTF/GLB 文件路徑
  modelScale: 1.0,                        // 縮放比例（可選）
  modelHeading: 0                          // 旋轉角度（度數，可選）
}
```

### 3. 模型優化建議

- **文件大小**：盡量壓縮，單個模型建議 < 5MB
- **多邊形數**：Web 環境建議 < 50,000 面
- **紋理**：使用壓縮格式（如 WebP），解析度適中
- **LOD**：大型場景考慮使用多層級細節

## 範例工作流程

1. **建模**：在 Blender/3ds Max 中創建模型
2. **匯出**：匯出為 GLB 格式
3. **優化**：使用 gltf-pipeline 壓縮
   ```bash
   npm install -g gltf-pipeline
   gltf-pipeline -i model.glb -o model-optimized.glb -d
   ```
4. **放置**：將文件放到 `public/models/`
5. **配置**：在 `sites.ts` 中添加 `modelUrl`

## 常見問題

### Q: GLTF 和 GLB 有什麼區別？
A: GLB 是 GLTF 的二進制版本，所有資源打包在一個文件中。**推薦使用 GLB**。

### Q: 模型太大怎麼辦？
A: 
- 減少多邊形數
- 壓縮紋理
- 使用 gltf-pipeline 優化
- 考慮使用 3D Tiles（大規模場景）

### Q: 模型位置不對？
A: 調整 `height`（高度）和 `modelHeading`（旋轉）參數。

### Q: 模型載入很慢？
A: 
- 檢查文件大小
- 使用 GLB 格式（單一文件）
- 啟用 Cesium 的模型快取

## 下一步

1. 準備您的 GLTF/GLB 模型文件
2. 將文件放到 `public/models/` 目錄
3. 在 `src/data/sites.ts` 中配置模型路徑
4. 測試載入和顯示效果

