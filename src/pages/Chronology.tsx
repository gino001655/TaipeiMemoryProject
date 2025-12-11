import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { chronologyEvents, ChronologyEvent } from '../data/chronologyData';

const Chronology: React.FC = () => {
    const location = useLocation();
    const [activeEventId, setActiveEventId] = useState(chronologyEvents[0].id);
    const [selectedEvent, setSelectedEvent] = useState<ChronologyEvent | null>(null);

    useEffect(() => {
        if (location.state && location.state.activeId) {
            setActiveEventId(location.state.activeId);
            // Optional: scroll to the event or just let the view update
        }
    }, [location.state]);

    const activeEvent = chronologyEvents.find(e => e.id === activeEventId) || chronologyEvents[0];

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
                        時空軌跡
                    </h1>
                    <p className="text-sepia-500 font-serif tracking-widest">
                        CHRONOLOGY OF ZHISHAN
                    </p>
                </header>

                {/* Timeline Axis */}
                <div className="mb-16 overflow-x-auto pb-4">
                    <div className="flex items-center gap-4 md:gap-8 relative min-w-max px-4">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-sepia-500/30 via-vermilion/50 to-sepia-500/30 -z-10" />

                        {chronologyEvents.map((event) => (
                            <button
                                key={event.id}
                                onClick={() => setActiveEventId(event.id)}
                                className={`relative flex flex-col items-center gap-2 group min-w-[120px] transition-all duration-300 ${activeEventId === event.id ? 'scale-110' : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                {/* Timeline Node */}
                                <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${activeEventId === event.id
                                    ? 'bg-vermilion border-vermilion shadow-lg shadow-vermilion/50'
                                    : 'bg-vintage-paper border-sepia-500 group-hover:border-vermilion group-hover:scale-110'
                                    }`}>
                                    {activeEventId === event.id && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-vermilion"
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Year Label */}
                                <span className={`font-serif text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${activeEventId === event.id ? 'text-vermilion font-bold' : 'text-ink-black'
                                    }`}>
                                    {event.year}
                                </span>

                                {/* Era Label (visible on hover or when active) */}
                                <span className={`font-serif text-xs text-sepia-500 whitespace-nowrap transition-opacity duration-300 ${activeEventId === event.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                    }`}>
                                    {event.era}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeEventId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-8 max-w-5xl mx-auto"
                    >
                        {/* Images Grid */}
                        {activeEvent.images.length > 0 && (
                            <div className={`grid gap-4 ${activeEvent.images.length === 1 ? 'grid-cols-1' :
                                activeEvent.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                }`}>
                                {activeEvent.images.map((image, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative group cursor-pointer overflow-hidden rounded-sm border-4 border-white/50 shadow-xl hover:shadow-2xl transition-shadow"
                                        onClick={() => setSelectedEvent(activeEvent)}
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.caption || activeEvent.title}
                                            className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                        {image.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                <p className="text-white text-xs md:text-sm font-serif text-center">
                                                    {image.caption}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="vintage-panel p-6 md:p-8 lg:p-10 rounded-sm">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-ink-black mb-2">
                                {activeEvent.title}
                            </h2>
                            <h3 className="text-lg md:text-xl lg:text-2xl font-display text-sepia-500 mb-6 md:mb-8 italic">
                                {activeEvent.subtitle}
                            </h3>
                            <div className="text-ink-black/80 leading-relaxed md:leading-loose font-serif text-base md:text-lg space-y-4 md:space-y-5 text-justify">
                                {activeEvent.description.map((paragraph, index) => (
                                    <p key={index} className="indent-8">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* View Details Button */}
                            {activeEvent.images.length > 0 && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => setSelectedEvent(activeEvent)}
                                        className="vintage-button px-6 py-3 bg-vermilion/10 hover:bg-vermilion/20 border-2 border-vermilion text-vermilion font-serif rounded-sm transition-all duration-300 hover:shadow-lg"
                                    >
                                        查看詳細圖片
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedEvent(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-vintage-paper rounded-sm max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="float-right text-3xl text-ink-black/50 hover:text-vermilion transition-colors"
                                >
                                    ×
                                </button>

                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink-black mb-4">
                                    {selectedEvent.title}
                                </h2>
                                <h3 className="text-xl md:text-2xl font-display text-sepia-500 mb-8 italic">
                                    {selectedEvent.subtitle}
                                </h3>

                                {/* Images in Detail View */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {selectedEvent.images.map((image, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <img
                                                src={image.url}
                                                alt={image.caption || selectedEvent.title}
                                                className="w-full h-auto rounded-sm border-4 border-white/50 shadow-xl"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                            {image.caption && (
                                                <p className="text-center text-sm text-sepia-500 font-serif italic">
                                                    {image.caption}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Full Text Content */}
                                <div className="text-ink-black/80 leading-relaxed md:leading-loose font-serif text-base md:text-lg space-y-5 text-justify">
                                    {selectedEvent.description.map((paragraph, index) => (
                                        <p key={index} className="indent-8">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Chronology;
