import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../components/ImageSlider';

const Chronology: React.FC = () => {
    const [activeEra, setActiveEra] = useState(0);

    const eras = [
        {
            year: '1895',
            title: '政權轉移下的台灣',
            subtitle: '芝山岩事件',
            content: [
                '1895年5月清廷與日本簽訂馬關條約，正式將臺灣、澎湖等一眾小島割讓給日本。然而，在日本接收臺灣之初，遭遇到許多臺灣人的反抗，其中，以漢人的反抗佔最大宗，使得日人無法順利接收臺灣，為因應此情形，跟隨著臺灣總督府樺山資紀一起來臺的學務部長伊澤修二，決定在臺實施同化教育，將台灣人變為日本國民，而在同化政策之中，日語教育便是其中最重要的一環。然而當時台北城內接收狀況混亂，許多大大小小的抗日行動同時進行，紳士子弟也都外逃至廈門等地，使得伊澤無法在台北招生，而士林雖較台北而言較爲鄉下，但民心較為穩定，再加上伊澤修二聽聞芝山巖附近曾實施過教育活動，因此，伊澤修二希望將學務部轉移至芝山巖的惠濟宮旁開設芝山巖學堂，並試圖將此地打造成在臺日語教育基地。儘管當時的通譯人員吧連德對此事持反對意見，認為此地仍不夠安全，但伊澤修二卻表示「若我可惜自命，這次不會來台，奉上聖上大心而做到教化之任，需要固定地擁有強力的覺悟，請勿擔心」，並最終取得總督和民政局長同意，正式將學務部遷移至芝山巖。',
                '芝山巖的日語教育進行得十分順利，伊澤修二也因此感受到日語教育推廣至全台之必要，因此，在1895年10月28日，伊澤修二決定返日找尋適當的教師來台並順便回日本觀光，僅留下楫取、關口、中島、井原、桂、平井六位六氏先生在芝山巖學堂。然而，再在同年的12月31日抗日民眾半夜在觀音山以烽火為暗號，深坑地區的陳秋菊和平鎮地區的胡阿錦率領數百民不下襲擊台北城南門外，隔天抗日人數持續增加，同時，宜蘭、板橋、松山、金山、士林等各地的抗日份子也陸續行動，使得北部地區陷入一片混亂之中。曾為芝山巖學堂的學生朱俊英看見觀音山上煙火四起，於是提醒士林的民眾應盡快撤離避難，然而六氏先生之一的楫取道明卻表示「君言如是。然吾輩為教育文官。雖武事不與。奈其春秋大意。何其可乎之哉。當此危難之秋。亦知文力何能為敵。若避則失臣子道。吾輩之命。惟天是听。總盡吾輩之職務。與此職務共存亡而已。」因此，婉拒了朱俊英撤離的建議，轉而返回芝山巖鎮守學務部，然而在1896年1月1日上午九點左右，通譯吧連德表達情況危急，在經過一連串的商討之下，六氏先生決議下山，但卻在將近正午時，在下山途中遭抗日民眾殺害，《臺灣日日新報》在1921年3月24日的報導中將此事件稱為「芝山巖事件」。'
            ]
        },
        {
            year: '1930',
            title: '從石碑到神社',
            subtitle: '芝山巖慶典的變革',
            content: [
                '芝山巖事件發生之後，陸陸續續展開了一連串的祭祀活動，在事件發生的半週年（1896年7月1日），臺灣總督府將六氏先生的遺體移至芝山巖並立了一個石碑，並由學務部主辦祭典，此外，當時的民政局長水野遵、軍務局長立見尚和學務部長伊澤修二均為六氏先生撰寫了祭文，祭文中僅單純對六氏先生的遭遇表示可憐、同情，並無強調六氏先生的犧牲精神，在內容上對於後代的勉勵較大。',
                '然而，此一「精神」在一週年祭祀時有了極大的轉變。在一週年祭祀時，學務部長伊澤修二於其訓示中強調，六氏先生並不是單純的遭難，而是因為懷抱著偉大的教育熱情，因此才不顧自我安危，沒有選擇先行撤離，而是選擇試圖說服抗日份子，並最終不幸殉難。此外，一週年祭典的主祭人員也從學務部轉為以柯秋捷為中心的學堂畢業生，參與祭祀的人員也從先前的在台日人教育者，擴大至芝山巖學堂的學生，甚至台北各地的士紳也會參加。',
                '1898年，伊澤修二和臺灣總督乃木希典上書拓殖務大臣和陸軍大臣，以六氏先生是因為試圖規勸抗日份子，但規勸失敗而「殉死」為理由，請求將六氏先生與靖國神社合祀，此一行動加深了六氏先生是「殉死」而非「遭難」死亡的印象，並試圖將六氏先生塑造為殉國之神明。',
                '往後數年每年均有對六氏先生的祭典，並由台灣教育會接手，承繼由伊澤修二開啟的造神運動。但到了1905年的十週年祭典時，祭典方式產生了巨大的變化，由於1903年台灣教育會總會的〈亡台灣教育家招魂祭典開設建議〉提案，十週年祭典新設立的石碑以紀念過去十年內過世的教育者，並將芝山巖祭典的祭祀對象從六氏先生擴大為所有在臺過世的教育者，並安排臺灣總督府官員、各校職員以及國語學校、附屬學校、公學校等學生申請參拜，試圖擴大祭死者的規模。而在後來的二十週年祭，臺灣教育會廢除祭典中的佛教元素，將六氏先生和其他殉死的教育者變為台灣的神明，並逐漸增加神道教的風格在芝山巖內，並為後續芝山巖社的建立埋下伏筆。',
                '1930年，芝山巖社正式成立，雖然芝山巖社並沒有正式受到總督府的核可，所以不算是正式的神社或社，但民眾參拜的規模卻不斷增加，芝山巖也被指定為史跡和天然紀念物，因此，除了參拜之外，芝山巖也常被當作校外活動、趣味登山、徒步旅行的目的地。',
                '三十週年祭典時，台灣教育會邀請當時的臺灣總督伊澤喜多男（伊澤修二之弟）參與祭典，並希望以此達到鼓勵民眾追掉六氏先生和其他亡教育者的犧牲，試圖透過芝山巖事件來強化殖民政府進行近代教育的正當性。而此時的新媒體報導也開始讓芝山巖的形象發生變化，1936年《嗚呼芝山巖》電影問世，故事就採取芝山巖精神，講述日人教師為說服不良少年而意外受傷，並最終讓少年在教導下重生的故事，雖然原先六氏先生的故事已不再被強調，但以此為背景的芝山巖精神卻不斷被強化，著重強調「殉國精神」和「忠君愛國精神」。',
                '而後的四十週年祭典和五十週年祭典，雖不如先前的週年祭典盛大，部分資料也亡佚，但可以肯定的是芝山巖精神內的忠君愛國精神，在皇民化運動下逐漸加深，圍繞六氏先生和其他亡教育者展開的造神運動卻從未停止，強化臺人對日本的國族認同。',
                '從最初單純追悼亡者的石碑，到逐步融入神道風格，最終形成芝山巖社，芝山巖的祭典並非單純的宗教或紀念活動，而是伴隨著殖民政府的統治策略不斷被重新塑造的政治儀式。從內地延長主義強調的「殉教的精神」，再到皇民化時期的「忠君愛國精神」和「殉國精神」，芝山巖精神的內涵皆因政治需求而反覆調整並被強化。最終，芝山巖不僅成為教育者的追思場所，更成為殖民政府塑造忠誠、建構皇國臣民認同的重要象徵，其祭典與空間意義也在不斷的詮釋與再造中走向高度政治化。'
            ]
        },
        {
            year: '1958',
            title: '中華民國視角下的芝山巖',
            subtitle: '戰後敘事轉變',
            content: [
                '1945年8月15日昭和天皇的玉音放送傳遍台灣的大街小巷，宣告又一個政權在台灣統治的終結，10月25日中華民國正式接收台灣，帶來了全新的國族認同和象徵符號，芝山巖的故事也從此有了全新的敘事視角。',
                '1958年冬，國民政府在芝山巖新設立了芝山岩事件碑記，碑文的主角不再是六氏先生和其他亡教育者，而是當時殺害六氏先生的抗日民眾。碑文中，原先冥頑不靈的土匪，搖身一變成了凜於春秋之義、不甘受日本同化的義民，表彰的對象也從被害者（六氏先生）轉變為加害者（抗日民眾）。這樣的敘事轉變，反映出國民政府在戰後重建台灣集體記憶時的政治需求──必須以「反日」與「忠義抗暴」作為核心價值，重新建構台灣人的國族認同。於是，芝山巖事件的歷史意義被重新定位，從日本政府所塑造的「教育殉職」改寫為「反抗外侮」的義舉，成為戰後國家敘事與教育宣傳的重要材料。',
                '這樣的轉變呈現了戰後國民政府對於日人留下的空間的再詮釋。國民政府在接收台灣後與地方社會仍存在語言、制度與文化上的隔閡，因此，透過重新解讀芝山巖事件、強調台灣人民「向來具有抗日傳統」，不僅能與過往的日本殖民記憶切割，也使台灣人更容易被納入新政權所期待的「中華民族共同體」。因此，芝山巖的歷史成為一種象徵性的資源，被用來形塑國家認同與政治合法性。'
            ]
        },
        {
            year: '現代',
            title: '小結',
            subtitle: '記憶場域的堆疊',
            content: [
                '芝山巖事件發生至今歷經多種不同的敘事轉換，從六氏先生的殉教殉國到義民抗日，芝山巖成為一座載負多重記憶的空間，不同政權、不同世代都在此投射自己的歷史理解，使這段事件不只是地方史的一部分，更是台灣歷史中被持續重寫、爭奪與再生產的記憶場域。'
            ]
        }
    ];

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

                {/* Timeline Navigation */}
                <div className="flex justify-center mb-16 overflow-x-auto pb-4">
                    <div className="flex items-center gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-sepia-500/30 -z-10" />

                        {eras.map((era, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveEra(index)}
                                className={`relative flex flex-col items-center gap-2 group min-w-[100px] transition-all duration-300 ${activeEra === index ? 'scale-110' : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${activeEra === index
                                    ? 'bg-vermilion border-vermilion'
                                    : 'bg-vintage-paper border-sepia-500 group-hover:border-vermilion'
                                    }`} />
                                <span className={`font-serif text-sm whitespace-nowrap ${activeEra === index ? 'text-vermilion font-bold' : 'text-ink-black'
                                    }`}>
                                    {era.year}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                    {/* Image Slider */}
                    <motion.div
                        key={`img-${activeEra}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-sm overflow-hidden shadow-xl border-4 border-white/50"
                    >
                        <ImageSlider
                            beforeImage="/images/chronology-old.jpg"
                            afterImage="/images/chronology-new.jpg"
                            beforeLabel="Historical"
                            afterLabel="Modern"
                        />
                        <p className="text-center text-xs text-sepia-500 mt-2 font-serif italic">
                            * 示意圖：拖曳滑塊比較今昔差異 (Image Slider Demo)
                        </p>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        key={`text-${activeEra}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="vintage-panel p-6 md:p-8 lg:p-10 rounded-sm"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-ink-black mb-2">
                            {eras[activeEra].title}
                        </h2>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-display text-sepia-500 mb-6 md:mb-8 italic">
                            {eras[activeEra].subtitle}
                        </h3>
                        <div className="text-ink-black/80 leading-relaxed md:leading-loose font-serif text-base md:text-lg space-y-4 md:space-y-5 text-justify">
                            {eras[activeEra].content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Chronology;
