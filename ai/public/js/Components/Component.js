const {useState, useMemo, useEffect, useRef} = React;

// ========================================
// 자격증 데이터베이스 (시대에듀 전체 67개)
// ========================================
// ========================================
// API에서 데이터 로드
// ========================================
let certificationsDB = {}; // API에서 로드됨
let examInfoDB = {}; // API에서 로드됨
let isDataLoaded = false;

// API 호출 함수
async function loadDataFromAPI() {
    try {
        console.log('📡 API에서 데이터 로드 중...');

        // 두 API를 병렬로 호출
        const [certsResponse, examResponse] = await Promise.all([
            fetch('../api/certifications.php'),
            fetch('../api/exam_info.php')
        ]);

        if (!certsResponse.ok || !examResponse.ok) {
            throw new Error('API 호출 실패');
        }

        const certsData = await certsResponse.json();
        const examData = await examResponse.json();

        if (!certsData.success || !examData.success) {
            throw new Error('데이터 로드 실패');
        }

        certificationsDB = certsData.data;
        examInfoDB = examData.data;
        isDataLoaded = true;

        console.log(`✅ 데이터 로드 완료: 자격증 ${certsData.count}개, 시험정보 ${examData.count}개`);

        return true;
    } catch (error) {
        console.error('❌ 데이터 로드 실패:', error);
        return false;
    }
}


