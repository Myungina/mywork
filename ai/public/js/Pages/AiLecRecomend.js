const AiLecRecomend = ({
   showResults,
   selectedCert,
   totalSteps,
   userProfile,
   setUserProfile,
   step,
   setActiveTab,
   interestOptions,
   toggleInterest,
   handleBack,
   handleNext,
   isStepValid,
   setSelectedCert,
   isFromAllCerts,
   setIsFromAllCerts,
   setShowAllCerts,
   categoryConfig,
   difficultyConfig,
   activeTab,
   isAnalyzing,
   recommendations,
   visibleRecommendations,
   compareList,
   handleReset,
   showAiAnalysis,
   aiAnalysisLines,
   toggleCompare,
   setShowCsmodal,
   setSelectedCatId,
   setShowproduct,
   setCateName
}) => {
    return(
        <div className="glass rounded-3xl border border-white/50 shadow-xl overflow-hidden">
            {!showResults && !selectedCert ? (
                <>
                    {/* 진행률 */}
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500 font-medium">진행률</span>
                            <span
                                className="text-sm text-violet-600 font-bold">{Math.round((step / (totalSteps - 1)) * 100)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500 rounded-full"
                                style={{width: `${(step / (totalSteps - 1)) * 100}%`}}/>
                        </div>
                        <div className="flex justify-between mt-3">
                            {[...Array(totalSteps)].map((_, i) => (
                                <div key={i}
                                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>{i + 1}</div>
                            ))}
                        </div>
                    </div>

                    {/* 질문 영역 */}
                    <div className="p-6">
                        {step === 0 && (
                            <div className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
                                        <Icon name="GraduationCap" className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">학습 배경을
                                            알려주세요</h2>
                                        <p className="text-gray-500 text-sm">맞춤 추천을 위해 필요해요</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {STUDY_BACKGROUND.map(opt => (
                                        <button key={opt.value} onClick={() => setUserProfile(p => ({
                                            ...p,
                                            background: opt.value
                                        }))}
                                                className={`p-5 rounded-2xl border-2 text-left transition-all ${userProfile.background === opt.value ? `bg-gradient-to-br ${opt.color} text-white shadow-xl scale-[1.02]` : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-lg'}`}>
                                            <Icon name={opt.icon}
                                                  className={`w-10 h-10 mb-3 ${userProfile.background === opt.value ? 'text-white' : 'text-gray-400'}`}/>
                                            <div
                                                className={`font-bold text-lg ${userProfile.background === opt.value ? 'text-white' : 'text-gray-800'}`}>{opt.value}</div>
                                            <div
                                                className={`text-sm ${userProfile.background === opt.value ? 'text-white/80' : 'text-gray-500'}`}>{opt.desc}</div>
                                            <div
                                                className={`text-xs mt-1 ${userProfile.background === opt.value ? 'text-white/70' : 'text-gray-400'}`}>{opt.sub}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-200">
                                        <Icon name="Calendar" className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">목표 취득 기간은?</h2>
                                        <p className="text-gray-500 text-sm">자격증 취득까지 투자할 수 있는 기간</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {ACQUISITION_PERIOD.map(d => (
                                        <button key={d} onClick={() => setUserProfile(p => ({
                                            ...p,
                                            duration: d
                                        }))}
                                                className={`py-4 px-3 rounded-2xl border-2 font-semibold transition-all ${userProfile.duration === d ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border-transparent shadow-xl' : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-lg'}`}>
                                            {d}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm mt-4 text-center">💡 긴 기간일수록 고난이도 자격증
                                    도전 가능</p>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                                        <Icon name="Users" className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">현재 상태는?</h2>
                                        <p className="text-gray-500 text-sm">학습 시간 확보 가능성을 파악해요</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {EMPLOYMENT_OPTIONS.map(opt => (
                                        <button key={opt.value} onClick={() => setUserProfile(p => ({
                                            ...p,
                                            employment: opt.value
                                        }))}
                                                className={`py-5 px-5 rounded-2xl border-2 text-left transition-all ${userProfile.employment === opt.value ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl' : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-lg'}`}>
                                            <span className="text-2xl">{opt.icon}</span>
                                            <div
                                                className={`font-bold mt-2 ${userProfile.employment === opt.value ? 'text-white' : 'text-gray-800'}`}>{opt.value}</div>
                                            <div
                                                className={`text-sm ${userProfile.employment === opt.value ? 'text-white/80' : 'text-gray-500'}`}>{opt.desc}</div>
                                            <div
                                                className={`text-xs mt-1 ${userProfile.employment === opt.value ? 'text-white/70' : 'text-gray-400'}`}>📌 {opt.tip}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
                                        <Icon name="Clock" className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">하루 학습 시간은?</h2>
                                        <p className="text-gray-500 text-sm">평일 기준 투자 가능한 시간</p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-100">
                                    <div className="text-center mb-6">
                                                        <span
                                                            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{userProfile.dailyHours}</span>
                                        <span className="text-2xl text-gray-500 ml-2">시간</span>
                                    </div>
                                    <input type="range" min="1" max="10" step="0.5"
                                           value={userProfile.dailyHours}
                                           onChange={(e) => setUserProfile(p => ({
                                               ...p,
                                               dailyHours: parseFloat(e.target.value)
                                           }))}
                                           className="w-full h-3 bg-white rounded-full appearance-none cursor-pointer shadow-inner"
                                           style={{accentColor: '#f97316'}}/>
                                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                                        <span>1시간</span><span>10시간</span></div>
                                    <div className="mt-4 text-center p-3 bg-white rounded-xl">
                                        <span className="text-gray-500">월 약 </span>
                                        <span
                                            className="text-orange-500 font-bold text-xl">{Math.round(userProfile.dailyHours * 22)}</span>
                                        <span className="text-gray-500">시간 학습</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200">
                                        <Icon name="Target" className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">자격증 취득 목표는?</h2>
                                        <p className="text-gray-500 text-sm">목표와 관심 분야를 선택하세요</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {GOAR.map(opt => (
                                        <button key={opt.value} onClick={() => setUserProfile(p => ({
                                            ...p,
                                            goal: opt.value
                                        }))}
                                                className={`py-4 px-4 rounded-2xl border-2 text-left transition-all ${userProfile.goal === opt.value ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl' : 'bg-white border-gray-200 hover:border-rose-300 hover:shadow-lg'}`}>
                                            <span className="text-xl">{opt.emoji}</span>
                                            <div
                                                className={`font-bold mt-1 ${userProfile.goal === opt.value ? 'text-white' : 'text-gray-800'}`}>{opt.value}</div>
                                            <div
                                                className={`text-xs ${userProfile.goal === opt.value ? 'text-white/80' : 'text-gray-400'}`}>{opt.desc}</div>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-3 font-medium">관심 분야 (최대 3개,
                                        선택사항)</p>
                                    <div className="flex flex-wrap gap-2">
                                        {interestOptions.map(opt => (
                                            <button key={opt.value}
                                                    onClick={() => toggleInterest(opt.value)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${userProfile.interests.includes(opt.value) ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                <span>{opt.icon}</span><span>{opt.value}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="animate-fadeIn">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-200">
                                        <Icon name="DollarSign" className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">준비 예산은?</h2>
                                        <p className="text-gray-500 text-sm">교재, 강의 총 예상 비용</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {["50만원 이하", "100만원", "200만원", "300만원", "제한없음"].map(b => (
                                        <button key={b}
                                                onClick={() => setUserProfile(p => ({...p, budget: b}))}
                                                className={`py-4 px-3 rounded-2xl border-2 font-semibold transition-all ${userProfile.budget === b ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent shadow-xl' : 'bg-white border-gray-200 text-gray-700 hover:border-green-300 hover:shadow-lg'}`}>
                                            {b}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm mt-4 text-center">💡 예산에는 강의 및 교재비가 포함됩니다.</p>
                            </div>
                        )}
                    </div>

                    {/* 버튼 */}
                    <div className="px-6 pb-6 flex gap-3">
                        {step > 0 && <button onClick={handleBack}
                                             className="px-6 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">이전</button>}
                        <button onClick={handleNext} disabled={!isStepValid()}
                                className={`flex-1 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${isStepValid() ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-xl shadow-violet-200 hover:shadow-2xl hover:scale-[1.01]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            {step === totalSteps - 1 ? <><Icon name="Sparkles" className="w-5 h-5"/> AI
                                분석 시작</> : <>다음 <Icon name="ChevronRight" className="w-5 h-5"/></>}
                        </button>
                    </div>
                </>
            ) : selectedCert ? (
                /* 상세보기 - 풍부한 정보 버전 */
                <div className="p-6 animate-fadeIn">
                    <button onClick={() => {
                        setSelectedCert(null);
                        setIsFromAllCerts(false);
                        if (!showResults) setShowAllCerts(true);
                    }}
                            className="flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mb-6 group">
                        <Icon name="ChevronRight"
                              className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform"/>
                        <span>{showResults ? '목록으로 돌아가기' : '전체 자격증으로 돌아가기'}</span>
                    </button>

                    <div
                        className="bg-gradient-to-br from-slate-50 via-white to-violet-50 rounded-3xl p-6 mb-6 border border-gray-200 shadow-sm">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                    <span
                                                        className={`px-4 py-1.5 rounded-full text-sm font-bold ${categoryConfig[selectedCert.category]?.bg} ${categoryConfig[selectedCert.category]?.text} shadow-sm`}>{categoryConfig[selectedCert.category]?.icon} {selectedCert.category}</span>
                                    <span
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${difficultyConfig[selectedCert.difficulty]?.bg} ${difficultyConfig[selectedCert.difficulty]?.color} shadow-sm`}>{difficultyConfig[selectedCert.difficulty]?.emoji} 난이도: {difficultyConfig[selectedCert.difficulty]?.label}</span>
                                    {selectedCert.badge && <span
                                        className="px-4 py-1.5 text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full font-bold shadow-md animate-pulse">{selectedCert.badge}</span>}
                                </div>
                                <h2 className="text-3xl font-black text-gray-800 mb-2">{selectedCert.name}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed break-keep">{selectedCert.description}</p>
                                {selectedCert.tags && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {selectedCert.tags.slice(0, 5).map((tag, i) => (
                                            <span key={i}
                                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">#{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {selectedCert.matchLevel && (
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`px-6 py-4 rounded-2xl bg-gradient-to-r ${selectedCert.matchGradient} text-white shadow-xl`}>
                                        <div className="text-center">
                                            <div className="text-sm opacity-90 mb-1">AI 매칭 결과</div>
                                            <div className="text-3xl font-black">{selectedCert.score}점
                                            </div>
                                            <div
                                                className="text-lg font-bold mt-1">{selectedCert.matchLevel}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 핵심 정보 카드 - 6개로 확장 */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                        <div
                            className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-1">📅</div>
                            <div className="text-gray-500 text-xs mb-1">준비기간</div>
                            <div
                                className="text-gray-800 font-bold">{selectedCert.duration?.min}~{selectedCert.duration?.max}개월
                            </div>
                            <div
                                className="text-xs text-violet-600 mt-1">최적 {selectedCert.duration?.optimal}개월
                            </div>
                        </div>
                        <div
                            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-1">📊</div>
                            <div className="text-gray-500 text-xs mb-1">합격률</div>
                            <div
                                className="text-gray-800 font-bold text-lg">{selectedCert.passRate?.overall || '-'}%
                            </div>
                            <div className="text-xs text-emerald-600 mt-1">전체 평균</div>
                        </div>
                        <div
                            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-1">💰</div>
                            <div className="text-gray-500 text-xs mb-1">예상비용</div>
                            <div className="text-gray-800 font-bold">{selectedCert.cost?.total}</div>
                            <div className="text-xs text-amber-600 mt-1">교재+강의</div>
                        </div>
                        <div
                            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-1">💵</div>
                            <div className="text-gray-500 text-xs mb-1">초봉</div>
                            <div
                                className="text-gray-800 font-bold">{selectedCert.salary?.entry ? `${selectedCert.salary.entry.toLocaleString()}만` : '-'}</div>
                            <div className="text-xs text-pink-600 mt-1">신입 기준</div>
                        </div>
                        <div
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-1">⏱️</div>
                            <div className="text-gray-500 text-xs mb-1">월 학습시간</div>
                            <div
                                className="text-gray-800 font-bold">{selectedCert.monthlyHours?.recommended || 60}시간
                            </div>
                            <div className="text-xs text-blue-600 mt-1">권장 시간</div>
                        </div>
                        <div
                            className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-4 border border-cyan-100 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-1">📈</div>
                            <div className="text-gray-500 text-xs mb-1">전망</div>
                            <div
                                className="text-gray-800 font-bold">{'⭐'.repeat(selectedCert.outlook || 3)}</div>
                            <div
                                className="text-xs text-cyan-600 mt-1">{selectedCert.outlook >= 4 ? '매우 좋음' : selectedCert.outlook >= 3 ? '좋음' : '보통'}</div>
                        </div>
                    </div>

                    {/* AI 분석 결과 텍스트 - 타이핑 효과 (추천 결과에서만 표시) */}
                    <Airesult
                        isFromAllCerts={isFromAllCerts}
                        showAiAnalysis={showAiAnalysis}
                        aiAnalysisLines={aiAnalysisLines}
                    />

                    <div className="space-y-4">
                        {/* 탭 네비게이션 - 개선 */}
                        <div className="bg-gray-50 rounded-2xl p-1">
                            <div className="flex overflow-x-auto scrollbar-hide gap-1">
                                {[
                                    {id: 'overview', label: '개요', icon: '📋'},
                                    {id: 'career', label: '진로/전망', icon: '🎯'},
                                    {id: 'exam', label: '시험안내', icon: '📝'},
                                    {id: 'pass', label: '합격현황', icon: '📊'},
                                    ...(selectedCert?.faq?.length > 0
                                        ? [{ id: 'faq', label: 'FAQ', icon: '❓' }]
                                        : [])
                                ].map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                            className={`flex-1 min-w-[100px] flex flex-col items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all rounded-xl ${activeTab === tab.id ? 'bg-white text-violet-700 shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                                        <span className="text-xl">{tab.icon}</span>
                                        <span className="font-bold">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 탭 콘텐츠 */}
                        <div className="space-y-4">
                            {activeTab === 'overview' && (
                                <LecDtl
                                    selectedCert={selectedCert}
                                    setSelectedCert={setSelectedCert}
                                />
                            )}

                            {activeTab === 'career' && (
                                <LecCareer
                                    selectedCert={selectedCert}
                                    setSelectedCert={setSelectedCert}
                                />
                            )}

                            {activeTab === 'exam' && (
                                <ExamDtl
                                    selectedCert={selectedCert}
                                    setSelectedCert={setSelectedCert}
                                />
                            )}

                            {activeTab === 'pass' && (
                                <Acceptance
                                    selectedCert={selectedCert}
                                    setSelectedCert={setSelectedCert}
                                />
                            )}

                            {activeTab === 'faq' && (
                                <LecFaq
                                    selectedCert={selectedCert}
                                    setSelectedCert={setSelectedCert}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button onClick={() => {
                            setSelectedCatId(selectedCert.cat_id);
                            setShowproduct(true);
                            setCateName(selectedCert.name);
                        }}
                                className="py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-base font-bold shadow-xl shadow-violet-200 hover:shadow-2xl transition-all flex items-center justify-center gap-2">
                            <Icon name="Play" className="w-5 h-5"/> 강의 보러가기
                        </button>
                        <a href={
                              selectedCert.cat_id.startsWith("002")
                                  ? `${selectedCert.pageUrl}&sidecode=3`  /*공무원 도서소개 */
                                  : `${selectedCert.pageUrl}&sidecode=5&pagecode=1`
                           }
                           target="_blank"
                           className="py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-base">
                            <Icon name="Book" className="w-5 h-5"/> 교재 보기
                        </a>
                    </div>

                    <button onClick={() => {
                            setSelectedCatId(selectedCert.cat_id);
                            setShowCsmodal(true)
                        }}
                        className="w-full mt-3 py-3 rounded-2xl border-2 border-violet-200 text-violet-600 font-semibold hover:bg-violet-50 transition-all flex items-center justify-center gap-2  text-base">
                        <Icon name="Phone" className="w-5 h-5"/> 전문 상담 신청
                    </button>
                </div>
            ) : (
                /* 결과 목록 */
                <AiRecomendRes
                    userProfile={userProfile}
                    isAnalyzing={isAnalyzing}
                    recommendations={recommendations}
                    visibleRecommendations={visibleRecommendations}
                    compareList={compareList}
                    handleReset={handleReset}
                    showAiAnalysis={showAiAnalysis}
                    aiAnalysisLines={aiAnalysisLines}
                    toggleCompare={toggleCompare}
                    setSelectedCert={setSelectedCert}
                    setActiveTab={setActiveTab}
                    setIsFromAllCerts={setIsFromAllCerts}
                />
            )}
        </div>
    )
}