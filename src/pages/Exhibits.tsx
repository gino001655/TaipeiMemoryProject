import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import StoneViewer from '../components/StoneViewer';

// 定義各種 section 類型
type SectionType = 'model' | 'cover' | 'sidecar' | 'fullscreen' | 'split' | 'cascade' | 'immersive' | 'quad-grid' | 'scrolling-text' | 'cta';

interface StorySection {
    id: string;
    type: SectionType;
    title?: string;
    subtitle?: string;
    text?: string;
    paragraphs?: string[]; // 用於多段落滾動敘事
    image?: string;
    images?: string[];
    position?: 'left' | 'right' | 'center';
    mapCoordinates?: { lat: number; lng: number };
    linkUrl?: string;
    linkText?: string;
    theme?: 'light' | 'dark';
    gridItems?: { title: string; image: string }[];
}

// 示範資料 - 用戶只需要提供這些資料
// ⚠️ 修改圖片路徑：請在下方 sections 數組中修改 image 和 images 屬性
// 圖片路徑格式：'/images/檔案名稱.副檔名'
// 例如：'/images/芝山岩全景.png'
const sections: StorySection[] = [
    // {
    //     id: 'stone-model',
    //     type: 'model',
    //     title: 'Stone Artifact',
    // },
    {
        id: 'cover',
        type: 'cover',
        title: '一座山能有\n什麼歷史？',
        subtitle: '',
        text: '我所知道的芝山巖\n以及你所不知道的芝山巖',
        image: '/images/芝山岩全景.png',  // ← 修改這裡的圖片路徑
        theme: 'dark'
    },
    {
        id: 'geo1',
        type: 'sidecar',
        title: '何來之山巖？',
        text: '',
        mapCoordinates: { lat: 25.1030552, lng: 121.5310745 },
        linkUrl: 'https://zh.wikipedia.org/zh-tw/%E8%8A%9D%E5%B1%B1%E5%B2%A9',
        linkText: '點我查看維基百科',
        position: 'left',
        theme: 'light'
    },
    {
        id: 'story-intro',
        type: 'scrolling-text',
        paragraphs: [
            "如果你回到 120 年前的日治時代，走上這座山，你是在參拜『神』。當時的人告訴你，這裡有六位日本老師被壞人殺害了，他們是教育的守護神，這裡是全台灣最神聖的教育聖地。",
            "但如果你把時光機快轉到戰後的國民政府時期，同一個地點，故事卻完全反轉了。當年的『壞人』變成了『抗日義民』，而原本的『神』變成了『侵略者』。",
            "殺人的，到底是暴徒還是英雄？\n被殺的，到底是烈士還是入侵者？"
        ],
        theme: 'dark'
    },
    {
        id: 'cta-section',
        type: 'cta'
    }
];

