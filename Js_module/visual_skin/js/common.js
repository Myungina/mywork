/*전열변수*/
const $cat_id = document.getElementById('cat_id').value;
// 셀렉트 박스 열기
document.querySelectorAll('.select_txt').forEach(el => {
    el.addEventListener('click', e => {
        if (el.classList.contains('no_action')) return;

        const basicSelect = el.parentElement.querySelector('.basic_select');
        if (basicSelect) {
            basicSelect.classList.toggle('on');
        }

        const selectedA = document.querySelector('.select_link.selected');

        if (selectedA) {
            const scrollBox = document.querySelector('.selectBox_scroll ');
            scrollBox.scrollTo({
                top: selectedA.offsetTop - 53,
                left: 0,
                behavior: 'smooth'
            });
        }
        e.stopPropagation(); // html 클릭 이벤트 전파 방지
    });
});

// 특정 영역 제외 클릭 → 닫기
document.addEventListener('click', e => {
    document.querySelectorAll('.basic_select.on').forEach(box => {
        const selectArea = box.closest('.select_box_area');
        let selected_val = '';
        if (!selectArea || !selectArea.contains(e.target)) {
            box.classList.remove('on');
        }

        if (selected_val && $checkedInput.length > 0) {
            $checkedInput.prop('checked', true);
            $('.addOption')[0].scrollTo({
                top: $checkedInput.parent('li').position().top,
                left: 0,
                behavior: 'smooth',
            });
        }
    });
});

// 옵션 클릭 시 선택 및 닫기
document.querySelectorAll('.basic_select li label').forEach(item => {
    item.addEventListener('click', function (e) {
        const parentArea = item.closest('.select_box_area');
        const selectTxt = parentArea.querySelector('.select_txt');

        selectTxt.textContent = item.textContent; // 선택한 텍스트 넣기
        selectTxt.classList.remove('disable');

        // 닫기
        const basicSelect = parentArea.querySelector('.basic_select');
        basicSelect.classList.remove('on');

        e.stopPropagation();

    });
});

//카테고리 검색
//search category
const categorySearch = document.querySelectorAll('.sch_cate');
categorySearch.forEach((el) => {
    el.addEventListener('keyup', (event) => {
        event.preventDefault();
        let searchTxt = el.value; //검색어
        const basicSelect = el.closest('.select_box_area'); //찾기 영역
        const items = basicSelect.querySelectorAll('.basic_select  ul li'); //표시할 li
        console.log(searchTxt);
        items.forEach((li) => {
            const label = li.querySelector('a');
            if (!label) return;

            const text = label.textContent;

            if (text.includes(searchTxt) && searchTxt !== '') {
                li.style.display = ''; // 보이기

                // 검색어 하이라이트
                const regex = new RegExp(`(${searchTxt})`, 'gi'); // 대소문자 구분 없이
                label.innerHTML = text.replace(regex, `<span style="color:#405ee1; font-family:'noto6';">$1</span>`);
            } else if (searchTxt == '') {
                li.style.display = 'block'; // 숨기기
                label.innerHTML = text; // 원래 텍스트 복원
            } else {
                li.style.display = 'none'; // 숨기기
                label.innerHTML = text; // 원래 텍스트 복원
            }
        });

    });
});

//삭제
document.querySelectorAll('.cmBtn_delete').forEach(btn => {
    btn.addEventListener('click', function () {
        let $target_idx = this.dataset.idx;
        let confirm_txt = confirm('삭제하시겠습니까?');

        if (confirm_txt) {
        $.post('/cm/skin/ajax_main_visual.php', {type: 'get_delete', stx: $target_idx}, function (res) {
            if (res >= 1) {
                alert('삭제 되었습니다.');
                window.location.reload(true);
            } else if (res == 0) {
                alert('새로 고침 후 다시 시도 해주세요.');
                window.location.reload(true);
            } else {
                alert(res);
            }
        });
        } else {
            return false;
        }
    });
});
//popup
document.querySelectorAll('.btn_popupOpen').forEach(btn => {
    btn.addEventListener('click', function () {
        let target = this.dataset.target; // 오픈할 팝업 id
        const buttonOffset = this.getBoundingClientRect();
        let val = this.value;
        let id = this.id;

        document.querySelectorAll('.admCmpop').forEach(el => el.classList.remove('active'));
        let popup = document.getElementById(target);
        popup.classList.add('active');

        if (target == 'addOptionPop') {
            popup.style.top = buttonOffset.top + window.scrollY + 30 + 'px';
            popup.style.left = buttonOffset.left + window.scrollX + 'px';

            addOptionList(val, id);
        } else {
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';

            visualAjax(val, id);
        }
    });
});

