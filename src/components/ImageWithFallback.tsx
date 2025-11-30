import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    alt,
    className,
    fallbackSrc = '/images/nature.jpg', // Default fallback
    ...props
}) => {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center bg-gray-800 text-gray-500 ${className}`}>
                <ImageOff className="w-8 h-8 mb-2" />
                <span className="text-xs text-center px-2">Image unavailable</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
};

export default ImageWithFallback;
