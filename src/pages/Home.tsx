import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map as MapIcon, Clock, BookOpen } from 'lucide-react';
import ModelViewer from '../components/ModelViewer';
import { historicalSites } from '../data/sites';

const Home: React.FC = () => {
    const features = [
        {
            path: '/chronology',
            title: '時空軌跡',
            subtitle: 'Chronology',
            icon: Clock,
            description: '穿梭時光隧道，見證芝山岩從史前時代到現代的演變歷程。'
        },
        {
            path: '/spatial-map',
            title: '空間探索',
            subtitle: 'Spatial Map',
            icon: MapIcon,
            description: '透過3D數位孿生技術，探索芝山岩的地理特徵與歷史遺跡。'
        },
        {
            path: '/exhibits',
            title: '專題展間',
            subtitle: 'Thematic Exhibits',
            icon: BookOpen,
            description: '隨著我們的腳步，共同進入芝山岩的數位展覽館'
        }
    ];

    return (
        <div className="relative w-full min-h-screen overflow-y-auto bg-vintage-paper">
            {/* Background 3D Scene */}
            <div className="fixed inset-0 z-0 opacity-60">
                <ModelViewer
                    allSites={historicalSites}
                    showLabels={false}
                />
                {/* Vintage Overlay Texture */}
                <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-vintage-paper/80 via-transparent to-vintage-paper/90 pointer-events-none" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 max-w-4xl"
                >
                    <div className="mb-6 inline-block">
                        <span className="px-4 py-1 border-y-2 border-ink-black text-ink-black font-serif tracking-[0.2em] text-sm uppercase">
                            Digital Humanities Project
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink-black mb-6 tracking-tight">
                        巖<span className="text-vermilion">芝</span>有理——
                    </h1>
                    <p className="text-xl md:text-2xl text-ink-black/90 font-serif tracking-widest mb-8 font-bold">
                        ZHISHAN ROCK TIME TRAVELER
                    </p>
                    {/*
                    <p className="text-ink-black/60 max-w-2xl mx-auto font-serif leading-loose">
                        結合數位孿生與歷史考據，重現台北盆地中最具傳奇色彩的文化地景。
                        在這裡，每一塊石頭都訴說著千萬年的故事。
                    </p>
                    */}
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.path}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <Link to={feature.path} className="block group h-full">
                                <div className="vintage-panel h-full p-8 rounded-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:border-vermilion/30">
                                    <div className="flex items-center justify-between mb-6">
                                        <feature.icon className="w-8 h-8 text-ink-black group-hover:text-vermilion transition-colors" />
                                        <span className="text-xs font-serif text-sepia-500 tracking-widest uppercase group-hover:text-vermilion transition-colors">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-ink-black mb-2 group-hover:text-vermilion transition-colors">
                                        {feature.title}
                                    </h3>
                                    <h4 className="text-sm font-display text-sepia-500 mb-4 italic">
                                        {feature.subtitle}
                                    </h4>
                                    <p className="text-ink-black/60 font-serif text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-ink-black/20 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-ink-black/20 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-ink-black/20 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-ink-black/20 rounded-br-lg pointer-events-none" />
        </div>
    );
};

export default Home;
