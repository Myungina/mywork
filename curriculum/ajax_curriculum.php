<?php
include_once("./_common.php");
include_once("./search_query_ajax.php");

if ($action == 'get_tb_list') {
    $it_id = $_POST['it_id'];
    $cat_id = $_POST['cat_id'];

    // cm_lecture 클래스의 메서드를 사용하여 데이터 가져오기 (curri_myclass.php 와 동일한 방식)
    $subject_list = $cm_lec->GetTbTypeAndItem($it_id);
 
    $html = '';
    $all_type_count = 0; //전체 리스트 구별을 위한 배열 카운트 함수.

    if (!empty($subject_list)) {
        foreach ($subject_list as $tb_item) {
            if ($tb_item['cat_id'] == $cat_id) {
                if (!empty($tb_item['cat_content'])) {
                    foreach ($tb_item['cat_content'] as $content_idx => $content) {
                        // 각 세부 과목별(전체 포함) 컨테이너 생성 -> JS에서 이걸 show/hide                        
                        $html .= '<li id="' . htmlspecialchars($content['tbsubject_as']) . '" class="tb_list_section ' . ($content_idx == 0 ? 'block' : '') . '" >';

                        if (!empty($content['tb_type'])) {

                        foreach ($content['tb_type'] as $type) { 

                            if (empty($type['tb_list'])) continue;

                            // 전체 리스트일 때만 타입 wrapper 생성
                            if ($all_type_count == 0) {
                                $html .= '<div class="dt_toggle_contain">';
                                $html .= '<div class="top_tb_item vdo_type"><p>'
                                            . htmlspecialchars($type['types_name']) .
                                            ' [ ' . $type['type_tb_cnt'] . '강 ]</p></div>';

                                $html .= '<div class="dt_toggle_area">';
                                $html .= '<div class="dt_toggle_inner">';
                            }

                            foreach ($type['tb_list'] as $tb) {

                                    // 진행 상태 클래스
                                    $status_class = '';
                                    if ($tb['shooting_status'] == '완강') $status_class = 'complete';
                                    else if ($tb['shooting_status'] == '진행중') $status_class = 'in_progress';
                                    else if ($tb['shooting_status'] == '예정') $status_class = 'scheduled';

                                    $has_content = !empty($tb['tb_content_list']);

                                    if ($has_content) {
                                        $html .= '<div class="dt_toggle_contain">';
                                    }

                                    $html .= '<div class="'. ($has_content ? 'top_tb_item vdo_type' : 'tb_item') .'">';
                                    $html .= '<p>'. htmlspecialchars($tb['tb_name']) .'</p>';
                                    $html .= '<span class="video_status '.$status_class.'">'
                                            . htmlspecialchars($tb['shooting_status']) .
                                            '</span>';
                                    $html .= '</div>';

                                    if ($has_content) {

                                        $tb_content_idx = 1;

                                        $html .= '<div class="res_list_wrap dt_toggle_area">';
                                        $html .= '<div class="dt_toggle_inner">';

                                        foreach ($tb['tb_content_list'] as $tb_content) {

                                            $html .= '<div>';

                                            $html .=    '<p class="tb_content_name">';
                                            $html .=    '<span>'.sprintf('%02d', $tb_content_idx) . '강.</span> ';
                                            $html .=    '<span>'. htmlspecialchars($tb_content['tb_content']) .'</span>';

                                            if ($tb_content['lec_info']) {
                                                $html .= ' ('. htmlspecialchars($tb_content['lec_info']) .')';
                                            }

                                            $html .= '  </p>';

                                            $html .= '  <span class="video_time">';
                                            $html .=         $tb_content['tb_time']
                                                            ? htmlspecialchars($tb_content['tb_time'])
                                                            : '예정';
                                            $html .= '  </span>';

                                            $html .= '</div>';

                                            $tb_content_idx++;
                                        }

                                        $html .= '</div>'; // dt_toggle_inner
                                        $html .= '</div>'; // res_list_wrap
                                    }
                                    $html .= '</div>'; // dt_toggle_contain
                                }

                                if ($all_type_count == 0) {
                                    $html .= '</div>'; // dt_toggle_inner
                                    $html .= '</div>'; // dt_toggle_area
                                    $html .= '</div>'; // dt_toggle_contain
                                }
                            }
                        }

                        $html .= '</li>'; // end tb_list_section
                    
                        
                        $all_type_count++;
                    }
                }
                break; // 해당 카테고리(cat_id) 처리가 끝났으므로 루프 종료
            }
        }
    }

    echo $html;
}
else {
    echo '잘못된 요청입니다.';
}
?>
