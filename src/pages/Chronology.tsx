import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../components/ImageSlider';

const Chronology: React.FC = () => {
    const [activeEra, setActiveEra] = useState(0);

    const eras = [
        { year: '1930', title: '日治時期', subtitle: 'Japanese Era', description: '芝山岩神社參道，見證了當時的宗教活動與建築風格。' },
        { year: '1960', title: '戰後時期', subtitle: 'Post-War', description: '軍事管制區時期的芝山岩，充滿了神秘與肅穆的氛圍。' },
        { year: '2024', title: '現代', subtitle: 'Modern Day', description: '轉型為生態文化公園，成為市民休閒與教育的重要場所。' },
    ];

    return (
        <div className="w-full min-h-screen bg-vintage-paper pt-20 pb-10 px-4 md:px-10 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-black mb-4">
                        時空軌跡
                    </h1>
                    <p className="text-sepia-500 font-serif tracking-widest">
                        CHRONOLOGY OF ZHISHAN
                    </p>
                </header>

                {/* Timeline Navigation */}
                <div className="flex justify-center mb-16 overflow-x-auto pb-4">
                    <div className="flex items-center gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-sepia-500/30 -z-10" />

                        {eras.map((era, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveEra(index)}
                                className={`relative flex flex-col items-center gap-2 group min-w-[100px] transition-all duration-300 ${activeEra === index ? 'scale-110' : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${activeEra === index
                                        ? 'bg-vermilion border-vermilion'
                                        : 'bg-vintage-paper border-sepia-500 group-hover:border-vermilion'
                                    }`} />
                                <span className={`font-serif text-sm whitespace-nowrap ${activeEra === index ? 'text-vermilion font-bold' : 'text-ink-black'
                                    }`}>
                                    {era.year}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        key={`text-${activeEra}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="vintage-panel p-8 rounded-sm"
                    >
                        <h2 className="text-3xl font-serif font-bold text-ink-black mb-2">
                            {eras[activeEra].title}
                        </h2>
                        <h3 className="text-xl font-display text-sepia-500 mb-6 italic">
                            {eras[activeEra].subtitle}
                        </h3>
                        <p className="text-ink-black/80 leading-loose font-serif text-lg">
                            {eras[activeEra].description}
                        </p>
                    </motion.div>

                    {/* Image Slider */}
                    <motion.div
                        key={`img-${activeEra}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-sm overflow-hidden shadow-xl border-4 border-white/50"
                    >
                        <ImageSlider
                            beforeImage="/images/chronology-old.jpg"
                            afterImage="/images/chronology-new.jpg"
                            beforeLabel="1930 (Historical)"
                            afterLabel="2024 (Modern)"
                        />
                        <p className="text-center text-xs text-sepia-500 mt-2 font-serif italic">
                            * 示意圖：拖曳滑塊比較今昔差異 (Image Slider Demo)
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Chronology;
