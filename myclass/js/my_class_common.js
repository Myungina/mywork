var g4_path = ".."; // 이어보기할때 씀
$(document).ready(function(){
	console.log("마이페이지 js");
	pieChartFn();
	cmtabFn();
	curriPop();

	/* $('.cmPopupCloseBtn , .popup-bg').on('click',function(){
		$(this).parents('.cmPopupLayer , .cmSideLayer').fadeOut(150);
	}) */

	//진도율:S
    $('.chart').each(function(idx, element){
    	var chgColor = "";
    	if($(this).hasClass('bg-gold')){
        	chgColor= '#eee6db'
        }else{
        	chgColor= '#dedede'	
        }       
        
        $(element).easyPieChart({
            //easing: 'easeOutElastic',
            barColor :  '#df1926',         
            trackColor: chgColor,
            scaleColor: false,
            lineWidth:6,  // 배경라인 두께(회색)F
            trackWidth: 6, // val라인 두께(빨강색)
            lineCap: 'butt',
            size:85,  //그래프 사이즈 (width)
            onStep: function(from,to,percent){  //글자넣기
                $(this.el).find('.percent').text(Math.round(percent)+"%");
            }
        });
      });
    //진도율:E  
    
    
    //포함상품 
     $(document).on('click','.cartArrowDown',function(){
     	var thisTxt = $(this).text();
    	event.preventDefault();
    	if(thisTxt == '목차열기'){
    		$(this).text('목차닫기');    		
    	}else if(thisTxt == '목차닫기'){
    		$(this).text('목차열기');
    	}
    	$(this).toggleClass('arrowShow');
    	$(this).parents('.hideDetailParent').find('.hideDetailChild').slideToggle('show');
    	
    })
    
    //리스트 타입별로 보여주기
    $('.typeShowmenu .cmTypeBtn').on('click', function(){
    	event.preventDefault();
    	var showList = $(this).attr('href');
    	var list = $(this).parent('.typeShowmenu').siblings('.typeShowlist');

		if($("#Type_chk_").val() == "coupon") {
			var nolist = "<li class=\"nolist\"><div class=\"w_100 noDateList\"><p class=\"tc\">쿠폰 내역이 없습니다</p></div></li>";
		} else if($("#Type_chk_").val() == "cash") {
			var nolist = "<li class=\"nolist\"><div class=\"w_100 noDateList\"><p class=\"tc\">내역이 없습니다</p></div></li>";
		} else {
			var nolist = "<li class=\"nolist\"><div class=\"w_100 noDateList\"><p class=\"tc\">내역이 없습니다</p></div></li>";
		}
    	
    	$(this).addClass('selected');
    	$(this).siblings().removeClass('selected');
    	
    	list.children('li.nolist').remove();    	
    	if(showList == 'alllistshow'){    		
	    	list.children('li').show();
    	}else{
    		list.children('li:not(".liat_header")').hide();
	    	list.children('.'+showList).show();
	    	
	    	if(list.children('.'+showList).length == '0'){
	    		list.append(nolist);	
	    	}	
    	}
    	
    })
    
    /*****************/
    /****팝업공통:S****/
    /*****************/   
   /*닫기*/
   $('.cmPopupCloseBtn , .popup-bg').on('click',function(){   	
   	$(this).parents('.cmPopupLayer , .cmSideLayer').fadeOut(150);
   	
   	/** 전체보기 버튼있을때는 강제로 전체해제만들기*/
   	var allchkLng = $('.downAllBtn');  
   	var chkLng = $('.cmChkbox');
   	if(allchkLng.length > 0 && ($('#downAllChk').is(":checked") == true)){
   		$('#downAllChk').trigger('click');
   	}else if(chkLng.length > 0 ){
   		$('.cmChkbox').attr('checked', false);
   	}
   	   	
   })   
    $('.cmPopupClose').on('click',function(){
   	$(this).parents('.cmMianPopupContent').fadeOut(150);
   })   
   $('.fullLayer').on('click',function(e){  //전체영역중에서
	  if($('.cmPopupArea').has(e.target).length === 0){  //해당영역 안에서 이벤트 발생여부
		$('.cmPopupCloseBtn').trigger('click');
	  }
	})
   
   
   /*열기*/
   $('.cmPopupFn').on('click',function(){
  	 	event.preventDefault();
   		var thisTarget = $(this).attr('href');
		var od_id = $(this).attr('data-odid');
		$('.cmPopupLayer , .cmSideLayer').hide();
   		
		if(!$(this).hasClass('deliveryDetailBtn') && !$(this).hasClass('reservationNumberBtn')) {   		
			if($(thisTarget).length == 0){
				alert('준비중입니다.');
			   return false;
			}
		}

   		if(thisTarget == '#accountNumber'){ //예약번호/계좌번호 확인 팝업은 별개로 사용되어야해서...공통 id사용 못함
   			$('.accountNumLayer').hide();
   			//팝업 위치값잡기-> 해당버튼 기준
   			var popup_left = $(this).position().left;
   			var popup_top = $(this).position().top;
   			
   			 thisTarget = $(this).parents('li').find('.accountNumLayer');
   			 thisTarget.css({
   			 	'top':popup_top + 25,
   			 	'left':popup_left + 3
   			 })
		}else if(thisTarget == '#deliveryDetail'){
			$('.deliveryDetail').hide();
			$("#Del-"+od_id).html('');
			$.ajax({
				url: "../../myclass/ajax_get_detail_order.php",
				data: {od_id: od_id, type:"detail"}, 
				type: "POST",
				async: false, 
				success: function(data) {
					$("#Del-"+od_id).html(data);
				}
			});

			var od_id = $(this).attr('data-odid');
			thisTarget = thisTarget+"-"+od_id;

   		}else if(thisTarget == '#orderDetail'){
			$(".cmPopupContent.popupOdDetail").html('<div class=\'div-table w_100 h_100\'><div><p class=\'tc ft_21\'>상세내역 불러오는 중...</p></div></div>');
			var od_id = $(this).attr('data-odid');
			$.post("../../myclass/ajax_get_detail_order.php",{od_id: od_id, type:"one"}, function(data) {
				$(".cmPopupContent.popupOdDetail").html(data); 
			});
		}
		
		if(thisTarget != '#bMarkPopup'){
			$(thisTarget).fadeIn(150);	
		}
   		
   })
    /*****************/
    /****팝업공통:E***/
    /*****************/   
    
    //input text입력제한
    $('.inputTxt').on("keyup", function() {
		var thisLng = $(this).val().length;
		if($(this).hasClass( 'coupon-num1')){
			var maxLng = 4; 
			$(this).val($(this).val().replace(/[^a-zA-Z]/gi,"")); //영어만
			$(this).val($(this).val().toUpperCase());//대문자변환
		}else if($(this).hasClass('coupon-num2') || $(this).hasClass('verificationNum')){
			var maxLng = 5; 
			 $(this).val($(this).val().replace(/[^0-9]/gi,""));  //숫자만
		}else if($(this).hasClass('coupon-num3')){
			$(this).val($(this).val().replace(/[^a-z0-9]/gi,""));  //영어 숫자만
			$(this).val($(this).val().toUpperCase());//대문자변환
			var maxLng = 5; 
		}else{
			
		}
		
		if( $(this).val().length > maxLng) {
			 $(this).val($(this).val().slice(0,maxLng));
		}
		
		//쿠폰등록버튼 활성화
		if($("input[name='coupon-num[]']").length > 0){
			if( ($('.coupon-num1').val().length > 2)  && ($('.coupon-num2').val().length > 4 )&& ($('.coupon-num3').val().length > 4)){
				$('#add_coupon').removeClass('btnInert');
			}else{
				$('#add_coupon').addClass('btnInert');
			}	
		}
		
	})

})

