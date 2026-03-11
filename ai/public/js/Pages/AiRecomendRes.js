const AiRecomendRes = ({
   userProfile,
   isAnalyzing,
   recommendations,
   visibleRecommendations,
   compareList,
   handleReset,
   toggleCompare,
   setSelectedCert,
   setActiveTab,
   setIsFromAllCerts
}) => {
    return(
        <div className="p-6 animate-fadeIn">
            {/* 로딩 애니메이션 - 클로드 스타일 */}
            {isAnalyzing && visibleRecommendations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative mb-8">
                        {/* 클로드 스타일 펄싱 점들 */}
                        <div className="flex items-center gap-1">
                                                    <span className="w-3 h-3 bg-[#D97757] rounded-full animate-pulse"
                                                          style={{
                                                              animationDelay: '0ms',
                                                              animationDuration: '1s'
                                                          }}></span>
                            <span className="w-3 h-3 bg-[#D97757] rounded-full animate-pulse"
                                  style={{
                                      animationDelay: '200ms',
                                      animationDuration: '1s'
                                  }}></span>
                            <span className="w-3 h-3 bg-[#D97757] rounded-full animate-pulse"
                                  style={{
                                      animationDelay: '400ms',
                                      animationDuration: '1s'
                                  }}></span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">AI가 분석 중입니다</h3>
                    <p className="text-gray-500 text-sm">귀하의 조건에 맞는 최적의 자격증을 찾고 있습니다...</p>
                </div>
            )}

            {/* 결과 표시 */}
            {visibleRecommendations.length > 0 && (
                <>
                    <div className="text-center mb-6">
                        <div
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg shadow-violet-200 mb-3">
                            <Icon name="Sparkles" className="w-4 h-4 text-white"/><span
                            className="text-white font-bold">AI 분석 완료!</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">{userProfile.background} · {userProfile.employment} 맞춤
                            추천</h2>
                        <p className="text-gray-500 text-sm">{userProfile.duration} /
                            하루 {userProfile.dailyHours}시간 / 예산 {userProfile.budget}</p>
                    </div>

                    <div className="space-y-3">
                        {visibleRecommendations.map((cert, idx) => (
                            <div key={cert.name}
                                 className="bg-white hover:bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-violet-300 p-4 transition-all shadow-sm hover:shadow-lg animate-slideInUp"
                                 style={{animationDelay: `${idx * 0.1}s`}}>
                                <div className="flex items-start gap-4 flex-col md:flex-row">
                                    <div
                                        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-lg ${idx === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' : idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                        <span className="text-[10px] font-medium opacity-80">추천</span>
                                        <span className="text-lg font-extrabold">{idx + 1}순위</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${categoryConfig[cert.category]?.bg} ${categoryConfig[cert.category]?.text}`}>{cert.category}</span>
                                            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${cert.matchGradient} text-white`}>{cert.matchLevel}</span>
                                            {cert.highlights?.slice(0, 2).map((h, i) =>
                                                <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">{h}</span>)}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800">{cert.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-1">{cert.description}</p>
                                        <div
                                            className="flex flex-wrap justify-start items-center gap-4 mt-2 text-xs text-gray-400 font-medium">
                                            <span>📅 {cert.duration?.min}~{cert.duration?.max}개월</span>
                                            <span>💰 {cert.cost?.total}</span>
                                            <span>📊 합격률 {cert.passRate?.overall || '-'}%</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2  w-full md:w-auto  justify-self-end">
                                        <div
                                            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">{cert.score}</div>
                                        <div className="flex gap-1">
                                            <button onClick={() => {
                                                setSelectedCert(cert);
                                                setActiveTab('overview');
                                                setIsFromAllCerts(false);
                                            }}
                                                    className="px-4 py-2 text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">상세보기
                                            </button>
                                            <button onClick={() => toggleCompare(cert)}
                                                    className={`px-3 py-2 text-xs rounded-xl font-semibold transition-all ${compareList.find(c => c.name === cert.name) ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                                {compareList.find(c => c.name === cert.name) ? '✓' : '비교하기'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {!isAnalyzing && recommendations.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-5xl mb-3">🔍</div>
                    <p className="text-gray-600 font-medium">조건에 맞는 자격증이 없습니다</p>
                    <p className="text-gray-400 text-sm">조건을 완화해서 다시 검색해 보세요</p>
                </div>
            )}

            {!isAnalyzing && visibleRecommendations.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button onClick={handleReset}
                            className="py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">다시
                        검색
                    </button>
                    <button onClick={() => setShowAllCerts(true)}
                            className="py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <Icon name="Search" className="w-4 h-4"/> 전체 자격증
                    </button>
                </div>
            )}
        </div>
    )
}