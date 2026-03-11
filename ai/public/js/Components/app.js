function SidaeAIRecommender() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [step, setStep] = useState(0);
    const [userProfile, setUserProfile] = useState({
        background: "",
        duration: "",
        employment: "",
        dailyHours: 3,
        interests: [],
        goal: "",
        budget: ""
    });
    const [recommendations, setRecommendations] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [compareList, setCompareList] = useState([]);
    const [showCompare, setShowCompare] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAllCerts, setShowAllCerts] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [aiAnalysisLines, setAiAnalysisLines] = useState([]);
    const [showAiAnalysis, setShowAiAnalysis] = useState(false);
    const [isFromAllCerts, setIsFromAllCerts] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showCsmodal, setShowCsmodal] = useState(false);
    const [visibleRecommendations, setVisibleRecommendations] = useState([]);
    const [showproduct, setShowproduct] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState(null);
    const [productList, setProductList] = useState([]);
    const [cateName , setCateName] = useState(null);

    const totalSteps = 6;
    const interestOptions = [
        {value: "회계/세무", icon: "📊"}, {value: "법률", icon: "⚖️"},
        {value: "부동산", icon: "🏠"}, {value: "IT/데이터", icon: "💻"},
        {value: "안전/설비", icon: "🔧"}, {value: "금융/투자", icon: "💰"},
        {value: "물류/무역", icon: "🚢"}, {value: "상담/복지", icon: "💝"}
    ];

    const categories = ["전체", ...Object.keys(categoryConfig)];

    const resetApp = () => {
        setStep(0);
        setShowResults(false);
        setSelectedCert(null);
        setShowAllCerts(false);
        setIsFromAllCerts(false);
        setUserProfile({
            background: "",
            duration: "",
            employment: "",
            dailyHours: 3,
            interests: [],
            goal: "",
            budget: ""
        });
        setRecommendations([]);
        setCompareList([]);
    };

    // 데이터 로딩
    useEffect(() => {
        loadInitialData({ setDataLoaded });
    }, []);

    // 추천 결과 순차적으로 표시하는 효과
    useEffect(() => {
        if (showResults && recommendations.length > 0 && isAnalyzing && visibleRecommendations.length === 0) {
            // 5초 후 순차적으로 표시 시작 (기존 3초 + 2초)
            relListEffect(setVisibleRecommendations , recommendations , visibleRecommendations , setIsAnalyzing);
        }
    }, [showResults, recommendations, isAnalyzing, visibleRecommendations.length]);

    const handleNext = () => {
        handleNextLogic({
            step,
            totalSteps,
            userProfile,
            setStep,
            setRecommendations,
            setShowResults,
            setIsAnalyzing,
            setVisibleRecommendations
        });
    };

    const handleBack = () => {
        handleBackLogic({
            showResults,
            step,
            setShowResults,
            setSelectedCert,
            setIsAnalyzing,
            setVisibleRecommendations,
            setStep
        });
    };

    const handleReset = () => {
        handleResetLogic({
            setStep,
            setUserProfile,
            setRecommendations,
            setShowResults,
            setSelectedCert,
            setCompareList,
            setIsAnalyzing,
            setVisibleRecommendations
        });
    };

    const filteredCerts = useFilteredCerts(
        showAllCerts,
        searchQuery,
        selectedCategory,
        certificationsDB
    );

    const toggleInterest = (interest) => {
        toggleInterestLogic(interest, setUserProfile);
    };

    const toggleCompare = (cert) => {
        toggleCompareLogic(cert, setCompareList);
    };
    const isStepValid = () => isStepValidLogic(step, userProfile);

    // selectedCert가 변경될 때 AI 분석 텍스트 생성
    useEffect(() => {
        if (selectedCert) {
            setShowAiAnalysis(false);
            setAiAnalysisLines([]);
            // 전체 자격증 검색에서 온 경우 AI 분석 제외
            if (isFromAllCerts) {
                return;
            }
            // 약간의 딜레이 후 타이핑 시작
            const timer = setTimeout(() => {
                const lines = generateAIAnalysisText(selectedCert, userProfile, false);
                setAiAnalysisLines(lines);
                setShowAiAnalysis(true);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setShowAiAnalysis(false);
            setAiAnalysisLines([]);
        }
    }, [selectedCert, isFromAllCerts]);

    // 로딩 중 표시
    if (!dataLoaded) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl font-semibold text-gray-700">데이터 로딩 중...</p>
                    <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
                </div>
            </div>
        );
    }
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-50 via-white to-rose-50"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-violet-200/40 to-indigo-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-200/40 to-rose-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
    </div>


    return (
        <div className="min-h-screen">
            <div className="relative max-w-5xl mx-auto px-4 py-6">
                {/* 헤더 */}
                <Header
                    onReset={resetApp}
                    onShowAll={() => {
                        setShowAllCerts(true);
                        setShowResults(false);
                        setSelectedCert(null);
                    }}
                    onShowCompare={() => setShowCompare(true)}
                    compareCount={compareList.length}
                />

                {/* 상담 신청 모달*/}
                {showCsmodal && (
                    <Modal_cscenter
                        showCsmodal={showCsmodal}
                        setShowCsmodal={setShowCsmodal}
                        selectedCatId={selectedCatId}
                    />
                )}


                {/* 자격증 검색 */}
                {showAllCerts && !selectedCert && (
                <LecSearch
                    showAllCerts={showAllCerts}
                    selectedCert={selectedCert}
                    setShowAllCerts={setShowAllCerts}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                    setActiveTab={setActiveTab}
                    setIsFromAllCerts={setIsFromAllCerts}
                    difficultyConfig={difficultyConfig}
                    filteredCerts={filteredCerts}
                    setSelectedCert={setSelectedCert}
                />
                )}

                {/* 자격증 비교 모달 */}
                {showCompare &&(
                <Modal_compare
                    setShowCompare ={setShowCompare}
                    compareList = {compareList}
                    categoryConfig={categoryConfig}
                    difficultyConfig={difficultyConfig}
                    setCompareList = {setCompareList}
                />
                )}

                {/* 상품리스트 모달 */}
                {showproduct &&(
                <Modal_product
                    showproduct ={showproduct}
                    setShowproduct ={setShowproduct}
                    selectedCatId = {selectedCatId}
                    setProductList = {setProductList}
                    cateName={cateName}
                />
                )}

                {/* 메인 카드 */}
                {!showAllCerts && (
                <AiLecRecomend
                    showAllCerts={showAllCerts}
                    showResults ={showResults}
                    selectedCert={selectedCert}
                    totalSteps ={totalSteps}
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    step={step}
                    interestOptions={interestOptions}
                    toggleInterest={toggleInterest}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isStepValid={isStepValid}
                    setSelectedCert={setSelectedCert}
                    isFromAllCerts={isFromAllCerts}
                    setIsFromAllCerts={setIsFromAllCerts}
                    setShowAllCerts={setShowAllCerts}
                    categoryConfig={categoryConfig}
                    difficultyConfig={difficultyConfig}
                    activeTab={activeTab}
                    isAnalyzing={isAnalyzing}
                    recommendations={recommendations}
                    visibleRecommendations={visibleRecommendations }
                    compareList={compareList}
                    handleReset={handleReset}
                    filteredCerts={filteredCerts}
                    showAiAnalysis={showAiAnalysis}
                    aiAnalysisLines={aiAnalysisLines}
                    setActiveTab={setActiveTab}
                    toggleCompare={toggleCompare}
                    setShowCsmodal={setShowCsmodal}
                    setShowproduct={setShowproduct}
                    setSelectedCatId={setSelectedCatId}
                    setCateName={setCateName}
                />
                )}
                {/* 푸터 */}
                <Footer/>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(SidaeAIRecommender));