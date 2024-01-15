<div class="Container">
<div class="playerContainer">
    <input type="hidden" name="play_type" id="play_type" value="<?=$play_type?>"> 

    <!-- 영상 영역 -->
    <div class="videoPlayer player ">
            <!--강의 플레이어:S-->
            <div class="video_area" >                    
                    <?echo ("<iframe id='ifrm' src='".$webTokenURL."' allowfullscreen webkitallowfullscreen mozallowfullscreen allow=autoplay style='width: 100%; height: 100%;'></iframe>");?>
            </div>
            <!--강의 플레이어:E-->
            <!--영상정보영역: S -->
            <?$rs=sql_query(" SELECT l.mb_id, c.tb_id, c.tb_idx, c.tb_content, c.tb_time
                                    , IFNULL(l.lp_playtime,'') lp_playtime, IFNULL(l.lp_currtime,'0') lp_currtime, IFNULL(date_format(l.lp_updatetime,'%Y-%m-%d'),'') lp_updatetime
                                FROM cm_lecture_item_tb_content c
                                    LEFT JOIN cm_player_latestplay l ON l.mb_id='$member[mb_id]' and l.tb_id=c.tb_id and l.tb_idx=c.tb_idx
                                WHERE  c.tb_id = '$tb_id' ORDER BY tb_idx ASC ");
                $row=sql_fetch_array($rs);
                //print_r2 ($row);
                ?>
            <div class="video_player_title">
                <p>강의명 : <?=$lec['tb_name']?></p>
            </div>
            <!--영상정보영역: E -->
    </div>
    <!-- //영상영역-->

    <!-- 사용자컨텐츠 영역 -->
    <div class="clipInfoArea">
        <!-- 사용자 메뉴 -->
        <div class="info_menu_area">
            <ul class="gnb_area">
                <li class="menu lec_list">
                    <a href="#LecList" class="selected">
                        <i class="icon icon-lec"></i>
                        강의<br>정보
                    </a>
                </li>
                <li class="menu lec_bookmark">
                    <a href="#LecBookmark" ><!--onclick="alert('북마크 준비중.'); return false;"-->
                        <i class="icon icon-bmark"></i>
                        북마크<br>(책갈피)
                    </a>
                </li>
                <?if($play_type!="audio"){?>
                <li class="menu lec_qna">
                    <a href="#LecQnA">
                        <i class="icon icon-qna"></i>
                        학습<br>질문
                    </a>
                </li>
                <?}?>

                <? $chkpds = sql_fetch("SELECT pds_no, pds_type FROM cm_lecture_item_tb_pds WHERE pds_type='PDS' AND pds_newfile <> '' AND pds_tb_id='$tb_id' ORDER BY pds_tb_idx LIMIT 1  ");
                    if($chkpds[pds_no] && $chkpds[pds_type] =="PDS"){
                        $pdstype = "pds";
                ?>
                <li class="menu lec_data">
                    <a href="#noarea" onclick="window.open('/mypage/mp3downlist.php?tb_id=<?=$tb_id?>&idx=<?=$tb_idx?>&mode=<?=$pdstype?>&ncjf=<?=$member['mb_id']?>&type=in_player', 'mp3_down', 'width=600, height=631, left=300, top=100, scrollbars=yes');">
                        <i class="icon icon-study"></i>
                        학습<br>자료
                    </a>
                </li>
                <? } ?>
                <li class="menu play_info">
                    <a href="#PlayInfo">
                        <i class="icon icon-info"></i>
                        이용<br>방법
                    </a>
                </li>
            </ul>
        </div>
        <!-- //사용자 메뉴 -->

        <!-- 강의정보 -->
        <div id="LecList"  class="play_info_area play_info_area1 selected">
                <h3 class="areaTitle LecTitle"><!-- 상품명 --><?=$lec['it_name']?></h3>
                <!-- 수강 과목 리스트 :S-->
                <?$cnt_list = count($tb_rel_list);?>
                <div class="select_area <?if( $cnt_list < 0){ echo 'select_none';}?>">
                    <div class="selectValue openlistSelect " data-select="#selectMenu1">
                        <p><?=$lec['tb_name']?></p>
                    </div>
                    <div class="selectMenu1 listSelectbox" id="selectMenu1">
                        <ul>
                            <?for($i=0,$cnt=$cnt_list;$i<$cnt;$i++) {
                                    $tb = $tb_rel_list[$i];
                            ?>
                            <li value='<?=$tb['tb_id']?>' onclick="javscript:goView('<?=$it_id?>','<?=$tb['tb_id']?>','1','<?=$wh?>','<?=$media_content_key?>','<?=$play_type?>');" class="<?if($lec['tb_name'] == $tb['tb_name'] ){ echo "selected";}?>"><?=$tb['tb_name']?></li>
                            <?}?>
                        </ul>
                    </div>
                    <?
                        for($i=0,$cnt=count($tb_rel_list);$i<$cnt;$i++) {
                            $tb = $tb_rel_list[$i];
                            echo "<option value='{$tb['tb_id']}' ".($tb_id==$tb['tb_id']?'selected':'').">{$tb['tb_name']}</option>";
                    } ?>
                    </select>
                </div>
                <!-- 수강 과목 리스트 :E-->

                <!-- 과목 정보: S-->
                <div class="class_info">
                    <p>교수진 : <?=$lec['lec_name']?></p>
                    <p>총 강의수 : <?=$play_tb[cnt]?>강 / <? if($play_tb[shooting_status] == 1 ) { ?>
                                                        완강
                                                    <? } else if ($play_tb[shooting_status] == 0){ ?>
                                                        진행중
                                                    <? } else { ?>
                                                        예정
                                                    <? } ?>
                    </p>
                </div>
                <!-- 과목 정보: E-->

                <!-- 학습 진도율 :S-->
                <div class="lec_progerss dis-table">
                    <div class="tc">
                        학습 진도율
                        <h4>
                            <? if ($play_tb[per]) { ?>
                                <?=$play_tb[per]?>%
                            <? } else { ?>
                                0%
                            <? } ?>
                            <span class="class_cnt">
                                (<?=$play_tb[pcnt]?>/<?=$play_tb[cnt]?>강)
                            </span>
                        </h4>
                    </div>
                    <div class="tc">
                        남은 수강일
                        <h4><?=$cart['day_cnt']?>일</h4>
                    </div>
                </div>
                <!-- 학습 진도율 :E-->

                <!-- 수강 목차 :S -->
                <ul class="play_list lec_play_list">
                    <li class="list-top-title dis-table">
                        <p class="tc">강의명</p>
                        <p class="tc">수강여부</p>
                    </li>
                    <?
                    for($i=0;$row=sql_fetch_array($rs);$i++) {
                        if($row['tb_idx']==$tb_idx) $thistime = $row['tb_time'];

                        $target_id=$taget_style="";
                        if($row['tb_idx']==$tb_idx){
                            $target_id = "id='playthis'";
                            $taget_style = "col-lightblue";
                        }
                        if($play_type == "audio") {
                            $list_mc_key = $row['media_content_key_audio'];
                        } else if ($play_type == "mp3") {
                            $list_mc_key = $row['media_content_key_mp3'];
                        } else {
                            $list_mc_key = $row['media_content_key'];
                        }
                    ?>

                        <!-- <li <? if($row['tb_idx']==$tb_idx) echo "id='playthis'" ?> class="list_start dis-table <?if($row['tb_idx']==$tb_idx)echo "col-lightblue";?>" onClick="javascript:goView('<?=$it_id?>', '<?=$row['tb_id']?>', '<?=$row['tb_idx']?>', '<?=$wh?>', '<?=$media_content_key?>');">-->

                        <li <?=$target_id?> class="list_start dis-table <?=$taget_style?>" onClick="javascript:goView('<?=$it_id?>', '<?=$row['tb_id']?>', '<?=$row['tb_idx']?>', '<?=$wh?>', '<?=$list_mc_key?>','<?=$play_type?>');">
                            <p class="tl">
                                <em class="number">
                                    <!-- 10미만 숫자 앞에 0 붙이기-->
                                    <?if($row['tb_idx'] < 10 ){
                                        echo "0".$row['tb_idx'].".";
                                    }else{
                                        echo $row['tb_idx'].".";
                                    }?>
                                </em>
                                <?=$row['tb_content']?>
                            </p>
                            <p class="tc">
                                <?if($row['lp_updatetime'] == ''){?>
                                    <i class="icon icon-chk-N"><!-- 수강 중, 수강 전--></i>
                                <?}else{?>
                                    <i class="icon icon-chk-Y"><!-- 수강 완료--></i>
                                <?}?>
                            </p>
                        </li>
                    <?}?>
                </ul>
                <!-- 수강 목차 :E -->
        </div>
        <!-- //강의정보 -->

        <!-- 북마크 -->
        <div id="LecBookmark" class="play_info_area play_info_area2 ">
            <h3 class="areaTitle BmarkTitle">북마크(책갈피) 등록</h3>
            <ul class="use_info">
                <li>(1) 강의시간 설정 눌러 시간 표기</li>
                <li>(2) 내용작성 후 등록</li>
                <li>※ PC/모바일 북마크는 서로 연동되지 않음.</li>
            </ul>

            <div class="book_mark_set mgt25">
                <div class="time_setting_area dis-table" >
                    <div>
                        <a href="#a" onClick="getRuntime('bm_seektime');" class="btn btn-xl bg-blue">강의시간 설정 &nbsp;▶</a>
                    </div>
                    <div class="time_set " style="pointer-events: none;">
                        <input type=hidden name="bm_seektime" id="bm_seektime">
                        <input type=hidden name="runtime_bm_seektime" id="runtime_bm_seektime">
                        <div class="this_time hide" id='this_time'></div>
                        <ul class="Time">
                            <li><input type="text" name="bm_seektime_H" id="bm_seektime_H" class="input-text time_val" placeholder="--" maxlength="2" ></li>
                            <li><input type="text" name="bm_seektime_M" id="bm_seektime_M" class="input-text time_val" placeholder="--" maxlength="2"></li>
                            <li><input type="text" name="bm_seektime_S" id="bm_seektime_S" class="input-text time_val" placeholder="--" maxlength="2"></li>
                        </ul>
                    </div>
                </div>
                <div class="bmark_index">
                    <textarea name="bm_content" id="bm_content" class="i_text_area" onkeyup="fn_TextAreaInputLimit('bm');" placeholder="내용을 요약해서 작성해 주세요&#13;&#10;(100자까지 작성 가능)"></textarea>
                    <a href="#a" onclick='bt_saveBMark(true);' class="btn btn-xl bg-lightblue save_btn bold">등록하기</a>
                </div>
            </div>

            <div class="bmark_save_list">
                <h3 class="areaTitle border-bottom">북마크 리스트 (<em class="bmarkCnt"></em>개)</h3>
                <ul  class="play_list bmark_play_list" id="bmarklist" >
                    <!-- ~ getBMark() 함수에서 가져옴 ~ -->
                </ul>
            </div>
        </div>
        <!-- //북마크 -->

        <!-- 학습질문 -->
        <div id="LecQnA" class="play_info_area play_info_area3">
            <form name="inquiry_frm" id="inquiry_frm"  method="post" enctype="multipart/form-data" action="ajax_save_inquery.php">
                <input type=hidden name="runtime_inquiry" id="runtime_inquiry">
                <input type=hidden name="wr_teaching_plan" id="wr_teaching_plan">
                <input type=hidden name="it_id" id="it_id" val=>
                <input type=hidden name="tb_id" id="tb_id">
                <input type=hidden name="tb_idx" id="tb_idx">
                <input type=hidden name="bo_table" id="bo_table" value="cs_inquery">
                <input type=hidden name="wr_it_name" id="wr_it_name" value="<?=$bookcode?>">
                <input type=hidden name="wr_it_id" id="wr_it_id" value="<?=$bookid?>">
            <h3 class="areaTitle BmarkTitle">학습 질문시 유의사항</h3>
            <ul class="use_info">
                <li>(1) 동영상 문의 시 질문할 동영상 위치 저장 </li>
                <li>(2) 도서로 강의 진행 시 페이지 입력 필수</li>
                <li>(3) 교안 문의일 경우 체크</li>
            </ul>
            <ul class="qna_index_area mgt25">
                <li>
                    <div class="search_option select_xl ">
                        <select name="qna_type" id="qna_type">
                            <option value="popkon">동영상 학습문의</option>
                            <?if($bookcode) {?> <!-- 오픈 후 추가에정 -->
                            <option value="book">도서 학습문의</option>
                            <?}?>
                        </select>
                    </div>
                </li>
                <li class="qna_book">
                    <div class="search_option select_xl">
                        <select name="qna_book_type" id="qna_book_type">
                            <option value='도서문의'>도서문의</option>
                            <option value='오타/오류'>오타/오류</option>
                            <option value='고객제안'>고객제안</option>
                            <option value='기타'>기타</option>
                        </select>
                    </div>
                </li>
                <div class="time_setting_area dis-table pdt10 pdb10" >
                    <div>
                        <a href="#a" onClick="getRuntime('inquiry');" class="btn btn-xl bg-blue">동영상 위치 저장 &nbsp;▶</a>
                    </div>
                    <div class="time_set" style="pointer-events: none;">
                        <div class="this_time hide" id='this_time'></div>
                        <ul class="Time">
                            <li><input type="text" name="inquiry_H" id="inquiry_H" class="input-text time_val" placeholder="--" maxlength="2" ></li>
                            <li><input type="text" name="inquiry_M" id="inquiry_M" class="input-text time_val" placeholder="--" maxlength="2"></li>
                            <li><input type="text" name="inquiry_S" id="inquiry_S" class="input-text time_val" placeholder="--" maxlength="2"></li>
                        </ul>
                    </div>
                </div>
                <? if($bookcode!=''){ ?>
                    <li>
                        <div class="div-table player_rela_book mgb15">
                            <h3 class=" ">진행도서</h3>
                            <?//if 등록 도서가 있을경우?>
                            <div class=" ">
                                <input type="text" name="subject_book_page" id="subject_book_page" onkeyup="number_form();" class="input_txt_area xl" placeholder="페이지 필수 입력" maxlength="4">
                            </div>
                            <?//등록 도서가 있을경우?>
                        </div>
                        <p class="" class="relation_book">
                            <?=$bookcode?>
                        </p>
                    </li>
                <? } ?>
                <li class=" gyoan_area">
                    <div class="div-table">
                        <h3 class="">교안문의</h3>
                        <div class=" pdl10">
                            <input type="checkbox" name="book_Chk" id="book_Chk_Y" class="input_label_chk " select>
                            <label class="label_chk fll" for="book_Chk_Y"></label>
                        </div>
                    </div>
                </li>
                <li>
                    <h3 class="wid100 mgb15 mgt10">학습 문의</h3>
                    <div class="qna_index ">
                        <input name="wr_title" id="wr_title" title="질문 제목" placeholder="제목을 작성해 주세요" class="i_text mgb2 input_txt_area xl" type="text" value="" >
                        <textarea name="wr_content" id="wr_content" title="질문 내용" placeholder="내용을 작성해 주세요.&#13;&#10;(강의 정보는 자동으로 입력됩니다)" class="i_text_area  xl" ></textarea>
                        <div class="file_add_wrap">
                            <div class="file_real" style="display:none;"></div>
                            <div class="file_add_btn_wrap">
                                <label class="file_add_btn">파일첨부 +
                                    <input type="file" id="uploadBtn" class="uploadBtn" onchange="fileup(this);" style="display:none;">
                                </label>
                                <span class="file_notice">최대 5MB까지 등록 가능</span>
                            </div>
                            <ul class="file_add_list">
                            </ul>
                        </div>
                        <script>
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
                        </script>
                        <button type=button class="btn btn-xl bg-lightblue" onclick="bt_saveinquery();">등록하기</button>
                        <!--  onclick="bt_saveinquery(this.form);" -->
                    </div>
                    <p class="dot-etc mgt10">
                        답변 확인/수정은 마이페이지 1:1 고객센터에서 확인하실 수 있습니다.
                    </p>
                </li>
            </ul>
            </form>
        </div>
        <!-- //학습질문 -->

        <!-- 이용안내 -->
        <div id="PlayInfo" class="play_info_area play_info_area5">
            <h3 class="areaTitle BmarkTitle">플레이어 이용방법 안내</h3>
            <ul class="info_txt">
                <li>
                    <em class="col-lightblue">1. 플레이어 기본설정</em><br>
                &nbsp;&nbsp;&nbsp;기본기능, 구간반복, 배속, 음량조절
                </li>
                <li>
                    <em class="col-lightblue">2. 수강방법 안내</em><br>
                    &nbsp;&nbsp;&nbsp;목차별 수강, 북마크, 학습질문, 학습자료
                </li>
                <li>
                    <em class="col-lightblue">3. 기타 기능 안내</em><br>
                    &nbsp;&nbsp;&nbsp;단축키 외 기타
                </li>
                <li>
                    <em class="col-lightblue"> 4. 기기 등록은 최대 3대까지만 가능</em>
                </li>
            </ul>

            <div class="info_player">
                <p>학습 시 쉽게 접근 할 수 있게<br>플레이어 활용법을 제작하였습니다.</p>
                <a href="javascript:void(0)" onclick="window.open('<?$hostname?>/popkon/?f=cscenter_user_guide&tab=7','sdedu','width=1000,height=1000,top=0,right=0,status=no,scrollbars=yes');" class="btn btn-xl bg-lightblue play_btn bold">이용방법 확인하기 ▶</a>
            </div>
        </div>
        <!-- //이용안내 -->
    </div>
    <!-- //사용자컨텐츠 영역 -->

    <!-- 메뉴 컨트롤러 -->
    <div class="rightControlArea">
        <div class="right_flod_btn" onclick="MenuControlFn(this);">
            <a href="#a" class="right_flod flod" id="player_rightbtn" >◀닫기</a>
        </div>
    </div>
    <!-- //메뉴 컨트롤러-->

</div>