/***********************************************/
/***********************************************/
/******************function*********************/
/***********************************************/

/*열기*/
function reset_apply_btn(mb_id, device_cnt, device_reset_cnt, it_id, tb_id, tb_idx, wh, ptype, upload_file_key, media_content_key, quality, reset_limit_cnt, seektime){		
	if(device_cnt >= '4'){ //등록된 기기는 3대까지만,,,
		var strl_cnt = reset_limit_cnt - device_reset_cnt;

		$('#divice_cnt').val(device_cnt);
		$('#divice_reset_cnt').val(device_reset_cnt);
		$('#reset_limit_cnt').val(reset_limit_cnt);

		// $('#resent_device').text(device_cnt); //현재 등록된기기
		if(reset_limit_cnt == 99) {
			$('.limit_cnt').text("무제한"); //기기 초기화 남은 횟수
			$('#resent_reset').text("무제한"); //기기 초기화 남은 횟수
		} else {
			$('.limit_cnt').text("총 "+reset_limit_cnt+"회"); //기기 초기화 남은 횟수
			$('#resent_reset').text(strl_cnt+"회"); //기기 초기화 남은 횟수
		}

		$('#mb_id').val(mb_id); 
		$('.lecResetConfirm').fadeIn(150);
	}else{
		play_kollus(it_id, tb_id, tb_idx, wh, ptype, upload_file_key, media_content_key, quality, seektime);
	}
};

