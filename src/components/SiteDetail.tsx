import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { historicalSites } from '../data/sites'

/**
 * 景點詳細頁面
 * 採用極簡、高級的設計風格
 */
function SiteDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const site = historicalSites.find(s => s.id === id)

    useEffect(() => {
        // 進入頁面時滾動到頂部
        window.scrollTo(0, 0)
    }, [id])

    if (!site) {
        return (
            <div className="min-h-screen flex items-center justify-center vintage-paper">
                <div className="text-center vintage-border p-8 rounded-sm vintage-shadow">
                    <h2 className="text-2xl mb-4" style={{
                        fontFamily: 'Cinzel, Noto Serif TC, serif',
                        color: 'var(--vintage-sepia)'
                    }}>找不到該景點</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 vintage-border transition-all duration-300"
                        style={{
                            background: 'var(--vintage-cream)',
                            color: 'var(--vintage-sepia)',
                            fontFamily: 'Noto Serif TC, serif'
                        }}
                    >
                        返回地圖
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen vintage-paper">
            {/* 頂部導航 - 復古風格 */}
            <nav className="fixed top-0 left-0 right-0 z-50 vintage-border" style={{
                background: 'rgba(244, 236, 216, 0.95)',
                backdropFilter: 'blur(8px)',
                borderBottom: '2px solid var(--vintage-border)'
            }}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 text-sm transition-colors"
                        style={{ color: 'var(--vintage-brown)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--vintage-sepia)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--vintage-brown)'}
                    >
                        <svg
                            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        返回地圖
                    </button>
                    <span className="text-sm tracking-widest" style={{
                        color: 'var(--vintage-sepia)',
                        fontFamily: 'Cinzel, Noto Serif TC, serif'
                    }}>芝山記憶</span>
                </div>
            </nav>

            {/* Hero Section - 復古風格 */}
            <header className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-6 px-4 py-1 vintage-border rounded-full" style={{
                        background: 'var(--vintage-cream)'
                    }}>
                        <span className="text-xs tracking-widest uppercase" style={{
                            color: 'var(--vintage-brown)',
                            fontFamily: 'Cinzel, serif'
                        }}>
                            {site.category || site.type}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl mb-6 leading-tight" style={{
                        fontFamily: 'Cinzel, Noto Serif TC, serif',
                        color: 'var(--vintage-sepia)'
                    }}>
                        {site.name}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sm" style={{ color: 'var(--vintage-brown)' }}>
                        {site.year && (
                            <span className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--vintage-border)' }}></span>
                                {site.year}
                            </span>
                        )}
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--vintage-border)' }}></span>
                            {site.type}
                        </span>
                    </div>
                </div>
            </header>

            {/* 主要圖片 - 復古濾鏡效果 */}
            {site.images && site.images.length > 0 && (
                <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative vintage-border">
                    <img
                        src={site.images[0]}
                        alt={site.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
                        style={{ filter: 'sepia(0.2) contrast(0.9)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--vintage-cream)] via-transparent to-transparent opacity-30"></div>
                </div>
            )}

            {/* 內容區域 */}
            <main className="max-w-3xl mx-auto px-6 py-20">
                <div className="prose prose-lg mx-auto">
                    <p className="text-xl md:text-2xl leading-relaxed mb-12 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left" style={{
                        color: 'var(--vintage-dark-brown)',
                        fontFamily: 'Noto Serif TC, serif',
                        lineHeight: '1.8'
                    }}>
                        {site.description}
                    </p>

                    {/* 更多圖片展示 */}
                    {site.images && site.images.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                            {site.images.slice(1).map((img, idx) => (
                                <div key={idx} className="aspect-[4/3] overflow-hidden vintage-border rounded-sm">
                                    <img
                                        src={img}
                                        alt={`${site.name} - ${idx + 2}`}
                                        className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-500"
                                        style={{ filter: 'sepia(0.2) contrast(0.9)' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 詳細資訊列表 - 復古風格 */}
                    <div className="mt-20 pt-10" style={{ borderTop: '2px solid var(--vintage-border)' }}>
                        <h3 className="text-lg mb-8 text-center" style={{
                            fontFamily: 'Cinzel, Noto Serif TC, serif',
                            color: 'var(--vintage-sepia)'
                        }}>詳細資訊</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            <div className="flex justify-between items-baseline pb-2" style={{
                                borderBottom: '1px dotted var(--vintage-border)'
                            }}>
                                <span className="text-sm" style={{ color: 'var(--vintage-brown)' }}>經度</span>
                                <span className="text-sm font-mono" style={{ color: 'var(--vintage-dark-brown)' }}>{site.longitude}</span>
                            </div>
                            <div className="flex justify-between items-baseline pb-2" style={{
                                borderBottom: '1px dotted var(--vintage-border)'
                            }}>
                                <span className="text-sm" style={{ color: 'var(--vintage-brown)' }}>緯度</span>
                                <span className="text-sm font-mono" style={{ color: 'var(--vintage-dark-brown)' }}>{site.latitude}</span>
                            </div>
                            <div className="flex justify-between items-baseline pb-2" style={{
                                borderBottom: '1px dotted var(--vintage-border)'
                            }}>
                                <span className="text-sm" style={{ color: 'var(--vintage-brown)' }}>海拔</span>
                                <span className="text-sm font-mono" style={{ color: 'var(--vintage-dark-brown)' }}>{site.height}m</span>
                            </div>
                            <div className="flex justify-between items-baseline pb-2" style={{
                                borderBottom: '1px dotted var(--vintage-border)'
                            }}>
                                <span className="text-sm" style={{ color: 'var(--vintage-brown)' }}>類型</span>
                                <span className="text-sm" style={{ color: 'var(--vintage-dark-brown)' }}>{site.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 底部導航 - 復古風格 */}
            <footer className="py-20 mt-20" style={{
                background: 'var(--vintage-cream)',
                borderTop: '3px double var(--vintage-border)'
            }}>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-2xl mb-8" style={{
                        fontFamily: 'Cinzel, Noto Serif TC, serif',
                        color: 'var(--vintage-sepia)'
                    }}>探索更多</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {historicalSites
                            .filter(s => s.id !== site.id)
                            .slice(0, 4)
                            .map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => navigate(`/site/${s.id}`)}
                                    className="px-6 py-3 vintage-border transition-all duration-300 text-sm rounded-sm"
                                    style={{
                                        background: 'var(--vintage-paper)',
                                        color: 'var(--vintage-dark-brown)',
                                        fontFamily: 'Noto Serif TC, serif'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--vintage-sepia)'
                                        e.currentTarget.style.color = 'var(--vintage-cream)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--vintage-paper)'
                                        e.currentTarget.style.color = 'var(--vintage-dark-brown)'
                                    }}
                                >
                                    {s.name}
                                </button>
                            ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default SiteDetail
