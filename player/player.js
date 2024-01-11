
$(document).ready(function(){
    // 콜러스플레이어 컨트롤 함수
    KollusController();

    //스크롤바 커스텀
    $(".play_info_area, .listSelectbox ul").mCustomScrollbar();

    // 교안문의 체크
    $("#book_Chk_Y").on("change",function() {
        if ($(this).is(":checked")) {
            $("#wr_teaching_plan").val('1');
        } else{
            $("#wr_teaching_plan").val('');
        }
    });

    //학습질문 도서 없는경우
    //select_none 클래스 추가
    if($('#qna_type option').size() == 1){
        $('#qna_type').parent('div').addClass('select_none');
    }

    // 학습질문 도서일경우 하단 댑스 2 show
    $('#qna_type').on('change',function(){
        /* console.log($(this).val()); */
        if($(this).val() == 'book'){
            $('.qna_book').show();
            $('.gyoan_area, #LecQnA .time_setting_area , .player_rela_book').hide();
            $('#qna_book_type option:eq(0)').prop('selected','selected');//선택값 초기화
        }else{
            $('.qna_book').hide();
            $('.gyoan_area, #LecQnA .time_setting_area, .player_rela_book').show();
        }
    })
    //input text 입력 제한
    $('#subject_book_page , .time_val').on('keyup',function(){
        only_number(this);
        inputNumberFormat(this);
    })

    // 오른쪽 사용자 메뉴 탭관련 fn
    $('.gnb_area li').each(function(){
        $(this).children('a').on('click',function(){
            event.returnValue = false;
            var tabId = $(this).attr('href');

            if(tabId == '#noarea'){
                return false;
            }else{
                if(tabId == '#LecBookmark') {
                    // 북마크 탭 누를때 북마크 리스트 받아오기
                    getBMark();
                }
                $(this).parent('li').siblings().children('a').removeClass('selected');
                $(this).addClass('selected');

                $('.play_info_area').removeClass('selected');

                $(this).parents('.clipInfoArea').find(tabId).addClass('selected');
            }


        })
    })

    //셀렉트박스 공통
    $('.openlistSelect').on('click',function(){
            var thisSelect = $(this).attr('data-select');
            $(thisSelect).toggleClass('slideDown');
    })


    $('html').on('click',function(e){
        if($('.openlistSelect').has(e.target).length === 0){
            $('.listSelectbox').removeClass('slideDown');
        }
    })

    //북마크 클릭
    $(document).on('click','.bmark_save_index',function(){
        $('.bmark_play_list li').removeClass('selected');
        $(this).parents('li').addClass('selected');
        $(this).find('em').addClass('col-lightblue');
        $(this).parent('li').siblings('li').find('em').removeClass('col-lightblue');
    })
});

// 앞자리0이면 없애
function number_form() {
    var number = $("#subject_book_page").val();
    var formatNum = number.replace(/(^0+)/, "");

    $("#subject_book_page").val(formatNum);
}

// TEXTAREA 최대값 체크
function fn_TextAreaInputLimit(type) {
    if(type == "bm") {
        var tempText = $("#"+type+"_content");
    } else {
        var tempText = $("[name='modify_index_"+type+"']");
    }
    var tempChar = "";                                        // TextArea의 문자를 한글자씩 담는다
    var tempChar2 = "";                                        // 절삭된 문자들을 담기 위한 변수
    var countChar = 0;                                        // 한글자씩 담긴 문자를 카운트 한다
    var tempHangul = 0;                                        // 한글을 카운트 한다
    var maxSize = 100;                                        // 최대값

    // 글자수 바이트 체크를 위한 반복
    for(var i = 0 ; i < tempText.val().length; i++) {
        tempChar = tempText.val().charAt(i);

        // 한글일 경우 2 추가, 영문일 경우 1 추가
        if(escape(tempChar).length > 4) {
            countChar += 2;
            tempHangul++;
        } else {
            countChar++;
        }
    }

    // 카운트된 문자수가 MAX 값을 초과하게 되면 절삭 수치까지만 출력을 한다.(한글 입력 체크)
    // 내용에 한글이 입력되어 있는 경우 한글에 해당하는 카운트 만큼을 전체 카운트에서 뺀 숫자가 maxSize보다 크면 수행
    if((countChar-tempHangul) > maxSize) {
        alert("최대 글자수를 초과하였습니다.");

        tempChar2 = tempText.val().substr(0, maxSize-1);
        tempText.val(tempChar2);
    }
}

// 인풋 숫자
function only_number(target){
    target.value = target.value.replace(/[^0-9]/g,'');
}
//입력한 문자열 전달
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}
//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}
//우측메뉴닫기
function MenuControlFn(me){
    event.returnValue = false; //이벤트실행ㄴ

    var $this = $(me).children('a').attr('id');
    var menu_width = $('.clipInfoArea').width();
    $('.clipInfoArea').toggle();

    if($('#'+$this).hasClass('fold') === true){  //메뉴 열었을때
        $('#'+$this).text("◀닫기");
        window.resizeBy((menu_width), 0);
        $('.videoPlayer').removeClass('fullscreenarea');
        //$('.video_player_title').hide();
    }else{													//메뉴 닫았을때
        $('#'+$this).text("▶열기");
        window.resizeBy(-(menu_width), 0);
        $('.videoPlayer').addClass('fullscreenarea');
        //$('.video_player_title').show();
    }
    $('#'+$this).toggleClass('fold show'); // 디폴트:fold

}

/* 파일 스크립트 */
var up_cont=0;
function fileup(file){
    var upload_count = 2;
    if ($(".file_info .delete_btn").length >= upload_count){
        alert("최대 "+upload_count+"개 까지만 파일 업로드가 가능합니다. ");
        return false;
    }

    if (file.value != "" ){
        // 사이즈체크
        var maxSize  = 5242880
        var fileSize = 0;
        try {
            fileName = file.files[0].name;
            fileSize = file.files[0].size;
        }catch (e) {}

        if (!fileName) {
            fileName = $(file).val();
        }

        if(fileSize > maxSize){
            alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.    ");
            $(file).val("");
                $(file).focus();
            return false;

        }

        $(file).attr("name",'bf_file[]');
        $(file).attr("data-filename",'fileName');
        $(file).removeClass("uploadBtn");
        $(file).removeAttr("id");
        $(file).addClass("upcnt_"+up_cont);
        $('.file_real').append(file);

        var file_size_k=(fileSize/1000).toFixed(1);
        $('.file_add_list').append("<li class='file_info "+up_cont+"'><i class='icon-xs icon-file'></i>&nbsp;<p>"+fileName+"</p><span class='delete_btn' onclick='del_custom_file("+up_cont+")'><i class='icon-xs icon-delete'></i></span></li>");
        $('.file_add_btn_wrap label').append('<input type="file" id="uploadBtn" class="uploadBtn" onchange="fileup(this);" style="display:none;">');
        up_cont++;
    }
}
//파일삭제
function del_custom_file(th){
    $('.upcnt_'+th).remove();
    $(".file_info."+th).remove();
}
/* 파일 스크립트 */