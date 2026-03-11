<?php
    include_once("_common.php");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);;

    $type = $_GET["type"];
    if($type="date"){
        $date = date('w'); // 현재 요일을 구함
        $nHour = date('H'); // 현재 시간을 구함
        $dateSql = "";

        if ($date == 0 || $date == 6) { // 토요일이나 일요일에는 오늘 날짜를 구하는 쿼리를 사용하지 않는다.
            $dateSql = "select DATE_ADD(DATE_FORMAT(now(), '%Y-%m-%d'), interval _t.t1 day) as counselday
                            from _t
                            where (1) AND t1<7 AND weekday(DATE_ADD(DATE_FORMAT(now(), '%Y-%m-%d'), interval _t.t1 day))!=5 AND weekday(DATE_ADD(DATE_FORMAT(now(), '%Y-%m-%d'), interval _t.t1 day))!=6
                            ORDER BY t1 ASC";
        } else {
            $sql_today = "(SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') as counselday ORDER BY counselday ASC)
                                                        UNION";
            if ($nHour >= 18) {
                $sql_today = "";
            }

            $dateSql = "SELECT *
                        FROM(
                            $sql_today
                            (
                                SELECT DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-%d'), INTERVAL _t.t1 DAY) AS counselday
                                FROM (SELECT t1 FROM _t WHERE t1>0 ORDER BY t1 LIMIT 10) _t    /* 이전되면서 동일하게 이전되지 않아서 발생하는 문제로 보여짐 20221012 polaris*/
                                WHERE (1)
                                    AND WEEKDAY(DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-%d'), INTERVAL _t.t1 DAY))!=5
                                    AND WEEKDAY(DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-%d'), INTERVAL _t.t1 DAY))!=6
                                    AND DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-%d'), INTERVAL _t.t1 DAY) NOT IN (SELECT event_day FROM sd_event_day WHERE event_day_type LIKE '%h%')
                                LIMIT 2
                            )
                        ) c
                        ORDER BY c.counselday ASC";
        }
        $d = sql_query($dateSql);
        $totalCounselDay = array();
        $i = 0;

        while ($row = sql_fetch_array($d)) {

            $totalCounselDay[] = array(
                "counselday" => $row['counselday'],
                "isDefault" => $i === 0   // 첫 번째 여부 (필요 없으면 지워도 됨)
            );

            $i++;
        }

        echo json_encode($totalCounselDay);
        exit;
    }

    //print_r2($result);
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    exit;
?>
