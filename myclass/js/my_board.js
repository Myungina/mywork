$(document).ready(function() {
    console.log('고객센터 js');
    // 검색어 지우기
    $('.search_del').on('click',function(){
        $('#sch-txt').val('');
        $(this).hide();
    });

    //검색어 작성시 delete버튼 나옴
    $('#sch-txt').keyup(function(){
        $('.search_del').show();
    })
});

// 삭제 검사 확인
function del(href) {
    if(confirm("게시물을 삭제하시겠습니까?")) {
        if (g4_charset.toUpperCase() == 'EUC-KR')
            document.location.href = href;
        else
            document.location.href = encodeURI(href);
    }
}