// Cover Section - 全螢幕封面
const CoverSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden">
            <motion.div
                style={{ y }}
                className="absolute inset-0"
            >
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${section.image})`,
                        filter: 'brightness(0.4) sepia(0.4)'
                    }}
                />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-4"
            >
                <div className="max-w-7xl relative flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-7xl md:text-9xl font-serif font-bold text-vintage-paper mb-12 md:mb-10 leading-normal [writing-mode:vertical-rl] whitespace-pre-wrap h-[50vh] md:h-[60vh] flex items-center"
                    >
                        {section.title}
                    </motion.h1>
                    {section.subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-xl md:text-3xl text-vintage-paper/90 font-display italic mb-8 md:mb-8"
                        >
                            {section.subtitle}
                        </motion.p>
                    )}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="text-lg md:text-2xl text-vintage-paper/80 font-serif leading-loose tracking-wide whitespace-pre-line"
                    >
                        {section.text}
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

// Sidecar Section - 側邊滾動敘事
const SidecarSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

    const isLeft = section.position === 'left';

    return (
        <div ref={ref} className="relative min-h-screen w-full flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
                {/* Image or Map */}
                <motion.div
                    style={{ y: imageY }}
                    className={`relative h-auto aspect-square lg:h-screen lg:aspect-auto overflow-hidden ${isLeft ? 'order-2 lg:order-1' : 'order-2'}`}
                >
                    {section.mapCoordinates ? (
                        <div className="w-full h-full px-8 py-8 md:p-12">
                            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border border-vintage-paper/20">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src={`https://maps.google.com/maps?q=${section.mapCoordinates.lat},${section.mapCoordinates.lng}&z=15&output=embed`}
                                    style={{
                                        filter: 'grayscale(0.2) contrast(1.1)',
                                        pointerEvents: 'auto'
                                    }}
                                    title={section.title}
                                ></iframe >
                            </div >
                        </div >
                    ) : (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${section.image})`,
                                filter: 'sepia(0.2)'
                            }}
                        />
                    )}
                </motion.div >

                {/* Text */}
                < motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className={`relative px-8 md:px-16 py-20 ${isLeft ? 'order-1 lg:order-2' : 'order-1'
                        } ${section.theme === 'dark' ? 'bg-ink-black text-vintage-paper' : 'bg-vintage-paper text-ink-black'
                        } ${section.id === 'geo1' ? 'text-right flex flex-col items-end mr-[10px]' : ''}`}
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        {section.title}
                    </h2>
                    {
                        section.text && (
                            <p className="text-lg md:text-xl font-serif leading-loose mb-8">
                                {section.text}
                            </p>
                        )
                    }
                    {
                        section.linkUrl && (
                            <a
                                href={section.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-block mt-8 px-8 py-3 border-2 font-serif text-lg transition-all duration-300 ${section.theme === 'dark'
                                    ? 'border-vintage-paper text-vintage-paper hover:bg-vintage-paper hover:text-ink-black'
                                    : 'border-ink-black text-ink-black hover:bg-ink-black hover:text-vintage-paper'
                                    }`}
                            >
                                {section.linkText || 'Learn More'}
                            </a>
                        )
                    }
                </motion.div >
            </div >
        </div >
    );
};

// Quad Grid Section - 歷史分期入口 (CTA)
// @ts-ignore - Component defined for future use
const QuadGridSection: React.FC<{ section: StorySection }> = ({ section }) => {
    return (
        <div className="relative w-full h-[60vh] flex items-center justify-center bg-vintage-paper">
            <div className="text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif font-bold text-ink-black mb-12"
                >
                    {section.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        to="/chronology"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-vermilion text-vintage-paper rounded-full text-xl font-serif font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl group"
                    >
                        <span>點我進入歷史迴廊</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-ink-black/60 font-serif text-lg"
                >
                    探索史前、清領、日治與戰後的時空變遷
                </motion.p>
            </div>
        </div>
    );
};

// Fullscreen Section - 全螢幕文字覆蓋
// @ts-ignore - Component defined for future use
const FullscreenSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden">
            <motion.div
                style={{ scale }}
                className="absolute inset-0"
            >
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${section.image})`,
                        filter: 'brightness(0.3) sepia(0.5)'
                    }}
                />
            </motion.div>

            <motion.div
                style={{ y: textY }}
                className="absolute inset-0 flex items-center justify-center text-center px-4"
            >
                <div className="max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-vintage-paper mb-8">
                        {section.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-vintage-paper/90 font-serif leading-loose">
                        {section.text}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

// Cascade Section - 瀑布式圖片
// @ts-ignore - Component defined for future use
const CascadeSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={ref} className="relative min-h-screen w-full py-20 bg-vintage-paper">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-serif font-bold text-ink-black mb-8 text-center"
                >
                    {section.title}
                </motion.h2>

                <div className="space-y-8">
                    {section.images?.map((img, i) => {
                        const imgY = useTransform(scrollYProgress, [0, 1], [100 * (i + 1), -100 * (i + 1)]);

                        return (
                            <motion.div
                                key={i}
                                style={{ y: imgY }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className={`relative h-96 overflow-hidden rounded-sm shadow-2xl ${i % 2 === 0 ? 'ml-0 mr-auto w-full lg:w-4/5' : 'mr-0 ml-auto w-full lg:w-4/5'
                                    }`}
                            >
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${img})`,
                                        filter: 'sepia(0.3)'
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl text-ink-black/80 font-serif text-center mt-12 leading-loose"
                >
                    {section.text}
                </motion.p>
            </div>
        </div>
    );
};

