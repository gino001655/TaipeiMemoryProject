import { useState } from 'react'
import ModelViewer from './components/ModelViewer'
import { historicalSites } from './data/sites'
import { HistoricalSite } from './types'

/**
 * 主應用組件
 * 芝山記憶 - 3D歷史地圖展示系統
 * 簡約線條設計風格
 */
function App() {
  const [selectedSite, setSelectedSite] = useState<HistoricalSite | null>(
    historicalSites.find(site => site.modelUrl) || historicalSites[0]
  )

  /**
   * 處理選擇遺跡
   */
  const handleSelectSite = (site: HistoricalSite) => {
    setSelectedSite(site)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 簡約標題欄 - 線條設計 */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-light text-gray-900 tracking-wide">
            芝山記憶
          </h1>
        </div>
      </header>

      {/* 主要內容區域 - 上下布局 */}
      <main className="flex-1 flex flex-col">
        {/* 上方：3D模型顯示區域 - 佔大部分空間（至少佔 75vh，避免看起來太扁） */}
        <div className="flex-[3] relative" style={{ minHeight: '75vh' }}>
          <ModelViewer
            selectedSite={selectedSite}
            allSites={historicalSites}
            width="100%"
            height="100%"
          />
        </div>

        {/* 分隔線 */}
        <div className="border-t border-gray-200"></div>

        {/* 下方：景點選擇區域 - 簡約線條設計 */}
        <div className="flex-1 bg-white border-t border-gray-200 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            {/* 當前選中景點信息 - 簡約顯示 */}
            {selectedSite && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-baseline gap-4">
                  <h2 className="text-lg font-light text-gray-900">
                    {selectedSite.name}
                  </h2>
                  <span className="text-xs text-gray-400 font-light">
                    {selectedSite.type}
                  </span>
                  {selectedSite.year && (
                    <span className="text-xs text-gray-400 font-light">
                      {selectedSite.year}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 font-light leading-relaxed">
                  {selectedSite.description}
                </p>
              </div>
            )}

            {/* 景點列表 - 線條風格，響應式網格 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {historicalSites.map((site, index) => (
                <button
                  key={site.id}
                  onClick={() => handleSelectSite(site)}
                  className={`
                    group relative p-4 text-left
                    border transition-all duration-200
                    ${selectedSite?.id === site.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                    }
                  `}
                  style={{
                    borderWidth: selectedSite?.id === site.id ? '2px' : '1px'
                  }}
                >
                  {/* 選中指示線 */}
                  {selectedSite?.id === site.id && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                  
                  {/* 景點編號 - 線條風格 */}
                  <div className="text-xs text-gray-400 font-light mb-2">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  
                  {/* 景點名稱 */}
                  <h3 className={`
                    text-sm font-light transition-colors
                    ${selectedSite?.id === site.id
                      ? 'text-gray-900'
                      : 'text-gray-700 group-hover:text-gray-900'
                    }
                  `}>
                    {site.name}
                  </h3>
                  
                  {/* 類型標籤 - 線條風格 */}
                  <div className="mt-2 text-xs text-gray-400 font-light">
                    {site.type}
                  </div>
                </button>
              ))}
            </div>

            {/* 操作提示 - 簡約風格 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light text-center">
                拖動旋轉 · 滾輪縮放 · 右鍵平移
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
