const LecFaq = ({selectedCert, setSelectedCert}) => {
    return(
        <>
            {selectedCert.faq && selectedCert.faq.length > 0 ? (
                <div className="space-y-4">
                    <div
                        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                        <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                            <span
                                className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center text-sm">❓</span>
                            자주 묻는 질문
                        </h4>
                        <div className="space-y-4">
                            {selectedCert.faq.map((item, i) => (
                                <div key={i}
                                     className="bg-white rounded-xl overflow-hidden border border-amber-100 shadow-sm">
                                    <div
                                        className="p-4 bg-gradient-to-r from-amber-100 to-orange-100">
                                        <div className="flex items-start gap-3">
                                            <span
                                                className="w-7 h-7 bg-amber-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">Q</span>
                                            <span
                                                className="text-gray-800 font-semibold">{item.q}</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start gap-3">
                                            <span
                                                className="w-7 h-7 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">A</span>
                                            <span
                                                className="text-gray-600 leading-relaxed">{item.a}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-8 border border-amber-200 text-center">
                    <div className="text-6xl mb-4">❓</div>
                    <h4 className="font-bold text-gray-800 text-xl mb-3">자주 묻는
                        질문</h4>
                    <p className="text-gray-500">FAQ가 준비 중입니다.</p>
                    <div
                        className="mt-6 p-4 bg-white rounded-xl border border-amber-100 text-left max-w-md mx-auto">
                        <div className="text-amber-600 font-semibold mb-2">💡
                            알아두면 좋은 정보
                        </div>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>• 준비
                                기간: {selectedCert.duration?.min}~{selectedCert.duration?.max}개월
                            </li>
                            <li>• 월 권장
                                학습시간: {selectedCert.monthlyHours?.recommended || 60}시간
                            </li>
                            <li>• 예상 비용: {selectedCert.cost?.total}</li>
                            <li>•
                                난이도: {difficultyConfig[selectedCert.difficulty]?.label}</li>
                        </ul>
                    </div>
                </div>
            )}
            {/* 추가 도움말 */}
            <div
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <span
                    className="w-8 h-8 bg-violet-500 text-white rounded-lg flex items-center justify-center text-sm">💬</span>
                    추가 문의
                </h4>
                <div
                    className="bg-white rounded-xl p-4 border border-violet-100">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        더 궁금한 사항이 있으시면 시대에듀 고객센터(1600-3600)로 문의해 주세요.
                        전문 상담사가 친절하게 안내해 드립니다.
                    </p>
                </div>
            </div>
        </>
    )
}