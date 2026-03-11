
// AI 분석 텍스트 생성 함수 - 콘텐츠별 맞춤 상세 분석
function generateAIAnalysisText(cert, userProfile, isFromSearch = false) {
    // 전체 자격증 검색에서는 AI 분석 제외
    if (isFromSearch) return [];

    const lines = [];
    const score = cert.score || 0;
    const matchLevel = score >= 80 ? "매우 높은" : score >= 60 ? "높은" : score >= 40 ? "평균 수준의" : "다소 낮은";
    const duration = cert.duration?.optimal || 6;
    const monthlyHours = cert.monthlyHours?.recommended || 60;
    const passRate = cert.passRate?.overall || 30;
    const cost = cert.cost?.total || "50~100만원";
    const salary = cert.salary?.entry || 3000;
    const outlook = cert.outlook || 3;
    const outlookText = outlook >= 4 ? "매우 좋음" : outlook >= 3 ? "좋음" : "보통";

    // 해당 자격증의 상세 수험정보 가져오기
    const examInfo = examInfoDB[cert.name] || null;

    // ===== 1. 도입부: AI 매칭 결과 요약 =====
    lines.push(`[AI 매칭 분석] 본 AI 분석 결과에 따르면, 귀하의 ${cert.name} 준비 적합도는 ${score}점(${matchLevel} 수준)으로 평가되었습니다. 귀하의 전공, 관심 분야, 학습 가용 시간을 종합적으로 분석한 결과입니다.`);

    // ===== 2. 시험 정보 및 과목 안내 =====
    if (examInfo) {
        lines.push(`[시험 과목] ${examInfo.examSubjects}`);
        lines.push(`[시험 형태] ${examInfo.examFormat} | 합격 기준: ${examInfo.passStandard}`);
        lines.push(`[시험 일정] ${examInfo.examSchedule}`);
    }

    // ===== 3. 준비 기간 및 학습량 분석 =====
    lines.push(`[준비 기간 분석] 권장 준비 기간은 ${cert.duration?.min || 3}~${cert.duration?.max || 12}개월이며, 최적 학습 기간은 ${duration}개월입니다. 귀하의 현재 학습 여건을 고려할 때 현실적인 합격 도전이 가능합니다.`);

    if (monthlyHours >= 80) {
        lines.push(`[학습량 주의] 월 ${monthlyHours}시간 이상의 집중 학습이 요구되는 고난도 시험입니다. 하루 평균 ${Math.round(monthlyHours / 30 * 10) / 10}시간 이상의 꾸준한 학습과 철저한 시간 관리 전략이 필수입니다.`);
    } else if (monthlyHours >= 50) {
        lines.push(`[학습량 안내] 월 ${monthlyHours}시간 정도의 꾸준한 학습이 권장됩니다. 하루 평균 ${Math.round(monthlyHours / 30 * 10) / 10}시간 학습으로 계획적인 시간 배분이 중요합니다.`);
    } else {
        lines.push(`[학습량 안내] 월 ${monthlyHours}시간 정도의 학습량으로, 다른 자격증 대비 비교적 부담 없이 준비할 수 있는 수준입니다.`);
    }

    // ===== 4. 사용자 상황별 맞춤 전략 =====
    if (userProfile?.employment === "직장인") {
        lines.push(`[직장인 맞춤 전략] 직장과 병행 시 학습 지속성이 합격률에 큰 영향을 미칩니다. 평일 야간 2시간 + 주말 집중 학습 패턴을 권장하며, 출퇴근 시간을 활용한 이론 암기가 효과적입니다.`);
    } else if (userProfile?.employment === "취준생/이직준비") {
        lines.push(`[취준생 맞춤 전략] 집중 학습이 가능한 최적의 시기입니다. 하루 6~8시간 풀타임 학습으로 단기 합격을 목표로 하고, 체계적인 커리큘럼 이행을 통해 최단 기간 합격을 노려보세요.`);
    } else if (userProfile?.employment === "학생") {
        lines.push(`[학생 맞춤 전략] 학업과 병행 시 방학 기간 집중 공략이 핵심입니다. 학기 중에는 기초 이론 학습, 방학에는 문제풀이와 실전 모의고사에 집중하는 전략을 권장합니다.`);
    } else if (userProfile?.employment === "주부/경단녀") {
        lines.push(`[경력단절자 맞춤 전략] 가사와 병행 가능한 유연한 학습 계획이 중요합니다. 오전 시간대 집중 학습, 온라인 강의 활용으로 효율적인 시간 관리가 가능합니다.`);
    }

    // ===== 5. 합격 전략 및 학습 팁 =====
    if (examInfo?.studyTip) {
        lines.push(`[합격 핵심 전략] ${examInfo.studyTip}`);
    }

    // ===== 6. 합격률 및 경쟁 분석 =====
    if (passRate) {
        if (passRate < 20) {
            lines.push(`[합격률 분석] 전체 합격률 ${passRate}%로 난이도가 높은 시험입니다. 그러나 체계적인 준비와 충분한 학습 시간 확보 시 평균 대비 합격 확률을 크게 높일 수 있습니다.`);
        } else if (passRate < 40) {
            lines.push(`[합격률 분석] 전체 합격률 ${passRate}%로 적정 수준의 경쟁률을 보입니다. 핵심 과목 집중 공략과 기출문제 분석으로 충분히 합격 가능합니다.`);
        } else {
            lines.push(`[합격률 분석] 전체 합격률 ${passRate}%로 비교적 높은 편입니다. 기본기에 충실하고 꾸준히 학습하면 합격 가능성이 높습니다.`);
        }
    }

    // ===== 7. 비용 대비 효과 분석 =====
    lines.push(`[투자 비용 분석] 총 예상 비용 ${cost}(교재+강의+응시료 포함)은 자격증 취득 후 예상 수익 대비 합리적인 투자입니다.`);

    // ===== 8. 진로 및 전망 =====
    if (examInfo?.careerPath) {
        lines.push(`[진로 및 활용] ${examInfo.careerPath}`);
    }

    if (typeof salary === 'number') {
        lines.push(`[소득 전망] 신입 기준 초봉 약 ${salary.toLocaleString()}만원으로, 경력에 따라 상승 가능성이 높습니다. 직업 전망 '${outlookText}' 평가는 장기 커리어 측면에서 긍정적인 신호입니다.`);
    }

    // ===== 9. 자격증 취득의 이점 =====
    if (examInfo?.advantage) {
        lines.push(`[취득 이점] ${examInfo.advantage}`);
    }

    // ===== 10. 관련 분야 경험 가산 =====
    if (cert.tags?.some(t => ["법률", "보험", "금융", "회계", "세무"].includes(t))) {
        lines.push(`[관련 경험 분석] 법률, 금융, 회계 분야 경험이나 관련 전공 이수자의 경우 학습 효율이 30% 이상 높아질 것으로 분석됩니다.`);
    } else if (cert.tags?.some(t => ["IT", "데이터", "프로그래밍"].includes(t))) {
        lines.push(`[관련 경험 분석] IT, 프로그래밍 경험이 있다면 실기 과목에서 큰 강점이 될 수 있습니다. 기초 코딩 능력이 합격에 유리합니다.`);
    } else if (cert.tags?.some(t => ["안전", "소방", "전기"].includes(t))) {
        lines.push(`[관련 경험 분석] 현장 실무 경험이 있다면 이론 이해도가 높고, 실기 시험에서도 유리합니다. 관련 산업체 근무 경력은 큰 자산입니다.`);
    }

    // ===== 11. 종합 결론 =====
    if (score >= 70) {
        lines.push(`[종합 결론] 귀하의 조건은 ${cert.name} 준비에 매우 적합합니다. 체계적인 학습 계획 수립과 꾸준한 실행으로 목표 달성이 충분히 가능합니다. 지금 바로 시작하시기를 강력히 권장합니다!`);
    } else if (score >= 50) {
        lines.push(`[종합 결론] 충분한 준비 기간과 학습 관리가 가능하다면 ${cert.name}은 도전 가치가 높은 자격증입니다. 약점 보완에 집중하고 강점을 살리는 전략으로 합격을 목표하세요.`);
    } else {
        lines.push(`[종합 결론] ${cert.name}은 현재 조건에서 다소 도전적일 수 있으나, 충분한 준비 기간을 확보하고 관련 기초 지식을 쌓는다면 합격 가능성을 높일 수 있습니다. 기초부터 차근차근 준비해 보세요.`);
    }

    return lines;
}



const Airesult  =  ({
        isFromAllCerts,
        showAiAnalysis,
        aiAnalysisLines,
}) => {
    if (isFromAllCerts) return null;
    return(
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border border-violet-200 shadow-sm mb-6">
            <div className="flex items-center flex-col md:flex-row gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="Brain" className="w-7 h-7 text-white"/>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-xl">AI 종합 분석 리포트</h4>
                    <p className="text-sm text-violet-600">귀하의 학습 조건과 목표에 맞춘 맞춤형 분석 결과입니다</p>
                </div>
                {showAiAnalysis && aiAnalysisLines.length > 0 && (
                    <div
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-emerald-700 font-medium">AI 분석 중</span>
                    </div>
                )}
            </div>
            <div className="bg-white/70 rounded-xl p-5 min-h-[150px]">
                <TypingText lines={aiAnalysisLines} isActive={showAiAnalysis}/>
            </div>
        </div>
    )
}