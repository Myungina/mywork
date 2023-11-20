<script>

    $(document).ready(function() {
        // 게시판탭, 수강회원탭 누를때 서브밋돌아가게할거임
        $(".cmListMenu_t2.clear-after a").click(function(me) {
            studyChange(me);
        });
    
        // 글자 수 제한 및 말줄임표 처리
        $('.selectedStudybook > option').each(function(){
            var length = 65; //표시할 글자 수 정하기
    
            $(this).each(function(){
            if($(this).text().length >= length){
                $(this).text($(this).text().substr(0, length) + '...'); //지정한 글자수 이후 표시할 텍스트 '...'
                }
            });
        }); 
        
        // 글자 수 제한 및 말줄임표 처리
        $('.study_book_cmListTit > a').each(function(){
            var length = 50; //표시할 글자 수 정하기
    
            $(this).each(function(){
            if($(this).text().length >= length){
                $(this).text($(this).text().substr(0, length) + '...'); //지정한 글자수 이후 표시할 텍스트 '...'
                }
            });
        });  

         //강의 학습자료 
         if($(".my_study_lec .cat_sel option").length == 1){
            $(".my_study_lec .cat_sel").parent('.cmSelectBoxArea').addClass('select_none bg-white');
        } else if ($(".my_study_lec .cat_sel option").length == 0) {
            $('.my_study_lec .membershipAddArea').hide();
            $('.search-group.my_study_lec_select').hide();
            $('.my_study_lec_tab').hide();
        }
        
        //도서 학습자료 
        if($("#it_id option").length == 1){
            $("#it_id").parent('.cmSelectBoxArea').addClass('select_none bg-white');
        } else if ($("#it_id option").length == 0) {
            $('.my_study_book .membershipAddArea').hide();
            $('.search-group.my_study_book_select').hide();
            $('.my_study_book_tab').hide();
        }             

        //전체 자료는 "전체" 한개뿐이어서 그냥 select_none 클래스 박았습니다
    });

    function studyChange(me) {
        // 탭, 셀렉트박스누를때 게시판바꾸기
    
        $("[name='wr_3']").val($(me.target).attr("data-wr3"));
        if($(me.target).hasClass("tableBtn")) {
            $("[name='table']").val($(me.target).attr("href").split("#")[1]);
        }
        if($(me).hasClass("cat_sel") || $(me).attr("id") == "it_id") {
            $("[name='table']").val('');
        }
        $("[name='sel_id']").val($("#cat_id").val());
        $("[name='book_id']").val($("#it_id").val());
        if(!$(me.target).hasClass("wr_3Type")) {
            $("[name='stx']").val('');
            $("[name='sfl']").val('');
        }
        $("#fsearch").submit();
    };

    </script>
        
    {? _clientip == '119.192.180.112' || _clientip == '119.192.180.119'}
        <!-- 변수 이름을 적어놨습니당 -->
        <style>
            .fromBtn {
                cursor: pointer;
                z-index: 9999;
                padding: 4px 5px;
                color: #000;
                border: 1px solid #918d11;
                border-radius: 5px;
                background: #ffc2bc;
                font-size: 12px;
            }
        </style>
        <div>
            <span class="fromBtn" onclick="$(this).next().toggle();" style="top:90px;right: 100px;position: absolute;">변수 이름을 적어놨습니당</span>
            <textarea cols="40" rows="20" style="top:120px;right: 100px;position: absolute; display: none;">
                "arr_cate" // 과정 리스트
                "arr_cnt" // 과정 리스트 카운트
                "total_all_cnt" // 게시판 탭 카운트
                "book_list" // 책 리스트
                "book_cnt" // 책 리스트 카운트
                "data_list" // 글 리스트
                "cnt" // 글 리스트 총갯수
                "total_cnt" // 수강/무료리스트 각각갯수
                "s_type" // 탭 타입 (강의, 도서, 전체)
                "wr_3" // 수강회원, 무료회원 탭 구분값
                "sfl" // 검색
                "stx" // 검색
                "table" // 게시판이름
                "sel_id" // 영상 cat_id
                "book_id" // 책 it_id
                "page_text"  // 페이징 html코드
                "page" // 지금 몇페이지인지
                "total_page" // 이 게시판 총 페이지 수</textarea>
        </div>
        <!-- 변수 이름을 적어놨습니당 -->
    {/}


    <!------ 학습자료실 : S ------->
    <section class="subContentArea my_study">
        <!------- 학습자료실 상단 : S ------->
        <!-- tab :S -->
        <ul class="cm_tab_ment mgt30 mgb40">
            <li class="menuBtn w_33 {? s_type == 'my_study_lec'}selected{/}"><a href="/myclass/my_studyroom.php?s_type=my_study_lec">강의 학습자료</a></li> <!-- 현재 탭에  selected 클래스 추가 -->
            <li class="menuBtn w_33 {? s_type == 'my_study_book'}selected{/}"><a href="/myclass/my_studyroom.php?s_type=my_study_book" >도서 학습자료</a></li>
            <li class="menuBtn w_33 {? s_type == 's_type_all'}selected{/}"><a href="/myclass/my_studyroom.php?s_type=s_type_all">전체 자료</a></li>
        </ul>
        <!-- tab : E -->
        {? arr_cnt > 0}
        <!------------ 강의 학습자료 : S ----------->
        <div class="cmSideHead mgt40 {? s_type == 'my_study_lec'}my_study_lec{/}" {? s_type != 'my_study_lec'}style="display:none;"{/}>
            <div class="membershipAddArea  border-none">
                <h3 class="cmNoticeTit cmNoticeTit_txt01 mgb15">과정을 선택해 주세요</h3>
                <div class="cmSelectBoxArea w300 mgb20">
                    <select name="cat_id" id="cat_id" class="pdl20 cmSelectBox cat_sel" onchange="studyChange(this);">
                        {@ arr_cate}
                        <option value="{.item_cate}" title="{.cat_name}"  {? .item_cate == sel_id}selected{/}>&nbsp;{.cat_name}</option> 
                        {/}
                    </select>
                </div>

                <div class="cmListMenu_t2 clear-after">
                    {? total_all_cnt.gichul > 0}
                    <a href="#gichul" class="cmTypeBtn tableBtn {? table == 'gichul'}selected{/}" >기출문제 </a>
                    {: total_all_cnt.gichul == 0}
                    <a href="#gichul" class="cmTypeBtn tableBtn unactivated" >기출문제<span> ({total_all_cnt.gichul})</span> </a>
                    {/}
                    {? total_all_cnt.law > 0}
                    <a href="#law" class="cmTypeBtn tableBtn {? table == 'law' }selected{/}" >최신개정법령</a>
                    {: total_all_cnt.law == 0}
                    <a href="#law" class="cmTypeBtn tableBtn unactivated" >최신개정법령<span> ({total_all_cnt.law})</span> </a>
                    {/}
                    {? total_all_cnt.d_room > 0}
                    <a href="#d_room" class="cmTypeBtn tableBtn {? table == 'd_room' }selected{/}" >강의 자료실 </a>
                    {: total_all_cnt.d_room == 0}
                    <a href="#d_room" class="cmTypeBtn tableBtn unactivated" >강의 자료실<span> ({total_all_cnt.d_room})</span> </a>
                    {/}
                    {? total_all_cnt.prog > 0}
                    <a href="#prog" class="cmTypeBtn tableBtn {? table == 'prog' }selected{/}" >프로그램</a>
                    {: total_all_cnt.prog == 0}
                    <a href="#prog" class="cmTypeBtn tableBtn unactivated" >프로그램<span> ({total_all_cnt.prog})</span> </a>
                    {/}
                </div>
    
            </div>	
        </div>
        {/}
        {? book_cnt > 0}
        <!------------ 도서 학습자료 : S ----------->
        <div class="cmSideHead mgt40 {? s_type == 'my_study_book'}my_study_book{/}" {? s_type != 'my_study_book'}style="display:none;"{/}>
            <div class="membershipAddArea">
                <h3 class="cmNoticeTit cmNoticeTit_txt02 mgb15">도서를 선택해 주세요</h3>
                <div class="cmSelectBoxArea w900 mgb20">
                    <select name="it_id" id="it_id" class="pdl20 cmSelectBox selectedStudybook" onchange="studyChange(this);"  title="" >
                        {@ book_list}
                        <option value="{.it_id}" title="{.it_name}" {? .it_id == book_id}selected{/}>{.it_name}</option>
                        {/}
                    </select>
                </div>
    
                <div class="cmListMenu_t2 clear-after">
                    {? total_all_cnt.gichul > 0}
                    <a href="#gichul" class="cmTypeBtn tableBtn {? table == 'gichul'}selected{/}" >기출문제</a>
                    {: total_all_cnt.gichul == 0}
                    <a href="#gichul" class="cmTypeBtn tableBtn unactivated" >기출문제<span> ({total_all_cnt.gichul})</span></a>
                    {/}
                    {? total_all_cnt.err > 0}
                    <a href="#err" class="cmTypeBtn tableBtn {? table == 'err' }selected{/}" >정오표</a>
                    {: total_all_cnt.err == 0}
                    <a href="#err" class="cmTypeBtn tableBtn unactivated" >정오표<span> ({total_all_cnt.err})</span></a>
                    {/}
                    {? total_all_cnt.law > 0}
                    <a href="#law" class="cmTypeBtn tableBtn {? table == 'law' }selected{/}" >최신개정법령</a>
                    {: total_all_cnt.law == 0}
                    <a href="#law" class="cmTypeBtn tableBtn unactivated" >최신개정법령<span> ({total_all_cnt.law})</span></a>
                    {/}
                    {? total_all_cnt.up > 0}
                    <a href="#update" class="cmTypeBtn tableBtn {? table == 'update' }selected{/}" >도서 업데이트</a>
                    {: total_all_cnt.up == 0}
                    <a href="#update" class="cmTypeBtn tableBtn unactivated" >도서 업데이트<span> ({total_all_cnt.up})</span></a>
                    {/}
                    {? total_all_cnt.prog > 0}
                    <a href="#prog" class="cmTypeBtn tableBtn {? table == 'prog' }selected{/}" >프로그램</a>
                    {: total_all_cnt.prog == 0}
                    <a href="#prog" class="cmTypeBtn tableBtn unactivated" >프로그램<span> ({total_all_cnt.prog})</span></a>
                    {/}
                    {? total_all_cnt.mp3 > 0}
                    <a href="#mp3" class="cmTypeBtn tableBtn {? table == 'mp3' }selected{/}" >MP3</a>
                    {: total_all_cnt.mp3 == 0}
                    <a href="#mp3" class="cmTypeBtn tableBtn unactivated" >MP3<span> ({total_all_cnt.mp3})</span></a>
                    {/}
                </div>
    
            </div>	
        </div>
        {/}
        <!------------ 도서 학습자료 : E ----------->
         <!------------ 전체 자료 : S ----------->
         <div class="cmSideHead mgt40" {? s_type != 's_type_all'}style="display:none;"{/}>
            <div class="membershipAddArea">
                <h3 class="cmNoticeTit cmNoticeTit_txt02 mgb15">모든 자료를 확인 하실 수 있습니다.</h3>
                <div class="cmSelectBoxArea w300 mgb20 select_none bg-white">
                    <select name="cat_id" id="cat_id" class="pdl20 cmSelectBox cat_sel" onchange="studyChange(this);">
                        <option value="" title="전체" class="selected">&nbsp;전체</option> 
                    </select>
                </div>
                <div class="cmListMenu_t2 clear-after">
                    {? total_all_cnt.gichul > 0}
                    <a href="#gichul" class="cmTypeBtn tableBtn {? table == 'gichul' || table == ''}selected{/}">기출문제</a>	
                    {: total_all_cnt.gichul == 0}
                    <a href="#gichul" class="cmTypeBtn tableBtn unactivated">기출문제<span> (({total_all_cnt.gichul}))</span></a>
                    {/}
                    {? total_all_cnt.law  > 0}
                    <a href="#law" class="cmTypeBtn tableBtn {? table == 'law' }selected{/}">최신개정법령</a>
                    {: total_all_cnt.law  == 0}
                    <a href="#law" class="cmTypeBtn tableBtn unactivated">최신개정법령<span> (({total_all_cnt.law}))</span></a>
                    {/}
                    {? total_all_cnt.up > 0}
                    <a href="#update" class="cmTypeBtn tableBtn {? table == 'update' }selected{/}">도서 업데이트</a>
                    {: total_all_cnt.up == 0}
                    <a href="#update" class="cmTypeBtn tableBtn unactivated">도서 업데이트<span> (({total_all_cnt.up}))</span></a>
                    {/}
                    {? total_all_cnt.err > 0}
                    <a href="#err" class="cmTypeBtn tableBtn {? table == 'err' }selected{/}">정오표</a>
                    {: total_all_cnt.err == 0}
                    <a href="#err" class="cmTypeBtn tableBtn unactivated">정오표<span> ({total_all_cnt.err})</span></a>
                    {/}
                    {? total_all_cnt.d_room > 0}
                    <a href="#d_room" class="cmTypeBtn tableBtn {? table == 'd_room' }selected{/}">강의 자료실</a>
                    {: total_all_cnt.d_room == 0}
                    <a href="#d_room" class="cmTypeBtn tableBtn unactivated">강의 자료실<span> ({total_all_cnt.d_room})</span></a>
                    {/}
                    {? total_all_cnt.prog > 0}
                    <a href="#prog" class="cmTypeBtn tableBtn {? table == 'prog' }selected{/}">프로그램</a>
                    {: total_all_cnt.prog == 0}
                    <a href="#prog" class="cmTypeBtn tableBtn unactivated">프로그램<span> ({total_all_cnt.prog})</span></a>
                    {/}
                    {? total_all_cnt.mp3 > 0}
                    <a href="#mp3" class="cmTypeBtn tableBtn {? table == 'mp3' }selected{/}">MP3</a>	
                    {: total_all_cnt.mp3 == 0}
                    <a href="#mp3" class="cmTypeBtn tableBtn unactivated">MP3<span> ({total_all_cnt.mp3})</span></a>	
                    {/}
                </div>
            </div>	
        </div>
        
        <!------------ 전체 자료 : E ----------->
        <!-- 검색어찾기 : S-->
        <form id="fsearch" name="fsearch" method="get" class="mgt55">
            <input type="hidden" name="s_type" value="{s_type}">
            <input type="hidden" name="sel_id" value="{sel_id}">
            <input type="hidden" name="book_id" value="{book_id}">
            <input type="hidden" name="table" value="{table}">
            <input type="hidden" name="sfl" value="{sfl}">
            <input type="hidden" name="wr_3" value="{wr_3}">
            
            {? s_type == "my_study_lec" && arr_cnt > 0 || s_type == "my_study_book" && book_cnt > 0 || s_type == "s_type_all"}
            <div class="search-group {? s_type == 'my_study_lec' }my_study_lec_select{: s_type == 'my_study_book'}my_study_book_select{/}">
                <!--셀렉트박스-->
                <div class="search-box mal">
                    <p>
                        <a href="#none" id="chHref">
                            {? sfl == 'wr_subject'}
                                제목
                            {: sfl == 'wr_content'}
                                내용
                            {: sfl == 'wr_subject_content'}
                                제목+내용
                            {:}
                                제목
                            {/}
                        </a>
                    </p>
                    <ul id="selectCon">
                        <li>
                            <a href="#wr_subject" onclick="">제목</a>
                        </li>
                        <li>
                            <a href="#wr_content" onclick="">내용</a>
                        </li>
                        <li>
                            <a href="#wr_subject_content" onclick="">제목+내용</a>
                        </li>
                    </ul>
                </div>
                <!--//셀렉트박스-->
                <div class="search-txt mal">
                    <input type="text" name="stx" id="sch-txt" title="검색어 입력" placeholder="검색어를 입력해주세요." value="{stx}" minlength="2" maxlength="20">
                </div>
                <span class="search_del">검색삭제</span> 
                <button type="submit">검색</button>

            </div>
            {/}
        </form>
        <!-- //검색어찾기 : E-->
        <!------------ 강의 학습자료 : E ----------->
        <!------- //학습자료실 상단 : E ------->
        <!------- 게시판영역 : S ------->
        <ul class="cmListArea no-top-line mgt50">
            {? s_type == "my_study_lec" && arr_cnt > 0 || s_type == "my_study_book" && book_cnt > 0 || s_type == "s_type_all"}
            <!-- 게시판 상단바 -->
            <li class="bot-line {? s_type == 'my_study_lec' }my_study_lec_tab{: s_type == 'my_study_book'}my_study_book_tab{/}">
                <div class="listBottonArea total-search">
                    <div class="cmListMenu_t2 no-after no-line clear-after typeShowmenu">
                        <a href="allmembers" data-wr3="wr_3_all" class="cmTypeBtn wr_3Type {? wr_3 == 'wr_3_all' || wr_3 == ''}selected{/}" >전체 ({total_cnt.all_cnt})</a>
                        {? table == "gichul" || table == "d_room"}
                            <a href="classmembers" data-wr3="0" class="cmTypeBtn wr_3Type {? wr_3 == '0'}selected{/}" >수강회원 ({total_cnt.paid})</a>
                            <a href="freemembers" data-wr3="1" class="cmTypeBtn wr_3Type {? wr_3 == '1'}selected{/}" >무료회원 ({total_cnt.free})</a>
                        {/}
                    </div>
                </div>
            </li>        
            {/}
            {? stx != ''}
            <li class="boardBtn-box">
                <a href="my_studyroom.php?s_type={s_type}&sel_id={sel_id}&book_id={book_id}&table={table}" class="all_btn_wrap tc" id="">전체목록</a>
            </li>	
            {/}
    
            <!-- //게시판 상단바 -->
            {? s_type == "my_study_lec" && arr_cnt > 0 || s_type == "my_study_book" && book_cnt > 0 || s_type == "s_type_all"}<!-- 내가가진 과목, 도서 카운트 -->
                {? cnt != 0}<!-- 리스트 총갯수 -->
                    {@ data_list}
                        <li>
                            {? table == "err"} <!--정오표-->
                                <div class="cmListIcon w_20 tc cmListArr"> <!-- 정오표만 스타일 살짝 달라져서 클래스명 cmListArr 넣었어영 -->
                                    <img src="/data/cm_shop/book/{.it_id}/{.it_id}_m.png">       	
                                </div>		
                            {/}
                            <div class="cmListTxt">
                                {? table == "gichul"}<!-- 기출은 갈곳이없어 -->
                                    <h3 class="cmListTit">
                                        <p>{.wr_subject}</p>
                                    </h3>
                                {: table == "err"}
                                    {? s_type == "my_study_book"}
                                    <h3 class="cmListTit study_book_cmListTit">
                                        <a href="/bbs/board.php?bo_table=data_err&s_type={s_type}&table={table}&book_id={book_id}&svs=myclass&stx={stx}&sfl={sfl}&page={page}&c_code={.c_code}&it_version={.it_version}&it_id={.it_id}&num={.num}">{.wr_subject}</a>
                                    </h3>
                                    {:}
                                    <h3 class="cmListTit study_book_cmListTit">
                                        <a href="/bbs/board.php?bo_table=data_err&s_type={s_type}&table={table}&svs=myclass&stx={stx}&sfl={sfl}&page={page}&c_code={.c_code}&it_version={.it_version}&it_id={.it_id}&num={.num}">{.wr_subject}</a>
                                    </h3>
                                    {/}
                                {:}
                                    <h3 class="cmListTit ">
                                        {? s_type == "s_type_all"}
                                            {? table == "d_room"}
                                                {? wr_3 == '' || wr_3 == 'wr_3_all'}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&table={table}&stx={stx}&sfl={sfl}&wr_id={.wr_id}&page={page}&svs=myclass">{.wr_subject}</a>
                                                {:}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&table={table}&stx={stx}&sfl={sfl}&wr_3={.wr_3}&wr_id={.wr_id}&page={page}&svs=myclass">{.wr_subject}</a>
                                                {/}
                                            {:}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&table={table}&stx={stx}&sfl={sfl}&wr_id={.wr_id}&page={page}&svs=myclass">{.wr_subject}</a>
                                            {/}
                                        {:}
                                            {? table == "d_room"}
                                                {? wr_3 == '' || wr_3 == 'wr_3_all'}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&sel_id={sel_id}&table={table}&stx={stx}&sfl={sfl}&book_id={book_id}&wr_id={.wr_id}&page={page}&svs=myclass">{.wr_subject}</a>
                                                {:}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&sel_id={sel_id}&table={table}&stx={stx}&sfl={sfl}&book_id={book_id}&wr_3={.wr_3}&wr_id={.wr_id}&page={page}&svs=myclass">{.wr_subject}</a>
                                                {/}
                                            {:}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&sel_id={sel_id}&table={table}&stx={stx}&sfl={sfl}&book_id={book_id}&wr_id={.wr_id}&page={page}&svs=myclass">{.wr_subject}</a>
                                            {/}
                                        {/}
                                    </h3>
                                {/}
                                <h4 class="cmListTSubTit"></h4>
                                <p class="classDate mgt5">
                                {? table == "gichul" || table == "d_room"}
                                    {? .wr_3 == 1}
                                        <span class="classDate">자료권한 : 무료회원전용</span>
                                    {: .wr_3 == 0}
                                        <span class="classDate col-red">자료권한 : 수강회원전용</span>
                                    {/}
                                {/}

                                {? table == "err"}
                                    <span class="classDate">판쇄정보 : {.it_version}</span>
                                {/}

                                {? table == "err" || table == "law" || table == "update" || table == "prog" || table == "mp3"}
                                    <span class="classDate">발행일 : {.err_publicationdate}</span>
                                {/}

                                {? table != "gichul" && table != "d_room"}
                                    <span class="classDate">작성일 : {.wr_datetime}</span>
                                {/}
                                </p>
                            </div>	
                            <div class="cmListBtn tc">
                                {? table == "err"}<!-- 정오표일때 -->
                                    {?. c_code && .it_version && .wr_id ==''}
                                        <a href="/sdb/errata/pdf.php?c_code={.c_code}&it_version={.it_version_enc}"  target="_blank" class="btn btnDownload" download>다운로드</a>
                                    {/}
                                {: table == "gichul" || table == "d_room"}
                                    {? .hasdata > 0}
                                        {? .open_value == 1}
                                            {? .wr_3 == 1 || .wr_3 == 0 && .pay == "ok"}
                                                {? .size > '157286399'}
                                                <a href="/bbs/board.php?bo_table=data_{table}&s_type={s_type}&table={table}&stx={stx}&sfl={sfl}&wr_3={.wr_3}&wr_id={.wr_id}&page={page}&svs=myclass" onclick="alert('대용량파일이므로 게시글 내에서 개별다운로드를 진행해주세요. ({.mbSize}MB)');" class="btn btnDownload">다운로드</a>
                                                {:}
                                                <a href="/bbs/download_file.php?bo_table=data_{table}&wr_id={.wr_id}&svs=myclass"  target="_blank" class="btn btnDownload">다운로드</a>
                                                {/}
                                            {:}
                                                <!-- <a href="" onclick="alert('수강회원만 다운받으실수 있습니다.'); return false;" class="btn btnNonDownload">권한없음</a> -->
                                                <a href="#!" class="btn btnNonDownload">권한없음</a>
                                            {/}
                                        {/}
                                    {/}
                                {:}
                                    {? .hasdata > 0}
                                        <a href="/bbs/download_file.php?bo_table=data_{table}&wr_id={.wr_id}&svs=myclass"  target="_blank" class="btn btnDownload">다운로드</a>
                                    {/}
                                {/}
                            </div>
                        </li>
                    {/}
                {:}<!-- 리스트가 0일때 -->
                    <li>
                        <div class="w_100 noDateList">
                            {? stx != ""}
                            <!-- 검색했는데 리스트가 0일때 -->
                            <p class="tc">검색결과가 없습니다. 다시 입력해 주세요.</p>
                            {:}
                            <!-- 그냥 없을때 -->
                            <p class="tc">등록된 학습자료가 없습니다</p>
                            {/}
                        </div>
                    </li>
                {/}
            {:}
                {? s_type == "my_study_lec"}
                    <li class="mgb55">
                        <div class="w_100 noDateList">
                            <p class="tc">신청 강의가 없습니다</p>
                        </div>
                    </li>
                {: s_type == "my_study_book"}
                    <li class="mgb55">
                        <div class="w_100 noDateList">
                            <p class="tc">등록된 도서가 없습니다</p>
                        </div>
                    </li>
                {/}
            {/}
        </ul>
        {? cnt != 0 || s_type == "my_study_lec" ||  s_type == "my_study_book"}
        <div class="listBottonArea page-bottom page-bottom-old no-top-line">
        {:}
        <div class="listBottonArea page-bottom page-bottom-old">
        {/}
            <ul class="list_page_wrap">
                {? total_page > 1}
                    {page_text}
                {/}
            </ul>
        </div>
        <!------- 게시판영역 : E ------->
    </section>
    <!------ 학습자료실 : E ------->
