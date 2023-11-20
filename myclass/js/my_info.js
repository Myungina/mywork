$(document).ready(function() {
	console.log("회원정보js");
	
	//문자수신 
	$("input[name=mb_hp0]").val($('#mb_hp_select').val());	
	
	//문자수신동의 체크해제시 컨펌 2021/7/27 추가
	var mb_datetime = $("#mb_datetime").val().split(" ");
	var year = mb_datetime[0].split("-")[0],
		month = mb_datetime[0].split("-")[1],
		day = mb_datetime[0].split("-")[2],
		time = mb_datetime[1].split(":");
	var open_date = new Date("2021", "07", "24", "13", "00", "00");
	var join_date = new Date(year, month - 1, day, time[0], time[1], time[2]);
	$("#serviceagreeChk_sms").click(function () {
		if (join_date > open_date && $("#cp_cnt").val() > 0) {
			if (!$(this).is(":checked")) {
				if (!confirm("SMS수신 미 동의 시, 3,000원 추가할인 쿠폰은 사용하지 못하게 되며, 시험관련 정보 및 이벤트 혜택을 제공받으실 수 없습니다.")) {
					return false;
				}
			}
		}
	});

	//회원정보 수정 1단계 비밀번호 입력하기
	$('#pwChkBtn').on('click', function() {
		userChkFn();
	})
		
	//전화번호 셀렉트
	$('#mb_hp_select').on('change', function() {
		var seleVal = $(this).val();
		$("input[name=mb_hp0]").val(seleVal);
	})
	
	//전화번호 입력 옵션
	$('.userPhArea .inputTxt').on('keyup', function() {
		only_number(this);
		max_length(this);
	})

	//관심과정 
	$('#favLecSelect').on('click', function() {
		if ($("[name='favChk']").is(":checked") === true) {			
			var selectLec = $("[name='favChk']:checked").val();
			$('#fav').text(selectLec);
			$('#myFavPopup').fadeOut(150);
		} else {
			alert('관심분야를 선택해주세요.');
			return false;
		}
	})
	
	// SNS계정 연동해제
	$(document).on("click",".SnsCancel",function (e) {
		e.preventDefault();
		
		var jqThis = $(this),
			cnKey = jqThis.attr("href").split("#")[1],
			cnType = jqThis.attr("data-type"),
			msg = "";

		if(cnType == "naver") {
			msg = "[네이버]";
		} else if(cnType == "kakao") {
			msg = "[카카오]";
		}
		
		if (confirm("연동해제를 진행하시겠습니까?")) {
			$.post("/myroom/sd_my_otherid_break.php", {cnkey : cnKey, cntype : cnType}, function (result) {
				if (result === "ok") {							
					alert("연동이 해제 되었습니다.\n"+msg+"계정으로 간편 로그인을 하실 수 없습니다.");
					jqThis.addClass('bg-black');
					jqThis.removeClass('bg-gray SnsCancel');
					jqThis.prop('href','javascript:void(0)');
					jqThis.text('연동하기');
					jqThis.attr('sdedu-login-btn',cnType);
					$(".info_text_"+cnType).text("연결된 정보가 없습니다.");
				} else {
					alert("연동정보가 확인되지 않아 처리 실패 하였습니다.");
				}
			});
		}
	});
	
	//전화번호 제대로 입력시 인증번호 활성화
	$('.inputTxt').on("keyup", function() {
		var thisLng = $(this).val().length;
		var maxLng = $(this).attr('maxlength');
		if ($(this).val().length > maxLng) {
			$(this).val($(this).val().slice(0, maxLng));
		}
		if ($(this).hasClass('set-agree-num')) {
			var maxLng = 5;
			$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			//숫자만
		}
	})
	
	//인증번호 요청하기 눌렀을땡
	$('#getAgreeNum').on('click', function() {
		if($(this).hasClass('verificationCodeSend')==true){
			phChkFn();	
		}else if($(this).hasClass('verificationChk') == true){
			chkAgreeNum();
		}
	})

	$('.userPhArea .inputTxt').on("keyup", function() {
		if (($('#mb_hp1').val().length > 2) && ($('#mb_hp2').val().length > 3)) {
			$('.verificationCodeSend ').removeClass('btnInert');
		} else {
			$('.verificationCodeSend ').addClass('btnInert');
		}
	});
	
	$('#cencleBtn').on('click',function(){
		event.preventDefault();
		var confirm1 = confirm('취소하시겠습니까??');
		if (confirm1) {
			location.replace("/myclass/my_information.php");
		} else {
			return false;
		}
	})
	
	//탈퇴사유 기타일때
	$("[name='reason']").each(function(){
		$(this).on('click',function(){
			if($(this).val() == '4'){
				$('.reason_txt').show();
			}else{
				$('.reason_txt').hide();
			}
		})
		
	})
	
})