//미리보기 , 연결 URL확인 , 쿠폰확인 , 상품확인
document.querySelectorAll('.wing_pop').forEach(btn => {
    btn.addEventListener('click', function (e) {
        let $this = e.target;
        let stx = $this.dataset.code;
        let stxArr = [];
        let type = this.name;  //타입확인 (미리보기/ 연결확인)
        let addHtml = '';
        let ajax_type = 'preview';
        let pop_title = '미리보기';
        const buttonOffset = $this.getBoundingClientRect();

        if (type == 'bannerUrlChk') {
            pop_title = '연결 URL확인';
        } else if (type == 'bannerCouChk') {
            pop_title = '쿠폰 확인';
            ajax_type = 'couponlist';
        } else if (type == 'bannerLecChk') {
            pop_title = '상품 확인';
            ajax_type = 'leclist';
        }

        //쿠폰, 상품은 n개 일 수 있음.
        if (stx.includes(',')) {
            stxArr = stx.split(',').map(el => el.trim());
        } else {
            stxArr = [stx];
        }

        //이미 생성되 있는 html삭제
        if (document.getElementById('popupDetailInfo')) {
            document.getElementById('popupDetailInfo').remove();
        }

        addHtml += `<div class="admCmPop admCmPop_xs active" id="popupDetailInfo">`;
        addHtml += ` <div class="admCmPop_inner">`;
        addHtml += `    <input type="button" class="cmBtn cmBtn_s cmBtn_close" value="X">`;
        addHtml += `    <h3>${pop_title}</h3>`;
        addHtml += `    <div>`;

        if (type == 'bannerPrv') {
            $.post('/cm/skin/ajax_main_visual.php', {type: ajax_type, stx: stx}, function (res) {
                console.log(res);
                if(res){
                    $big_title = res[0].big_title.replace(/\n/g, '<br>');
                    addHtml +=`
                    <div class="privew_area">
                        <div class="prv_inner" style="background: url('/data/cm/skin_visual_bn/${res[0].conn_img}') no-repeat center/cover;">
                            <div class="text_area">
                                <p class="pre_subTie">${res[0].mid_title}</p>
                                <h4 class="pre_Tie">${$big_title}</h4>
                                <a href="javascript:void(0)" class="prv_btn">${res[0].btn_txt}</a>
                            </div>
                        </div>
                    </div>
                    `;
                }
                $this.closest('td').insertAdjacentHTML("afterbegin", addHtml);

                let $this_pop = document.getElementById('popupDetailInfo');
                $this_pop.classList.add('preview');
                $this_pop.style.top = 10 + 'px';
                $this_pop.style.left = '100%';
                $this_pop.style.transform = 'translateX(-50%)';
            });
        } else if (type == 'bannerUrlChk') {
            addHtml += ` <a href="${stx}" class="mgb5 text-left" target="_blank">ㆍ ${stx}</a>
                    </div>
                </div>
            </div>`;
            $this.closest('td').insertAdjacentHTML("afterbegin", addHtml);

            let $this_pop = document.getElementById('popupDetailInfo');
            $this_pop.style.top = 30 + 'px';
            $this_pop.style.left = '50%';
        } else {
            $.post('/cm/skin/ajax_main_visual.php', {type: ajax_type, stx: stxArr}, function (res) {
            console.log(res)
                res.forEach(index => {
                    if (type == 'bannerCouChk') {
                        addHtml += `<p class="mgb5 text-left">ㆍ [${index.cp_id}] ${index.cp_name} [${index.cp_doc}]</p>`;
                    } else {
                        addHtml += `<p class="mgb5 text-left">ㆍ [${index.it_id}] ${index.it_name}</p>`;
                    }
                });
                addHtml += `
                        </div>
                    </div>
                </div>`;
                $this.closest('td').insertAdjacentHTML("afterbegin", addHtml);

                let $this_pop = document.getElementById('popupDetailInfo');
                $this_pop.style.top = 30 + 'px';
                $this_pop.style.left = '50%';
            });
        }
    });
});
//닫기
document.addEventListener('click', (e) => {
    if (e.target.closest('.cmBtn_close')) {
        const popup = e.target.closest('.admCmPop');
        if (popup) {

            popup.remove();
        }
    }
});
//취소
document.querySelectorAll('.cmBtn_cancel').forEach(btn => {
    btn.addEventListener('click', (e) => {
        let $this = e.target.id;

        if (confirm('등록을 취소하시겠습니까?')) {
            if($this == 'banner_search_close'){ 
                //순서지정 종료시 검색 리셋
                if(document.querySelector('input[name="bnTab"]')){
                    let page_tab = document.querySelector('input[name="parent_idx"]').value;
                    let select_reset = document.querySelector(`input[name="bnTab"][value="${page_tab}"]`);
                    let labelText = select_reset.nextElementSibling.textContent.trim();
                    select_reset.checked = true;
                    document.querySelector('.bnTypeSel').textContent = labelText;
                }
            }
            btn.closest('.admCmPop').classList.remove('active');
        } else {
            return false;
        }
    });
});