//기기 초기화 안내
function reset_apply_go(){
	
	event.preventDefault();
		var thisChk = $('#reset_chk');	
		var mb_id = $('#mb_id').val();
		var device_cnt = $('#divice_cnt').val();
		var device_reset_cnt = $('#divice_reset_cnt').val();			
		var reset_limit_cnt = $('#reset_limit_cnt').val();

		if(thisChk.is(":checked") == false){
			alert("기기초기화 동의에 체크해주세요.");
			return false;
		}else{
			if(device_reset_cnt == reset_limit_cnt && reset_limit_cnt != 99){ // 기기 초기화 모두 소진
				alert('기기 초기화 횟수를 모두 소진하셨습니다.\n기기초기화가 불가 하오니, 고객센터로 문의하시기 바랍니다.');
					$('#lecResetConfirm').fadeOut(150);
					return false;				
			}else{
				$.post('/common_php/play_device_reset.php',{mb_id : mb_id, device_cnt : device_cnt, device_reset_cnt : device_reset_cnt, reset_limit_cnt: reset_limit_cnt},function(rec){
					if (rec == 2){
						alert('기기 초기화 횟수를 모두 소진하셨습니다.\n기기초기화가 불가 하오니, 고객센터로 문의하시기 바랍니다.');
						$('.reset_popup_wrap').fadeOut(150);
						$('.reset_apply').hide();
					} else if(rec == 99){
						alert('기기초기화 정보가 부족합니다. 다시 진행해주세요');
						$('.reset_popup_wrap').fadeOut(150);
						$('.reset_apply').hide();
						return false;
					} else {
						alert('기기초기화가 완료 되었습니다. 강의를 다시 실행시키시기 바랍니다.');
						location.reload();
						return false;
					}
				});
			}
		}
		
}	
/***************기기 초기화 팝업:E*************/ 

//숫자 수제한
function max_length(target){
	if( target.value.length > target.maxLength ){
		target.value    = target.value.slice( 0, target.maxLength );
	}
}

 // 인풋 숫자만ㅎㅎ
function only_number(target){
	target.value = target.value.replace(/[^0-9]/g,'');
	/*var key_code   = event.keyCode;	// 키보드 숫자, 키페드 숫자, 빽키
	if(( key_code >= 48 && key_code <= 57 ) || ( key_code >= 96 && key_code <= 105 ) || ( key_code == 8 )){
	}else{
		event.returnValue   = false;
	}*/
}

 // 인풋 한글만 이거 키업말고 keypress쓰세요
function only_korean(target){
	var pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
	target.value = target.value.replace(pattern, '');
}

