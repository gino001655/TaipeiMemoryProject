import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { historicalSites } from '../data/sites';
import ConfiguredImage from './ConfiguredImage';

const SiteDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const site = historicalSites.find(s => s.id === id);

    if (!site) {
        return (
            <div className="w-full min-h-screen bg-vintage-paper pt-20 flex justify-center">
                <p className="text-ink-black font-serif text-xl">Site not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-vintage-paper pt-20 pb-10 px-4 md:px-10 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                <Link to="/spatial-map" className="inline-flex items-center gap-2 text-sepia-500 hover:text-ink-black mb-8 transition-colors font-serif">
                    <ArrowLeft className="w-4 h-4" />
                    <span>返回地圖 Back to Map</span>
                </Link>

                <div className="vintage-panel p-8 rounded-sm">
                    {/* Header */}
                    <div className="border-b-2 border-sepia-500/20 pb-6 mb-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-sepia-500/10 text-sepia-500 text-sm rounded-sm border border-sepia-500/20 font-serif">
                                {site.type}
                            </span>
                            {site.year && (
                                <span className="px-3 py-1 bg-ink-black/5 text-ink-black text-sm rounded-sm border border-ink-black/10 font-serif">
                                    {site.year}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-black mb-2">
                            {site.name}
                        </h1>
                    </div>

                    {/* Image */}
                    {site.images && site.images.length > 0 && (
                        <div className="w-full h-80 md:h-96 rounded-sm overflow-hidden mb-8 border-2 border-sepia-500/20 shadow-inner bg-black/5">
                            {(() => {
                                // 處理圖片配置：支援字符串或配置對象
                                const firstImage = site.images[0];
                                const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage.url;
                                const displayConfig = typeof firstImage === 'string' ? undefined : firstImage.display;
                                
                                return (
                                    <ConfiguredImage
                                        src={imageUrl}
                                        alt={site.name}
                                        containerClassName="w-full h-full"
                                        displayConfig={displayConfig}
                                    />
                                );
                            })()}
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg prose-stone max-w-none font-serif">
                        <p className="text-ink-black/80 leading-loose text-lg whitespace-pre-line">
                            {site.description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t border-sepia-500/20 flex justify-between items-center">
                        <span className="text-sepia-500 text-sm font-serif italic">
                            資料來源：芝山岩文史工作室<br />    
                        </span>
                        <button className="ink-button rounded-sm text-sm">
                            分享此地點
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SiteDetail;
