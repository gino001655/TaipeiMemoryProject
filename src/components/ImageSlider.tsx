import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface ImageSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After'
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

        const position = ((clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] overflow-hidden rounded-2xl cursor-ew-resize select-none group border border-glass-border"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <ImageWithFallback
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-display tracking-wider text-white border border-white/10">
                {afterLabel}
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <ImageWithFallback
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current?.offsetWidth }}
                />
                <div className="absolute top-4 left-4 bg-amber-orange/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-display tracking-wider text-black font-bold border border-amber-orange/50">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                    <MoveHorizontal className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
