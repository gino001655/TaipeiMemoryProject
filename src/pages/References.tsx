import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { references } from '../data/references';

const References: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-vintage-paper pt-24 md:pt-32 pb-20 px-4 md:px-6 relative">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 md:mb-12 text-center"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-black mb-2 md:mb-4">
                        參考連結
                    </h1>
                    <p className="text-sm md:text-base text-sepia-500 font-serif tracking-widest">
                        REFERENCES
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {references.map((ref, index) => (
                        <motion.a
                            key={index}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="vintage-panel p-6 rounded-sm hover:shadow-xl transition-all duration-300 group block"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-serif font-bold text-ink-black group-hover:text-vermilion transition-colors">
                                            {ref.title}
                                        </h3>
                                        <ExternalLink className="w-4 h-4 text-sepia-500 group-hover:text-vermilion transition-colors flex-shrink-0" />
                                    </div>
                                    {ref.description && (
                                        <p className="text-sm text-ink-black/60 font-serif leading-relaxed mb-2">
                                            {ref.description}
                                        </p>
                                    )}
                                    {ref.category && (
                                        <span className="inline-block text-xs px-2 py-1 bg-sepia-500/10 text-sepia-500 rounded-full font-serif">
                                            {ref.category}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default References;

