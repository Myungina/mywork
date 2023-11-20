$(document).ready(function(){
	console.log("내 강의실 js");
	//전체선택 Fn
    $('.cartAllChkArea').on('click',function(){
		allChkFn();
	})
	
	//개별선택 Fn
	$('#ddateDownList .cmChkboxLabel').each(function(){
		$(this).on('click',function(){
			chkselFn();
		})
	})    
	if($('.applyLecList li').length > 4){
		$('.btn_all_view').show();
	}
});

var set_fav_lec_cnt=0; // 즐겨찾기 추가 카운트
var remove_fav_lec_cnt=0; // 즐겨찾기 해제 카운트

//즐겨찾기 추가 (강의상세에서 씀)
function set_fav_lec(tb_id) {
	var it_id = $("#it_id").val();
	var ca_id = $("#ca_id").val();

	set_fav_lec_cnt++;
	
	if(set_fav_lec_cnt==1){
		if(confirm("해당 커리큘럼을 즐겨찾기에 추가하시겠습니까?")){
			$.post("/myclass/ajax_get_mylec.php", {type: "set_fav_lec", it_id: it_id, ca_id: ca_id, tb_id: tb_id}, function(data){
				console.log(data);
				if(data=="ok"){
					if(confirm("즐겨찾기에 추가되었습니다. 즐겨찾기 리스트로 이동하시겠습니까?")){
						location.href="/myclass/class_mylec.php?type=likelist";
					}else{
						$('.CencleBtn'+tb_id).show();
						$('.likeListAddBtn'+tb_id).hide();
						set_fav_lec_cnt=0;
					}
					return false;
				}else if(data=="have"){
					alert("이미 추가되어 있습니다.");
					$('.CencleBtn'+tb_id).show();
					$('.likeListAddBtn'+tb_id).hide();
				}
				set_fav_lec_cnt=0;
			});
		}else{
			set_fav_lec_cnt=0;
		}
		return false;
	}else{
		alert("추가중입니다. 잠시만 기다려주세요.");
		return false;
	}
}

//즐겨찾기 해제 (강의상세에서 씀)
function remove_fav_lec(tb_id) {
	var it_id = $("#it_id").val();
	var ca_id = $("#ca_id").val();

	remove_fav_lec_cnt++;

	if(remove_fav_lec_cnt==1){
		if(confirm("해당 커리큘럼을 즐겨찾기에서 해제하시겠습니까?")){
			$.post("/myclass/ajax_get_mylec.php", {type: "remove_fav_lec", it_id: it_id, ca_id: ca_id, tb_id: tb_id }, function( data ){
				console.log(data);
				if(data=="ok"){
					alert("즐겨찾기가 해제되었습니다.");
					$('.likeListAddBtn'+tb_id).show();
					$('.CencleBtn'+tb_id).hide();
				}else if(data=="not"){
					alert("이미 해제되어 있습니다.");
					$('.likeListAddBtn'+tb_id).show();
					$('.CencleBtn'+tb_id).hide();
				}else{
					alert("에러가 발생했습니다.");
				}
				remove_fav_lec_cnt=0;
			});
		}else{
			remove_fav_lec_cnt=0;
		}
		return false;
	}else{
		alert("해제중입니다. 잠시만 기다려주세요.");
		return false;
	}
}

/* 카테고리눌렀을때 */
function catChange(me) {
	var item_cate = $(me).attr("data-ci");

	$("#tbsubject_ord").val('');
	$("#tbsubject_idx").val('');
	$("#cat_id").val(item_cate);

	$("#item_info").submit();
}

/* 과목눌렀을때 */
function tbsubjectChange(me) {
	var ord = $(me).attr("data-ord");
	var idx = $(me).attr("data-idx");
	var item_cate = $(me).attr("data-cate");

	$("#tbsubject_ord").val(ord);
	$("#tbsubject_idx").val(idx);
	$("#cat_id").val(item_cate);

	$("#item_info").submit();
}

