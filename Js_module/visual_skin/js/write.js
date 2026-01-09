const today = new Date();
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
let formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')} 00:00`;
let formattedDateEnd = `${nextMonth.getFullYear()}-${(nextMonth.getMonth() + 1).toString().padStart(2, '0')}-${nextMonth.getDate().toString().padStart(2, '0')} 00:00`;

$.datetimepicker.setLocale('ko');
let startDate = $('.in_datetime').datetimepicker();
startDate.datetimepicker({
    format: 'Y-m-d H:00',
    scrollMonth: false,
    scrollInput: false,
    onShow: function (ct, $i) {
    },
    onClose: function (ct, $i) {
    }
});
//기간셋팅
if(document.getElementById('it_datetime_s').value == ''){
    document.getElementById('it_datetime_s').value = formattedDate;
}

if(document.getElementById('uploadedFileDelBtn')){
    document.getElementById('uploadedFileDelBtn').addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('file_info').innerHTML = '';
        const area = document.querySelector('.img_area');
        if (area) {
            // 내부 img 제거
            const img = area.querySelector('img');
            if (img) img.remove();

            // 텍스트 추가
            area.textContent = '이미지를 선택해주세요';
        }
    });
}
//스크롤이벤트
const target_scroll = (topval) => {
    window.scrollTo({
        top: topval,
        behavior: "smooth"
    });
};
//글자수 제한 이벤트
const inputMaxLngCnt = (target_id , maxLength , maxLine) => {
    const $this = document.getElementById(target_id);
    const lines = $this.value.split('\n');
    let limitedLines = [];
    let warningShown = false;
    let warningTxt = '';
    for(let i = 0; i < lines.length; i++){
        if( i == maxLine){
            warningShown = true;
            warningTxt = '최대 ' + maxLength + '글자까지만 입력할 수 있습니다.';
            $this.parentElement.querySelector('.warning').textContent=warningTxt;
            break;
        }
        const line = lines[i];
        if(line.length > maxLength){
            limitedLines.push(line.slice(0,maxLength));
            warningShown = true;
            warningTxt = '최대 ' + maxLength + '글자 이내 , ' + maxLine + '줄까지만  입력할 수 있습니다.';
            $this.parentElement.querySelector('.warning').textContent=warningTxt;

        }else{
            limitedLines.push(line);
        }
    }
    $this.value = limitedLines.join('\n');
}
//input 활성 비활성 연결고리
document.querySelectorAll('.inputabled').forEach(input => {
    input.addEventListener('change', function() {
        let $target = this.dataset.target; // 선택된 개체랑 같이 활성화될 개체
        let $type = this.dataset.type; // 그 외 다른 개체들
        let $chkStatus = this.checked;
        let $thisVal = this.value;

        if ($chkStatus) {  // 체크 true
            if (!$type) { // target이 없을 때 (예: 전체 선택)
                document.querySelectorAll('.' + $type)
                    .forEach(el => el.classList.add('disabled'));
                if ($thisVal === 'allDay') {
                    document.getElementById('it_datetime_e').value = "";
                }
                if ($thisVal === 'setdateTime') {
                    document.getElementById('it_datetime_e').value = formattedDateEnd;
                }
            } else { // target이 있을 때
                document.querySelectorAll('.' + $type)
                    .forEach(el => el.classList.add('disabled'));

                document.querySelectorAll('.' + $target)
                    .forEach(el => el.classList.remove('disabled'));
            }
            if($type == 'inputabled_ty'){
                $('.addTermsList ').children().remove();
                document.querySelector('.setbnLink').value = '';
            }
            if($thisVal == 'allDay'){
                document.getElementById('it_datetime_e').value = '';
            }
            $('.admCmPop.active').removeClass('active');
        } else { // 체크 false
            document.querySelectorAll('.' + $type)
                .forEach(el => el.classList.add('disabled'));
            document.querySelectorAll('.' + $target)
                .forEach(el => el.classList.remove('disabled'));

        }

    });
});

