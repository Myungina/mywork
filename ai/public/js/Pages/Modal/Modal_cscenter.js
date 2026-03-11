    const Modal_cscenter = ({
    showCsmodal, setShowCsmodal , selectedCatId
}) => {

    const [categoryType, setCategoryType] = useState("자격증");          //카테고리타입 default:자격증
    const getDefaultCategory = (selectedCatId) => {              //들어온 cat_id에 따른 카테고리 타입 지정
        if (selectedCatId.startsWith("001")) return "자격증";
        if (selectedCatId.startsWith("002")) return "공무원";
        if (selectedCatId.startsWith("005002")) return "독학사";
        if (selectedCatId.startsWith("005")) return "학위/입시";
        if (selectedCatId.startsWith("011")) return "기타";
        return "";
    };

    const [categoryContent, setCategoryContent] = useState([]);         //과정 리스트 html 담을 변수
    const [counselDayList, setCounselDayList] = useState([]);           //상담 날자 담을 변수
    const [timeOptions, setTimeOptions] = React.useState([]);           //시간 담을 변수

    const [fav, setFav] = useState('');                                 //선택된 카테고리
    const [selectedDetailId, setSelectedDetailId] = useState('');       //선택된 카테고리 id
    const [selectedDetailText, setSelectedDetailText] = useState('');   //선택된 카테고리 이름
    const [fmbHp, setFmbHp] = useState('');                             //입력된 핸드폰 번호
    const [selectedDate, setSelectedDate] = React.useState("");         //선택된 날자
    const [selectedTime, setSelectedTime] = React.useState("");         //선택된 시간
    const [isAgree, setIsAgree] = useState(false);                      //개인정보 동의 여부

    /*카테고리타입 설정*/
    useEffect(() => {
        if (!selectedCatId) return;

        const defaultType = getDefaultCategory(selectedCatId);
        setCategoryType(defaultType);
    }, [selectedCatId]);

    /* 상담 가능 카테고리 API (cs:1 값만 불러옴)*/
    useEffect(() => {
        if (!categoryType) return;

        fetch('/popkon/ajax_open_fmb_cate_select.php', {
            method: 'POST',                  //해당 페이지 데이터 전송방식이 POST임..
            body: new URLSearchParams({
                fav_cate: categoryType
            })
        })
            .then(res => res.json())
            .then(data => {
                setCategoryContent(data);
            })
            .catch(err =>
                console.error(err+'현재 카테고리 :'+selectedCatId)
            );
    }, [categoryType]);

    /*팝업 오픈시 카테고리 자동선택*/
    useEffect(() => {
        if (!selectedCatId || !categoryContent.length) return;

        const found = categoryContent.find(
            item => String(item.favid) === String(selectedCatId)
        );

        if (found) {
            setSelectedDetailId(found.favid);
            setSelectedDetailText(found.fav);
        }
    }, [categoryContent, selectedCatId]);

    /*상담 날자api*/
    useEffect(() => {
        fetch(`/ai/api/csCenterApi.php?type=date`)
            .then(res => res.json())
            .then(setCounselDayList)
            .catch(console.error);
    }, []);

    /*상담 시간 */
    /*기존 jquery -> react 변경만함 */
    useEffect(() => {
        if (!selectedDate) return;

        const today = new Date();
        const selected = new Date(selectedDate);

        const isToday =
            today.getFullYear() === selected.getFullYear() &&
            today.getMonth() === selected.getMonth() &&
            today.getDate() === selected.getDate();

        let sTime;

        if (isToday) {
            const nowTime = today.getHours() + 1;
            sTime = (nowTime < 10 || nowTime > 18) ? 10 : nowTime;
        } else {
            sTime = 10;
        }

        const eTime = 19;
        const times = [];

        for (let i = sTime; i < eTime; i++) {
            if (i !== 12) {
                times.push(`${i}:00`);
            }
        }

        times.push("언제든가능");
        setTimeOptions(times);
        setSelectedTime("");
    }, [selectedDate]);

    /*상담 신청 submit*/
    const submitReservation = async () => {

        if (!selectedDetailId || !fmbHp) {
            alert('관심분야 선택과 휴대폰 번호 입력은 필수입니다.');
            return;
        }

        if (!selectedDate || !selectedTime) {
            alert('날짜와 시간을 선택해주세요.');
            return;
        }

        if (!isAgree) {
            alert('개인정보 동의를 하셔야 상담예약이 가능합니다.');
            return;
        }

        let hp = fmbHp.replace(/[^0-9]/g, '');

        if (!/^01[016789]\d{7,8}$/.test(hp)) {
            alert('올바른 전화번호를 입력하세요.');
            return;
        }

        if (hp.length === 11)
            hp = hp.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        else if (hp.length === 10)
            hp = hp.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

        let counseldate = selectedDate;
        let counseltime = selectedTime;

        if (counseldate === '언제든 가능') counseldate = '2018-00-00';
        if (counseltime === '언제든가능') counseltime = '00:00';

        const have_time = `${counseldate} ${counseltime}:00`;

        if (!window.confirm('무료 상담 신청을 하시겠습니까?')) return;

        try {
            const res = await fetch('/popkon/ajax_go_counsel.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: new URLSearchParams({
                    fav: selectedDetailText,   // 저장시 '감정평가사 상담 신청'으로 들어가기때문에 카테고리 이름 전송
                    hp,
                    have_time
                })
            });

            const result = await res.text();
            if (['1','2','3'].includes(result.trim())) {
                alert('상담 신청이 완료되었습니다.');
                resetForm();
            } else {
                alert('신청이 제대로 이루어지지 않았습니다.');
            }
        } catch (err) {
            alert('서버 오류가 발생했습니다.');
        }
    };
    const resetForm = () => { //저장 데이터 리셋
        setFav('');
        setFmbHp('');
        setSelectedTime('');
        setIsAgree(false);
    };

    if(!showCsmodal) return null;
    return(
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-xl min-w-fit w-96 h-fit overflow-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">☎️ 전문 상담 예약</h2>
                    <button onClick={() => setShowCsmodal(false)}
                            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                        <Icon name="X" className="w-5 h-5"/>
                    </button>
                </div>

                <div className="p-6 w-full h-fit rounded-base">
                    {/*<div dangerouslySetInnerHTML={{ __html: htmlContent }}/>*/}
                    <div className="w-full">
                        <div className="w-full flex gap-2 py-1 items-center">
                            <p className="w-1/4">관심분야</p>
                            <div className="w-3/4 flex gap-2">
                                <div className="w-[50%] relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center text-xs rotate-90">〉</div>
                                    <select
                                        className="block w-full px-3 py-2.5 border border-indigo-100 bg-white text-heading text-sm rounded-xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body appearance-none"
                                        name="fmb_cate"
                                        id="fmb_cate"
                                        value={categoryType}
                                        onChange={(e) => setCategoryType(e.target.value)}
                                    >
                                        <option value="자격증">자격증</option>
                                        <option value="공무원">공무원</option>
                                        <option value="독학사">독학사</option>
                                        <option value="학위/입시">학위/입시</option>
                                        <option value="기타">기타</option>
                                    </select>
                                </div>
                                <div className="w-[50%] relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center text-xs rotate-90">〉</div>
                                    <select
                                        className="block w-full px-3 py-2.5 border border-indigo-100 bg-white text-heading text-sm rounded-xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body appearance-none"
                                        name="fmb_detail"
                                        value={selectedDetailId}
                                        onChange={(e) => {
                                            const id = e.target.value;

                                            if (id === "999999") {  //상담 상품이 아닌경우 리스트에없어서 기타 선택해야됨.
                                                setSelectedDetailId(id);
                                                setSelectedDetailText("기타");
                                                return;
                                            }
                                            const found = categoryContent.find(
                                                item => String(item.favid) === String(id)
                                            );

                                            setSelectedDetailId(id);
                                            setSelectedDetailText(found?.fav || ''); //빈값으로 넘어가면 alert('신청이 제대로 이루어지지 않았습니다.) 나옴
                                        }}
                                    >
                                        <option value="">선택하세요</option>
                                        {categoryContent.map((val) => (
                                            <option key={val.favid} value={val.favid}>
                                                {val.fav}
                                            </option>
                                        ))}
                                        <option value="999999">기타</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex gap-2 py-1  items-center">
                            <p className="w-1/4">전화번호</p>
                            <div className="w-3/4 flex gap-2 flex-wrap ">
                                <input type="text"
                                       className="w-full px-3 py-2.5 border border-indigo-100 text-heading text-sm rounded-xl"
                                       name="fmb_hp"
                                       id="fmb_hp"
                                       placeholder="전화번호"
                                       value={fmbHp}
                                       onChange={(e) => setFmbHp(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex gap-2 py-1  items-center">
                            <p className="w-1/4">상담날자</p>
                            <div className="w-3/4 flex gap-2">
                                <div className="w-[50%] relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center text-xs rotate-90">〉</div>
                                    <select
                                        className="block w-full px-3 py-2.5 border border-indigo-100 bg-white text-heading text-sm rounded-xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body appearance-none"
                                        name="counseldate"
                                        id="fmb_counsel_date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    >
                                        <option value="">날짜선택</option>
                                        {counselDayList.map((item) => (
                                            <option key={item.counselday} value={item.counselday}>
                                                {item.counselday}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="w-[50%] relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center text-xs rotate-90">〉</div>
                                    <select
                                        className="block w-full px-3 py-2.5 border border-indigo-100 bg-white text-heading text-sm rounded-xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body appearance-none"
                                        name="counseltime"
                                        id="fmb_counsel_time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    >
                                        <option value="">시간선택</option>
                                        {timeOptions.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <table className="cs_agree_list">
                                <colgroup>
                                    <col style={{ width: '43%' }}/>
                                    <col style={{ width: '43%' }}/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>수집항목/목적</th>
                                    <th>보유기간</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>연락처/고객 전화상담</td>
                                    <td>문의답변 완료 후<br/>180일 이내 파기</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="w-full flex justify-center items-center">
                                <input type="checkbox"
                                       className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                                       id="fmb_chk_agree" name="individual_info" value="true"
                                       checked={isAgree}
                                       onChange={(e) => setIsAgree(e.target.checked)}
                                />
                                <label
                                    htmlFor="fmb_chk_agree"
                                    className="ml-3"
                                >
                                    개인정보 수집 및 동의 (필수)
                                </label>
                            </div>
                            <button
                                    className="w-full mt-5 py-3 rounded-2xl bg-violet-500 text-white hover:text-violet-500 font-semibold hover:bg-violet-100 transition-all flex items-center justify-center gap-2 text-base"
                                    onClick={submitReservation}
                            >
                                <Icon name="Phone" className="w-5 h-5"/> 상담 신청
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