// Immersive Section - 沉浸式體驗
// @ts-ignore - Component defined for future use
const ImmersiveSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const springY = useSpring(backgroundY, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className="relative h-[200vh] w-full">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div
                    style={{ y: springY }}
                    className="absolute inset-0 will-change-transform"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${section.image})`,
                            filter: 'brightness(0.4) contrast(1.1) sepia(0.3)'
                        }}
                    />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
                            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])
                        }}
                        className="text-center px-4 max-w-4xl"
                    >
                        <h2 className="text-5xl md:text-8xl font-serif font-bold text-vintage-paper mb-8">
                            {section.title}
                        </h2>
                        <p className="text-xl md:text-3xl text-vintage-paper/90 font-serif leading-loose">
                            {section.text}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Split Section - 左右分割
// @ts-ignore - Component defined for future use
const SplitSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 0]);
    const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

    return (
        <div ref={ref} className="relative min-h-screen w-full flex items-stretch">
            <motion.div
                style={{ x: leftX }}
                className="w-1/2 relative overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${section.image})`,
                        filter: 'sepia(0.3)'
                    }}
                />
            </motion.div>

            <motion.div
                style={{ x: rightX }}
                className="w-1/2 bg-ink-black text-vintage-paper flex items-center justify-center p-12"
            >
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        {section.title}
                    </h2>
                    <p className="text-lg md:text-xl font-serif leading-loose">
                        {section.text}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