//큰글자 입력 제한
document.getElementById('big_title').addEventListener('keyup' , function(e){
    let this_id = this.id;
    inputMaxLngCnt(this_id , '11', '2');
});
document.getElementById('mid_title').addEventListener('keyup' , function(e){
    let this_id = this.id;
    inputMaxLngCnt(this_id , '25', '1');
});
//이미지 첨부
document.getElementById('conn_img').addEventListener('change',function(e){
    const file = this.files[0];
    const img = new Image();
    const fileInput = e.target;
    const fileInfo = document.getElementById('file_info');
    const sizeArr = [1100,400]; //이미지 사이즈 미정
    const file_prev = window.URL.createObjectURL(file);
    img.src = file_prev;

    //console.log(sizeArr)
    if(file){
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // 허용된 확장자 목록
        const fileName = file.name.toLowerCase(); // 파일 이름 (소문자 변환)
        // 확장자 확인
        if (!allowedExtensions.test(fileName)) {
            alert('허용되지 않는 파일 형식입니다. (jpg, jpeg, png, gif만 가능)');
            e.target.value == '' // 입력 초기화
            return;
        }

        img.onload = function(){
            const width = this.width;
            const height = this.height;
            if (width != sizeArr[0] || height != sizeArr[1]) {
                alert(`${sizeArr[0]}*${sizeArr[1]} 이내로 등록 가능합니다\n`);
                fileInput.value = '';
                return;
            }else {
                // div 생성
                const fileList_html = document.createElement('div');
                fileList_html.classList.add('list_img');

                // span 파일명
                const fileName_html = document.createElement('span');
                fileName_html.textContent = file.name;
                fileName_html.style.marginRight = '5px';

                // 삭제 버튼
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.setAttribute('data-target', 'list_img');
                deleteButton.classList.add('cmBtn', 'cmBtn_xs', 'bg-black');


                // 삭제 버튼 클릭 이벤트
                deleteButton.addEventListener('click', () => {
                    fileInput.value = ''; // 파일 인풋 초기화
                    document.querySelectorAll('.list_img').forEach(el => el.remove());
                    document.querySelector('.img_area').innerHtml = '이미지를 등록하세요.';
                });

                // 기존 동일 class 요소 제거
                document.querySelectorAll('.list_img').forEach(el => el.remove());

                fileList_html.append(
                    fileName_html,
                    `(${file.size}MB) `,
                    deleteButton
                );
                //fileInfo.append(fileList_html);
                document.getElementById('file_info').appendChild(fileList_html);
            }
        };
        img.src = URL.createObjectURL(file);
        previewImgFn(img.src);
    }
});
//쿠폰 , 무료상품 검색
document.getElementById('popup_option_search').addEventListener('click',function(e){
    let target = this.closest('form').querySelectorAll('.cmTextBox');
    let stx = '';
    let target_id ='';
    let type = '';

    target.forEach(el => {
        if (window.getComputedStyle(el).display === 'block') {
            stx = el.value;
            target_id = el.id;
        }
    });

    if(target_id == 'couponId'){
        type = 'couponlist';
    }else{
     type = 'leclist';
    }
    optionAjaxFn(type,stx);
})
//쿠폰틍록 / 무료상품 등록
const addOptionList = (type, thisid) => {
    let thisVal= '';

    if (type === '쿠폰등록') {
        document.getElementById('couponId').style.display = 'block';
        document.querySelectorAll('.catelist, #productId, .productType').forEach(el => {
            el.style.display = 'none';
        });
        thisVal = 'couponlist';

    } else if (type === '상품등록') {
        document.getElementById('productId').style.display = 'block';
        document.querySelectorAll('.catelist, #couponId , .productType').forEach(el => {
            el.style.display = 'none';
        });
        thisVal = 'leclist';
    }  else if (type == '카테고리') {  //카테고리
        document.querySelectorAll('.catelist, .productType , .add_option_all_wrap').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('#productId ,#couponId').forEach(el => {
            el.style.display = 'none';
        });
        thisVal = 'cate';
    }else {
        alert("error");
    }
    optionAjaxFn(thisVal,'');
};
//쿠폰/무료강의 등록 Ajax
const optionAjaxFn = (type, stx) => {
    let $stx = stx;
    let $type = type;
    let addHtml = '';

    $.post('/cm/skin/ajax_main_visual.php', {type: $type, stx: $stx}, function (res) {
        if (res == '100') {
            console.log("err");
        } else {
            if (res) {
                const elems = document.querySelectorAll('.addOption li');

                if (elems.length > 0) {
                    elems.forEach(el => el.remove());
                }
                // 쿠폰 목록을 HTML로 변환
                if($type == 'couponlist'){
                    res.forEach(index => {
                        addHtml += `
                        <li class="d-flex">
                            <p>[${index.cp_id}] ${index.cp_name} [${index.cp_price.toLocaleString()}할인]</p>
                            <input type="button" name="event_coupon_id" id="coupon_${index.cp_id}" data-code="${index.cp_id}" class="cmBtn cmBtn_s addListBtn" value="추가">
                        </li>
                        `;
                    });
                }else{
                    res.forEach(index => {
                        addHtml += `
                        <li class="d-flex">
                            <p>[${index.it_id}] ${index.it_name}</p>
                            <input type="button" name="free_lec_id" id="coupon_${index.it_id}" data-code="${index.it_id}" class="cmBtn cmBtn_s addListBtn" value="추가">
                        </li>
                        `;
                    });
                }

                document.querySelector('.addOption').insertAdjacentHTML('beforeend' ,addHtml);
                document.querySelector('.addOption').classList.add('scroll');
            } else {
                addHtml += `<li class="no_list tc">검색 내역이 없습니다.</li>`;
                $('.addOption').html(addHtml);
            }
        }
    });
};

