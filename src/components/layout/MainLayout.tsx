import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Clock, BookOpen, Menu, X, Github, Cloud } from 'lucide-react';

const MainLayout: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/spatial-map', label: '空間探索 Spatial Map', icon: Map },
        { path: '/chronology', label: '時空軌跡 Chronology', icon: Clock },
        { path: '/exhibits', label: '專題展間 Exhibits', icon: BookOpen },
    ];

    return (
        <div className="relative w-full min-h-screen flex flex-col">
            {/* Vintage Navigation Bar */}
            <nav className="z-50 px-6 py-4 flex items-center justify-between border-b-2 border-sepia-500/20 bg-vintage-paper/95 backdrop-blur-sm shadow-sm">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-ink-black flex items-center justify-center rounded-sm shadow-md group-hover:bg-vermilion transition-colors duration-500">
                        <span className="text-vintage-paper font-serif font-bold text-xl">芝</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-display font-bold text-ink-black tracking-widest group-hover:text-vermilion transition-colors">
                            芝山時空旅人
                        </span>
                        <span className="text-xs font-serif text-sepia-500 tracking-[0.2em] uppercase">
                            Zhishan Time Traveler
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative flex items-center gap-2 px-2 py-1 transition-colors duration-300 group ${isActive ? 'text-vermilion' : 'text-ink-black hover:text-sepia-500'
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${isActive ? 'stroke-2' : 'stroke-1'}`} />
                                <span className={`font-serif tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>
                                    {item.label.split(' ')[0]}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vermilion"
                                    />
                                )}
                            </Link>
                        );
                    })}
                    
                    {/* External Links */}
                    <div className="flex items-center gap-4 ml-4 pl-4 border-l border-sepia-500/20">
                        <a
                            href="https://github.com/gino001655/TaipeiMemoryProject"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-ink-black hover:text-vermilion transition-colors duration-300 group"
                            title="GitHub Repository"
                            aria-label="GitHub Repository"
                        >
                            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                            href="https://drive.google.com/drive/folders/13jRE68y0R6kAOog5uQIh2jh2o0MbFpT2?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-ink-black hover:text-vermilion transition-colors duration-300 group"
                            title="更多圖片 / More Images"
                            aria-label="Google Drive - More Images"
                        >
                            <Cloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Mobile: External Links + Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <a
                        href="https://github.com/gino001655/TaipeiMemoryProject"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-ink-black hover:text-vermilion transition-colors"
                        title="GitHub"
                        aria-label="GitHub Repository"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://drive.google.com/drive/folders/13jRE68y0R6kAOog5uQIh2jh2o0MbFpT2?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-ink-black hover:text-vermilion transition-colors"
                        title="更多圖片"
                        aria-label="Google Drive"
                    >
                        <Cloud className="w-5 h-5" />
                    </a>
                    <button
                        className="p-2 text-ink-black hover:text-vermilion transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-ink-black/20 z-30 md:hidden"
                        />
                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-[72px] left-0 right-0 bg-vintage-paper border-b-2 border-sepia-500/20 shadow-lg z-40 md:hidden flex flex-col p-4 gap-4"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-lg ${location.pathname.startsWith(item.path)
                                        ? 'bg-sepia-500/10 text-vermilion font-bold'
                                        : 'text-ink-black hover:bg-black/5'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-serif text-lg">{item.label}</span>
                                </Link>
                            ))}
                            
                            {/* Mobile External Links */}
                            <div className="pt-4 mt-4 border-t border-sepia-500/20 flex gap-4 justify-center">
                                <a
                                    href="https://github.com/gino001655/TaipeiMemoryProject"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 p-3 rounded-lg text-ink-black hover:bg-black/5 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="font-serif text-lg">GitHub Repository</span>
                                </a>
                                <a
                                    href="https://drive.google.com/drive/folders/13jRE68y0R6kAOog5uQIh2jh2o0MbFpT2?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 p-3 rounded-lg text-ink-black hover:bg-black/5 transition-colors"
                                >
                                    <Cloud className="w-5 h-5" />
                                    <span className="font-serif text-lg">更多圖片</span>
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 relative">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