// Scrolling Text Section - 滾動敘事
const ScrollingTextSection: React.FC<{ section: StorySection }> = ({ section }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const p1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const p1Y = useTransform(scrollYProgress, [0.05, 0.15, 0.3], [30, 0, -30]);

    const p2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
    const p2Y = useTransform(scrollYProgress, [0.35, 0.45, 0.6], [30, 0, -30]);

    const p3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
    const p3Y = useTransform(scrollYProgress, [0.65, 0.75, 1], [30, 0, 0]); // 最後一段停留久一點，不往上飄走

    return (
        <div ref={ref} className="relative h-[400vh] w-full bg-ink-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Background decoration or texture */}
                <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-10" />

                <div className="w-full h-full max-w-xl px-6 relative z-10 text-center">
                    {section.paragraphs && section.paragraphs[0] && (
                        <motion.p
                            style={{ opacity: p1Opacity, y: p1Y }}
                            className="absolute top-[30%] left-0 right-0 -translate-y-1/2 text-2xl md:text-3xl text-vintage-paper font-serif leading-loose px-6"
                        >
                            {section.paragraphs[0]}
                        </motion.p>
                    )}

                    {section.paragraphs && section.paragraphs[1] && (
                        <motion.p
                            style={{ opacity: p2Opacity, y: p2Y }}
                            className="absolute top-[30%] left-0 right-0 -translate-y-1/2 text-2xl md:text-3xl text-vintage-paper font-serif leading-loose px-6"
                        >
                            {section.paragraphs[1]}
                        </motion.p>
                    )}

                    {section.paragraphs && section.paragraphs[2] && (
                        <motion.div
                            style={{ opacity: p3Opacity, y: p3Y }}
                            className="absolute top-[30%] left-0 right-0 -translate-y-1/2 px-6"
                        >
                            <p className="text-3xl md:text-5xl text-vermilion font-serif font-bold leading-normal whitespace-pre-line">
                                {section.paragraphs[2]}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

// CTA Section - 獨立按鈕區塊
const CTASection: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div className="relative w-full h-[50vh] bg-ink-black flex items-center justify-center -mt-[1px]">
            {/* Background decoration to match previous section */}
            <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <button
                    onClick={onClick}
                    className="inline-flex items-center gap-3 px-12 py-5 bg-vermilion text-vintage-paper rounded-full text-2xl font-serif font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl group"
                >
                    <span>點我進入歷史迴廊</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
};

// 首頁區塊 - 簡潔風格
const ExhibitsHome: React.FC = () => {
    return (
        <div className="relative w-full min-h-screen bg-vintage-paper flex items-center justify-center px-6 md:px-12 py-20">
            {/* 背景裝飾 */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-grid-pattern" />
            </div>

            {/* 主內容 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto text-center"
            >
                {/* 標題區塊 */}
                <div className="mb-8 inline-block">
                    <span className="px-4 py-1 border-y-2 border-ink-black text-ink-black font-serif tracking-[0.2em] text-sm uppercase">
                        Thematic Exhibition
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink-black mb-6 tracking-tight leading-tight">
                    專題<span className="text-vermilion">展間</span>
                </h1>

                <p className="text-xl md:text-2xl text-ink-black/70 font-serif tracking-widest mb-12">
                    THEMATIC EXHIBITS
                </p>

                {/* 描述文字 */}
                <div className="max-w-2xl mx-auto mb-16">
                    <p className="text-lg md:text-xl text-ink-black/60 font-serif leading-loose mb-6">
                        瀏覽學生團隊的研究成果，深入了解芝山岩的多元面貌。
                    </p>
                    <p className="text-base md:text-lg text-ink-black/50 font-serif leading-relaxed">
                        每一段歷史都有不同的詮釋角度，每一個故事都值得被聽見。
                    </p>
                </div>

                {/* 裝飾線 */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="h-px w-20 bg-sepia-500/30" />
                    <div className="w-2 h-2 bg-vermilion rounded-full" />
                    <div className="h-px w-20 bg-sepia-500/30" />
                </div>

                {/* 提示文字 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-sm text-sepia-500 font-serif tracking-widest uppercase"
                >
                    向下滾動開始探索
                </motion.div>
            </motion.div>
        </div>
    );
};

// Main Component
const Exhibits: React.FC = () => {
    const navigate = useNavigate();
    const [showAd, setShowAd] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [canClose, setCanClose] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 倒數計時邏輯
    useEffect(() => {
        if (showAd && !canClose) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanClose(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showAd, canClose]);

    const handleAdClose = () => {
        if (canClose) {
            setShowAd(false);
            setCanClose(false);
            setCountdown(5);
            navigate('/history-corridor');
        }
    };

    // 當廣告顯示時重置倒數
    useEffect(() => {
        if (showAd) {
            setCountdown(5);
            setCanClose(false);
        }
    }, [showAd]);

    const renderSection = (section: StorySection) => {
        switch (section.type) {
            case 'model':
                return <StoneViewer key={section.id} />;
            case 'cover':
                return <CoverSection key={section.id} section={section} />;
            case 'sidecar':
                return <SidecarSection key={section.id} section={section} />;
            case 'scrolling-text':
                return <ScrollingTextSection key={section.id} section={section} />;
            case 'cta':
                return <CTASection key={section.id} onClick={() => setShowAd(true)} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-vintage-paper">
            {/* 首頁區塊 */}
            <ExhibitsHome />
            
            {/* 原有內容 */}
            {sections.map(renderSection)}

            {/* Ad Modal */}
            <AnimatePresence>
                {showAd && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={canClose ? handleAdClose : undefined}
                            className={`absolute inset-0 bg-ink-black/60 backdrop-blur-sm ${canClose ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden z-10 border-4 border-gray-200"
                        >
                            {/* Close Button with Countdown */}
                            <button
                                onClick={handleAdClose}
                                disabled={!canClose}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-all z-20 ${
                                    canClose 
                                        ? 'bg-black/50 hover:bg-black/70 cursor-pointer' 
                                        : 'bg-black/70 cursor-not-allowed opacity-60'
                                }`}
                                title={canClose ? '關閉' : `請等待 ${countdown} 秒`}
                            >
                                {canClose ? (
                                    <X className="w-6 h-6 text-white" />
                                ) : (
                                    <span className="text-white text-sm font-bold w-6 h-6 flex items-center justify-center">
                                        {countdown}
                                    </span>
                                )}
                            </button>

                            {/* Image Section */}
                            <div className="w-full h-64 overflow-hidden relative">
                                <img
                                    src="/images/course_ad.png"
                                    alt="Course Advertisement"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-6 text-white font-sans font-bold tracking-widest text-shadow">
                                    特別推薦
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="p-8 text-center bg-white">
                                <h3 className="text-xl md:text-2xl font-sans font-bold text-gray-900 mb-4 leading-relaxed">
                                    想做出這樣的互動式網頁嗎？
                                </h3>
                                <p className="text-gray-700 font-sans leading-loose text-lg">
                                    歡迎來修黃鐘揚教授的
                                    <br />
                                    <span className="text-blue-600 font-bold text-2xl mx-1 block my-2">
                                        「網路服務程式設計」
                                    </span>
                                    喔！
                                </p>
                                <p className="text-gray-400 text-sm font-sans mt-4">
                                    （但教授說以後不開了嗚嗚）
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Exhibits;
