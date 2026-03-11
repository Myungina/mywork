<?php
    include_once("_common.php");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


    $cat_id = $_GET['cat_id'];
    $coupon_set_cat_id = $cat_id;
    $coupon_set_cat_id_left = substr($cat_id, 0, 3);
    $coupon_set_it_id = '';
    $total_count =0;
    /*******************************************************************/
    $select_query = "		 a.it_id
							,	a.it_cat_id
							,	a.it_info
							,   b.it_info_txt
							,   a.cm_benefit
							,   a.cm_it_name
							, 	a.it_info_name
							,	c.trigger_event
							, 	a.it_notice_1
							,	a.it_notice_9
							,	a.it_notice_10
							,	a.it_auto_status
							,	b.it_sorting_idx
							,	c.it_book_set
							,   (SELECT it_link FROM cm_common_link_info WHERE it_id = a.it_id) AS 'it_link_info'
							, 	c.it_price_1	
							, 	c.it_sug_price 
							, 	a.it_sorting_idx AS item_sorting_idx 
							,	c.it_none_dc
							,   (SELECT it_link FROM cm_common_link_info WHERE it_id = a.it_id) AS 'it_link_info' 
							, 	a.it_sorting_idx AS item_sorting_idx ";

    $where_query = " WHERE a.it_cat_id = $cat_id AND c.it_buy_use = 1 ";
    $exception = " AND a.it_id != '1755820319'  AND a.it_id != '1768356193'"  ;  //예외처리용

    $sql_item_info = " 	SELECT 
                        $select_query
                        FROM 
                            cm_lecture_item_notice_info a 
                            JOIN cm_lecture_item_info b ON (a.it_info = b.it_info) 
                            JOIN cm_lecture_item c ON (c.it_id = a.it_id)
                        $where_query $exception
                        ORDER BY b.it_sorting_idx ASC, item_sorting_idx IS NULL, item_sorting_idx ASC";

    $rs = sql_query($sql_item_info);

    while ($row = sql_fetch_array($rs)) {
        $row['cm_benefit'] = preg_replace('/^(<br>\s*)+/', '', implode('<br>', array_slice(explode('#', trim($row['cm_benefit'])), 0, 3)));
        $row['it_notice_9'] = html_entity_decode($row['it_notice_9']);
        if ($row['it_sug_price'] > $row['it_price_1']) { // 판매가 보다 원가가 높을때 소수점 버린 값
            $row['discount_rate'] = floor(100 - (($row['it_price_1'] / $row['it_sug_price']) * 100));
        };

        if ($row['it_none_dc'] == 0) { // 무조건 할인가능 상품만 해당 (상품관리 메뉴 참고) 2024-08-01 sd_seojun
            // 이벤트 관리 쿠폰 START
            $sql_coupon_info = " SELECT
                                    b.cp_id AS cp_id
                                , 	a.event_name AS cp_name
                                ,	a.event_contents AS cp_doc
                                , 	b.cp_doc AS cp_info_txt
                                ,	b.cp_price AS cp_price
                                ,	b.cp_max_price AS cp_max_price
                                ,	a.event_s_date AS cp_period_sdate
                                , 	a.event_e_date AS cp_period_edate
                                , 	b.cp_period_use  
                                , 	b.cp_period_sdate AS coupon_sdate
                                , 	b.cp_period_edate AS coupon_edate
                                , 	b.cp_period_days
                                ,   b.cp_price_type
                                , 	LENGTH(b.cp_price) AS len
							FROM 
							    cm_event_info a 
                                JOIN cm_shop_coupon b ON (b.cp_id = a.event_coupon_id)
                                JOIN cm_shop_coupon_item c ON (a.event_coupon_id = c.cp_id)
							WHERE (1) 
                                AND a.event_s_date <= NOW()
							    AND a.event_e_date >= NOW()
                                AND (b.cp_item_use = 0
                                        OR (b.cp_item_use = 1 AND (c.item_list = '$coupon_set_cat_id' OR c.item_list = '$coupon_set_cat_id_left'))
                                        OR (b.cp_item_use = 2 AND (c.item_list = '{$row['it_id']}')))";

            $coupon_query = sql_query($sql_coupon_info);

            $row['price_to_coupon'] = $row['it_price_1'];

            while ($coupon_info = sql_fetch_array($coupon_query)) {
                if ($row['it_price_1'] >= $coupon_info['cp_max_price']) {
                    if ($coupon_info['cp_price_type'] == 1) { // % 할인
                        $coupon['max_price'] = $row['it_price_1'] - ($row['it_price_1'] * ($coupon_info['cp_price'] / 100));
                    } else { // 고정 할인
                        $coupon['max_price'] = $row['it_price_1'] - $coupon_info['cp_price'];
                    }
                    // 쿠폰 중 최대할인 체크 :: S
                    if ($row['price_to_coupon'] > $coupon['max_price']) {
                        $row['discount_calculation'] = substr(floor($row['it_price_1'] - $coupon['max_price']), 0, -4);
                        $row['price_to_coupon'] = $coupon['max_price'];
                        $row['max_coupon_list'] = $coupon_info;
                    }
                    // 쿠폰 중 최대할인 체크 :: E
                }
            }
            $row['price_to_coupon'] = number_format($row['price_to_coupon']);
            $row['it_price_1'] = number_format($row['it_price_1']);
            // 이벤트 관리 쿠폰 END

        } else {
            $row['cp_period_edate'] = false; // 날짜 계산 불가 처리
            $row['final_price'] = false; // 가격 계산 불가 처리
        }

        $key = $row['it_info'];

        if (!isset($productList[$key])) {
            $productList[$key] = [
                'title' => $row['it_info_txt'],
                'items' => []
            ];
        }

        $productList[$key]['items'][] = $row;
        $total_count++;
    }
    $response = [
        'total_count' => $total_count,
        'list' => $productList
    ];

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;