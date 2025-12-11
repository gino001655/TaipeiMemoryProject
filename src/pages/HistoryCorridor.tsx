import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DualModelViewer from '../components/DualModelViewer';

const periods = [
    {
        title: '史前時代',
        image: '/images/prehistoric_era.png',
        description: '從原始的自然與簡單的聚落開始，先民在大自然的懷抱中生活。',
        link: '/history/prehistoric'
    },
    {
        title: '清領時期',
        image: '/images/qing_dynasty_gate.png',
        description: '漢人移墾，建隘門、修廟宇，將芝山巖建設為防禦與信仰中心。',
        link: '/history/qing-dynasty'
    },
    {
        title: '日治時期',
        image: '/images/japanese_colonial_period.png',
        description: '現代化教育與神社建立，芝山巖成為精神教化的象徵之地。',
        link: '/history/japanese-colonial'
    },
    {
        title: '戰後',
        image: '/images/post_war_era.png',
        description: '回歸平靜，轉型為史蹟公園，成為市民親近自然與歷史的場域。',
        link: '/history/post-war'
    }
];

const HistoryCorridor: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-vintage-paper pt-32 pb-20 px-6 relative">
            <div className="max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-ink-black text-center mb-16 tracking-widest"
                >
                    歷史迴廊
                </motion.h1>

                <div className="space-y-12">
                    {periods.map((period, index) => {
                        const CardContent = (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-sepia-500/10 group hover:shadow-xl transition-shadow duration-300 w-full block text-left"
                            >
                                {/* Card Image Area */}
                                <div className="relative h-48 md:h-64 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${period.image})`,
                                            filter: 'brightness(0.7) sepia(0.2)'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Title on Image */}
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-paper tracking-widest text-shadow">
                                            {period.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-1 w-full bg-sepia-500/20 px-6">
                                    <div className="h-full w-20 bg-vermilion" />
                                </div>

                                {/* Description */}
                                <div className="p-6 md:p-8">
                                    <p className="text-lg text-ink-black/80 font-serif leading-relaxed">
                                        {period.description}
                                    </p>
                                </div>
                            </motion.div>
                        );

                        return period.link ? (
                            <Link key={index} to={period.link} className="block w-full">
                                {CardContent}
                            </Link>
                        ) : (
                            <div key={index}>
                                {CardContent}
                            </div>
                        );
                    })}
                </div>

                {/* 3D Models Section - 在引文上方 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="mt-32 mb-16 px-6 md:px-12"
                >
                    <DualModelViewer />
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-16 mb-16 px-6 md:px-12 text-center"
                >
                    <div className="relative inline-block">
                        <span className="absolute -top-6 -left-4 text-6xl text-sepia-500/20 font-serif">“</span>
                        <blockquote className="text-xl md:text-2xl text-ink-black/70 font-serif leading-loose tracking-wide">
                            每個人的看法或觀點不同，並沒有什麼關係，重要的是——人與人之間，應該有彼此容忍和尊重對方的看法與觀點的雅量。
                        </blockquote>
                        <span className="absolute -bottom-10 -right-4 text-6xl text-sepia-500/20 font-serif">”</span>
                    </div>
                    <cite className="block mt-8 text-lg text-vermilion font-serif not-italic">
                        —— 宋宜晶《雅量》
                    </cite>
                </motion.div>

            </div>
        </div>
    );
};

export default HistoryCorridor;
