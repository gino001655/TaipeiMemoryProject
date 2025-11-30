import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, Layers, Info, ChevronLeft, ChevronRight, X } from 'lucide-react'
import ModelViewer from '../components/ModelViewer'
import { historicalSites } from '../data/sites'
import { HistoricalSite } from '../types'

const SpatialMap: React.FC = () => {
    const navigate = useNavigate()
    const [selectedSite, setSelectedSite] = useState<HistoricalSite | null>(
        historicalSites.find(site => site.modelUrl) || historicalSites[0]
    )
    const [activeLayer, setActiveLayer] = useState<'prehistoric' | 'qing' | 'modern'>('modern')
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [showInfoCard, setShowInfoCard] = useState(true)

    // Set initial sidebar state based on screen size
    useEffect(() => {
        const handleResize = () => {
            // On mobile (< 768px), collapse sidebar by default
            if (window.innerWidth < 768) {
                setIsSidebarCollapsed(true)
            } else {
                setIsSidebarCollapsed(false)
            }
        }

        // Set initial state
        handleResize()

        // Listen for resize events
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSelectSite = (site: HistoricalSite) => {
        setSelectedSite(site)
        setShowInfoCard(true)
        // On mobile, collapse sidebar after selection to show the map
        if (window.innerWidth < 768) {
            setIsSidebarCollapsed(true)
        }
    }

    const handleViewDetail = (site: HistoricalSite) => {
        navigate(`/site/${site.id}`)
    }

    return (
        <div className="flex h-screen w-full bg-vintage-paper overflow-hidden">
            {/* Sidebar (Mac-style) */}
            <aside className={`relative flex-shrink-0 flex flex-col border-r-2 border-sepia-500/20 bg-vintage-paper/95 backdrop-blur-sm z-20 shadow-xl transition-all duration-300 ${isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80'}`}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-sepia-500/10">
                    <h2 className="text-2xl font-serif font-bold text-ink-black flex items-center gap-2">
                        <Map className="w-6 h-6 text-vermilion" />
                        空間探索
                    </h2>
                    <p className="text-xs text-sepia-500 font-serif tracking-widest mt-1 uppercase">
                        Spatial Exploration
                    </p>
                </div>

                {/* Site List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {historicalSites.map((site, index) => (
                        <button
                            key={site.id}
                            onClick={() => handleSelectSite(site)}
                            className={`w-full text-left p-4 rounded-sm border transition-all duration-300 group relative overflow-hidden ${selectedSite?.id === site.id
                                ? 'bg-sepia-500/10 border-vermilion shadow-sm'
                                : 'bg-white/40 border-sepia-500/10 hover:border-sepia-500/30 hover:bg-white/60'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-serif font-bold text-lg ${selectedSite?.id === site.id ? 'text-vermilion' : 'text-ink-black'
                                    }`}>
                                    {site.name}
                                </span>
                                <span className="text-xs font-mono text-sepia-500/60">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <span className="text-xs px-2 py-0.5 bg-ink-black/5 text-ink-black/60 rounded-full">
                                    {site.type}
                                </span>
                            </div>
                            <p className="text-xs text-ink-black/50 line-clamp-2 font-serif leading-relaxed">
                                {site.description}
                            </p>

                            {/* Ink Splash Effect on Active */}
                            {selectedSite?.id === site.id && (
                                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-vermilion/5 rounded-full blur-xl" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Layer Switcher (Bottom of Sidebar) */}
                <div className="p-6 border-t border-sepia-500/10 bg-sepia-500/5">
                    <div className="flex items-center gap-2 mb-3 text-ink-black/70 font-serif text-sm font-bold">
                        <Layers className="w-4 h-4" />
                        <span>圖層切換 Layers</span>
                    </div>
                    <div className="flex gap-2">
                        {['史前', '清代', '現代'].map((layer) => {
                            const layerKey = layer === '史前' ? 'prehistoric' : layer === '清代' ? 'qing' : 'modern';
                            const isActive = activeLayer === layerKey;
                            return (
                                <button
                                    key={layer}
                                    onClick={() => setActiveLayer(layerKey as any)}
                                    className={`flex-1 py-2 text-xs font-serif rounded-sm border transition-all duration-300 ${isActive
                                        ? 'bg-ink-black text-vintage-paper border-ink-black shadow-md'
                                        : 'bg-white/50 text-ink-black/60 border-sepia-500/20 hover:border-sepia-500/50'
                                        }`}
                                >
                                    {layer}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Sidebar Toggle Button - Outside sidebar so always visible */}
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="absolute top-1/2 -translate-y-1/2 z-50 bg-vintage-paper border-2 border-sepia-500/20 p-2 rounded-full shadow-lg hover:bg-sepia-500/10 hover:border-vermilion/50 transition-all duration-300"
                style={{ left: isSidebarCollapsed ? '16px' : '304px' }}
                title={isSidebarCollapsed ? '展開選單' : '收合選單'}
            >
                {isSidebarCollapsed ? <ChevronRight className="w-5 h-5 text-ink-black" /> : <ChevronLeft className="w-5 h-5 text-ink-black" />}
            </button>

            {/* Main Content (3D Viewer) */}
            <main className="flex-1 relative h-full bg-vintage-paper overflow-hidden">
                {/* 3D Viewer Container - Full Height */}
                <div className="absolute inset-0 z-0">
                    <ModelViewer
                        selectedSite={selectedSite}
                        allSites={historicalSites}
                        onSiteClick={handleSelectSite}
                        onViewDetail={handleViewDetail}
                    />
                </div>

                {/* Vintage Overlay (Grid/Texture) */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-grid-pattern mix-blend-multiply" />
                <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-paper-texture mix-blend-multiply" />

                {/* Info Overlay (Floating) */}
                {selectedSite && showInfoCard && (
                    <div className="absolute top-6 right-6 z-20 w-80">
                        <div className="vintage-panel p-6 rounded-sm shadow-2xl transform transition-all duration-500">
                            <div className="flex items-start justify-between mb-4 border-b-2 border-sepia-500/20 pb-2">
                                <h2 className="text-2xl font-serif font-bold text-ink-black">
                                    {selectedSite.name}
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowInfoCard(false)}
                                        className="p-2 hover:bg-sepia-500/10 rounded-full transition-colors"
                                        title="關閉"
                                    >
                                        <X className="w-4 h-4 text-ink-black/60" />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetail(selectedSite)}
                                        className="p-2 hover:bg-sepia-500/10 rounded-full transition-colors"
                                        title="查看詳情"
                                    >
                                        <Info className="w-5 h-5 text-vermilion" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-ink-black/80 font-serif leading-loose text-sm mb-4">
                                {selectedSite.description.substring(0, 100)}...
                            </p>
                            <button
                                onClick={() => handleViewDetail(selectedSite)}
                                className="w-full ink-button text-sm py-3 flex items-center justify-center gap-2 group"
                            >
                                <span>查看詳情</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default SpatialMap
