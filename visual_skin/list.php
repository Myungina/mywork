<?php
    include_once "./_common.php";
    include_once "{$g4['path']}/cm/conf/cm_config.php";
    include_once "{$g4['admin_path']}/admin.head.php";
    $g4['title'] = "배너 관리";
    $navi = " > 운영관리 > {$g4['title']} ";

    // init.
    $nowDate = date("Y-m-d [H:i]"); // 현재 시각
    $tab = $_GET['tab'];
    $sca = $_GET['sca'];
    $stx = trim($_GET['stx']);

    $catgory_sql = sql_query("SELECT 
                              cat_id, cat_name
                          FROM 
                              cm_lecture_category
                          WHERE 
                              (LENGTH(cat_id) > 3 AND LENGTH(cat_id) <= 6) 
                              AND view_use = '1' AND in_use = '1' AND paid_type = 'Y'
                              AND (cat_id LIKE '001%' OR cat_id LIKE '003%' OR cat_id LIKE '005%') /* 자격증/금융/학위 카테고리만 해당 */
                              ORDER BY cat_id");


    $cate_name_sql = sql_fetch("SELECT cat_name FROM cm_lecture_category WHERE cat_id = '$cat_id' ");
    $cate_name = $cate_name_sql['cat_name'];

    $tab_sql = sql_query("SELECT idx,`order`,subject FROM skin_visual_tab WHERE cat_id = '$cat_id' ORDER BY `order` ASC");
    while ($row = sql_fetch_array($tab_sql)) {
        $bn_tab_list[] = $row;
    }
    $tab_name_sql = sql_fetch("SELECT idx , subject FROM skin_visual_tab WHERE cat_id='$cat_id' ORDER BY `order` ASC LIMIT 1 ");
    $tab_name = $tab_name_sql['subject'];
    $tab_idx = $tab_name_sql['idx'];
    if ($tab == '') {
        $tab = $tab_idx;
    }
    $where_sql == '';

    if($sca == 'ing'){
        $where_sql = " AND ((s_date < now() AND e_date > now()) OR (s_date < now() AND e_date IS NULL))";
    }else if($sca == 'expect'){
        $where_sql = " AND ((s_date > now() AND e_date > now()) OR (s_date > now() AND e_date IS NULL))";
    }else if($sca == 'end'){
        $where_sql = " AND (e_date < now())";
    }

    if($stx){
        $where_sql .= " AND subject LIKE '%$stx%' ";
    }
    $bn_sql = sql_query(
        "SELECT *,
         DATE_FORMAT(s_date,'%Y-%m-%d [%H:%i]') AS s_date,
         DATE_FORMAT(e_date,'%Y-%m-%d [%H:%i]') AS e_date,
         DATE_FORMAT(create_datetime,'%Y-%m-%d') AS create_datetime,
         DATE_FORMAT(update_datetime,'%Y-%m-%d') AS update_datetime
         FROM skin_visual_banner
        WHERE parent_idx = '$tab' AND cat_id = '$cat_id'
        $where_sql
        ORDER BY idx DESC");
    while ($row = sql_fetch_array($bn_sql)) {
        if(($row['s_date'] < $nowDate && $row['e_date'] > $nowDate) || ($row['s_date'] < $nowDate && $row['e_date'] == '')){
            $row['status'] = '진행중';
        }else if(($row['s_date'] > $nowDate && $row['e_date'] > $nowDate) || ($row['s_date'] >= $nowDate && $row['e_date'] == '')) {
            $row['status'] = '진행예정';
        }else{
            $row['status'] = '진행종료';
        }
        $bn_list[] = $row;
    }
    //print_r2($bn_list)
?>
<link rel="stylesheet" href="../../adm/css/layout/page/skin_visual.css"/>
<div id="container" class="container">
    <div class="contentArea">
        <div class="areaTit">
            <h1>카테고리 메인 비쥬얼 관리</h1>
        </div>
        <input type="hidden" name="cat_id" id="cat_id" value="<?= $cat_id; ?>">
        <form method="get" class="catIdSearchArea" name="catIdSearch" id="catIdSearch">
            <input type="hidden" name="parent_idx" class="parent_idx" value="<?= $tab ?>">
            <table class="cmTable tableType1">
                <tr>
                    <th>카테고리 선택</th>
                    <td>
                        <div class="select_box_area">
                            <p class="select_txt category_selected"><?= $cate_name ? $cate_name : '카테고리 선택'; ?></p>
                            <div class="basic_select">
                            <div class="seacher_wrap">
                                <input type="text" name="sch_cate" id="A_0" class="cmTextBox sch_cate" placeholder="검색어를 입력해주세요.">
                            </div>
                            <ul class="clear-after selectBox_scroll scroll">
                                <?php while ($row = sql_fetch_array($catgory_sql)) { ?>
                                    <li>
                                        <a href="/cm/skin/main_visual.php?cat_id=<?= $row['cat_id'] ?>"
                                           class="select_link <?= $row['cat_id'] == $cat_id ? "selected" : '' ?>">
                                            [<?= $row['cat_id'] ?>] <?= $row['cat_name'] ?>
                                        </a>
                                    </li>
                                <?php } ?>
                            </ul>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>영역 선택</th>
                    <td>
                        <input type="radio" name="visual_type" id="hero_banner" class="cmRadio cmRadioBtnType"
                               value="hero_banner" checked>
                        <label for="hero_banner" class="cmLabelBtnType">비쥬얼 배너관리</label>
                        <input type="radio" name="visual_type" id="line_banner" class="cmRadio cmRadioBtnType disabled"
                               value="line_banner">
                        <label for="line_banner" class="cmLabelBtnType  disabled">띠배너 관리</label>
                        <input type="radio" name="visual_type" id="product_section"
                               class="cmRadio cmRadioBtnType disabled" value="product_section">
                        <label for="product_section" class="cmLabelBtnType disabled">상품영역 관리</label>
                    </td>
                </tr>
            </table>
        </form>
        <div class="cmResult mgt30">
            <h4 class="contentTit mgb20">비쥬얼 배너관리</h4>
            <?php if($cat_id){?>

            <form method="get" class="bannerSearch" name="bannerSearch" id="bannerSearch">
                <input type="hidden" name="cat_id" id="cat_id" value="<?= $cat_id; ?>">
                <input type="hidden" name="tab" id="tab" value="<?= $tab; ?>">
                <table class="cmTable tableType1 mgb50">
                    <tr>
                        <th>배너타입</th>
                        <td>
                            <div class="hero_bn_tab">
                                <ul class="tab_list">
                                    <?php if ($bn_tab_list) { ?>
                                        <?php for ($i = 0; $i < count($bn_tab_list); $i++) { ?>
                                        <li class="<?= $tab == $bn_tab_list[$i]['idx'] ? "is_active bold" : ''; ?>">
                                            <a href="/cm/skin/main_visual.php?cat_id=<?= $cat_id ?>&tab=<?= $bn_tab_list[$i]['idx'] ?>"><?= $bn_tab_list[$i]['subject'] ?></a>
                                        </li>
                                        <? } ?>
                                    <?php } else { ?>
                                        <li>생성된 탭이 없습니다.</li>
                                    <?php } ?>
                                </ul>
                                <?php if ($bn_tab_list) { ?>
                                    <input type="button" name="bn_naming_set" id="bn_naming_set" class="btn_popupOpen btn_modify"
                                           data-target="heroBn_setting_popup" value="배너 탭 수정/순서지정">
                                <?php } else { ?>
                                    <input type="button" name="bn_naming_set" id="bn_naming_set" class="btn_popupOpen btn_modify"
                                           data-target="heroBn_setting_popup" value="배너 탭 생성/순서지정">
                                <?php } ?>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td>
                            <input type="radio" name="sca" id="view_all" class="cmRadio" value="all" <?php if($sca == '' || $sca == 'all'){echo "checked";}?>>
                            <label for="view_all" class="cmRadioLabel">전체</label>
                            <input type="radio" name="sca" id="view_ing" class="cmRadio" value="ing" <?php if($sca == 'ing'){echo "checked";}?>>
                            <label for="view_ing" class="cmRadioLabel">진행중</label>
                            <input type="radio" name="sca" id="view_expect" class="cmRadio" value="expect" <?php if($sca == 'expect'){echo "checked";}?>>
                            <label for="view_expect" class="cmRadioLabel">진행예정</label>
                            <input type="radio" name="sca" id="view_end" class="cmRadio" value="end" <?php if($sca == 'end'){echo "checked";}?>>
                            <label for="view_end" class="cmRadioLabel">진행종료</label>
                        </td>
                    </tr>
                    <th>배너 명</th>
                    <td class="viewPageType">
                        <input type="text" id="event_name" name="stx" class="w100 cmTextBox" value="<?=$stx?>" placeholder="배너명을 입력하세요.">
                    </td>
                </table>
                <input type="submit" id="search" class="cmBtn cmBtn_l cmBtn_submit" value="검색">
            </form>

            <div class="cmResult">
                <div class="optionSet">
                    <input type="button" name="banner_order" id="banner_order"
                           class="banner_order btn_orderset btn_popupOpen" data-target="skin_banner_order_set"
                           value="순서지정">
                    <?php if ($bn_tab_list) { ?>
                        <a href="/cm/skin/write.php?cat_id=<?= $cat_id; ?>&tab=<?= $tab; ?>"
                           class="btn_create mgl5">추가</a>
                    <?php } else { ?>
                        <a href="javascript:void(0)" onclick="alert('배너탭을 생성해주세요.')" class="btn_create mgl5">추가</a>
                    <?php } ?>
                </div>
                <table class="cmTable tableType2" id="resTable">
                    <colgroup>
                        <col width="5%">
                        <col width="30%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="17%">
                        <col width="17%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>N0</th>
                        <th>제목</th>
                        <th>미리보기</th>
                        <th>연결</th>
                        <th>상태</th>
                        <th>기간</th>
                        <th>등록/수정</th>
                        <th>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    <? if ($bn_list) { ?>
                        <?php for ($i = 0; $i < count($bn_list); $i++) { ?>
                            <tr>
                                <td class=""><?= count($bn_list) - $i; ?></td>
                                <td class="tl"><?= $bn_list[$i]['subject'] ?></td>
                                <td>
                                    <input type="button" name="bannerPrv" class="cmBtn cmBtn_s wing_pop" value="미리보기"
                                           data-code="<?= $bn_list[$i]['idx'] ?>">
                                </td>
                                <td>
                                    <?php if ($bn_list[$i]['conn_url'] != '') { ?>
                                        <input type="button" name="bannerUrlChk" class="cmBtn cmBtn_s wing_pop"
                                               value="URL확인" data-code="<?= $bn_list[$i]['conn_url'] ?>">
                                    <?php } else if ($bn_list[$i]['conn_cp'] != '') { ?>
                                        <input type="button" name="bannerCouChk" class="cmBtn cmBtn_s wing_pop"
                                               value="쿠폰확인" data-code="<?= $bn_list[$i]['conn_cp'] ?>">
                                    <?php } else if ($bn_list[$i]['conn_lec'] != '') { ?>
                                        <input type="button" name="bannerLecChk" class="cmBtn cmBtn_s wing_pop"
                                               value="상품확인" data-code="<?= $bn_list[$i]['conn_lec'] ?>">
                                    <?php } else { ?>
                                        연결 없음
                                    <?php } ?>
                                </td>
                                <td>
                                    <?=$bn_list[$i]['status']?>
                                </td>
                                <td>
                                    <?php if ($bn_list[$i]['e_date'] && $bn_list[$i]['e_date'] != '0000-00-00 [00:00]') { ?>
                                        <?= $bn_list[$i]['s_date'] ?> ~<br>
                                        <?= $bn_list[$i]['e_date'] ?>
                                    <?php } else { ?>
                                        상시<br>
                                        <?= $bn_list[$i]['s_date'] ?>
                                    <?php } ?>
                                </td>
                                <td>
                                    작성일: <?= $bn_list[$i]['create_datetime'] ?> [<?= $bn_list[$i]['create_id'] ?>]<br>
                                    <?php if ($bn_list[$i]['update_datetime']) { ?>
                                        수정일: <?= $bn_list[$i]['update_datetime'] ?> [<?= $bn_list[$i]['update_id'] ?>]
                                    <?php } ?>
                                </td>
                                <td>
                                    <a href="/cm/skin/write.php?type=modify&idx=<?= $bn_list[$i]['idx'] ?>&cat_id=<?= $bn_list[$i]['cat_id'] ?>"
                                       class="cmBtn cmBtn_xs cmBtn_modify">수정</a>
                                    <input type="button" name="bannerDelete" data-idx="<?= $bn_list[$i]['idx'] ?>"
                                           class="cmBtn cmBtn_xs cmBtn_delete" value="삭제">
                                </td>
                            </tr>
                        <?php } ?>
                    <?php } else { ?>
                        <tr>
                            <td colspan="9">검색 결과가 없습니다.</td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>

            <?}else{?>
                <div class="cmResult mgt30">
                    <p class="no-list tc ft_18 bold mgt50">카테고리를 선택해 주세요.
                </div>
            <?}?>
        </div>
    </div>
</div>

<!--배너 탭 수정 popup :S-->
<div class="admCmPop admCmPop_s" id="heroBn_setting_popup">
    <div class="admCmPop_inner">
        <div class="areaTit">
            <h1>배너 탭 수정</h1>
        </div>
        <div class="mgt30">
            <form method="post" name="heroBnNaming" id="heroBnNaming" action="./skin_visual_tab.php">
                <table class="cmTable tableType2 mgt30" id="bn_naming">
                    <colgroup>
                        <col width="20%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>순서</th>
                        <th>탭 명</th>
                    </tr>
                    </thead>
                    <tbody class="visual_tab sortOrder"></tbody>
                </table>
            </form>
        </div>
        <div class="d-flex order_btn_wrap mgt20">
            <input type="button" id="tab_order_create" class="cmBtn cmBtn_m cmBtn_create" value="등록">
            <input type="button" id="banner_search_close" class="cmBtn cmBtn_m cmBtn_cancel" value="취소">
        </div>
    </div>
</div>
<!--배너 탭 수정 popup :E-->

<!--순서지정 popup :S-->
<div class="admCmPop admCmPop_s" id="skin_banner_order_set">
    <div class="admCmPop_inner">
        <div class="areaTit">
            <h1>순서지정</h1>
        </div>
        <div class="cmSearch text-center">
            <form class="bannerOrderSearchArea" name="bannerOrderSearch" id="bannerOrderSearch">
                <div class="d-flex mgb20">
                    <div class="select_box_area w100">
                        <p class="select_txt w100 bnTypeSel"><?= $tab_name ? $tab_name : '배너타입' ?></p>
                        <ul class="clear-after basic_select"><!--add js-->
                            <?php if ($bn_tab_list) { ?>
                                <?php for ($i = 0; $i < count($bn_tab_list); $i++) { ?>
                                    <li>
                                        <input type="hidden" name="idx" value="<?= $bn_tab_list[$i]['idx'] ?>">
                                        <input type="radio" name="bnTab" id="bnTab_<?= $bn_tab_list[$i]['idx'] ?>"
                                               class="cmRadio"
                                               value="<?= $bn_tab_list[$i]['idx'] ?>" <?= $tab == $bn_tab_list[$i]['idx'] ? "checked" : ''; ?>>
                                        <label for="bnTab_<?= $bn_tab_list[$i]['idx'] ?>"
                                               class="cmLabelListType"><?= $bn_tab_list[$i]['subject'] ?></label>
                                    </li>
                                <?php } ?>
                            <?php } else { ?>
                                <li>생성된 탭이 없습니다.</li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </form>
            <input type="button" id="banner_order_search" class="cmBtn cmBtn_s cmBtn_submit" value="검색">
        </div>
        <div class="cmResult mgt0">
            <form method="post" name="saveOrderBannerFrm" id="saveOrderBannerFrm">
                <table class="cmTable tableType2 mgt30" id="bannerOrderRes">
                    <colgroup>
                        <col width="5%">
                        <col width="80%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>순서</th>
                        <th>내용</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody id="addResult" class="sortOrder banner_order_list"><!--add js--></tbody>
                </table>
            </form>
        </div>
        <div class="d-flex order_btn_wrap mgt20">
            <input type="button" id="banner_order_create" class="cmBtn cmBtn_m cmBtn_create" value="등록">
            <input type="button" id="banner_search_close" class="cmBtn cmBtn_m cmBtn_cancel" value="취소">
        </div>
    </div>
</div>
<!--순서지정 popup :E-->

<script src="js/main_visual.js"></script>