//상품 추가시
document.querySelector('.addOption').addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('addListBtn')){
        let el = e.target;
        let $this = el.name;
        let $this_val = el.dataset.code;
        let addText = el.previousElementSibling.textContent;
        let target_html = '';
        if($this == 'event_coupon_id') {
            target_html = 'couponType_list';
        }else{
            target_html = 'freelecType_list';
        }
         makeHtmlAddOption($this, $this_val,  addText , target_html);
    }
});

//카테고리 /상품/쿠폰 삭제
const del_cat = (target) => {
    document.querySelectorAll('.item_' + target).forEach(el => {
        const parent = el.closest('.add_item');
        if (parent) parent.remove();
    });
    return false;
};

const makeHtmlAddOption = ($this, $this_val , addText , target_html) =>{
    $input_name = '';
    if (document.querySelectorAll(".item_" + $this_val).length === 0) {
        if(target_html == 'couponType_list'){
            $input_name = "conn_cp[]";
        }else{
            $input_name = "conn_lec[]";
        }
        console.log(target_html);
        let addHtml = `<div class="add_item">`;
        addHtml += `<div class="item_${$this_val}">`;
        addHtml += `<input type="hidden" value='${$this_val}' name='${$input_name}'>`;
        addHtml += `${addText}`;
        addHtml += `<span class="cmBtn cmBtn_xs choice-delete" onclick="del_cat('${$this_val}');">x</span>`;
        addHtml += `</div>`;
        addHtml += `</div>`;

        document.querySelector('.'+target_html).insertAdjacentHTML('beforeend', addHtml);
    } else {
        alert('이미 등록되었습니다.');
        return false;
    }
};

