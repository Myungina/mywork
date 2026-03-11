const Modal_compare = ({
setShowCompare,
compareList,
categoryConfig,
difficultyConfig,
setCompareList
}) => {
    if(compareList.length == 0) return null;
    return(
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">📊 자격증 비교</h2>
                    <button onClick={() => setShowCompare(false)}
                            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                        <Icon name="X" className="w-5 h-5"/>
                    </button>
                </div>
                <div className="p-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="border-b-2 border-gray-100">
                            <th className="py-3 px-4 text-left text-gray-500 font-semibold">항목</th>
                            {compareList.map(cert =>
                                <th key={cert.name} className="py-3 px-4 text-left font-bold text-gray-800">{cert.name}</th>
                            )}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">카테고리</td>
                            {compareList.map(cert =>
                            <td key={cert.name} className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryConfig[cert.category]?.bg} ${categoryConfig[cert.category]?.text}`}>{cert.category}</span>
                            </td>
                            )}
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">난이도</td>
                            {compareList.map(cert =>
                            <td key={cert.name} className={`py-3 px-4 font-medium ${difficultyConfig[cert.difficulty]?.color}`}>{difficultyConfig[cert.difficulty]?.emoji} {difficultyConfig[cert.difficulty]?.label}</td>
                            )}
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">준비기간</td>
                            {compareList.map(cert => <
                            td key={cert.name} className="py-3 px-4 text-gray-800">{cert.duration?.min}~{cert.duration?.max}개월</td>
                            )}
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">합격률</td>
                            {compareList.map(cert =>
                            <td key={cert.name} className="py-3 px-4 text-gray-800">{cert.passRate?.overall || '-'}%</td>
                            )}
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">예상비용</td>
                            {compareList.map(cert =>
                            <td key={cert.name} className="py-3 px-4 text-gray-800">{cert.cost?.total}</td>
                            )}
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">연봉(중견)</td>
                            {compareList.map(cert =>
                            <td key={cert.name} className="py-3 px-4 text-emerald-600 font-semibold">{cert.salary?.mid ? `${cert.salary.mid.toLocaleString()}만원` : '-'}</td>
                            )}
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">전망</td>
                            {compareList.map(cert =>
                            <td key={cert.name} className="py-3 px-4 text-amber-500">{"⭐".repeat(cert.outlook || 3)}</td>
                            )}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
                    <button onClick={() => setCompareList([])}
                            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">초기화
                    </button>
                    <button onClick={() => setShowCompare(false)}
                            className="px-6 py-2 text-sm bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-semibold shadow-lg">닫기
                    </button>
                </div>
            </div>
        </div>
    )
}