//이메일 셀렉트박스
function changeEmail(th) {
	$(th).parent().find("label").text($(th).find("option:selected").text());
	$("[name='mb_mail_2']").val($(th).find("option:selected").text());
	if ($(th).find("option:selected").val() === "user") {
		$("[name='mb_mail_2']").prop("readonly", false);
		$("[name='mb_mail_2']").val("");
		$("[name='mb_mail_2']").focus();
	} else {
		if (!$(th).find("option:selected").val()) {
			$("[name='mb_mail_2']").val("");
		}
		$("[name='mb_mail_2']").prop("readonly", true);
	}
}

var s;
// Interval에 관련된 변수
var time = 30;
// 인증 시간을 180초로 정함
var phChkSuc = 'state';
//핸드폰번호 수정으로 인한 인증단계를 거쳤는지 확인할 변수 -> 인증다 되면 Y로 바뀜

//비밀번호 재확인창
function userChkFn() {
	if ($('#userPwBox').val() == '') {
		alert('비밀번호를 입력해주세요.');
		$('#userPwBox').focus();
		return false;
	}

	$.post("/myclass/member_check_new.php", {
		nc_qm : $('#userPwBox').val(),
		mb_id : g4_mb_id
	}, function(response) {
		if (response == 'ok') {
			$("#info_chk").val("y");
			$("#passchkFrm").submit();
		} else if (response == 'fail') {
			alert('비밀번호가 일치하지 않습니다.');
			$('#userPwBox').val('');
			//location.reload();
		} else if (response == 'error') {
			alert('비밀번호를 입력해주세요');
			$('#userPwBox').focus();
			return false;
		}
	})
}

//혹쉬나 다시 취소할때
//기존 핸드폰 번호 다시 넣어야해가지구 ㅠㅠㅠ
function changePhoneNum(me,type) {
	event.preventDefault();

	var phnum0 = $('.memUpdate_value0').text();
	var phnum1 = $('.memUpdate_value1').text();
	var phnum2 = $('.memUpdate_value2').text();
	var type = type;
	
	console.log(type,phChkSuc);
	$('#pChangeButton').toggleClass('ph-modify');

	if (type == 'modify') {
		var confirm1 = confirm('변경하시겠습니까?');
		if (!confirm1) {			
			return false;
		} else {
			$('#pChangeButton_cencle').css('display','inline-block');
			$('#pChangeButton').hide();
			phoneEditFn('modify');			
		}

	} else {
		var confirm1 = confirm('변경을 취소하시겠습니까?');
		if (confirm1) {
			$('#mb_hp_select').val(phnum0).prop("selected", true);
			$('#mb_hp0').val(phnum0);
			$('#mb_hp1').val(phnum1);
			$('#mb_hp2').val(phnum2);
			
			$('.userPhArea  .inputTxt').addClass('readonly');
			$('#pChangeButton').css('display','inline-block');
			$('#pChangeButton_cencle').hide();
			phoneEditFn('cencle');
			clearInterval(s);
			phChkSuc = "State";		
		} else {
			return false;
		}

	}

}