function pieChartFn(){
	//진도율:S
    $('.chart').each(function(idx, element){
    	var chgColor = "";
    	if($(this).hasClass('bg-gold')){
        	chgColor= '#eee6db';
        }else{
        	chgColor= '#dedede';
        }       
        
        $(this).easyPieChart({
            //easing: 'easeOutElastic',
            barColor :  '#df1926',         
            trackColor: chgColor,
            scaleColor: false,
            lineWidth:6,  // 배경라인 두께(회색)
            trackWidth: 6, // val라인 두께(빨강색)
            lineCap: 'butt',
            size:85,  //그래프 사이즈 (width)
            onStep: function(from,to,percent){  //글자넣기
                $(this.el).find('.percent').text(Math.round(percent)+"%");
            }
        });
      });
    //진도율:E  
}

function cmtabFn(){
	$('.link-tab').each(function(){
		$(this).on('click',function(){
			event.preventDefault();
			var thisId = $(this).attr('href');
			var tabtype = $(this).parent('li').parent('ul');
			if(tabtype.hasClass('subtab-menu') == true){
				$('.subtab-content').hide();
				$('.cm_subtab .link-tab').removeClass('selected');
			}else{
				$('.cm_subtab').hide();
				$('.cm_tab_ment .link-tab').removeClass('selected');
			}
			$(thisId).show();			
			$(this).addClass('selected');
		})
	})
}

var remove_fav_lec_cnt=0;

function numberFormat( num ){
	var rNum = ''
		//var rNum = num.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(',');
	return rNum;	
}

function lecRefrashFn(it_id,ca_id,trun,status,dday,reg_date){
	event.preventDefault();
	$('#refrash_ca_id').val(ca_id);
	$('#refrash_pause_cnt').val(trun);
	$("[name='popup_pause_cnt']").text(trun);
	$("#popup_left_cnt").text(2-trun);
	$('#refrash_reg_date').val(reg_date);
	console.log(it_id+" / "+ca_id+" / "+trun+" / "+status+" / "+dday+" / "+reg_date);
	
	// 휴강중이 아닐때
	if(status!=1){
		console.log(status+"x1");
		if(trun >= 2){  //휴강 2회를 모두 썼을때
			alert("휴강신청 2회를 모두 이용하여\n휴강신청이 불가합니다.");
			return false;
		}else{
			$('#lecRefrashConfirm').find('.refrash_cnt').text(trun);	
			$('#lecRefrashConfirm').fadeIn(150);
		}
	}else{
		// 휴강중일때
		console.log(status+"o1");
		if(dday==30){
			// 휴강취소할때
			$('#lecRefrashCencle').find('.refrash_cnt').text(trun);	
			$('#lecRefrashCencle').fadeIn(150);
		}else{
			// 휴강해제할때
			$('#lecRefrashCencle').find('.refrash_cnt').text(trun);	
			
			/* if(trun >= 2){  //휴강 2회를 모두 썼을때
				$('.overment').show();
				$('.refrash_cencle .yet').hide();
			}else{
				$('.overment').hide();
				$('.refrash_cencle .yet').show();			
			} */

			$('#lecRefrashCencle2').fadeIn(150);
			$('.refrash_cencle').show();
			$('.refrash_cencle_today , .refrash_apply').hide();
		}
	}
}	

