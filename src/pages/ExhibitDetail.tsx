import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Box, X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ImageWithFallback from '../components/ImageWithFallback';

// Mock data - in a real app this would come from an API or data file
const exhibitData = {
    '1': {
        title: '芝山岩地質演變',
        description: '本專題深入探討芝山岩地質的形成過程，從兩千萬年前的濱海環境，經過造山運動隆起，到今日成為台北盆地中的獨立山體。透過實地考察與岩石樣本分析，我們重建了這段漫長的地質歷史。',
        author: '地質學系小組',
        image: '/images/exhibit-geology.jpg',
        category: 'Geology'
    },
    '2': {
        title: '史前文化遺跡',
        description: '芝山岩遺址是台灣重要的史前文化遺址之一。本展覽展示了在此發掘的陶器、石器與骨角器，並透過3D復原技術，重現了史前人類在芝山岩的生活樣貌與聚落型態。',
        author: '考古學系小組',
        image: '/images/exhibit-archaeology.jpg',
        category: 'Archaeology'
    },
    '3': {
        title: '清代軍事防禦',
        description: '清代時期，芝山岩因其險要的地勢而成為重要的軍事據點。我們研究了隘門的建築結構與砲台的配置，解析當時的防禦策略，並探討其在林爽文事件等歷史事件中的角色。',
        author: '歷史學系小組',
        image: '/images/exhibit-history.jpg',
        category: 'History'
    }
};

const RotatingCube = () => {
    return (
        <mesh rotation={[0.5, 0.5, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#d97706" wireframe />
        </mesh>
    );
};

const ExhibitDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeMedia, setActiveMedia] = useState<'video' | '3d' | null>(null);

    const exhibit = exhibitData[id as keyof typeof exhibitData];

    if (!exhibit) {
        return <div className="text-ink-black text-center pt-20 font-serif">Exhibit not found</div>;
    }

    return (
        <div className="w-full min-h-screen bg-vintage-paper pt-20 pb-10 px-4 md:px-10 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-5xl mx-auto"
            >
                <Link to="/exhibits" className="inline-flex items-center gap-2 text-sepia-500 hover:text-ink-black mb-8 transition-colors font-serif">
                    <ArrowLeft className="w-4 h-4" />
                    <span>返回展間列表 Back to Exhibits</span>
                </Link>

                {/* Hero Section */}
                <div className="vintage-panel p-8 rounded-sm mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-sm overflow-hidden border-2 border-sepia-500/20 shadow-md">
                            <ImageWithFallback
                                src={exhibit.image}
                                alt={exhibit.title}
                                className="w-full h-full object-cover sepia-[0.2]"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="mb-4">
                                <span className="px-3 py-1 bg-sepia-500/10 text-sepia-500 text-sm rounded-sm border border-sepia-500/20 font-serif">
                                    {exhibit.category}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink-black mb-4 leading-tight">
                                {exhibit.title}
                            </h1>
                            <p className="text-ink-black/60 font-serif mb-6 italic">
                                by {exhibit.author}
                            </p>
                            <p className="text-ink-black/80 leading-loose font-serif text-lg">
                                {exhibit.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Multimedia Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Video Card */}
                    <div
                        className="vintage-panel p-6 rounded-sm cursor-pointer group hover:border-vermilion/50 transition-colors"
                        onClick={() => setActiveMedia('video')}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-ink-black text-vintage-paper flex items-center justify-center group-hover:bg-vermilion transition-colors">
                                <Play className="w-5 h-5 ml-1" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-ink-black">紀錄短片</h3>
                        </div>
                        <p className="text-ink-black/60 font-serif text-sm">
                            觀看關於此專題的深入訪談與實地考察紀錄。
                        </p>
                    </div>

                    {/* 3D Model Card */}
                    <div
                        className="vintage-panel p-6 rounded-sm cursor-pointer group hover:border-vermilion/50 transition-colors"
                        onClick={() => setActiveMedia('3d')}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-ink-black text-vintage-paper flex items-center justify-center group-hover:bg-vermilion transition-colors">
                                <Box className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-ink-black">3D 文物展示</h3>
                        </div>
                        <p className="text-ink-black/60 font-serif text-sm">
                            360度檢視出土文物與地質標本的數位模型。
                        </p>
                    </div>
                </div>

                {/* Media Modal */}
                <AnimatePresence>
                    {activeMedia && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-black/90 backdrop-blur-sm p-4"
                            onClick={() => setActiveMedia(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-vintage-paper w-full max-w-4xl aspect-video rounded-sm overflow-hidden relative shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 z-10 p-2 bg-ink-black/50 text-vintage-paper rounded-full hover:bg-vermilion transition-colors"
                                    onClick={() => setActiveMedia(null)}
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {activeMedia === 'video' ? (
                                    <div className="w-full h-full flex items-center justify-center bg-black">
                                        <p className="text-vintage-paper font-serif">影片播放器 (模擬)</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gray-900">
                                        <Canvas camera={{ position: [0, 0, 5] }}>
                                            <ambientLight intensity={0.5} />
                                            <pointLight position={[10, 10, 10]} />
                                            <RotatingCube />
                                            <OrbitControls enableZoom={false} />
                                        </Canvas>
                                        <div className="absolute bottom-4 left-4 text-white/50 text-xs font-mono">
                                            Drag to rotate
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ExhibitDetail;