//핸드폰번호 입력칸 활성화용
//매번 넣기 귀찮아서 하나 만들어서 불러들임
function phoneEditFn(val) {
	console.log("phoneEditFn");
	console.log(val)
	console.log(phChkSuc);
	var modiBtn = $('#pChangeButton');
	var thisArea = $(".inputTxt[name='mb_hp1'] , .inputTxt[name='mb_hp2']");
	
	if(val == 'modify'){
		//수정 활성화
		console.log('수정');
		phChkSuc = "No";		
		$('#getAgreeNum').css('display','inline-block');
		thisArea.removeClass('readonly').val('');
		$('.userPhArea .cmSelectBoxArea').removeClass('select_none');			
	}else if(val == 'cencle'){
		//취소 시
		console.log('취소');		
		phChkSuc = "State";		
		$('.userPhArea .cmSelectBoxArea').addClass('select_none');
		$('.agree-input, #getAgreeNum').hide();	
		$('#getAgreeNum').addClass('btnInert');
		thisArea.addClass('readonly');
		if(phChkSuc == 'state'){		
			clearInterval(s);
			$('#getAgreeNum').text('인증번호요청').addClass('verificationCodeSend').removeClass('verificationChk');	
		}else if(phChkSuc == 'No'){
			alert('기존 휴대폰 번호로 유지됩니다. ');
			clearInterval(s);
			$('#getAgreeNum').text('인증번호요청').addClass('verificationCodeSend').removeClass('verificationChk');	
		}			
	}else if (val == "timeLimit") {
		//인증시간 초과시
		console.log('인증시간 초과시');		
		$('.agree-input').hide();		
		$('.userPhArea .cmSelectBoxArea').removeClass('select_none');
		thisArea.removeClass('readonly');
		$('#getAgreeNum').text('인증번호요청').addClass('verificationCodeSend').removeClass('verificationChk');		
	}else if(val == 'verificationCode'){
		//인증번호 발송시
		console.log('인증번호 발송');
		thisArea.addClass('readonly');
		$('.userPhArea .cmSelectBoxArea').addClass('select_none');	
		$('.agree-input').css('display','inline-block');		
		$('#getAgreeNum').text('인증받기').removeClass('verificationCodeSend').addClass('verificationChk');		
	}else  if(val == 'success'){		
		//인증 완료시
		$('.userPhArea .cmSelectBoxArea').addClass('select_none');
		$('.agree-input').hide();	
		$('#getAgreeNum').text('인증완료').removeClass('verificationCodeSend , verificationChk').addClass('phSecces');
		clearInterval(s);
		phChkSuc = "Y";		
		// alert('인증번호 받고취소누름')
		// //인증번호 받기를 눌렀는데 취소를 눌렀을때
		// modiBtn.text('수정');
		// thisArea.addClass('readonly');
		// $('.userPhArea .cmSelectBoxArea').addClass('select_none');
		// $('#getAgreeNum').hide();
 
		// if (($('#dbAgreeNum').val() != '') || ($('.agree-input').hasClass('show') == true)) {
			// console.log('3-1');
			// $('#getAgreeNum').hide();
			// $('.agree-input').removeClass('show');
		// }
		// clearInterval(s);
		// phChkSuc = "state";
	}else{
		//alert('문제발생');
	}
}

//인증번호 요청 눌렀을때
function phChkFn() {
	event.preventDefault();
	var cnt = $("#buttonChk").val();
	;//버튼을 누른 횟수
	var chkcnt = cnt + 1;
	var hp1 = $('#mb_hp1').val();
	var hp2 = $('#mb_hp2').val();
	$('.userPhArea').find('.input_txt_area').prop('readonly', true);
	if (hp1 == '' || hp2 == '') {
		alert('휴대폰 번호를 입력해 주세요.');
	} else if (hp1.length < 3 || hp2.length < 4) {
		alert("휴대폰 번호를 올바르게 입력해주세요.");
	} else {
		$("#buttonChk").val(chkcnt);
		phConfirm();
		phChkSuc = 'No';
	}
}

