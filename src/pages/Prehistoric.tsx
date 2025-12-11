import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: '/images/prehistoric_layers.jpg',
        description: '芝山岩見證了史前生業與聚落的演變。從早期大坌坑文化的漁獵採集，到中期芝山岩文化在湖岸濕地發展大規模農耕與干欄式建築。'
    },
    {
        id: 2,
        image: '/images/prehistoric_layers.jpg',
        description: '至晚期圓山與植物園文化，雖農業技術更精進，但為防禦外敵，居民轉為「居於山頂、耕於平地」。'
    },
    {
        id: 3,
        image: '/images/prehistoric_layers.jpg',
        description: '這種從適應自然到重視防禦的選址轉變，也預示了芝山岩日後成為戰略據點的地理宿命。'
    }
];

const Prehistoric: React.FC = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleReadMore = () => {
        // 全部的卡片都連到時空軌跡的史前~清代 (id: prehistoric)
        navigate('/chronology', { state: { activeId: 'prehistoric' } });
    };

    return (
        <div className="w-full h-screen bg-vintage-paper overflow-hidden relative flex flex-col pt-16 md:pt-20">
            {/* Slider Container */}
            <div className="flex-1 relative w-full h-full flex flex-col">
                {/* Image Area - Persistent Background with Smooth Panning (GPU Accelerated) */}
                <div className="flex-1 w-full relative overflow-hidden bg-black">
                    <motion.div
                        className="h-full bg-cover bg-no-repeat absolute top-0 left-0"
                        style={{
                            width: '180%', // Zoom in to allow panning
                            backgroundImage: `url(${slides[0].image})`,
                            backgroundPosition: 'center center' // Align image within the zoomed container
                        }}
                        initial={false}
                        animate={{
                            // Panning logic:
                            // 0: Left side (x: 0)
                            // 1: Center (x: -22% approx, centering the 180% width container relative to 100% viewport)
                            // 2: Right side (x: -44%, showing the right end)
                            // Calculation: Total width 180%. Viewport 100%. Hidden overflow 80%.
                            // Range: 0% to -80% (relative to viewport) or 0% to -44.4% (relative to container width)
                            // Let's use % relative to element width for 'x' in Framer Motion usually.
                            x: currentIndex === 0 ? '0%' :
                                currentIndex === 1 ? '-22%' :
                                    '-44%'
                        }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Ultra smooth "spring-like" easing
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vintage-paper to-transparent z-10" />
                </div>

                {/* Content Area */}
                <div className="w-full bg-vintage-paper px-6 py-6 md:py-10 border-t-4 border-vermilion relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
                        >
                            {/* Centered Description */}
                            <div className="flex-1 text-center order-2 md:order-1">
                                <p className="text-xl md:text-2xl text-ink-black font-serif font-medium leading-relaxed tracking-wide">
                                    {slides[currentIndex].description}
                                </p>
                            </div>

                            {/* Right Aligned Button */}
                            <div className="order-3 md:order-2 shrink-0">
                                <button
                                    onClick={handleReadMore}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-ink-black text-vintage-paper rounded-full text-lg font-serif hover:bg-vermilion transition-all duration-300 shadow-md"
                                >
                                    <span>點我查看更多</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-[40%] -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full text-ink-black shadow-lg z-20 transition-all"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-[40%] -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full text-ink-black shadow-lg z-20 transition-all"
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

export default Prehistoric;
