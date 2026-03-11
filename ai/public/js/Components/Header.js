//Header
const Header = ({
    onReset,
    onShowAll,
    onShowCompare,
    compareCount
}) => {
    return (
        <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg shadow-violet-200 mb-4">
                <Icon name="Sparkles" className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-semibold">AI 맞춤 추천</span>
            </div>

            <h1
                className="text-4xl md:text-5xl font-extrabold mb-2 cursor-pointer"
                onClick={onReset}
            >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 transition-all">
          시대에듀
        </span>
            </h1>

            <p className="text-lg text-gray-600 font-medium">
                AI 강의·교재 추천 시스템
            </p>

            {/* 빠른 메뉴 */}
            <div className="flex justify-center gap-3 mt-5">
                <button
                    onClick={onShowAll}
                    className="px-5 py-2.5 text-sm bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-violet-300 rounded-full text-gray-700 font-medium transition-all shadow-sm flex items-center gap-2"
                >
                    <Icon name="Search" className="w-4 h-4" /> 전체 자격증 검색
                </button>

                {compareCount > 0 && (
                    <button
                        onClick={onShowCompare}
                        className="px-5 py-2.5 text-sm bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-full text-white font-medium transition-all shadow-lg shadow-violet-200 flex items-center gap-2"
                    >
                        <Icon name="Filter" className="w-4 h-4" /> 비교 ({compareCount})
                    </button>
                )}
            </div>
        </header>
    )
}
