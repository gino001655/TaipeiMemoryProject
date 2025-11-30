import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';

const exhibits = [
    {
        id: '1',
        title: '芝山岩地質演變',
        description: '探索兩千萬年前至今的地質變遷，從濱海環境到今日的獨立山體。',
        author: '地質學系小組',
        image: '/images/exhibit-geology.jpg',
        category: 'Geology'
    },
    {
        id: '2',
        title: '史前文化遺跡',
        description: '發掘芝山岩遺址的陶器與石器，重現史前人類的生活樣貌。',
        author: '考古學系小組',
        image: '/images/exhibit-archaeology.jpg',
        category: 'Archaeology'
    },
    {
        id: '3',
        title: '清代軍事防禦',
        description: '研究清代隘門與砲台的配置，解析當時的防禦策略與歷史背景。',
        author: '歷史學系小組',
        image: '/images/exhibit-history.jpg',
        category: 'History'
    }
];

const Exhibits: React.FC = () => {
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
                        專題展間
                    </h1>
                    <p className="text-sepia-500 font-serif tracking-widest">
                        STUDENT EXHIBITS
                    </p>
                </header>

                {/* Exhibits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {exhibits.map((exhibit, index) => (
                        <motion.div
                            key={exhibit.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/exhibit/${exhibit.id}`} className="block group h-full">
                                <div className="vintage-panel h-full rounded-sm overflow-hidden flex flex-col transition-transform duration-300 group-hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden border-b-2 border-sepia-500/20">
                                        <ImageWithFallback
                                            src={exhibit.image}
                                            alt={exhibit.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 sepia-[0.3] group-hover:sepia-0"
                                        />
                                        <div className="absolute top-4 right-4 bg-vintage-paper/90 px-3 py-1 rounded-sm text-xs font-serif text-ink-black border border-sepia-500/30">
                                            {exhibit.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-serif font-bold text-ink-black mb-2 group-hover:text-vermilion transition-colors">
                                            {exhibit.title}
                                        </h3>
                                        <p className="text-sm text-ink-black/60 mb-4 flex-1 font-serif leading-relaxed">
                                            {exhibit.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-sepia-500/10">
                                            <span className="text-xs text-sepia-500 font-serif">
                                                {exhibit.author}
                                            </span>
                                            <div className="flex items-center gap-2 text-ink-black text-sm font-bold group-hover:text-vermilion transition-colors">
                                                <span>閱讀更多</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Exhibits;
