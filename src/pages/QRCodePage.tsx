import React from 'react';

const QRCodePage: React.FC = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-vintage-paper">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl border-4 border-double border-sepia-500">
                <h1 className="text-3xl font-serif font-bold text-ink-black mb-8 text-center tracking-widest">
                    掃描 QR Code
                </h1>
                <div className="p-4 bg-white rounded-lg shadow-inner">
                    <img
                        src="/qrcode.png"
                        alt="Project QR Code"
                        className="w-64 h-64 object-contain"
                    />
                </div>
                <p className="mt-6 text-center text-sepia-500 font-serif">
                    Taipei Memory Project
                </p>
            </div>
        </div>
    );
};

export default QRCodePage;
