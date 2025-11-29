import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import ModelViewer from './components/ModelViewer'
import SiteDetail from './components/SiteDetail'
import { historicalSites } from './data/sites'
import { HistoricalSite } from './types'

/**
 * 首頁組件 - 包含地圖和列表
 */
function Home() {
  const navigate = useNavigate()
  const [selectedSite, setSelectedSite] = useState<HistoricalSite | null>(
    historicalSites.find(site => site.modelUrl) || historicalSites[0]
  )

  /**
   * 處理選擇遺跡
   */
  const handleSelectSite = (site: HistoricalSite) => {
    setSelectedSite(site)
  }

  /**
   * 處理查看詳情
   */
  const handleViewDetail = (siteId: string) => {
    navigate(`/site/${siteId}`)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--vintage-cream)' }}>
      {/* 復古標題欄 */}
      <header className="vintage-border border-b-4" style={{
        background: 'var(--vintage-paper)',
        borderBottom: '3px double var(--vintage-border)'
      }}>
        <div className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 裝飾性圖案 */}
            <div className="text-2xl" style={{ color: 'var(--vintage-sepia)' }}>✦</div>
            <h1 className="text-3xl tracking-widest" style={{
              fontFamily: 'Cinzel, Noto Serif TC, serif',
              color: 'var(--vintage-sepia)',
              letterSpacing: '0.3em'
            }}>
              芝山記憶
            </h1>
            <div className="text-2xl" style={{ color: 'var(--vintage-sepia)' }}>✦</div>
          </div>
          <div className="text-sm tracking-wider" style={{ color: 'var(--vintage-brown)' }}>
            歷史文化遺址
          </div>
        </div>
      </header>

      {/* 主要內容區域 */}
      <main className="flex-1 flex flex-col">
        {/* 3D模型顯示區域 */}
        <div className="flex-[3] relative" style={{ minHeight: '75vh' }}>
          <ModelViewer
            selectedSite={selectedSite}
            allSites={historicalSites}
            onSiteClick={(site) => handleSelectSite(site)}
            onViewDetail={(site) => handleViewDetail(site.id)}
            width="100%"
            height="100%"
          />

          {/* 浮動資訊面板 - 復古風格 */}
          {selectedSite && (
            <div className="absolute top-6 left-6 w-80 vintage-paper vintage-border vintage-shadow rounded-sm overflow-hidden">
              {/* 裝飾性頂部邊框 */}
              <div className="h-1" style={{
                background: 'linear-gradient(90deg, var(--vintage-gold), var(--vintage-border), var(--vintage-gold))'
              }}></div>

              <div className="p-5">
                {/* 標題區 */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-xl" style={{ color: 'var(--vintage-sepia)' }}>◆</div>
                  <div className="flex-1">
                    <h2 className="text-xl mb-1" style={{
                      fontFamily: 'Cinzel, Noto Serif TC, serif',
                      color: 'var(--vintage-sepia)'
                    }}>
                      {selectedSite.name}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 rounded-sm" style={{
                        background: 'var(--vintage-cream)',
                        color: 'var(--vintage-brown)',
                        border: '1px solid var(--vintage-border)'
                      }}>
                        {selectedSite.type}
                      </span>
                      {selectedSite.year && (
                        <span className="text-xs px-2 py-1 rounded-sm" style={{
                          background: 'var(--vintage-cream)',
                          color: 'var(--vintage-brown)',
                          border: '1px solid var(--vintage-border)'
                        }}>
                          {selectedSite.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 分隔線 */}
                <div className="my-3 h-px" style={{
                  background: 'linear-gradient(90deg, transparent, var(--vintage-border), transparent)'
                }}></div>

                {/* 描述 */}
                <p className="text-sm leading-relaxed mb-4" style={{
                  color: 'var(--vintage-dark-brown)',
                  fontFamily: 'Noto Serif TC, serif'
                }}>
                  {selectedSite.description.length > 120
                    ? selectedSite.description.substring(0, 120) + '...'
                    : selectedSite.description}
                </p>

                {/* 查看詳情按鈕 */}
                <button
                  onClick={() => handleViewDetail(selectedSite.id)}
                  className="w-full py-2 text-sm tracking-wider transition-all duration-300 vintage-border rounded-sm"
                  style={{
                    background: 'var(--vintage-cream)',
                    color: 'var(--vintage-sepia)',
                    fontFamily: 'Cinzel, Noto Serif TC, serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--vintage-sepia)'
                    e.currentTarget.style.color = 'var(--vintage-cream)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--vintage-cream)'
                    e.currentTarget.style.color = 'var(--vintage-sepia)'
                  }}
                >
                  查看詳情
                </button>
              </div>

              {/* 裝飾性底部邊框 */}
              <div className="h-1" style={{
                background: 'linear-gradient(90deg, var(--vintage-gold), var(--vintage-border), var(--vintage-gold))'
              }}></div>
            </div>
          )}
        </div>

        {/* 分隔線 - 復古風格 */}
        <div className="h-1" style={{
          background: 'linear-gradient(90deg, var(--vintage-gold), var(--vintage-border), var(--vintage-gold))'
        }}></div>

        {/* 下方：景點選擇區域 */}
        <div className="flex-1 vintage-paper overflow-y-auto" style={{
          borderTop: '2px solid var(--vintage-border)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {/* 標題 */}
            <div className="text-center mb-6">
              <h2 className="text-2xl tracking-widest mb-2" style={{
                fontFamily: 'Cinzel, Noto Serif TC, serif',
                color: 'var(--vintage-sepia)'
              }}>
                歷史地點
              </h2>
              <div className="w-24 h-px mx-auto" style={{
                background: 'var(--vintage-border)'
              }}></div>
            </div>

            {/* 景點列表 - 復古風格網格 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {historicalSites.map((site, index) => (
                <button
                  key={site.id}
                  onClick={() => handleSelectSite(site)}
                  className="group relative p-4 text-left transition-all duration-300 vintage-border rounded-sm"
                  style={{
                    background: selectedSite?.id === site.id
                      ? 'var(--vintage-cream)'
                      : 'var(--vintage-paper)',
                    borderWidth: selectedSite?.id === site.id ? '2px' : '1px',
                    borderColor: selectedSite?.id === site.id
                      ? 'var(--vintage-sepia)'
                      : 'var(--vintage-border)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSite?.id !== site.id) {
                      e.currentTarget.style.background = 'var(--vintage-cream)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSite?.id !== site.id) {
                      e.currentTarget.style.background = 'var(--vintage-paper)'
                    }
                  }}
                >
                  {/* 選中裝飾 */}
                  {selectedSite?.id === site.id && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-lg"
                      style={{ color: 'var(--vintage-sepia)' }}>
                      ✦
                    </div>
                  )}

                  {/* 景點編號 */}
                  <div className="text-xs mb-2 tracking-wider" style={{
                    color: 'var(--vintage-brown)',
                    fontFamily: 'Cinzel, serif'
                  }}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>

                  {/* 景點名稱 */}
                  <h3 className="text-sm mb-2 leading-snug" style={{
                    color: selectedSite?.id === site.id
                      ? 'var(--vintage-sepia)'
                      : 'var(--vintage-dark-brown)',
                    fontFamily: 'Noto Serif TC, serif'
                  }}>
                    {site.name}
                  </h3>

                  {/* 類型標籤 */}
                  <div className="text-xs" style={{ color: 'var(--vintage-brown)' }}>
                    {site.type}
                  </div>
                </button>
              ))}
            </div>

            {/* 操作提示 */}
            <div className="mt-8 pt-6 text-center" style={{
              borderTop: '1px solid var(--vintage-border)'
            }}>
              <p className="text-xs tracking-wide" style={{ color: 'var(--vintage-brown)' }}>
                ◇ 拖動旋轉 · 滾輪縮放 · 右鍵平移 · 點擊標記查看地點 ◇
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * 主應用組件 - 路由配置
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/site/:id" element={<SiteDetail />} />
      </Routes>
    </Router>
  )
}

export default App