//핸드폰번호 인증하기
function phConfirm() {
	var name = $("#mb_name").val();
	var hp0 = $("#mb_hp0").val();
	var hp1 = $("#mb_hp1").val();
	var hp2 = $("#mb_hp2").val();
	var mode = "alone";
	var user = "회원님";
	var dbAgreeNum = $("#dbAgreeNum").val();
	
	$.getJSON('/myclass/getAgreeNumber.php', {
		hp0 : hp0,
		hp1 : hp1,
		hp2 : hp2,
		mode : mode,
		mb_name : name,
		oldAgreeNo : dbAgreeNum
	}, function(data) {
		if (data.status.msg == "no") {
			alert("이미 등록된 번호입니다.");	
			$('#pChangeButton').css('display','inline-block');
			$('#pChangeButton_cencle').hide();
			phoneEditFn('cencle');		
		} else {
			alert(data.status.msg);
			phoneEditFn('verificationCode');
			$("#dbAgreeNum").val(data.status.status);
			getAgreeTime();
		};
	});
}

//인증번호 문자 시간 카운트
function getAgreeTime(state) {
	
		s = setInterval(function showTime(state) {					
				if (time > 0) {
				var ss = time % 60;
				var mm = parseInt(time / 60);
				if (ss < 10) {
					$("#TimeCnt").html("" + mm + ":0" + ss);
					//console.log(""+mm+":0"+ss);
				} else {
					$("#TimeCnt").html("" + mm + ":" + ss);
					//console.log(""+mm+":"+ss);
				}
				$(".modify_agree_time").show();
				$(".sms_chk").show();
				time -= 1;
			} else if (time == 0) {
				$("#TimeCnt").html("0:00");
	
				clearInterval(s);
				alert('인증시간이 초과 되었습니다. \n다시 요청을 해주세요');
				phoneEditFn("timeLimit");
				$("#TimeCnt").html("");
				time = 30;
			}		
		}, 1000);
}

//인증번호 확인하기
function chkAgreeNum() {
	event.preventDefault();
	var dbAgreeNum = $("#dbAgreeNum").val();
	var myAgreeNum = $("[name='set-agree-num']").val();

	if (dbAgreeNum == 0) {
		alert("인증번호를 전송받지 못하였습니다.");
		return false;
	} else if (!myAgreeNum) {
		alert("인증번호는 5자리 입니다. \n다시 확인해주세요");
		return false;
	} else if (dbAgreeNum != myAgreeNum) {
		alert("인증번호가 일치하지 않습니다.\n다시 확인해주세요");
		return false;
	} else if (dbAgreeNum == myAgreeNum) {
		var hp0 = $("#mb_hp0").val();
		var hp1 = $("#mb_hp1").val();
		var hp2 = $("#mb_hp2").val();

		$.getJSON('/myclass/getAgreeNumber.php', {
			hp0 : hp0,
			hp1 : hp1,
			hp2 : hp2,
			mode : "mb_cks"
		}, function(data) {
			if (data.status.msg != "OK") {
				if (confirm(data.status.msg)) {
					//console.log('성공');
				} else {
					clearInterval(s);
					//console.log('시류ㅐ');
				}
				return false;
			} else {
				alert("인증이 완료되었습니다. ");
				phChkSuc = 'Y';
				//인증성공
				phoneEditFn("success");
			}
		});
		clearInterval(s);
	}
}