/* 강의자료 팝업 띄울때 */
function myRoomfileDownNew(tb_id,mode,chk_pds,chk_mp3,idx){
	console.log("myRoomfileDownNew 실행 > ",tb_id ,mode,chk_pds,chk_mp3,idx);
	var tab_btn = $('.apply-mp3-popup .apply-popup-tab li');
	var tab_file_list = $('.apply-mp3-popup .type-tb-list2');
	var file_names="";

	$(".table_wrap .file_list_pop tbody").html(""); //리스트 내용 다 지워
	tab_btn.removeClass('nofile'); //버튼에 먹인 클래스들 다 초기화
	tab_btn.removeClass('selected'); //동일
	tab_file_list.hide();//탭 내용 다 숨겨
	$(".zipfile_name").val('');

	tab_btn.attr('tb_id',tb_id);
	tab_btn.attr('chk_pds',chk_pds);
	tab_btn.attr('chk_mp3',chk_mp3);
	if(!idx){
		idx='';
	}
	tab_btn.attr('idx',idx);

	if(chk_pds == 0){ $('.apply-mp3-popup .apply-popup-tab .tab_pds').addClass('nofile'); }
	if(chk_mp3==0){ $('.apply-mp3-popup .apply-popup-tab .tab_mp3').addClass('nofile');}

	if(mode=="pds"){
		var mode_big="PDS";
		$('.apply-mp3-popup .apply-popup-tab .tab_pds').addClass('selected');
		tab_file_list.eq(0).fadeIn(200);//.show();
	} else if(mode=="mp3"){
		var mode_big="MP3";
		$('.apply-mp3-popup .apply-popup-tab .tab_mp3').addClass('selected');
		tab_file_list.eq(1).fadeIn(200);//.show();
	}else{
		mode = "N";
	}		

	if(mode!="N"){
		$.getJSON("/myroom/ajax_get_my_tb_file.php", {type:"get_tb_file" , mode : mode_big , tb_id:tb_id ,idx :idx }, function( data ){ console.log(data);
			var html_text='';
				
			for(var i =0; i<data.length;i++){
				if(mode=="pds"){
				
					// html_text+= '		<td style="text-align:center;">	';
						// //html_text+= '		<form name="download_pds_idx"  id="download_pds_idx'+i+'" method="post"  action="/myroom/tb_file_download.php" target="_blank">'; //개별다운으로 바꿀시 열어
						// //html_text+= '			<input type="hidden" name="from_w" class="from_where" value="">';//개별다운으로 바꿀시 열어
						// //html_text+= '		</form>';//개별다운으로 바꿀시 열어
					// html_text+= '		</td>';
					// html_text+= '		<td style="text-align: left;">';
					// html_text+= '			<p class="mov_name">['+data[i].tb_no+'강] '+data[i].tb_content+'('+data[i].orifile+').'+data[i].pds_ext_p+'</p>';
					// html_text+= '		</td>';
				// }else{
					// html_text+= '		<td style="text-align:center;">	';
						// //html_text+= '		<form name="download_mp3_idx" id="download_mp3_idx'+i+'"  method="post"  action="/myroom/tb_file_download.php" target="_blank">';//개별다운으로 바꿀시 열어
						// //html_text+= '			<input type="hidden" name="from_w" class="from_where" value="">';//개별다운으로 바꿀시 열어
						// html_text+= '			<input type="checkbox" name="chkid[]" class="input_label_chk" id="list_m_'+i+'" value="'+i+'" >';
						// html_text+= '			<label for="list_m_'+i+'" class="label_chk"></label>';
						// //html_text+= '		</form>';//개별다운으로 바꿀시 열어
					// html_text+= '		</td>';
					// html_text+= '		<td style="text-align: left;">';
					// html_text+= '			<p class="mov_name">['+data[i].tb_no+'강] '+data[i].tb_content+'.'+data[i].pds_ext_p+'</p>';
					// html_text+= '		</td>';
					
					html_text+= '<li>';
	        		html_text+= '	<div class="cmListTxt w_100 ">';
	        		html_text+= '		<input type="hidden" name="filepath[]" value="fid=8090&tb_dir='+data[i].pds_dir+'&tb_file='+data[i].pds_file+'&type='+data[i].pds_ext_p+'" >';
					html_text+= '		<input type="hidden" name="replacename[]" value="'+data[i].encodefilename+'">';
					html_text+= '		<input type="hidden" name="newfilename[]" value="'+data[i].encodenewfilename+'">';

					
					// ▼▼▼▼ 아카마이 상태가 안좋아서 임시방편 시작 sd_kandyg 2022-02-15 ▼▼▼▼
					//var urls="https://sddata-sdedu.akamaized.net/data/_pds3down/"+data[i].pds_dir;
					//html_text+= '		<a class="cmChkboxLabe pdl20" href="'+urls+'/'+data[i].pds_newfile+'" target="_blank">['+data[i].tb_no+'강] '+data[i].tb_content+'('+data[i].orifile+').'+data[i].pds_ext_p+'</a>';
					// ▲▲▲▲ 아카마이 상태가 안좋아서 임시방편 끝 sd_kandyg 2022-02-15 ▲▲▲▲▲ 이거 지우면 아래 두줄 주석 풀어요 그리고 /_skin/myclass/page/class_detail.htm여기 299줄쯤 주석3개도 살려요



	        		html_text+= '		<input type="checkbox" name="chkid[]" class="cmChkbox file_check_cnt" onchange="chkselFn();" id="list_m_'+i+'" value="'+i+'">';
					html_text+= '		<label for="list_m_'+i+'"  class="cmChkboxLabel pdl20">['+data[i].tb_no+'강] '+data[i].tb_content+'('+data[i].orifile+').'+data[i].pds_ext_p+'</label>';


					html_text+= '	</div>	';
	        		html_text+= '</li>';
						




					
				}
			} 
			if(mode=="pds"){
				$("#ddateDownList").html(html_text);
			}else{
				$("#ddateDownList").html(html_text);
			}
		});
		var name_class=".cmProductName"+tb_id;
		if($(name_class).length>0){
			file_names=$(name_class).text();
		}
		$(".zipfile_name").val(file_names+"_"+mode_big);
		$('#ddataPopup').fadeIn(150);

	}else{

		alert("잘못된 접근입니다."); 
		$('#ddataPopup').fadeOut(150);
		return false;

	}
}

