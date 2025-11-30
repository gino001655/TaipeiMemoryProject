import { HistoricalSite } from '../types'

interface InfoPanelProps {
  site: HistoricalSite
  onClose: () => void
}

/**
 * 資訊面板組件
 * 顯示選中歷史遺跡的詳細資訊
 */
const InfoPanel: React.FC<InfoPanelProps> = ({ site, onClose }) => {
  // 根據類型返回對應的圖示顏色
  const getTypeColor = (type: HistoricalSite['type']) => {
    switch (type) {
      case '石碑':
        return 'bg-amber-100 text-amber-800'
      case '歷史遺跡':
        return 'bg-blue-100 text-blue-800'
      case '建築':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-2xl w-80 max-h-[80vh] overflow-y-auto">
      {/* 標題列 */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold pr-2">{site.name}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors text-2xl leading-none"
            aria-label="關閉"
          >
            ×
          </button>
        </div>
      </div>

      {/* 內容區域 */}
      <div className="p-4 space-y-4">
        {/* 類型標籤 */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
              site.type
            )}`}
          >
            {site.type}
          </span>
          {site.category && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {site.category}
            </span>
          )}
        </div>

        {/* 描述 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">簡介</h3>
          <p className="text-gray-600 leading-relaxed">{site.description}</p>
        </div>

        {/* 年代資訊 */}
        {site.year && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">年代</h3>
            <p className="text-gray-600">{site.year}</p>
          </div>
        )}

        {/* 位置資訊 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">位置</h3>
          <p className="text-sm text-gray-600 font-mono">
            經度: {site.longitude.toFixed(6)}
            <br />
            緯度: {site.latitude.toFixed(6)}
            {site.height && (
              <>
                <br />
                高度: {site.height} 米
              </>
            )}
          </p>
        </div>

        {/* 圖片展示區域（如果有） */}
        {site.images && site.images.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">相關圖片</h3>
            <div className="grid grid-cols-2 gap-2">
              {site.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${site.name} - 圖片 ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* 如果沒有圖片，顯示佔位符 */}
        {(!site.images || site.images.length === 0) && (
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <p className="text-gray-400 text-sm">暫無圖片</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoPanel


