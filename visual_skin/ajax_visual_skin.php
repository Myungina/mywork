<?php
    include('./_common.php');
    include_once("./cm_adm_common.php");
    header('Content-Type: application/json; char-set=UTF-8');

    $type = $_POST['type'];
    $cp_id = $_POST['cp_id'];
    $stx = $_POST['stx'];
    $parent_idx = $_POST['parents_idx'];
    $cat_id = $_POST['cat_id'];
    $nowDate = date("Y-m-d [H:m]"); // 현재 시각

    if ($type == 'couponlist') { // 쿠폰
        //쿠폰 리스트
        $sql = "SELECT * FROM cm_shop_coupon";
        if ($stx) {
            if (is_array($stx)) {
                $in = "'" . implode("','", array_map('trim', $stx)) . "'";
                $sql .= " WHERE cp_id IN ($in) OR cp_name IN ($in)";
            } else {
                $stx = trim($stx);
                $sql .= " WHERE cp_name LIKE '%$stx%' OR cp_id = '$stx'";
            }
        }
        $sql .= " ORDER BY cp_id DESC";

        $sql = sql_query($sql);

        while ($row = sql_fetch_array($sql)) {
            if ($row['cp_price_type'] == 0) {
                $row['cp_price'] = number_format($row['cp_price']) . '원';
            } else {
                $row['cp_price'] = number_format($row['cp_price']) . '%';
            }
            $coupon_list[] = $row;
        }

        echo json_encode($coupon_list, JSON_UNESCAPED_UNICODE);
        exit;

    } else if ($type == 'leclist') { //무료 상품 
        //무료강의 리스트
        $sql = "SELECT it_id, it_name FROM cm_lecture_item WHERE it_type = 99 ";
        if (is_array($stx)) {
            $in = "'" . implode("','", array_map('trim', $stx)) . "'";
            $sql .= " AND (it_id IN ($in) OR it_name IN ($in))";
        } else {
            $stx = trim($stx);
            $sql .= " AND (it_id LIKE '%$stx%' OR it_name LIKE '%$stx%')";
        }
        $sql .= " ORDER BY CAST(it_id AS UNSIGNED) DESC;"; // 컬럼이 STRING 정렬 꼬이기에 CAST 후 정렬
        $sql = sql_query($sql);


        while ($row = sql_fetch_array($sql)) {
            $gift_list[] = $row;
        }

        echo json_encode($gift_list, JSON_UNESCAPED_UNICODE);

        exit;
    }else if($type == 'bn_naming_set'){ //배너 탭 순서 등록
        $sql ="SELECT idx , `order`,subject FROM skin_visual_tab WHERE cat_id = '$cat_id' ORDER BY `order` ASC";
        $sql = sql_query($sql);

        while ($row = sql_fetch_array($sql)) {
            $bn_tab_list[] = $row;
        }
        echo json_encode($bn_tab_list, JSON_UNESCAPED_UNICODE);
        exit;

    }else if($type == 'preview'){ //미리보기
        $sql ="SELECT big_title , mid_title,btn_txt ,conn_img  FROM skin_visual_banner WHERE idx= '$stx'";
        $sql = sql_query($sql);

        while ($row = sql_fetch_array($sql)) {
            $preview[] = $row;
        }

        echo json_encode($preview, JSON_UNESCAPED_UNICODE);
        exit;
    }else if($type == 'banner_order'){ //배너 순서
        $bn_sql = sql_query(
            "SELECT idx, `order`, subject,
            DATE_FORMAT(s_date,'%Y-%m-%d [%H:%i]') AS s_date,
            DATE_FORMAT(e_date,'%Y-%m-%d [%H:%i]') AS e_date
            FROM skin_visual_banner 
            WHERE parent_idx = '$parent_idx' AND cat_id = '$cat_id' 
          AND (
            ((s_date < now() AND e_date > now()) OR (s_date < now() AND e_date IS NULL))  /*진행중*/            
            OR ((s_date > now() AND e_date > now()) OR s_date > now() AND e_date IS NULL)   /*예정*/               
            )
            ORDER BY `order` ASC");
        while ($row = sql_fetch_array($bn_sql)) {
            if(($row['s_date'] < $nowDate && $row['e_date'] > $nowDate) || ($row['s_date'] < $nowDate && $row['e_date'] == '')){
                $row['status'] = '진행중';
            }else if(($row['s_date'] > $nowDate && $row['e_date'] > $nowDate) || ($row['s_date'] > $nowDate && $row['e_date'] == '')) {
                $row['status'] = '진행예정';
            }else{
                $row['status'] = '진행종료';
            }
            $bn_list[] = $row;
        }
        echo json_encode($bn_list, JSON_UNESCAPED_UNICODE);
        exit;
    }else if($type == 'get_delete'){
        sql_fetch("DELETE FROM skin_visual_banner WHERE idx = '$stx'");
        $bn_list = sql_affected_rows();

        echo json_encode($bn_list, JSON_UNESCAPED_UNICODE);
        exit;
    }