<?php
    include_once "./_common.php";
    include_once "{$g4['path']}/cm/conf/cm_config.php";
    include_once "{$g4['admin_path']}/admin.head.php";
    $g4['title'] = "배너 관리";
    $navi = " > 운영관리 > {$g4['title']} ";
    $write_type = $_GET['type']; //등록/수정 구분
    $nowDate = date("Y-m-d H:s"); // 현재 시각
    $tab = $_GET['tab'];
    $idx = $_GET['idx'];
    if ($tab == '') {
        $tab = '1';
    }

    $tab_sql = sql_query("SELECT idx,`order`,subject FROM skin_visual_tab WHERE cat_id = '$cat_id' ORDER BY `order` ASC");

    if ($write_type == "modify") {
        $bn_sql = sql_query("SELECT *,
                            DATE_FORMAT(s_date,'%Y-%m-%d %H:%i') AS s_date,
                             DATE_FORMAT(e_date,'%Y-%m-%d %H:%i') AS e_date
                            FROM skin_visual_banner 
                            WHERE idx = '$idx' 
                            ");
        while ($row = sql_fetch_array($bn_sql)) {
            if($row['conn_cp']){ //연결 쿠폰 있을 때 
                $conn_cp_arr = explode(',', $row['conn_cp']);
                $in = "'" . implode("','", $conn_cp_arr) . "'";
                $set_conn_sql = "SELECT * FROM cm_shop_coupon  WHERE cp_id IN ($in) OR cp_name IN ($in) ORDER BY cp_id DESC";
                $set_conn_sql = sql_query($set_conn_sql);

                while ($cp_row  = sql_fetch_array($set_conn_sql)) {
                    if ($cp_row['cp_price_type'] == 0) {
                        $cp_row['cp_price'] = number_format($cp_row['cp_price']) . '원';
                    } else {
                        $cp_row['cp_price'] = number_format($cp_row['cp_price']) . '%';
                    }
                    $row['conn_cp_list'][]= $cp_row;
                }
            }

            if($row['conn_lec']){ //연결 상품 있을 때
                $conn_lec_arr = explode(',', $row['conn_lec']);
                $lec_in = "'" . implode("','", $conn_lec_arr) . "'";

                $set_conn_lec_sql = "SELECT it_id, it_name FROM cm_lecture_item WHERE it_id IN ($lec_in) OR it_name IN ($lec_in) ORDER BY CAST(it_id AS UNSIGNED) DESC";
                $set_conn_lec_sql = sql_query($set_conn_lec_sql);

                while ($lec_row  = sql_fetch_array($set_conn_lec_sql)) {
                    $row['conn_lec_list'][]= $lec_row;
                }
            }
            $bn_data = $row;
        }
        $tab = $bn_data['parent_idx'];
        //print_r2($bn_data);
    }

?>
<script src="/js/customscroll/jquery.mCustomScrollbar.js"></script>
<script src="../../js/datetimepicker/jquery.datetimepicker.full.min.js"></script>
<link rel="stylesheet" href="/js/customscroll/jquery.mCustomScrollbar.css">
<link rel="stylesheet" href="../../js/datetimepicker/jquery.datetimepicker.min.css">
<link rel="stylesheet" href="../../adm/css/layout/page/skin_visual.css"/>
<div id="container" class="container">
    <div class="contentArea">
        <div class="areaTit d-flex between">
            <h1>
                <?php if ($write_type == 'modify') {
                    echo '배너 수정';
                } else {
                    echo '배너 등록';
                } ?>
            </h1>
            <a href="javascript:void(0)" class="fl cmBtn_xs back_history">목록</a> <!-- /cm/banner/banner_list.php -->
        </div>

        <form method="post" class="skinBnCre" name="skinBnCre" id="skinBnCre" action="ajax_insert.php" enctype="multipart/form-data">
            <input type="hidden" name="write_type" id="write_type" value="<?=$write_type?>">
            <input type="hidden" name="cat_id" id="cat_id" value="<?=$cat_id;?>">
            <input type="hidden" name="write_idx" value="<?php echo $bn_data['idx'] ?>">
            <input type="hidden" name="order" id="order" value="<?=$bn_data['order'] ;?>">
            <table class="cmTable tableType1">
                <tr>
                    <th>구분</th>
                    <td>
                        <?php while ($row = sql_fetch_array($tab_sql)) { ?>

                            <input type="radio" name="parent_idx" id="bnTab_<?= $row["idx"] ?>"
                                   class="cmRadio cmRadioBtnType"
                                   value="<?= $row["idx"] ?>" <?= $row['idx'] == $tab ? "checked" : '' ?>>
                            <label for="bnTab_<?= $row["idx"] ?>" class="cmLabelBtnType"><?= $row['subject'] ?></label>
                        <?php } ?>
                    </td>
                </tr>
                <tr>
                    <th>배너명</th>
                    <td><input type="text" id="subject" name="subject" class="w100 cmTextBox "
                               value="<?=$bn_data['subject'] ?>" placeholder="<?=$bn_data['subject']? $bn_data['subject'] : "배너명을 입력하세요";?>"/></td>
                </tr>
                <tr>
                    <th>기&nbsp;간</th>
                    <td>
                        <input type="radio" name="bnDate" id="bndate_all" class="cmRadio inputabled" value="allDay"
                               data-type="bn_datetime" <?=!$bn_data['e_date'] || $bn_data['e_date'] == '0000-00-00 00:00' ? "checked": "";?>>
                        <label for="bndate_all" class="cmRadioLabel">상시</label>
                        <input type="radio" name="bnDate" id="bndate_set" class="cmRadio inputabled" value="setdateTime"
                               data-type="bn_datetime"  <?=$bn_data['e_date'] && $bn_data['e_date'] != '0000-00-00 00:00'? "checked": "";?>
                               data-target="setday">
                        <label for="bndate_set" class="cmRadioLabel">기간 설정</label>
                        <input autocomplete=on type="text" name="s_date" id="it_datetime_s" value="<?=$bn_data['s_date']? $bn_data['s_date']: "";?>"
                               class="in_datetime datetimepickerIn" size=10 readonly> ~
                        <input autocomplete=on type="text" name="e_date" id="it_datetime_e" value="<?=$bn_data['e_date'] && $bn_data['e_date'] != '0000-00-00 00:00' ? $bn_data['e_date']: "";?>"
                               class="in_datetime bn_datetime setday datetimepickerIn <?=!$bn_data['e_date'] || $bn_data['e_date'] == '0000-00-00 00:00'? "disabled": "";?>"
                               size=10 readonly>
                    </td>
                </tr>

                <tr>
                    <th>이미지 등록</th>
                    <td>
                        <span class="info_img_size pdr10">이미지 사이즈(1000*400)</span>
                        <input type="file" id="conn_img" name="conn_img[]" class="cmFile" value=""/>
                        <label for="conn_img" class="cmfileLabel">파일 선택</label>
                        <div id="file_info">
                            <!-- add js -->
                            <?php if ($bn_data['conn_img']) { ?>
                                <div  class="list_img">
                                <span style="margin-right: 10px; font-weight: bold;"><?=$bn_data['conn_img'] ?></span>
                                <button type="button" class="cmBtn cmBtn_xs bg-black" id="uploadedFileDelBtn">X</button>
                                </div>
                            <?php } ?>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>배너 내용</th>
                    <td>
                        <div class="d-flex mgb5">
                            <p class="content_th mgr5">작은글자</p>
                            <textarea name="mid_title" id="mid_title" class="cmTextBox previewText"
                                      placeholder="11자 이내로 글자를 입력하세요" maxlength="25"
                                      rows="1"><?= $bn_data['mid_title'] ?></textarea>
                            <p class="warning" style="color: red;"></p>
                        </div>
                        <div class="d-flex">
                            <p class="content_th mgr15">큰글자</p>
                            <textarea name="big_title" id="big_title" class="cmTextBox previewText" placeholder="1줄당 11자 이내로 글자를 입력하세요" rows="2"/><?=$bn_data['big_title'];?></textarea>
                            <p class="warning" style="color: red;"></p>
                        </div>
                        <p class="mgt10 txt_red popup_text_guide">
                            ※ 2줄 내용 입력 필수 (Enter를 통해 줄바꿈 가능) <br> ※ 미리보기를 통해 확인 가능
                        </p>
                    </td>
                </tr>
                <tr>
                    <th>버튼명</th>
                    <td>
                        <input type="text" name="btn_txt" id="btn_txt" class="cmTextBox w50 previewText"
                               value="<?= $bn_data['btn_txt'] ?>" placeholder="25자 이내로 글자를 입력해주세요"
                               maxlength="25">
                    </td>
                </tr>
                <tr>
                    <th> 배너 연결</th>
                    <td>
                        <ul class="banner_rel_wrap">
                            <li class="pdr10">
                                <input type="radio" name="bn_link" id="bn_link_not" class="cmRadio inputabled"
                                       value="bn_link_not" data-type="inputabled_ty" <?=$write_type == 'modify'&&(!$bn_data['conn_url']&& !$bn_data['conn_cp'] && !$bn_data['conn_lec'])? "checked" : '';?>>
                                <label for="bn_link_not" class="cmRadioLabel">없음</label>
                            </li>
                            <li>
                                <div class="banner_rel">
                                    <input type="radio" name="bn_link" id="bn_link_set" class="cmRadio inputabled"
                                           value="bn_link_set" data-type="inputabled_ty" data-target="setbnLink"
                                        <?=$bn_data['conn_url'] || $write_type == ''? "checked" : ""?>>
                                    <label for="bn_link_set" class="cmRadioLabel ">URL</label>
                                    <input type="text" name="conn_url" id="conn_url"
                                           value="<?=$bn_data['conn_url']?>"
                                           class="cmTextBox w50 inputabled_ty setbnLink <?=$bn_data['conn_url'] || $write_type == '' ? "" : "disabled"?>" placeholder="URL을 입력하세요">
                                    <div class="select_box_area setbnLink inputabled_ty mgl5 <?=$bn_data['conn_url'] || $write_type == '' ? "" : "disabled"?>">
                                        <p class="select_txt linkTargetType"><?=$bn_data['link_target'] == '_blank'|| $bn_data['link_target'] == ''? "Blank(새창)" : "Self(현재창)"?> </p>
                                        <ul class="clear-after basic_select">
                                            <li>
                                                <input type="radio" name="link_target" id="linkTarget_blank"
                                                       class="cmRadio" value="_blank" <?=$bn_data['link_target'] == ''|| $bn_data['link_target'] == '_blank'? "checked" : ""?>>
                                                <label for="linkTarget_blank" class="cmLabelListType">Blank(새창)</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="link_target" id="linkTarget_self"
                                                       class="cmRadio" value="_self" <?=$bn_data['link_target'] == '_self'? "checked" : ""?>>
                                                <label for="linkTarget_self" class="cmLabelListType">Self(현재창)</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div class="banner_rel">
                                        <input type="radio" name="bn_link" id="bn_coupon_set" class="cmRadio inputabled"
                                               value="bn_coupon_set" data-type="inputabled_ty"
                                               data-target="user_coupon" <?=$bn_data['conn_cp'] ? "checked" : "" ?>>
                                        <label for="bn_coupon_set" class="cmRadioLabel mgl0 mgt15">쿠폰</label>
                                        <div class="mgt10">
                                            <input type="button" name="bnprecondition" id="search_coupon"
                                                   class="cmBtn cmBtn_s btn_popupOpen user_coupon inputabled_ty <?=$bn_data['conn_cp'] ? "" : "disabled" ?>"
                                                   data-target="addOptionPop" value="쿠폰등록">
                                            <div class="addTermsList couponType_list">
                                                <?php if($bn_data['conn_cp_list']){
                                                    foreach ($bn_data['conn_cp_list'] as $key => $val) {?>
                                                    <div class="add_item">
                                                        <div class="item_<?= $val['cp_id'] ?>">
                                                            <input type="hidden" value="<?= $val['cp_id'] ?>" name="conn_cp[]">
                                                            [<?= $val['cp_id'] ?>]<?= $val['cp_name'] ?> (<?= $val['cp_price']?> 할인)
                                                            <span class="cmBtn cmBtn_xs choice-delete" onclick="del_cat('<?= $val['cp_id'] ?>');">x</span>
                                                        </div>
                                                    </div>
                                                <?}}?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="banner_rel">
                                        <input type="radio" name="bn_link" id="bn_freelec_set"
                                               class="cmRadio inputabled" value="bn_freelec_set"
                                               data-type="inputabled_ty"
                                               data-target="user_freelec" <?=$bn_data['conn_lec'] ? "checked" : "" ?>>
                                        <label for="bn_freelec_set" class="cmRadioLabel mgl0 mgt15">상품</label>
                                        <div class="mgt10">
                                            <input type="button" name="bnprecondition" id="search_freelec"
                                                   class="cmBtn cmBtn_s btn_popupOpen user_freelec inputabled_ty <?=$bn_data['conn_lec'] ? "" : "disabled" ?>"
                                                   data-target="addOptionPop" value="상품등록">
                                            <div class="addTermsList freelecType_list">
                                                <?php if($bn_data['conn_lec_list']){
                                                    foreach ($bn_data['conn_lec_list'] as $key => $val) {?>
                                                        <div class="add_item">
                                                            <div class="item_<?= $val['it_id'] ?>">
                                                                <input type="hidden" value="<?= $val['it_id'] ?>" name="conn_lec[]">
                                                                [<?= $val['it_id'] ?>]<?= $val['it_name'] ?>
                                                                <span class="cmBtn cmBtn_xs choice-delete" onclick="del_cat('<?= $val['it_id'] ?>');">x</span>
                                                            </div>
                                                        </div>
                                                    <?}}?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>미리보기</th>
                    <td>
                        <div class="privew_area">
                            <div class="prv_inner" style="background: url('/data/cm/skin_visual_bn/<?=$bn_data['conn_img']?>') no-repeat center/cover;">
                                <div class="text_area">
                                    <p class="pre_subTie"><?=$bn_data['mid_title']? $bn_data['mid_title'] : "글자를 입력하세요" ?></p>
                                    <h3 class="pre_Tie"><?=$bn_data['big_title']? nl2br($bn_data['big_title']) : "글자를<br>입력하세요" ?></h3>
                                    <a href="javascript:void(0)" class="prv_btn"><?=$bn_data['btn_txt']? $bn_data['btn_txt'] : "글자를 입력하세요" ?></a>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="d-flex order_btn_wrap mgt20">
                <input type="button" id="skin_bn_create" class="cmBtn cmBtn_m cmBtn_create" value="등록">
                <input type="button" id="Cencle" class="cmBtn cmBtn_m cmBtn_cencle" value="취소">
            </div>
        </form>
    </div>

    <div class="admCmPop admCmPop_s" id="addOptionPop">
        <div class="admCmPop_inner">
            <div class="search_area">
                <form id="bnOptionForm" class="d-flex mgb20 ">
                    <div class="select_box_area productType">
                        <p class="select_txt produceType">동영상</p>
                        <ul class="clear-after basic_select">
                            <li>
                                <input type="radio" name="produceType" id="productType_popkon" class="cmRadio"
                                       value="popkon" checked>
                                <label for="productType_popkon" class="cmLabelListType">동영상</label>
                            </li>
                            <!--<li>
                                <input type="radio" name="produceType" id="productType_book" class="cmRadio" value="book">
                                <label for="productType_book" class="cmLabelListType">도서</label>
                            </li>
                            <li>
                                <input type="radio" name="produceType" id="productType_mock" class="cmRadio" value="mock">
                                <label for="productType_mock" class="cmLabelListType">모의고사</label>
                            </li>-->
                        </ul>
                    </div>
                    <input type="text" name="couponId" id="couponId" class="cmTextBox w100 mgr5"
                           placeholder="쿠폰명 or 쿠폰코드를 입력해 주세요">
                    <input type="text" name="productId" id="productId" class="cmTextBox w100 mgr5"
                           placeholder="상품명 or 상품코드를 입력해 주세요">
                    <div class="select_box_area catelist">
                        <p class="select_txt produceType">자격증</p>
                        <ul class="clear-after basic_select">
                            <li>
                                <input type="radio" name="categoryType" id="categoryType_001" class="cmRadio"
                                       value="001" checked>
                                <label for="categoryType_license" class="cmLabelListType">자격증</label>
                            </li>
                            <li>
                                <input type="radio" name="categoryType" id="categoryType_002" class="cmRadio"
                                       value="002">
                                <label for="categoryType_002" class="cmLabelListType">공무원</label>
                            </li>
                            <li>
                                <input type="radio" name="categoryType" id="categoryType_003" class="cmRadio"
                                       value="003">
                                <label for="categoryType_003" class="cmLabelListType">금융</label>
                            </li>
                            <li>
                                <input type="radio" name="categoryType" id="categoryType_005" class="cmRadio"
                                       value="005">
                                <label for="categoryType_005" class="cmLabelListType">검정고시/독학사</label>
                            </li>
                            <li>
                                <input type="radio" name="categoryType" id="categoryType_015" class="cmRadio"
                                       value="015">
                                <label for="categoryType_015" class="cmLabelListType">후루룩연구소</label>
                            </li>
                        </ul>
                    </div>
                    <input type="button" id="popup_option_search" class="cmBtn cmBtn_m cmBtn_submit" value="검색">
                </form>
            </div>
            <div class="addUtil">
                <div class="add_option_all_wrap">
                    <input type="checkbox" id="add_option_all" class="cmChkbox" value="">
                    <label for="add_option_all" class="cmChkboxLabel">전체 선택</label>
                </div>
            </div>
            <ul class="list addOption"><!--add js --></ul>
            <div class="d-flex order_btn_wrap mgt10">
                <input type="button" name="search_product" class="cmBtn cmBtn_m cmBtn_create" value="확인">
            </div>
        </div>
    </div>
</div>
<script src="js/main_visual.js"></script>
<script src="js/write.js"></script>
<script src="js/preview.js"></script>