//휴강신청
function refrash_apply_go(){
	event.preventDefault();
	var thisChk = $('#refrash_chk');						
	if(thisChk.is(":checked") == false){
		alert("휴강신청 동의에 체크해주세요.");
		return false;
	}else{
		var ca_id = $('#refrash_ca_id').val();
		$.post('/myclass/ajax_lecture_pause.php',{ca_id : ca_id},function(rec){
			if(rec=='-1'){
				alert('이미 휴강신청을 다 사용하신 고객입니다.');
				$('#lecRefrashConfirm').fadeOut(150);
				$('.refrash_apply').hide();
				return false;
			}
			if(rec>0){
				alert('휴강신청 횟수 3회를 다 이용하셔서 휴강신청이 불가합니다.');
				$('#lecRefrashConfirm').fadeOut(150);
				$('.refrash_apply').hide();
			}else {
				alert('휴강신청이 완료되었습니다.');
				location.reload();
			}
		});
	}
}	
//휴강취소
function refrash_cencel_today(){
	event.preventDefault();
	var ca_id = $('#refrash_ca_id').val();
	var reg_date = $('#refrash_reg_date').val();
	var pause_cnt =$('#refrash_pause_cnt').val();
	$.post('/myclass/ajax_lecture_day_cancel.php',{ca_id : ca_id, pause_cnt : pause_cnt, od_year_status : "after", reg_date : reg_date},function(rec){
		if (rec == 1){//정상
			location.reload();
		}else if (rec == 90){//잘못된접근
			alert("정상적인 접근이 아닙니다.");
			location.reload();
			return false;
		}else if (rec == 99){//DB에러
			alert("ERROR");
			location.reload();
			return false;
		}
	});
}
//휴강해제
function refrash_cencel(){
	event.preventDefault();
	var ca_id = $('#refrash_ca_id').val();
	$.post('/myclass/ajax_lecture_pause_off.php', {ca_id : ca_id},	function(rec){
		if(rec=='1'){
			//alert('재수강신청이 정상적으로 처리되었습니다!');
			alert("휴강해제 되었습니다.");
			location.reload();
			return false;
		}else{
			alert("정상적인 접근이 아닙니다.");
			location.reload(true);
			return false;
		}
	});
}

//수강증 다운
function showCertify(ca_id,mode,per){
	event.preventDefault();
	var mode = (mode !== undefined) ? "&mode=" + mode : "";
	if(mode != "first" && per < 70) {
		alert('총 진도율이 70%이상일때만 수강이수증을 출력할수 있습니다!');
		return false;
	}
		window.open("/myclass/certi.php?svs=myclass&pa_ca_id="+ ca_id + mode, "certi", "left=0, top=0, width=750, height=1000, toolbar=no, scrollbars=yes, status=yes, resizable=yes");
}

var remove_fav_lec_cnt=0; // 즐겨찾기 해제 카운트

//즐겨찾기 해제 (즐겨찾기탭에서 씀)
function removeFavLecFn(it_id,tb_id,ca_id){
	event.preventDefault();
	remove_fav_lec_cnt++;
	
	console.log('remove_fav_lec '+remove_fav_lec_cnt +" > "+it_id+" / "+tb_id+" / "+ca_id+" / 즐찾해제");

	if(remove_fav_lec_cnt==1){
		if(confirm("해당 커리큘럼을 즐겨찾기에서 해제하시겠습니까?")){		
			$.post("/myclass/ajax_get_mylec.php", {type:"remove_fav_lec" , it_id : it_id , ca_id:ca_id, tb_id:tb_id }, function( data ){
				//console.log(data);
				if(data=="ok"){
					alert("즐겨찾기가 해제되었습니다.");
					location.reload();
				}else if(data=="not"){
					alert("이미 해제되어 있습니다.");
					location.reload();
				}else{
					alert("에러가 발생했습니다.");
				}
				remove_fav_lec_cnt=0;
			});
		}else{
			remove_fav_lec_cnt=0;
			return false;
		}
	}else{
		alert("해제중입니다. 잠시만 기다려주세요.");
		return false;
	}
}

