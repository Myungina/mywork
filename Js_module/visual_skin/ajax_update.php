<?php 
    include('./_common.php');
    include_once("./cm_adm_common.php");
    include_once($_SERVER["DOCUMENT_ROOT"] . "/lib/cdn_upload.class.php");
    header('Content-Type: application/json');

    $big_title = str_replace("\r\n", "\\n", $big_title);

    if ($type == 'tab_order_create') {
        $item = $_POST['sendData'];
        foreach ($item as $row) {
            $idx = $row['idx'];
            $order = $row['order'];
            $subject = $row['subject'];

            if ($idx != '') {
                // 탭 순서, 텍스트 업데이트
                $sql = "
                    UPDATE skin_visual_tab
                    SET 
                        `order` = $order
                        ,`subject` = '$subject'
                        , update_id = '{$member['mb_name']}'
                        , update_datetime = now()
                    WHERE idx = $idx
                ";

            } else {
                $sql = "INSERT INTO skin_visual_tab SET
                       `order` = $order
                       ,`subject` = '$subject'
                       ,cat_id = '$cat_id'
                       ,create_id = '{$member['mb_name']}'
                       ,create_datetime = now()
                       ";

            }
            sql_query($sql);
        }
        echo json_encode(['result' => 'success']);
        exit;
    } else if ($type == 'banner_order_create') {
        $item = $_POST['sendData'];
        foreach ($item as $row) {
            $idx = $row['idx'];
            $order = $row['order'];

            if ($idx) {
                // 탭 순서, 텍스트 업데이트
                $sql = "
                    UPDATE skin_visual_banner
                    SET 
                        `order` = $order
                    WHERE idx = $idx
                ";
                sql_query($sql);
            }
        }
        echo json_encode(['result' => 'success']);
        exit;
    }