//순서지정 드래그 방식
$('.sortOrder').each(function () {
    $(this).sortable({
        items: 'tr',
        stop: function () {
            $(this).find('tr').each(function (i) {
                $(this).find('input[name="order"]').val(i + 1);
            });
        },
        helper: function (e, tr) {
            const $originals = tr.children();
            const $helper = tr.clone();
            $helper.children().each(function (index) {
                // td의 width를 원본에서 복사
                // 드래그 시 tr이 옹졸해지는 것 방지
                $(this).width($originals.eq(index).outerWidth());
            });
            return $helper;
        }
    });
});

//순서지정 팝업 검색 시
if(document.getElementById('banner_order_search')){
    document.getElementById('banner_order_search').addEventListener('click',function(){
        if(document.querySelector('input[name="bnTab"]')){
            let checkedVal = document.querySelector('input[name="bnTab"]:checked').value;
            setBnListOrd('banner_order' , checkedVal);
        }
    });
}

// 탭 , 배너순서지정 팝업 ajax
const visualAjax = (val, id) => {
    $type = id;
    addHtml = '';
    const visualTab = document.querySelector('.visual_tab');

    if (visualTab && visualTab.children.length > 0) {
        visualTab.replaceChildren();
    }
    if($type == 'banner_order'){
        document.getElementById('banner_order_search').click();
    }else{
        $.post('/cm/skin/ajax_main_visual.php', {type: $type, cat_id: $cat_id}, function (res) {
            if (res) {
                res.forEach(index => {
                    addHtml += `
                <tr>
                    <td>
                        <input type="hidden" name="idx" class="cmTextBox disabled " value="${index.idx}">
                        <input type="text" name="order" class="cmTextBox disabled tc fakeinput" value="${index.order}">
                    </td>
                    <td><input type="text" name="subject" class="cmTextBox w50" value="${index.subject}"></td>
                </tr>
            `;
                });
            } else {
                for (var i = 1; i <= 5; i++) {
                    addHtml += `
                <tr>
                    <td><input type="text" name="order" class="cmTextBox disabled tc fakeinput" value="${i}"></td>
                    <td><input type="text" name="subject" class="cmTextBox" value=""></td>
                </tr>`;
                }
            }
            visualTab.insertAdjacentHTML('beforeend', addHtml);
        });
    }
};

//배너 순서지정 팝업 리스트 출력
const setBnListOrd =  ($type , checkedVal) => {
    let addHtml = '';
    const bannerOrdList = document.querySelector('.banner_order_list');

    if (bannerOrdList && bannerOrdList.children.length > 0) {
        bannerOrdList.replaceChildren();
    }

    $.post('/cm/skin/ajax_main_visual.php', {type: $type, cat_id: $cat_id , parents_idx : checkedVal}, function (res) {
        //console.log(res);
        if (res) {
            res.forEach((item, i) => {
                addHtml += `
                    <tr>
                        <td>
                            <input type="hidden" name="idx" class="cmTextBox disabled" value="${item.idx}" disabled>
                            <input type="text" name="order" class="cmTextBox disabled tc fakeinput" value="${item.order}">
                        </td>
                        <td>${item.subject}</td>
                        <td>${item.status}</td>
                    </tr>
                `;
            });
        } else {
            addHtml += `
                <tr>
                    <td colspan="3"> 검색 결과가 업습니다.</td>
                </tr>`;
        }
        bannerOrdList.insertAdjacentHTML('beforeend', addHtml);
    });
};

//순서지정 업데이트하기
document.querySelectorAll('.cmBtn_create').forEach(btn => {
    btn.addEventListener('click',(e) => {
        $this = e.target;
        $type = $this.id;
        const wrap = $this.closest('.admCmPop');
        const tbody = wrap.querySelector('tbody');
        let sendData= [];
        const dateArr = tbody.querySelectorAll('tr');
        if($type == 'tab_order_create'){  //탭 순서, 제목 변경
            dateArr.forEach((tr, idx) => {
                const setDataArr = {};
                if(tr.querySelector('input[name="idx"]')){
                    setDataArr['idx'] = tr.querySelector('input[name="idx"]').value;
                }
                setDataArr['order'] = tr.querySelector('input[name="order"]').value;
                setDataArr['subject'] = tr.querySelector('input[name="subject"]').value;
                sendData[idx] = setDataArr;
            });
            $.post('/cm/skin/ajax_update.php', {type : $type , cat_id :$cat_id , sendData}, function (res) {
                if(res.result == 'success'){
                    alert("수정되었습니다.");
                    parent.location.reload();
                }
            });
        }else if($type == 'banner_order_create'){  //배너 순서
            dateArr.forEach((tr, idx) => {
                const setDataArr = {};
                setDataArr['idx'] = tr.querySelector('input[name="idx"]').value;
                setDataArr['order'] = tr.querySelector('input[name="order"]').value;
                sendData[idx] = setDataArr;
            });
            $.post('/cm/skin/ajax_update.php', {type : $type  , sendData}, function (res) {
                if(res.result == 'success'){
                    alert("수정되었습니다.");
                    parent.location.reload();
                }
            });
        }
    });
});