function serializeMap( jqElem, arrToOneStr, delimiter ){
	var mData = {};
	var jqInput = null;
	var sName = "";
	var sValue = "";
	var sType = "";
	var sTmp = "";
	var isArrToOneStr = $.isArray(arrToOneStr);
	var sDelimiter = delimiter || ",";

	jqElem.find("input[type!='button'][type!='submit'][type!='image'], select, textarea").each(function(index){
		jqInput = $(this);

		if (jqInput.attr("disabled") !== undefined) return;

		sType = jqInput.attr("type");

		sName = jqInput.attr("name");
		sValue = jqInput.val();

		if (mData.hasOwnProperty( sName ) === false){
			if ((sType === "checkbox") || (sType === "radio")){
				if (this.checked === true){
					mData[ sName ] = sValue;
				}
			}
			else{
				mData[ sName ] = sValue;
			}
		}
		else{
			if (isArrToOneStr === true){
				if (arrToOneStr.indexOf( sName ) >= 0){
					mData[ sName ] = mData[ sName ] + sDelimiter + sValue;
				}
			}
			else{
				if ($.isArray(mData[ sName ]) === false){
					sTmp = mData[ sName ];
					mData[ sName ] = [];
					mData[ sName ][0] = sTmp;
				}
				mData[ sName ][ mData[ sName ].length ] = sValue;
			}
		}
	});

	return mData;
}


//수강종료 재수강신청
function reApply(ca_id){
	$.post("/myclass/ajax_re_apply.php",{ca_id : ca_id}, function(msg){
		if(msg == "reapply"){
			if(confirm(' 무료 강의를 재 신청 하시겠습니까?')){				
				if(confirm('신청이 완료 되었으며, 내강의실로 이동 하시겠습니까?')){
					location.href = "/myclass/class_mylec.php?type=free";						
				}else{
					location.reload(true);	
				}					
			}else{
				return false;
			}									 
		}else{
			alert(msg);
		}
		// myroom.common.lectureLoading("off");
	});
}

function get_membership_item(){ 
	var m_cat_id_selecter = $('#AddLec option:selected');
	var m_cat_id = m_cat_id_selecter.val() ;
	var m_it_id = $('#it_id').val();
	
	var od_id= $('#od_id').val();
	var it_id=$('#it_id').val();
	var ca_id=$('#ca_id').val();
	
	console.log(m_it_id);
	
	$.getJSON("/myclass/ajax_get_mylec.php", {type:"get_membership_item" , it_id : m_it_id , cat_id : m_cat_id }, function( data){
		var html_text='';
		if(data.length > 0){	
			for(var i =0; i<data.length;i++){
				html_text+= '<li>';
				html_text+= '<div class="cmListIcon chartArea">';
				html_text+= '	<div class="chart bg-gold mgl15" data-percent="0">';
	            html_text+= '		<p class="chart_txt tc ft_16 bold col-gold"><span>수강<br />회원권</span></p>';                  	
	            html_text+= ' 	</div>';
				html_text+= '</div>';
				html_text+= '<div class="cmListTxt w_60">';
				html_text+= '	<h3 class="cmListTit">'+data[i]['it_name']+'</h3>';
				html_text+= '	<h4 class="cmListTSubTit"></h4>';
				html_text+= '	<table class="lecInfoTable mgt5">';
				html_text+= '		<tr>';
				html_text+= '			<td>교 &nbsp; &nbsp;수 : </td>';
				html_text+= '			<td>'+data[i]['l_name']+'</td>';
				html_text+= '		</tr>';
				html_text+= '		<tr>';
				html_text+= '			<td>강의수 : </td>';
				html_text+= '			<td>'+data[i]['it_tb_cnt']+'강</td>';
				html_text+= '		</tr>';
				html_text+= '	</table>';
				html_text+= '</div>';
				html_text+= '<div class="cmListBtn w_30 tc">';
				html_text+= '	<a href="javascript:void(0);" class="btn btn-m lecCurriBtn single_curri" data-itid="'+data[i]['it_id']+'" data-catid="'+data[i]['lec_cat_id']+'">커리큘럼</a>';
				if(data[i].in_chk == "Y") {
					html_text+= '	<a href="javascript:void(0);" onClick="addMembershipLec(\'1\',\''+od_id+'\',\''+data[i]['it_id']+'\',\''+it_id+'\',\''+ca_id+'\');return false;" class="btn btn-m  memberLecAddlBtn noClickBtn ">신청완료</a>';
				}else{
					html_text+= '	<a href="javascript:void(0);" onClick="addMembershipLec(\'1\',\''+od_id+'\',\''+data[i]['it_id']+'\',\''+it_id+'\',\''+ca_id+'\');return false;" class="btn btn-m memberLecAddlBtn">신청하기</a>';	
				}
		        
				html_text+= '</div>';
				html_text+= '</li>';
				
			}
		}else{
			html_text+= '<li>';
			html_text+= ' <div class="w_100 noDateList">';
			html_text+= '   <p class="tc">선택한 과정이 없습니다.</p>';
			html_text+= ' </div>';
			html_text+='</li>';
		}
		setTimeout(function(){
			pieChartFn();
		},50)				
		
		$('#memberAddList').html(html_text);
		$('#memberAddList').fadeIn(150);
	});
}	
	
