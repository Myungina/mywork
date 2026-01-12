<?php
include('./_common.php');
include_once("./cm_adm_common.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/lib/cdn_upload.class.php");

$g4 = $GLOBALS['g4'];
$file_upload_msg = "";
$file_overlap_chk = false;
$retArr = [];
$upload = [];
$big_title = str_replace("\r\n", "\\n", $big_title);
$chars_array = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));

/*마지막 순번 만들기*/
$auto_ord = "SELECT IFNULL(MAX(`order`), 0) AS max_order 
             FROM skin_visual_banner 
             WHERE cat_id = '$cat_id'";
$auto_ord = sql_fetch($auto_ord);
$next_order = $auto_ord['max_order'] + 1;


$cdn = new CDNUploader();
$cdn->Connect(true);
$upload_max_filesize = ini_get('upload_max_filesize');
$tmp_file = $_FILES['conn_img']['tmp_name'][0];
$filename = $_FILES['conn_img']['name'][0];


if ($filename) {
    if ($_FILES['conn_img']['error'][0] == 1) {
        $file_upload_msg .= "\'{$filename}\' 파일의 용량이 서버에 설정($upload_max_filesize)된 값보다 크므로 업로드 할 수 없습니다.\\n";
        return;
    } else if ($_FILES['conn_img']['error'][0] != 0) {
        $file_upload_msg .= "\'{$filename}\' 파일이 정상적으로 업로드 되지 않았습니다.\\n";
        return;
    }else{
        $file_upload_msg .= "\'{$filename}\' 정상인듯";
    }
    // 아래의 문자열이 들어간 파일은 -x 를 붙여서 웹경로를 알더라도 실행을 하지 못하도록 함
    $filename = preg_replace("/\.(php|phtm|htm|cgi|pl|exe|jsp|asp|inc|js)/i", "$0-x", $filename);
    $filesize = $_FILES['conn_img']['size'][0];
    $fileError = $_FILES['conn_img']['error'][0];;
    $ext_filea = pathinfo($filename, PATHINFO_EXTENSION);
    $cdn_dir = $_SERVER['DOCUMENT_ROOT']."/data/cm/skin_visual_bn";
    $upload[0]['image'] = @getimagesize($tmp_file);
    $upload[0]['source'] = $filename;
    $upload[0]['filesize'] = $filesize;
    $upload[0]['filePath'] = $cdn_dir. "/";

    shuffle($chars_array);
    $shuffle = implode("", $chars_array);
    $upload[0]['file'] = date("ymd") . '_' . date("his") . '_' . substr($shuffle, 0, 8) . "." . $ext_filea;
}


$cp_str = implode(",", $_POST['conn_cp']);
$lec_str = implode(",", $_POST['conn_lec']);
$s_date = $s_date.":00";
$e_date = trim($e_date) === '' ? 'NULL' : "'".$e_date.":00'";
$set_data = "parent_idx = $parent_idx ,
            cat_id = '$cat_id' , 
            `subject` = '$subject',
            s_date = '$s_date',
            e_date = $e_date,
            big_title = '$big_title',            
            mid_title = '$mid_title',
            small_title = '',
            btn_txt = '$btn_txt' ,
            link_target = '$link_target' ,
            conn_url = '$conn_url' , 
            conn_cp = '$cp_str' ,
            conn_lec = '$lec_str'   
            ";
if($filename){
    $set_data .= ",conn_img = '{$upload[0]['file']}'";
}

if (is_uploaded_file($tmp_file)) {
    $dest_file =  $cdn_dir . "/" .$upload[0]['file']; // 업로드 저장 디렉토리
    // 디렉토리 생성
    if (!file_exists($g4['path'].$cdn_dir)) {
        @mkdir($g4['path'].$cdn_dir, 0707);
        @chmod($g4['path'].$cdn_dir, 0707);
    }
    if (!file_exists($g4['path'].$cdn_dir."/")) {
        @mkdir($g4['path'].$cdn_dir."/", 0707);
        @chmod($g4['path'].$cdn_dir."/", 0707);
    }

    $upload_dir = dirname($dest_file);

    if (move_uploaded_file($tmp_file, $dest_file)) {
        $ret = json_decode($cdn->ForwardCDN($dest_file), true);
        if ($ret["status"] != "pass") {
            $retArr['code'] = "500";
            $retArr['msg'] = "CDN 전송 오류";
            print($retArr);
            die;
        }
    }else{
        echo "error";
    }
    // 올라간 파일의 퍼미션을 변경합니다.
    chmod($dest_file, 0606);
}


if ($write_type == "modify") {
    /*수정*/
    $sql = "UPDATE skin_visual_banner SET    
       $set_data
    , update_id = '{$member['mb_name']}'
    , update_datetime = now()
      WHERE idx = $write_idx";
    sql_query($sql);
    goto_url("/cm/skin/main_visual.php?cat_id=$cat_id");
}else {
    /*등록*/
    $sql = "INSERT INTO skin_visual_banner SET
            `order` = 99 ,
                $set_data
                , create_id = '{$member['mb_name']}'
                , create_datetime = now()
                ";
    sql_query($sql);
    goto_url("/cm/skin/main_visual.php?cat_id=$cat_id");
}
    /*최초등록*/