//획인,등록버튼
document.querySelectorAll('.cmBtn_create').forEach(btn  =>{
    btn.addEventListener('click', function(e){
        let el = e.target;
        let $this = el.id;
        if(!$this || $this == ''){
            el.closest('.admCmPop').classList.remove('active');
            document.querySelectorAll('input[type="radio"], input[type="text"], input[type="checkbox"]')
                .forEach(el => el.disabled = false);
        }else if($this == 'skin_bn_create'){
            CreateSkinBn();
        }
    });
});

//취소,목록버튼
document.querySelectorAll('.cmBtn_cencle , .back_history').forEach(btn => {
    btn.addEventListener('click',function(){
        let confirm_txt = confirm('취소하시겠습니까?');
        if(confirm_txt){
            history.back();
        }
    });
});


//등록하기 유효성
const CreateSkinBn = () =>{
    let isValid = true;
    const target = document.querySelector('.banner_rel_wrap');
    const sub_txt_lines = document.getElementById('big_title').value.split('\n');
    var banner_rel_top = '';
    if (target) {
        banner_rel_top = target.getBoundingClientRect().top + window.pageYOffset - 50;
    }
    //배너명 누락
    if(!document.getElementById('subject').value){
        alert('배너명을 입력해 주세요.');
        document.getElementById('subject').focus();
        return false;
    }
    
    //기간 설정 누락
    if(document.getElementById('bndate_all').checked && !document.getElementById('it_datetime_s').value){
        alert('기간을 설정하세요.');
        document.getElementById('it_datetime_s').focus();
        return false;
    }else if(document.getElementById('bndate_set').checked && !document.getElementById('it_datetime_e').value){
        alert('기간을 설정하세요.');
        document.getElementById('it_datetime_e').focus();
        return false;
    }
    //기간 설정 오류
    if(document.getElementById('bndate_set').checked && (document.getElementById('it_datetime_s').value > document.getElementById('it_datetime_e').value)){
        alert("시작 날짜는 종료 날짜보다 이전이어야 합니다.");
        document.getElementById('it_datetime_s').focus();
        return false;
    }


    // 배너 이미지 누락
    if ( !document.querySelector(".list_img") && !document.getElementById("conn_img").value) {
        alert("이미지를 등록하세요.");
        return false;
    }

    //배너 내용 누락
    if(!document.getElementById('mid_title').value){
        alert('글자를 입력하세요');
        document.getElementById('mid_title').focus();
        return false;
    }

    const big_title_arr = document.getElementById('big_title').value.split('\n');
    if(!document.getElementById('big_title').value  || sub_txt_lines.length < 2 || big_title_arr[0].length < 1 || big_title_arr[1].length <1){
        alert('글자를 입력하세요');
        document.getElementById('big_title').focus();
        return false;
    }


    if(!document.getElementById('btn_txt').value){
        alert('글자를 입력하세요');
        document.getElementById('btn_txt').focus();
        return false;
    }



    //배너 연결 누락
    if (document.getElementById('bn_link_set').checked) {
        if (!document.getElementById('conn_url').value) {
            alert("URL을 입력하세요.");
            document.getElementById('conn_url').focus();
            return false;
        }
    }
    //배너연결 -> 쿠폰누락
    if (document.getElementById('bn_coupon_set').checked) {
        let linkTarget = document.querySelector(".couponType_list").children.length;
        if (linkTarget == 0 || linkTarget < 1) {
            alert("쿠폰을 선택해 주세요");
            target_scroll(banner_rel_top);
            return false;
        }
    }

    //배너연결 -> 상품누락
    if (document.getElementById("bn_freelec_set").checked) {
        let linkTarget = document.querySelector(".freelecType_list").children.length;
        if (linkTarget == 0 || linkTarget < 1) {
            alert("상품코드를 등록하세요.");
            target_scroll(banner_rel_top);
            return false;
        }
    }


    if(isValid){
        if (confirm('등록 하시겠습니까?')) {
            document.getElementById('skinBnCre').submit();
        }else{
            return false;
        }
    }
};
