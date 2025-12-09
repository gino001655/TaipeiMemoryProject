import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// 定義各種 section 類型
type SectionType = 'cover' | 'sidecar' | 'fullscreen' | 'split' | 'cascade' | 'immersive';

interface StorySection {
    id: string;
    type: SectionType;
    title?: string;
    subtitle?: string;
    text?: string;
    image?: string;
    images?: string[];
    position?: 'left' | 'right' | 'center';
    theme?: 'light' | 'dark';
}

// 示範資料 - 用戶只需要提供這些資料
// ⚠️ 修改圖片路徑：請在下方 sections 數組中修改 image 和 images 屬性
// 圖片路徑格式：'/images/檔案名稱.副檔名'
// 例如：'/images/芝山岩全景.png'
const sections: StorySection[] = [
    {
        id: 'cover',
        type: 'cover',
        title: '芝山巖的千年記憶',
        subtitle: 'A Thousand Years of Zhishan Rock',
        text: '從遠古海洋到今日山丘，每一層土壤都訴說著不同的故事',
        image: '/images/芝山岩全景.png',  // ← 修改這裡的圖片路徑
        theme: 'dark'
    },
    {
        id: 'geo1',
        type: 'sidecar',
        title: '地質演變',
        text: '兩千萬年前，這裡曾是一片汪洋。隨著地殼運動和板塊擠壓，海底的沉積岩層逐漸隆起，形成了今日我們所見的芝山巖。砂岩和頁岩的交錯層理，記錄著這片土地的滄海桑田。',
        image: '/images/芝山岩.png',  // ← 修改這裡的圖片路徑
        position: 'left',
        theme: 'light'
    },
    {
        id: 'geo2',
        type: 'fullscreen',
        title: '化石的見證',
        text: '山體上發現的海洋生物化石，向我們訴說著遠古時代的故事。每一塊岩石都承載著千萬年的歷史記憶。',
        image: '/images/芝山岩神社.png',  // ← 修改這裡的圖片路徑
        theme: 'dark'
    },
    {
        id: 'arch1',
        type: 'sidecar',
        title: '史前文化遺跡',
        text: '1896年，考古學家在芝山巖發現了豐富的史前遺址。出土的陶器、石器與貝塚，證明了早在數千年前就有人類在此生活。圓山文化層、芝山巖文化層，每一層都代表著不同時期的人類活動。',
        image: '/images/芝山岩神社2.png',  // ← 修改這裡的圖片路徑
        position: 'right',
        theme: 'light'
    },
    {
        id: 'arch2',
        type: 'cascade',
        title: '文物探索',
        images: [  // ← 修改這裡的圖片路徑（多張圖片）
            '/images/芝山合約碑記.JPG',
            '/images/惠濟宮.jpg',
            '/images/芝山岩隘門.jpg'
        ],
        text: '從打製石器到磨製石器，從素面陶器到彩陶，這些文物讓我們得以窺見史前先民的生活樣貌。',
        theme: 'light'
    },
    {
        id: 'history1',
        type: 'sidecar',
        title: '清代軍事防禦',
        text: '清代時期，芝山巖因其地勢險要，成為台北盆地重要的軍事據點。隘門、砲台的設置，展現了當時精密的防禦布局。站在制高點俯瞰台北盆地，你能理解為何這裡會成為兵家必爭之地。',
        image: '/images/芝山岩隘門.jpg',  // ← 修改這裡的圖片路徑
        position: 'left',
        theme: 'light'
    },
    {
        id: 'edu1',
        type: 'immersive',
        title: '日治教育聖地',
        text: '1895年，日本在芝山巖設立了台灣第一所國語傳習所。六氏先生在此奉獻教育，最終為此犧牲生命。芝山巖神社、學務官僚遭難之碑，這些遺跡見證了那段複雜的歷史。',
        image: '/images/校外教學-台灣神社參拜.png',  // ← 修改這裡的圖片路徑
        theme: 'dark'
    },
    {
        id: 'present',
        type: 'split',
        title: '今日芝山巖',
        text: '如今，芝山巖文化史蹟公園成為台北市民休閒遊憩的好去處。生態步道、文化遺址、歷史建築，在這裡和諧共存。每個週末，都有家庭帶著孩子來這裡親近自然、認識歷史。',
        image: '/images/百二崁.jpg',  // ← 修改這裡的圖片路徑
        theme: 'light'
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
                className="absolute inset-0 flex items-center justify-center text-center px-4"
            >
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-6xl md:text-8xl font-serif font-bold text-vintage-paper mb-6"
                    >
                        {section.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-2xl md:text-3xl text-vintage-paper/90 font-display italic mb-8"
                    >
                        {section.subtitle}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="text-xl md:text-2xl text-vintage-paper/80 font-serif leading-relaxed"
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
                {/* Image */}
                <motion.div
                    style={{ y: imageY }}
                    className={`relative h-screen overflow-hidden ${isLeft ? 'order-1' : 'order-1 lg:order-2'}`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${section.image})`,
                            filter: 'sepia(0.2)'
                        }}
                    />
                </motion.div>

                {/* Text */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className={`relative px-8 md:px-16 py-20 ${isLeft ? 'order-2' : 'order-2 lg:order-1'} ${section.theme === 'dark' ? 'bg-ink-black text-vintage-paper' : 'bg-vintage-paper text-ink-black'
                        }`}
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        {section.title}
                    </h2>
                    <p className="text-lg md:text-xl font-serif leading-loose">
                        {section.text}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

// Fullscreen Section - 全螢幕文字覆蓋
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

// Main Component
const Exhibits: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const renderSection = (section: StorySection) => {
        switch (section.type) {
            case 'cover':
                return <CoverSection key={section.id} section={section} />;
            case 'sidecar':
                return <SidecarSection key={section.id} section={section} />;
            case 'fullscreen':
                return <FullscreenSection key={section.id} section={section} />;
            case 'cascade':
                return <CascadeSection key={section.id} section={section} />;
            case 'immersive':
                return <ImmersiveSection key={section.id} section={section} />;
            case 'split':
                return <SplitSection key={section.id} section={section} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-vintage-paper overflow-x-hidden">
            {sections.map(renderSection)}
        </div>
    );
};

export default Exhibits;
