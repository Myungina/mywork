const ExamDtl = ({selectedCert, setSelectedCert}) => {
    return(
        <>
            {/* 시험 과목 */}
            {selectedCert.examInfo?.subjects ? (
                <div
                    className="bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                <span
                                                                    className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm">📝</span>
                        시험 과목 안내
                    </h4>

                    {selectedCert.examInfo.subjects &&
                        Object.values(selectedCert.examInfo.subjects).map((subject, subjectIdx) => (
                            <div key={subjectIdx}
                                 className="mb-5 bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                                {subject.examTit && (
                                    <div
                                        className="flex items-center gap-2 mb-3">
                                                                                <span
                                                                                    className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-bold">
                                                                                  {subject.examTit}
                                                                                </span>
                                    </div>
                                )}

                                {subject.examSubTxt.map((subTxt, idx) => (
                                    <div key={idx} className="mb-4">
                                                                                <span
                                                                                    className="text-gray-500 text-sm block mb-2">{subTxt}</span>
                                        <div
                                            className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {subject.examList[idx]?.map((s, i) => (
                                                <div key={i}
                                                     className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                                                            <span
                                                                                                className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1} </span>
                                                    <span
                                                        className="text-gray-700 font-medium text-sm">{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                    {selectedCert.examInfo.subjects.required && (
                        <div
                            className="bg-white rounded-xl p-5 border border-violet-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                                                        <span
                                                                            className="px-3 py-1 bg-violet-500 text-white rounded-lg text-sm font-bold">필수과목</span>
                            </div>
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {selectedCert.examInfo.subjects.required.map((s, i) => (
                                    <div key={i}
                                         className="flex items-center gap-2 p-3 bg-violet-50 rounded-lg border border-violet-100">
                                                                                <span
                                                                                    className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                                        <span
                                            className="text-gray-700 font-medium text-sm">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                <span
                                                                    className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm">📝</span>
                        시험 정보
                    </h4>
                    <div className="bg-white rounded-xl p-4">
                        <p className="text-gray-600">상세 시험 과목 정보가 준비 중입니다.</p>
                    </div>
                </div>
            )}

            {/* 합격 기준 */}
            {selectedCert.examInfo?.passStandard && (
                <div
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                <span
                                                                    className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm">✅</span>
                        합격 기준
                    </h4>
                    <div
                        className="bg-white rounded-xl p-5 border border-green-100">
                        <p className="text-gray-700 leading-relaxed">{selectedCert.examInfo.passStandard}</p>
                    </div>
                </div>
            )}

            {/* 지역별 선발인원 */}
            {selectedCert.examInfo?.regions && (
                <div
                    className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                                <span
                                                                    className="w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center text-sm">📍</span>
                        지역별 선발인원
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {selectedCert.examInfo.regions.map((r, i) => (
                            <div key={i}
                                 className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-100 hover:shadow-md transition-shadow">
                                <div
                                    className="text-sm text-gray-600 mb-1">{r.region}</div>
                                <div
                                    className="text-xl font-black text-rose-600">{r.quota}명
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 시험 일정 */}
            <div
                className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 border border-purple-100">
                <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                                            <span
                                                                className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm">📅</span>
                    시험 일정 및 준비 정보
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        className="bg-white rounded-xl p-4 border border-purple-100 text-center">
                        <div
                            className="text-purple-600 text-sm font-semibold mb-2">시험
                            일정
                        </div>
                        <div
                            className="text-gray-800 font-bold">{selectedCert.examSchedule?.round || selectedCert.examSchedule?.date || `${selectedCert.examSchedule?.year || 2025}년`}</div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-4 border border-purple-100 text-center">
                        <div
                            className="text-purple-600 text-sm font-semibold mb-2">준비
                            기간
                        </div>
                        <div
                            className="text-gray-800 font-bold">{selectedCert.duration?.min}~{selectedCert.duration?.max}개월
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-4 border border-purple-100 text-center">
                        <div
                            className="text-purple-600 text-sm font-semibold mb-2">예상
                            비용
                        </div>
                        <div
                            className="text-gray-800 font-bold">{selectedCert.cost?.total}</div>
                    </div>
                </div>
            </div>
        </>
    )
}