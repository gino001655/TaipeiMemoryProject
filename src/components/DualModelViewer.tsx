import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';

// 單個模型組件
const Model = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);

    React.useEffect(() => {
        scene.traverse((child) => {
            if (child.name.toLowerCase().includes('camera') || child.type.toLowerCase().includes('camera')) {
                child.visible = false;
            }
        });
    }, [scene]);

    return <primitive object={scene} />;
};

// 3D 查看器容器
const ModelViewport = ({ modelPath, title }: { modelPath: string; title: string }) => {
    return (
        <div className="relative h-[400px] bg-black rounded-lg overflow-hidden border-2 border-sepia-500/20 shadow-lg">
            <div className="absolute top-4 left-4 z-10 bg-ink-black/80 px-4 py-2 rounded-full">
                <h3 className="text-vintage-paper font-serif text-sm tracking-wider">{title}</h3>
            </div>
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{
                    preserveDrawingBuffer: true,
                    failIfMajorPerformanceCaveat: false
                }}
            >
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <Model url={modelPath} />
                    </Stage>
                    <OrbitControls autoRotate enableZoom={true} />
                </Suspense>
            </Canvas>
        </div>
    );
};

const DualModelViewer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            {/* 觸發按鈕 */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-ink-black text-vintage-paper rounded-full font-serif text-lg hover:bg-ink-black/90 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>開啟 3D 數位展示櫥窗</span>
                    </button>
                    <p className="mt-4 text-sm text-ink-black/60 font-serif">
                        點擊查看芝山岩文物的 3D 模型
                    </p>
                </motion.div>
            )}

            {/* 展示櫥窗 Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        {/* 背景遮罩 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-ink-black/80 backdrop-blur-sm"
                        />

                        {/* 櫥窗內容 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-6xl bg-vintage-paper rounded-2xl shadow-2xl overflow-hidden z-10"
                        >
                            {/* 標題列 */}
                            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-sepia-500/20 bg-white/50">
                                <h2 className="text-2xl font-serif font-bold text-ink-black tracking-wider">
                                    3D 數位展示櫥窗
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-sepia-500/10 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-ink-black" />
                                </button>
                            </div>

                            {/* 模型展示區 */}
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ModelViewport
                                    modelPath="/stone.glb"
                                    title="芝山合約碑記"
                                />
                                <ModelViewport
                                    modelPath="/monument.glb"
                                    title="芝山巖事件紀念碑"
                                />
                            </div>

                            {/* 說明文字 */}
                            <div className="px-6 pb-6 text-center">
                                <p className="text-ink-black/70 font-serif text-sm">
                                    使用滑鼠拖曳旋轉 • 滾輪縮放 • 點擊背景關閉
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DualModelViewer;

useGLTF.preload('/stone.glb');
useGLTF.preload('/monument.glb');
