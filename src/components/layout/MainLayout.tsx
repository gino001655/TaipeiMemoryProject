import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Clock, BookOpen, Menu, X } from 'lucide-react';

const MainLayout: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/spatial-map', label: '空間探索 Spatial Map', icon: Map },
        { path: '/chronology', label: '時空軌跡 Chronology', icon: Clock },
        { path: '/exhibits', label: '專題展間 Exhibits', icon: BookOpen },
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col">
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
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-ink-black hover:text-vermilion transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
