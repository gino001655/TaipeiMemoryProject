import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: '/images/huiji_temple.jpg',
        description: '乾隆年間，漳州移民將此地視為心靈堡壘，以故鄉名勝命名為「芝山岩」，並建惠濟宮凝聚族群認同。'
    },
    {
        id: 2,
        image: '/images/tomb_monument.png',
        description: '歷經械鬥衝突，先民設立「同歸所」合葬敵我遺骸。透過祭祀，將仇恨轉化為對亡者的慈悲與共融。'
    },
    {
        id: 3,
        image: '/images/stone_tablet.png',
        description: '早在清代便立碑禁止砍伐，透過官民契約將山林「公有化」。這份古老的守護，留下了今日的蒼翠綠意。'
    }
];

const QingDynasty: React.FC = () => {
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
                        {/* Image Area - 佔滿寬度，高度自適應或填滿剩餘空間 */}
                        <div className="flex-1 w-full relative overflow-hidden group">
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url(${slides[currentIndex].image})`,
                                    backgroundSize: 'cover' // 或 'contain' 取決於是否允許留白，'cover' 佔滿視覺感較好但可能裁切
                                }}
                            />
                            {/* 漸層遮罩，讓下方文字更容易過渡 */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vintage-paper to-transparent" />
                        </div>

                        {/* Content Area - 圖片下方 */}
                        <div className="w-full bg-vintage-paper px-6 py-6 md:py-10 border-t-4 border-vermilion">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                                {/* Centered Description (Taking up middle space) */}
                                <div className="flex-1 text-center order-2 md:order-1">
                                    <p className="text-xl md:text-2xl text-ink-black font-serif font-medium leading-relaxed tracking-wide">
                                        {slides[currentIndex].description}
                                    </p>
                                </div>

                                {/* Right Aligned Button (On mobile it might stack) */}
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

export default QingDynasty;
