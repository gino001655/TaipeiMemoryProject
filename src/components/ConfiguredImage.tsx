import React from 'react';
import { ImageDisplayConfig } from '../types';

interface ConfiguredImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    // 圖片顯示配置：開發者可以在代碼中設定要顯示的區域
    displayConfig?: ImageDisplayConfig;
}

/**
 * 配置式圖片組件
 * 根據開發者提供的配置來顯示圖片的特定區域
 * 適合用於正方形圖片在長方形容器中的精確顯示
 * 
 * @param displayConfig.position - 圖片位置 (x, y 百分比，預設 50, 50 = 居中)
 * @param displayConfig.scale - 縮放比例 (預設 1.0 = 100%)
 * 
 * 範例：
 * // 顯示圖片左上角區域，放大150%
 * <ConfiguredImage 
 *   src="/images/photo.png" 
 *   displayConfig={{ position: { x: 25, y: 25 }, scale: 1.5 }}
 * />
 */
const ConfiguredImage: React.FC<ConfiguredImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    displayConfig
}) => {
    // 預設值：居中顯示，100% 縮放
    const position = displayConfig?.position || { x: 50, y: 50 };
    const scale = displayConfig?.scale ?? 1.0;

    return (
        <div className={`relative overflow-hidden ${containerClassName}`}>
            <div
                className={`w-full h-full ${className}`}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: `${scale * 100}%`,
                    backgroundPosition: `${position.x}% ${position.y}%`,
                    backgroundRepeat: 'no-repeat',
                    filter: 'sepia(0.2)'
                }}
                role="img"
                aria-label={alt}
            />
        </div>
    );
};

export default ConfiguredImage;