function modifySubmit() {
	event.preventDefault();
	console.log("modifySubmit");

	var pw = $('#nc_qm').val();
	var pwChk = $('#nc_qm_chk').val();
	var mb_third_agree = $('input[name=mb_third_agree]:checked').val();	
	var sms_agree = $('input[name=serviceagreeChk_sms]:checked').val();
	var mail_agree = $('input[name=serviceagreeChk_email]:checked').val();
	
	$("#mb_email").val($("#mb_mail_1").val()+"@"+$("#mb_mail_2").val());
	$("#memfav").val($("#fav").text());

	if (mb_third_agree == "third_agree") {
		$('input[name=sns_provision]').val('Y');
	} else {
		$('input[name=sns_provision]').val('N');
	}
	if (sms_agree == "serviceagreeChk_sms") {
		$('input[name=mb_sms]').val(1);
	} else {
		$('input[name=mb_sms]').val(0);
	}
	if (mail_agree == "serviceagreeChk_email") {
		$('input[name=mb_mailling]').val(1);
	} else {
		$('input[name=mb_mailling]').val(0);
	}
		
	phChkSuc;
	
	if (pw == '' && pwChk != '') {
		$('#nc_qm_chk').val('');
	}
	if (pw != '') {
		if (pw != pwChk) {
			alert('비밀번호를 입력해 주세요');
			$('#nc_qm_chk').focus();
			return false;
		} else if (pw.length < 6 || pw.length > 12) {
			alert('비밀번호는 6~12자의 영문, 숫자, 특수문자만 가능합니다');
			$('#nc_qm').focus();
			return false;
		} else if (pwChk.length < 6 || pwChk.length > 12) {
			alert('비밀번호는 6~12자의 영문, 숫자, 특수문자만 가능합니다');
			$('#nc_qm_chk').focus();
			return false;
		} else if (pwChk == '') {
			alert('비밀번호를 확인해 주세요.');
			$('#nc_qm_chk').focus();
			return false;
		}
	}
	if (phChkSuc == 'No') {
		alert('휴대폰 인증을 해주세요.');
		$('#mb_hp1').focus();
		phoneEditFn("no");
		return false;

	}

	var mParam = serializeMap($('#form_memberUpdate'));
	//보낼데이터 추려
	var result = confirm('회원정보를 수정 하시겠습니까?');
	if (result) {
		console.log(mParam);
		 $.post("/myclass/member_join_form_update.php", mParam, function(allData) {
			try {
				console.log(allData);
				var data = $.parseJSON(allData);
				if (data) {
					if (data.status.status === 2) {
						alert("정보변경이 완료 되었습니다.");
						location.replace("/myclass/my_information.php");
					} else {
						alert(data.status.msg);
						return false;
					}
				}
			} catch(e) {
				console.log(e);
				alert("error");
				location.reload();
			}
		 })
	} else {
		return false;
	}

}

//탈퇴 ㄱㄱ
function withdrawFn() {
	event.preventDefault();
	var mParam = serializeMap($('#form_withdrawMember'));

	if ($("#nc_qm").val() == '') {
		alert("비밀번호를 입력하세요");
		return false;
	}
	//샤유체크하는건데 순서를 비번 확인후에 해달라고 해서 일단 여기는 변수값만 노샤유로 바꾸고 아래 포스트 안에서 필터검  ㅠㅠ ㅋ귀찮구만
	var sayu = $('.exit_reason:checked');
	var sayuck = "";
	var sayuTxtLng = $('.reason_txt').val();
	if (sayu.length == 0) {
		sayuck = "nosayu";
		//노 사유다
	} else {
		$('.withdraw_wrap input[name="d1"]').val(sayu.val());
	}

	//보낼데이터 추려
	var mParam = serializeMap($('#form_withdrawMember'));
	mParam.svs = "mobile";
	$.post("/myclass/member_check_new.php", mParam, function(data) {
		try {
			if (data === "ok") {
				//비번일단 먼저체크함
				if (sayuck == "nosayu") {
					alert("탈퇴사유를 선택해 주세요");
					$('.exitReasonArea ').focus();
					return false;
				}else if (sayu.val() == "4" && sayuTxtLng == ""){
					alert('탈퇴사유를 작성해주세요');
					return false;
				}
				
				var checkdraw = confirm("탈퇴를 진행하시겠습니까?");
				if (!checkdraw) {
					return false;
				} else {
					$.post("/member/member_delete.php", mParam, function(allData) {
						if (allData == "ok") {
							alert('정상 처리 되었습니다.');
							location.replace('/popkon/');
						} else {
							alert(allData);
							alert('재시도 해주세요.');
							location.reload();
						}
					});
				}
			} else {
				if (data === "many") {
					alert("회원 정보에 문제가 있습니다.");
					location.reload();
				} else if (data === "fail") {
					alert("비밀번호가 일치하지 않습니다.");
					return false;
				}
			}
		} catch(e) {
			console.log(e);
			alert("주의 : 에러1");
		}
	});
}