// ========================================
// AI 추천 알고리즘
// ========================================
function getAdvancedRecommendations(userProfile) {
    const {background, duration, employment, dailyHours, interests, goal, budget} = userProfile;
    const monthlyHours = dailyHours * 22;
    const durationMap = {"3개월": 3, "6개월": 6, "12개월": 12, "24개월": 24, "36개월 이상": 36};
    const durationMonths = durationMap[duration] || 12;
    const budgetMap = {"50만원 이하": 50, "100만원": 100, "200만원": 200, "300만원": 300, "제한없음": 999};
    const maxBudget = budgetMap[budget] || 999;

    const results = [];

    Object.entries(certificationsDB).forEach(([name, cert]) => {
        let score = 0;
        let reasons = [];
        let warnings = [];
        let highlights = [];

        // 1. 시간 적합성 (25점)
        const requiredHours = cert.monthlyHours?.recommended || 60;
        const hourRatio = monthlyHours / requiredHours;
        if (hourRatio >= 1.2) {
            score += 25;
            reasons.push("✅ 충분한 학습 시간");
            highlights.push("시간 여유");
        } else if (hourRatio >= 1.0) {
            score += 22;
            reasons.push("✅ 적정 학습 시간");
        } else if (hourRatio >= 0.8) {
            score += 18;
            reasons.push("⚠️ 시간 관리 필요");
        } else if (hourRatio >= 0.6) {
            score += 12;
            warnings.push("시간 부족");
        } else {
            score += 5;
            warnings.push("시간 크게 부족");
        }

        // 2. 기간 적합성 (20점)
        const certDurationOpt = cert.duration?.optimal || 6;
        const certDurationMin = cert.duration?.min || 3;
        if (durationMonths >= certDurationOpt) {
            score += 20;
            reasons.push("✅ 충분한 준비 기간");
            highlights.push("기간 충분");
        } else if (durationMonths >= certDurationMin) {
            score += 15;
            reasons.push("✅ 집중 학습 시 가능");
        } else if (durationMonths >= certDurationMin * 0.7) {
            score += 10;
            warnings.push("기간 촉박");
        } else {
            score += 3;
            warnings.push("기간 매우 부족");
        }

        // 3. 배경 적합성 (20점)
        if (background === "비전공자") {
            if (cert.difficulty <= 3) {
                score += 20;
                reasons.push("✅ 비전공자 도전 적합");
                highlights.push("입문 용이");
            } else if (cert.difficulty === 4) {
                score += 12;
                reasons.push("⚠️ 난이도 도전적");
            } else {
                score += 8;
                warnings.push("고난도 - 충분한 준비 필요");
            }
        } else if (background === "전공자") {
            if (cert.difficulty >= 3) {
                score += 20;
                reasons.push("✅ 전공 지식 활용");
                highlights.push("전공 우대");
            } else {
                score += 18;
                reasons.push("✅ 수월한 접근");
            }
        } else {
            score += 20;
            reasons.push("✅ 실무 경험 활용");
            highlights.push("경력 활용");
        }

        // 4. 현재 상황 (15점)
        if (employment === "직장인") {
            if (cert.difficulty <= 2) {
                score += 15;
                reasons.push("✅ 직장 병행 적합");
            } else if (cert.difficulty === 3) {
                score += 12;
                reasons.push("⚠️ 병행 가능 (시간관리 필요)");
            } else {
                score += 7;
                warnings.push("병행 어려움");
            }
        } else if (employment === "취업준비생") {
            score += 15;
            reasons.push("✅ 풀타임 집중 가능");
            highlights.push("집중 학습");
        } else if (employment === "학생") {
            if (cert.difficulty <= 3) {
                score += 13;
                reasons.push("✅ 학업 병행 가능");
            } else {
                score += 8;
                warnings.push("학업과 부담될 수 있음");
            }
        } else {
            score += 14;
            reasons.push("✅ 유연한 일정 가능");
        }

        // 5. 목표 적합성 (10점)
        if (goal === "고소득" && (cert.salary?.senior >= 7000 || cert.tags?.includes("고소득"))) {
            score += 10;
            reasons.push("💰 고소득 달성 가능");
            highlights.push("고소득");
        } else if (goal === "안정적 취업" && (cert.tags?.includes("공기업") || cert.tags?.includes("안정") || cert.outlook >= 4)) {
            score += 10;
            reasons.push("🏢 안정적 취업 유리");
            highlights.push("취업 유리");
        } else if (goal === "이직/전환" && cert.outlook >= 4) {
            score += 10;
            reasons.push("🔄 커리어 전환 효과적");
            highlights.push("이직 유리");
        } else if (goal === "창업" && (cert.tags?.includes("창업") || cert.tags?.includes("전문직"))) {
            score += 10;
            reasons.push("🚀 독립/창업 가능");
            highlights.push("창업 가능");
        }

        // 6. 관심분야 매칭 (10점)
        if (interests && interests.length > 0) {
            const interestMap = {
                "회계/세무": ["회계", "세무", "감사"],
                "법률": ["법률", "등기", "소송"],
                "부동산": ["부동산", "중개", "감정"],
                "IT/데이터": ["IT", "개발", "데이터", "AI"],
                "안전/설비": ["안전", "소방", "전기", "위험물"],
                "금융/투자": ["금융", "투자", "보험"],
                "물류/무역": ["물류", "무역", "관세"],
                "상담/복지": ["상담", "심리", "복지"]
            };
            let matched = false;
            interests.forEach(interest => {
                const keywords = interestMap[interest] || [interest];
                if (cert.tags?.some(tag => keywords.some(k => tag.includes(k)))) matched = true;
            });
            if (matched) {
                score += 10;
                reasons.push("❤️ 관심 분야 일치");
                highlights.push("관심 분야");
            }
        }

        // 예산 체크 (비용 범위의 최대값과 비교)
        const costStr = cert.cost?.total || "100만원";
        const costNumbers = costStr.match(/\d+/g);
        const maxCost = costNumbers ? Math.max(...costNumbers.map(Number)) : 100;
        if (maxCost > maxBudget) {
            score -= 10;
            warnings.push(`예산 초과 (${cert.cost?.total})`);
        }

        // 뱃지 보너스
        if (cert.badge) {
            score += 3;
            highlights.push(cert.badge);
        }

        if (score >= 40) {
            const matchLevel = score >= 85 ? "최적" : score >= 70 ? "추천" : score >= 55 ? "적합" : "도전";
            const matchGradient = {
                "최적": "from-violet-500 to-purple-600",
                "추천": "from-emerald-500 to-teal-600",
                "적합": "from-amber-500 to-orange-600",
                "도전": "from-pink-500 to-rose-600"
            };
            results.push({
                name, ...cert,
                score,
                reasons: reasons.slice(0, 4),
                warnings: warnings.slice(0, 2),
                highlights: highlights.slice(0, 3),
                matchLevel,
                matchGradient: matchGradient[matchLevel]
            });
        }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

// 타이핑 효과 컴포넌트
function TypingText({lines, isActive}) {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isActive || !lines || lines.length === 0) {
            setDisplayedLines([]);
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            setIsComplete(false);
            return;
        }

        // 커서 깜빡임
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, [isActive, lines]);

    useEffect(() => {
        if (!isActive || !lines || lines.length === 0 || isComplete) return;

        if (currentLineIndex >= lines.length) {
            setIsComplete(true);
            return;
        }

        const currentLine = lines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    if (newLines.length <= currentLineIndex) {
                        newLines.push(currentLine.slice(0, currentCharIndex + 1));
                    } else {
                        newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
                    }
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 25); // 타이핑 속도

            return () => clearTimeout(timeout);
        } else {
            // 다음 줄로 이동
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, 300); // 줄 간 딜레이

            return () => clearTimeout(timeout);
        }
    }, [isActive, lines, currentLineIndex, currentCharIndex, isComplete]);

    // 자동 스크롤
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [displayedLines]);

    if (!isActive || !lines || lines.length === 0) return null;

    // [] 안의 내용을 볼드 처리하는 함수
    const formatLine = (text) => {
        const parts = text.split(/(\[[^\]]+\])/g);
        return parts.map((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                return <strong key={i} className="text-violet-700 font-bold">{part.slice(1, -1)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div ref={containerRef} className="space-y-3">
            {displayedLines.map((line, idx) => (
                <p key={idx} className="text-gray-700 text-base leading-relaxed flex items-start gap-3">
                    <span className="text-violet-500 mt-1 flex-shrink-0">•</span>
                    <span className="flex-1">
                {formatLine(line)}
                        {idx === displayedLines.length - 1 && !isComplete && (
                            <span
                                className={`inline-block w-0.5 h-5 bg-violet-500 ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                        )}
              </span>
                </p>
            ))}
            {!isComplete && displayedLines.length === 0 && (
                <div className="flex items-center gap-3 text-violet-600 py-4">
                    <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"
                                  style={{animationDelay: '0ms'}}></span>
                        <span className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"
                              style={{animationDelay: '150ms'}}></span>
                        <span className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"
                              style={{animationDelay: '300ms'}}></span>
                    </div>
                    <span className="text-base font-medium">AI가 귀하의 조건을 분석하고 있습니다...</span>
                </div>
            )}
        </div>
    );
}



function handleNextLogic({
                             step,
                             totalSteps,
                             userProfile,
                             setStep,
                             setRecommendations,
                             setShowResults,
                             setIsAnalyzing,
                             setVisibleRecommendations
                         }) {
    if (step < totalSteps - 1) {
        setStep(step + 1);
    } else {
        const results = getAdvancedRecommendations(userProfile);
        setRecommendations(results);
        setShowResults(true);
        setIsAnalyzing(true);
        setVisibleRecommendations([]);
    }
}

function handleBackLogic({
                             showResults,
                             step,
                             setShowResults,
                             setSelectedCert,
                             setIsAnalyzing,
                             setVisibleRecommendations,
                             setStep
                         }) {
    if (showResults) {
        setShowResults(false);
        setSelectedCert(null);
        setIsAnalyzing(false);
        setVisibleRecommendations([]);
    } else if (step > 0) {
        setStep(step - 1);
    }
}

function handleResetLogic({
                              setStep,
                              setUserProfile,
                              setRecommendations,
                              setShowResults,
                              setSelectedCert,
                              setCompareList,
                              setIsAnalyzing,
                              setVisibleRecommendations,
                          }) {
    setStep(0);
    setUserProfile({
        background: "", duration: "", employment: "", dailyHours: 3, interests: [], goal: "", budget: ""
    });
    setRecommendations([]);
    setShowResults(false);
    setSelectedCert(null);
    setCompareList([]);
    setIsAnalyzing(false);
    setVisibleRecommendations([]);
}

function isStepValidLogic(step, userProfile) {
    switch (step) {
        case 0:
            return !!userProfile.background;
        case 1:
            return !!userProfile.duration;
        case 2:
            return !!userProfile.employment;
        case 3:
            return userProfile.dailyHours > 0;
        case 4:
            return !!userProfile.goal;
        case 5:
            return !!userProfile.budget;
        default:
            return true;
    }
}

function toggleInterestLogic(interest, setUserProfile) {
    setUserProfile(prev => ({
        ...prev,
        interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : prev.interests.length < 3 ? [...prev.interests, interest] : prev.interests
    }));
}

function toggleCompareLogic(cert, setCompareList) {
    setCompareList(prev => prev.find(c => c.name === cert.name) ? prev.filter(c => c.name !== cert.name) : prev.length < 3 ? [...prev, cert] : prev);
}

function loadInitialData({setDataLoaded}) {
    loadDataFromAPI().then(success => {
        if (success) {
            setDataLoaded(true);
        } else {
            alert('데이터를 불러오는데 실패했습니다. 페이지를 새로고침해주세요.');
        }
    });
}
function relListEffect(setVisibleRecommendations, recommendations, visibleRecommendations, setIsAnalyzing) {
    const startTimer = setTimeout(() => {
        recommendations.forEach((cert, idx) => {
            setTimeout(() => {
                setVisibleRecommendations(prev => [...prev, cert]);
                if (idx === recommendations.length - 1) {
                    setTimeout(() => setIsAnalyzing(false), 500);
                }
            }, idx * 800); // 각 항목 0.8초 간격 (기존 0.4초의 2배)
        });
    }, 5000); // 5초 로딩

    return () => clearTimeout(startTimer);
}

window.useFilteredCerts = function (
    showAllCerts,
    searchQuery,
    selectedCategory,
    certificationsDB
) {
    return useMemo(() => {
        if (!showAllCerts) return [];

        return Object.entries(certificationsDB)
            .filter(([name, cert]) => {
                const matchCategory =
                    selectedCategory === "전체" || cert.category === selectedCategory;

                const matchSearch =
                    !searchQuery ||
                    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cert.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    cert.tags?.some(t =>
                        t.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                return matchCategory && matchSearch;
            })
            .map(([name, cert]) => ({ name, ...cert }));
    }, [showAllCerts, searchQuery, selectedCategory, certificationsDB]);
};

