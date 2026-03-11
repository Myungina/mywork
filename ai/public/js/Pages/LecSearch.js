const LecSearch = ({
setShowAllCerts,
searchQuery,
setSearchQuery,
categories,
selectedCategory,
setSelectedCategory,
setActiveTab,
setIsFromAllCerts,
difficultyConfig,
filteredCerts,
setSelectedCert
}) => {
    return(
        <div className="glass rounded-3xl border border-white/50 shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">전체 자격증 ({filteredCerts.length}개)</h2>
                <button onClick={() => setShowAllCerts(false)}
                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Icon name="X" className="w-5 h-5"/>
                </button>
            </div>

            {/* 검색바 */}
            <div className="relative mb-4">
                <Icon name="Search"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <input type="text" placeholder="자격증명, 카테고리, 키워드 검색..." value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 focus:border-violet-400 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none transition-colors"/>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide ">
                {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {cat === "전체" ? "🔍 전체" : `${categoryConfig[cat]?.icon || ""} ${cat}`}
                    </button>
                ))}
            </div>

            {/* 자격증 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {filteredCerts.map(cert => (
                    <button key={cert.name} onClick={() => {
                        setSelectedCert(cert);
                        setActiveTab('overview');
                        setIsFromAllCerts(true);
                        setShowAllCerts(false);
                    }}
                            className="text-left p-4 bg-white hover:bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-violet-300 transition-all shadow-sm hover:shadow-md group">
                        <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${categoryConfig[cert.category]?.bg} ${categoryConfig[cert.category]?.text}`}>
                          {categoryConfig[cert.category]?.icon} {cert.category}
                        </span>
                            <span
                                className={`text-xs font-medium ${difficultyConfig[cert.difficulty]?.color}`}>
                          {difficultyConfig[cert.difficulty]?.emoji} {difficultyConfig[cert.difficulty]?.label}
                        </span>
                            {cert.badge && <span
                                className="px-2 py-0.5 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full font-bold">{cert.badge}</span>}
                        </div>
                        <h3 className="font-bold text-gray-800 group-hover:text-violet-600 transition-colors">{cert.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">{cert.description}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}