import React from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

const AdminQRCode: React.FC = () => {
    return (
        <div className="relative w-full min-h-screen overflow-y-auto bg-vintage-paper">
            {/* Vintage Overlay Texture */}
            <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none mix-blend-multiply" />

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 max-w-4xl"
                >
                    <div className="mb-6 inline-block">
                        <span className="px-4 py-1 border-y-2 border-ink-black text-ink-black font-serif tracking-[0.2em] text-sm uppercase">
                            Admin Panel
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-ink-black mb-4 tracking-tight">
                        QR Code <span className="text-vermilion">管理</span>
                    </h1>
                    <p className="text-lg md:text-xl text-ink-black/70 font-serif tracking-wide">
                        Taipei Memory Project QR Code
                    </p>
                </motion.div>

                {/* QR Code Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-full max-w-2xl"
                >
                    <div className="vintage-panel p-8 md:p-12 rounded-sm">
                        <div className="flex items-center justify-center mb-8">
                            <QrCode className="w-8 h-8 text-vermilion mr-3" />
                            <h2 className="text-2xl font-serif font-bold text-ink-black">
                                展覽 QR Code
                            </h2>
                        </div>

                        {/* QR Code Image Container */}
                        <div className="relative bg-white p-8 rounded-sm shadow-lg border-2 border-ink-black/10">
                            <img
                                src="/qrcode.png"
                                alt="台北城市記憶專案 QR Code"
                                className="w-full h-auto max-w-md mx-auto"
                            />
                        </div>

                        {/* Description */}
                        <div className="mt-8 text-center">
                            <p className="text-ink-black/60 font-serif text-sm leading-relaxed">
                                此 QR Code 可用於展覽現場,讓訪客快速訪問「巖芝有理—台北城市記憶專案」數位平台。
                            </p>
                        </div>

                        {/* Download Button (Optional) */}
                        <div className="mt-8 text-center">
                            <a
                                href="/qrcode.png"
                                download="taipei-memory-qrcode.png"
                                className="inline-block px-6 py-3 bg-ink-black text-vintage-paper font-serif rounded-sm hover:bg-vermilion transition-colors duration-300"
                            >
                                下載 QR Code
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-12 text-center max-w-xl"
                >
                    <p className="text-ink-black/50 font-serif text-xs leading-relaxed">
                        建議在印刷時確保 QR Code 清晰可讀,建議最小尺寸為 3cm × 3cm。
                        <br />
                        確保周圍有足夠的留白空間以提高掃描成功率。
                    </p>
                </motion.div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-ink-black/20 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-ink-black/20 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-ink-black/20 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-ink-black/20 rounded-br-lg pointer-events-none" />
        </div>
    );
};

export default AdminQRCode;
