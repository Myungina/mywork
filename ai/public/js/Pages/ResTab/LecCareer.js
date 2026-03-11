const LecCareer = ({selectedCert, setSelectedCert}) => {
    return(
        <>
            {/*진로/전망*/}
            <div
                className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border border-emerald-100">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                            <span
                                                                className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm">🎯</span>
                    진로 및 전망
                </h4>
                <div className="bg-white/70 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed text-base">
                        {selectedCert.career?.description || `${selectedCert.name} 자격증 취득 시 관련 분야에서 전문가로 활동할 수 있습니다. 취업, 이직, 승진 등 다양한 경력 개발에 도움이 됩니다.`}
                    </p>
                </div>
            </div>

            {/* 주요 활동 분야 */}
            <div
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <span
                    className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm">📌</span>
                    주요 활동 분야
                </h4>
                {selectedCert.career?.fields ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedCert.career.fields.map((field, i) => (
                            <div key={i}
                                 className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                                      <span
                                          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl flex items-center justify-center text-lg shadow-md">
                                        {['🏢', '💼', '🏛️', '🏭', '📊', '💻', '🔬', '⚖️'][i % 8]}
                                      </span>
                                <span
                                    className="text-gray-700 font-medium text-base">{field}</span>
                            </div>
                        ))}
                    </div>
                ) : selectedCert.employment ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedCert.employment.map((emp, i) => (
                            <div key={i}
                                 className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                                                        <span
                                                                            className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center">🏢</span>
                                <span
                                    className="text-gray-700 font-medium">{emp}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">취업 분야 정보가 준비 중입니다.</p>
                )}
            </div>

            {/* 연봉 정보 */}
            <div
                className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                            <span
                                                                className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center text-sm">💰</span>
                    예상 연봉 정보
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div
                        className="bg-white rounded-2xl p-5 text-center border border-gray-200 shadow-sm">
                        <div className="text-gray-500 text-sm mb-2">🌱 신입
                            (1~3년)
                        </div>
                        <div
                            className="text-2xl font-black text-gray-800">{selectedCert.salary?.entry ? `${selectedCert.salary.entry.toLocaleString()}만` : '-'}</div>
                    </div>
                    <div
                        className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-5 text-center border border-emerald-200 shadow-md">
                        <div
                            className="text-emerald-700 text-sm mb-2 font-semibold">💪
                            중견 (4~7년)
                        </div>
                        <div
                            className="text-2xl font-black text-emerald-700">{selectedCert.salary?.mid ? `${selectedCert.salary.mid.toLocaleString()}만` : '-'}</div>
                    </div>
                    <div
                        className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl p-5 text-center border border-violet-200 shadow-md">
                        <div
                            className="text-violet-700 text-sm mb-2 font-semibold">👑
                            고경력 (8년+)
                        </div>
                        <div
                            className="text-2xl font-black text-violet-700">{selectedCert.salary?.senior ? `${selectedCert.salary.senior.toLocaleString()}만` : '-'}</div>
                    </div>
                </div>
                <div
                    className="bg-white/70 rounded-xl p-4 text-sm text-gray-600">
                    <p>💡 <strong>참고:</strong> 연봉은 기업 규모, 지역, 개인 역량에 따라 차이가 있을 수
                        있습니다.</p>
                </div>
            </div>

            {/* 전망 지수 */}
            <div
                className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-6 border border-cyan-100">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                            <span
                                                                className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm">📈</span>
                    취업 전망 지수
                </h4>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div
                            className="h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                                style={{width: `${(selectedCert.outlook || 3) * 20}%`}}></div>
                        </div>
                    </div>
                    <div
                        className="text-2xl font-black text-cyan-600">{selectedCert.outlook || 3}/5
                    </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                    {selectedCert.outlook >= 5 ? '🔥 취업 전망이 매우 밝습니다. 수요가 지속적으로 증가하고 있습니다.' :
                        selectedCert.outlook >= 4 ? '⭐ 취업 전망이 좋습니다. 안정적인 일자리를 기대할 수 있습니다.' :
                            selectedCert.outlook >= 3 ? '✅ 보통 수준의 전망입니다. 경력과 역량에 따라 기회가 있습니다.' :
                                '📌 틈새시장 공략이 필요합니다. 전문성 강화가 중요합니다.'}
                </div>
            </div>
        </>
    )
}