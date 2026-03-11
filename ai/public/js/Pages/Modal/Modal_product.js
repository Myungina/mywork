const Modal_product = ({
showproduct,
setShowproduct,
selectedCatId,
cateName
}) => {
    const { useEffect, useState } = React;
    const [list, setList] = useState([]); //상품 리스트
    const [cnt, setCnt] = useState("0");  //상품 전체 갯수

    useEffect(() => {
        if (!selectedCatId) return;
        fetch(`/ai/api/productApi.php?cat_id=${selectedCatId}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setList(data.list);  //상품 목록
                setCnt(data.total_count);  //전체 상품 카운트
            })
            .catch(err => console.error(err));
    }, [selectedCatId]);

    if(!showproduct) return null;
    return(
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full h-full md:max-h-[90vh] overflow-hidden  bg-violet-50">
                <div className="py-2 px-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl">
                    <div className="w-full">
                        <h2 className="text-xl font-bold text-gray-800 text-white">강의 안내</h2>
                    </div>
                    <button onClick={() => setShowproduct(false)}
                            className="text-white hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                        <Icon name="X" className="w-5 h-5"/>
                    </button>
                </div>
                <div className="p-6 pb-0 w-full h-[90%] rounded-base">
                    <div className="flex flex-row justify-between items-center mb-4 ">
                        <div className="flex sitems-center gap-2">
                            <div
                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
                                <Icon name="GraduationCap" className="w-7 h-7 text-white"/>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{cateName} 강의 보기</h2>
                                <p className="text-gray">
                                        [{cnt}개 강의]
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-y-auto h-[87%] max-h-90">
                        {cnt === 0 ? (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg py-10">
                                등록된 강의가 없습니다
                            </div>
                        ) : (
                            Object.entries(list)
                                .sort(([, groupA], [, groupB]) => {
                                    const sortA = groupA.items?.[0]?.it_sorting_idx ?? 0;
                                    const sortB = groupB.items?.[0]?.it_sorting_idx ?? 0;
                                    return sortA - sortB;
                                })
                                .map(([infoId, group]) => ( /*infoId :객체키 , group: 상품(items)*/
                            <React.Fragment key={infoId}>
                            <h3 className="text-xl font-bold product_deps_title">
                                {group.title}
                            </h3>
                            <ul className="w-full mb-10 last:mb-0" key={infoId}>
                                {group.items.map(item => (
                                <li className="w-full  border px-5 py-5 mb-3 last:mb-0 rounded-xl bg-white">
                                    {/*상품 해시태그*/}
                                    {item.cm_benefit && (
                                        <div className="badge_wrap">
                                            {item.cm_benefit
                                                ?.split(/<br\s*\/?>/i)
                                                .filter(Boolean)
                                                .map((text, idx) => (
                                                    <span key={idx} className="badge">
                                              {text}
                                            </span>
                                                ))}
                                        </div>
                                    )}


                                    {/*상품 정보*/}
                                    <div>
                                        <h2 className="mb-1 text-xl font-bold text-gray-800 break-keep" dangerouslySetInnerHTML={{ __html: item.it_info_name }}/>
                                        <div className="flex justify-start items-start text-sm text-gray-800 gap-1">
                                            <p className="font-semibole min-w-fit">수강 기간 :</p>
                                            <p className="break-keep"
                                                dangerouslySetInnerHTML={{ __html: item.it_notice_9 }}
                                            />
                                        </div>
                                    </div>

                                    {/*상품 가격*/}
                                    <div className="w-full flex md:flex-row flex-col pt-4 mt-4
                                                    gap-2 md:gap justify-between items-end border-t border-stone-200 ">
                                        <div className="flex flex-col md:flex-row
                                                        gap-1 md:gap-3 justify-start md:justify-center items-end md:items-end">
                                            {item.max_coupon_list && (
                                                <div className="coupon_set_info">
                                                    <span className="sale_count">{item.discount_calculation}만원 이상 할인</span>
                                                    <span className="origin_price">{item.it_price_1}원</span>
                                                </div>
                                            )}
                                            <h4 className="total_price">{item.price_to_coupon}원</h4>
                                        </div>
                                        <a href={item.it_link_info} target="_blank"
                                           className="w-full md:w-auto flex px-3 py-2
                                           justify-center items-center
                                           rounded-md text-white bg-gradient-to-br from-purple-600 to-blue-500
                                           hover:bg-gradient-to-bl
                                           focus:ring-4
                                           focus:outline-none
                                           focus:ring-blue-300
                                           dark:focus:ring-blue-800
                                           hover:shadow-lg">
                                            <Icon name="ExternalLink"  className="w-3 h-3 mr-2 " />자세히 보기
                                        </a>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            </React.Fragment>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