//다운ㄱ
function tb_file_down_st(type){
	event.preventDefault();
	var cked ;
	var id_name;
	if(type=="p"){
		id_name='download_pds_idx';
		cked= $(".file_check_cnt:checked");
	}else{
		id_name='download_mp3_idx';
		cked= $(".file_check_cnt:checked");
	}
	if(cked.length==0){
		alert('파일을 선택해주세요');
		return false;	
	}

	//압축다운 (개별다운할때는 이거닫고 아래 주석 살려 열어)
	if(type=="p"){
		$("#download_pds").submit();
	}else{
		$("#download_mp3").submit();
	}
}

/* 더보기버튼 */
function CatPlusFn() {
	event.preventDefault();
	$(".leclistViewBtn").show(); // 모든 카테고리 표시
	$(".listplusBtn").hide(); // 더보기버튼 숨김
	$("#plusBtnData").val("open"); // 누른표시저장
}

/* 북마크 팝업 만들어주기 */
function bookmarkListBtn(type, me) { 
	var tbtypes_idx = "";
	var tbsubjects_idx = "";
	var it_id = $("#it_id").val();
	var cat_id = $("#bm_cat_id").val();

	if(type == "subject") {
		$(".bm_tbsubject_idx").removeClass('selected');
		$(me).addClass('selected');
		tbsubjects_idx = $(".bm_tbsubject_idx.selected").attr("data-idx");
	} else if(type == "curri") {
		tbtypes_idx = $("#bm_tbtypes_idx").val();
		tbsubjects_idx = $(".bm_tbsubject_idx.selected").attr("data-idx");
	}
	
	/* console.log("it_id: "+it_id+"\ncat_id : "+cat_id+"\ntbsubjects_idx : "+tbsubjects_idx+"\ntbtypes_idx : "+tbtypes_idx); */

	$.post("/myclass/ajax_bookmark.php", {it_id: it_id, cat_id: cat_id, tbsubjects_idx: tbsubjects_idx, tbtypes_idx: tbtypes_idx}, function(data) {
		if(data == "no") {
			alert("북마크 내역이 없습니다");
			return false;
		} else {
			$(".bookmarkPopup").html(data);
			$("#bMarkPopup").fadeIn(150);
		}
		if($("#bm_tbtypes_idx option").length == 1){
			$("#bm_tbtypes_idx").parent('.cmSelectBoxArea').addClass('select_none bg-white');
		}
		if($("#bm_cat_id option").length == 1){
			$("#bm_cat_id").parent('.cmSelectBoxArea').addClass('select_none bg-white');
		}
	});
}

/* 북마크 삭제 함수 */
function deleteBmark(bm_id){
	var crudType = "d"; // ajax가서 처리할타입 지정해줄것임

	if(confirm("삭제하시겠습니까?")) {
		$.post("/sdplayer/kollus-play/public/ajax_bookmark.php",{id: bm_id, crudType: crudType},function(data) {
			$("."+bm_id).remove();
			if($(".bm_li").length == 0) {
				var emptyHtml="";
				emptyHtml += "<li>";
				emptyHtml += "	<div class='w_100 noDateList'>";
				emptyHtml += "		<p class='tc'>등록된 북마크가 없습니다.</p/>";
				emptyHtml += "	</div>";
				emptyHtml += "</li>";
				$(".bMarkSaveList").html(emptyHtml);
			}
			$(".cmContentTit").text("북마크 리스트 ("+$(".bm_li").length+"개)");
			
		});
	} else {
		return false;
	}
}

 //전체선택 Fn
 function allChkFn(){	
	var AllChk = $('#downAllChk');
	if(AllChk.is(':checked') == true){
		$('#ddateDownList .cmChkbox').prop("checked", true);
		$('.downAllBtn').text('전체해제');
	}else{
		$('#ddateDownList .cmChkbox').prop("checked", false);
		$('.downAllBtn').text('전체선택');
	}
}
//개별선택 Fn
	function chkselFn(){
		var chkboxCnt = $('#ddateDownList .cmChkbox').length;
		var chkCnt = $('#ddateDownList .cmChkbox:checked').length;
	
		if(chkboxCnt != chkCnt){
			$('#downAllChk').prop("checked", false); 
			$('.downAllBtn').text('전체선택');
		}else{
			$('#downAllChk').prop("checked", true);
			$('.downAllBtn').text('전체해제');
		}
	}
