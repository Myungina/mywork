const Acceptance = ({selectedCert, setSelectedCert}) => {
    return(
        <>
            {selectedCert.passHistory && selectedCert.passHistory.length > 0 ? (
                <>
                    <div
                        className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
                        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                    <span
                                                                        className="w-8 h-8 bg-violet-500 text-white rounded-lg flex items-center justify-center text-sm">📊</span>
                            연도별 합격자 현황
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="bg-gradient-to-r from-violet-100 to-purple-100">
                                    <th className="px-4 py-3 text-left font-bold text-violet-700 rounded-tl-xl">연도</th>
                                    <th className="px-4 py-3 text-center font-bold text-violet-700">응시자</th>
                                    <th className="px-4 py-3 text-center font-bold text-violet-700">합격자</th>
                                    <th className="px-4 py-3 text-center font-bold text-violet-700 rounded-tr-xl">합격률</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedCert.passHistory.map((h, i) => (
                                    <tr key={i}
                                        className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-violet-50 transition-colors`}>
                                        <td className="px-4 py-4 font-bold text-gray-800">{h.year}년</td>
                                        <td className="px-4 py-4 text-center text-gray-600">{(h.firstApplied || h.applied || 0).toLocaleString()}명</td>
                                        <td className="px-4 py-4 text-center text-emerald-600 font-semibold">{(h.firstPassed || h.passed || 0).toLocaleString()}명</td>
                                        <td className="px-4 py-4 text-center">
                                                                                    <span
                                                                                        className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-bold">{h.firstRate || h.rate || '-'}%</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 합격률 분석 */}
                    <div
                        className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                    <span
                                                                        className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm">📈</span>
                            합격률 분석
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div
                                className="bg-white rounded-xl p-4 text-center border border-emerald-100">
                                <div className="text-gray-500 text-xs mb-1">평균
                                    합격률
                                </div>
                                <div
                                    className="text-2xl font-black text-emerald-600">{selectedCert.passRate?.overall || '-'}%
                                </div>
                            </div>
                            <div
                                className="bg-white rounded-xl p-4 text-center border border-emerald-100">
                                <div
                                    className="text-gray-500 text-xs mb-1">난이도
                                </div>
                                <div
                                    className="text-xl font-bold text-gray-800">{difficultyConfig[selectedCert.difficulty]?.label}</div>
                            </div>
                            <div
                                className="bg-white rounded-xl p-4 text-center border border-emerald-100">
                                <div
                                    className="text-gray-500 text-xs mb-1">경쟁률
                                </div>
                                <div
                                    className="text-xl font-bold text-gray-800">{selectedCert.passRate?.overall ? Math.round(100 / selectedCert.passRate.overall) + ':1' : '-'}</div>
                            </div>
                            <div
                                className="bg-white rounded-xl p-4 text-center border border-emerald-100">
                                <div className="text-gray-500 text-xs mb-1">추천
                                    준비기간
                                </div>
                                <div
                                    className="text-xl font-bold text-gray-800">{selectedCert.duration?.optimal || '-'}개월
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div
                    className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl p-8 border border-violet-200 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h4 className="font-bold text-gray-800 text-xl mb-3">합격자
                        현황</h4>
                    <div
                        className="bg-white rounded-xl p-6 inline-block shadow-sm border border-violet-100">
                        <div className="text-gray-500 text-sm mb-2">전체 합격률</div>
                        <div
                            className="text-4xl font-black text-violet-600">{selectedCert.passRate?.overall || '-'}%
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">상세 연도별 데이터가 준비
                        중입니다.</p>
                </div>
            )}
        </>
    )
}