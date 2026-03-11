const LecDtl = ({selectedCert, setSelectedCert}) => {
    return(
    <>
    {/*개요*/}
    <div
        className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border border-violet-100">
        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
        <span className="w-8 h-8 bg-violet-500 text-white rounded-lg flex items-center justify-center text-sm">📋</span>
            자격증 상세 소개
        </h4>
        <div className="bg-white/70 rounded-xl p-4 mb-4 break-keep">
            <p className="text-gray-700 leading-relaxed text-base">{selectedCert.overview || selectedCert.description}</p>
        </div>
        {selectedCert.employment && (
            <div className="mt-4">
                <div
                    className="text-sm font-semibold text-violet-700 mb-2">🏢
                    주요 취업처
                </div>
                <div className="flex flex-wrap gap-2">
                    {selectedCert.employment.map((emp, i) => (
                        <span key={i}
                              className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium border border-violet-200 shadow-sm">{emp}</span>
                    ))}
                </div>
            </div>
        )}
    </div>

    {selectedCert.suitable && (
        <div
            className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <span
                    className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm">👤</span>
                이런 분께 추천합니다
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCert.suitable.map((s, i) => (
                    <div key={i}
                         className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                        <span
                            className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span
                            className="text-gray-700 font-medium  text-base">{s}</span>
                    </div>
                ))}
            </div>
        </div>
    )}

    {selectedCert.studyTips && (
        <div
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
            <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <span
                className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center text-sm">💡</span>
                합격을 위한 학습 전략
            </h4>
            <div className="space-y-3">
                {selectedCert.studyTips.map((tip, i) => (
                    <div key={i}
                         className="flex items-start gap-3 p-4 bg-white rounded-xl border border-amber-200 shadow-sm">
                    <span
                        className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                        <p className="text-gray-700 font-medium text-base">{tip}</p>
                    </div>
                ))}
            </div>
        </div>
    )}

    {selectedCert.reasons?.length > 0 && (
        <div
            className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border border-emerald-200 shadow-sm">
            <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                <span
                                                                    className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center"><Icon
                                                                    name="Brain" className="w-5 h-5 text-white"/></span>
                AI 맞춤 분석 결과
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {selectedCert.reasons?.map((r, i) => (
                    <div key={i}
                         className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-100">
                                                                        <span
                                                                            className="text-emerald-500 text-lg">✓</span>
                        <span
                            className="text-gray-700 font-medium text-sm">{r}</span>
                    </div>
                ))}
            </div>
            {selectedCert.warnings?.length > 0 && (
                <div
                    className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-amber-700 font-bold mb-2">⚠️
                        주의사항
                    </div>
                    <div className="space-y-2">
                        {selectedCert.warnings?.map((w, i) => (
                            <p key={i}
                               className="text-amber-600 text-sm flex items-center gap-2">
                                                                                <span
                                                                                    className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>{w}
                            </p>
                        ))}
                    </div>
                </div>
            )}
            {selectedCert.highlights?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {selectedCert.highlights.map((h, i) => (
                        <span key={i}
                              className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-xs font-bold shadow-sm">⭐ {h}</span>
                    ))}
                </div>
            )}
        </div>
    )}
    </>
    )
}