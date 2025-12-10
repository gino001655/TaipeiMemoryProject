import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: '/images/colonial_incident.png',
        description: '1896年「芝山岩事件」爆發，六位日籍教師遇害。這場血腥衝突，將平靜山丘捲入殖民統治的政治風暴。'
    },
    {
        id: 2,
        image: '/images/colonial_shrine.png',
        description: '官方將死亡昇華為神聖的「殉難」。芝山岩被改造為全臺最高規格的教育聖地，這是一場精密計算的記憶工程。'
    },
    {
        id: 3,
        image: '/images/colonial_path.png',
        description: '建立神社、修築參道，這裡是皇民化教育的核心。透過空間儀式，殖民者將「忠君愛國」刻入每一位參拜者的心中。'
    }
];

const JapaneseColonial: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="w-full h-screen bg-vintage-paper overflow-hidden relative flex flex-col pt-16 md:pt-20">
            {/* Slider Container */}
            <div className="flex-1 relative w-full h-full">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col"
                    >
                        {/* Image Area */}
                        <div className="flex-1 w-full relative overflow-hidden group">
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url(${slides[currentIndex].image})`,
                                    backgroundSize: 'cover'
                                }}
                            />
                            {/* 漸層遮罩 */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vintage-paper to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="w-full bg-vintage-paper px-6 py-6 md:py-10 border-t-4 border-vermilion">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                                {/* Centered Description */}
                                <div className="flex-1 text-center order-2 md:order-1">
                                    <p className="text-xl md:text-2xl text-ink-black font-serif font-medium leading-relaxed tracking-wide">
                                        {slides[currentIndex].description}
                                    </p>
                                </div>

                                {/* Right Aligned Button */}
                                <div className="order-3 md:order-2 shrink-0">
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-ink-black text-vintage-paper rounded-full text-lg font-serif hover:bg-vermilion transition-all duration-300 shadow-md">
                                        <span>點我查看更多</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full text-ink-black shadow-lg z-20 transition-all"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full text-ink-black shadow-lg z-20 transition-all"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${index === currentIndex
                                    ? 'bg-vermilion w-8'
                                    : 'bg-white/70 hover:bg-white'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JapaneseColonial;