function curriPop(){
	//커리큘럼 팝업
	var $wrap = $('#curriDetailPopup .curriDetailArea');
	var $curriPopup, $curriPopupHead, $curriPopupButton, $curriPopupIframe;

	$(document).on('click','.single_curri',function(){
		var itemCatid = $(this).attr('data-catid');
		var itemItid = $(this).attr('data-itid').replace(" ","");//공백넣디말라규...ㅠ sd_kandyg 2020-10-30

		var curriSrc;
		
		console.log('커리큘럼');

		var svs = document.location.href.split("/")[3];
		curriSrc = "./curri_myclass.php?cat_id="+itemCatid+"&it_id="+itemItid+"&side_code=1&curri_pop=1";

		console.log(curriSrc);

		if($('#popup_'+itemItid).length == 0){
			//팝업 생성
			$curriPopup = $("<div>",{
				"id" : "popup_"+itemItid,
				"class" : "apply-popup "
			}).appendTo($wrap);

			$curriPopupHead = $("<div>",{
				"class" : "apply-popup-head",
				"text" : "커리큘럼 상세보기"
			}).appendTo($curriPopup);

			$curriPopupButton = $("<button>",{
				"class" : "apply-popup-close",
				"text" : "닫기",
				click : function(e){
					$(this).parents('.cmPopupLayer').fadeOut(150);
				}
			}).appendTo($curriPopup);

			$curriPopupIframe = $("<iframe>",{
				"src" : curriSrc
			}).appendTo($curriPopup);
			
			$('#curriDetailPopup').fadeIn(150);
		}else{
			//팝업 오픈
			$('#curriDetailPopup').fadeIn(150);
		}
	})
	
	
	
	$('.apply-popup-bg').on('click',function(){
		$(this).parents('.cmPopupLayer').fadeOut(150);
	})

}

function addMembershipLec(status, od_id, it_id, parent_it_id, ca_id){	
	var ckck=true;
	if(status=="0"){
		if(!confirm("신청을 해제 하시겠습니까?")){
			ckck=false;
		}
	}
	if(ckck){
		console.log("Asdfadsf");
		$.post('/myclass/ajax_lecture_membership_update.php',{status : status, od_id : od_id, it_id : it_id, parent_it_id : parent_it_id, parent_ca_id : ca_id},function(rec){
			console.log(rec);
			if (rec == 1){//정상
				var succ = confirm("신청이 완료 되었습니다. 이동하시겠습니까?") ;
				if(!succ){
					return false;					
				}else{
					location.href = "/myclass/class_mylec.php?type=membership";						
				}				
			}else if (rec == 9){//잘못된접근
				alert("이미 신청기록이 있는 강의 입니다.");
				return false;
			}else if (rec == 99){//DB에러
				location.href = "/myclass/class_mylec.php?type=membership";				
			} else if(rec == 2) {
				alert("신청이 해제되었습니다.");
				location.reload();
			}
		});
	} else {
		return false;
	}
}

/***********************************************/
/***********************************************/
/******************function*********************/
/***********************************************/