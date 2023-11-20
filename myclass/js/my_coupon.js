$(document).ready(function(){
    console.log("쿠폰js");
	$('#add_coupon').on('click',function(){
		var mb_id = $("#mb_id").val();
		var coupon_no = "";
		var chk_val = 0;
		var th = $(this).parents('.coupouAddArea');
		
		$(th).find("[name^='coupon-num']").each(function(idx){
			if($(this).val()){	chk_val++;}
			coupon_no += (coupon_no)? "-" + $(this).val() : $(this).val();
		});
		if(chk_val !== 3&&coupon_no==''){
			alert("쿠폰 번호를 확인해 주세요16.");
			return false;
		}

		var chk_q_coupon = false;
		$.post("../../myclass/my_coupon_chk.php",{post:'question_bank_chk',coupon_no:coupon_no,	},function(result){
			console.log("★ "+result + " - " + mb_id);

			if (result == 'cop_coupon'){
				another_mock(coupon_no, mb_id); //another_mock 여기안에서 setOffCoupon 이거돌립니다.
				chk_q_coupon = true;
			} else if(result == 'q_coupon'){

				//핏쿠폰일떄다
				coupon_no = coupon_no.toUpperCase();
				send_data = "couponText="+coupon_no+"&mb_id="+mb_id+"&post=couponUsed";
				$.ajax({ 
					type: "POST", 
					url: "/pass_sidae_new/data/coupon_test.php", 
					data:  send_data , 
					dataType: 'html',
					success: function (data) {
						if(data =="j"){
							alert('발급 받은 쿠폰입니다.');
							return false;
						}else if(data =="n"){
							alert('쿠폰번호를 정확히 입력해주세요');
							return false;
						}else if(data =="d"){
							alert('유효기간이 만료되었습니다.');
							return false;
						}

						//var data_search = '333_fit';//이거모야?
						var replace_data = '';//ca_id
						var type = "";//문항수
						if(data.indexOf('333_fit')>-1){
							var caidAndTypeOnly=data.replace('333_fit_',"");
							var caidAndTypeWari=caidAndTypeOnly.split("_");
							replace_data = caidAndTypeWari[0];
							type= caidAndTypeWari[1];
							data = '333_fit';
						}
						switch(data){
							case "memberchk":alert("로그인 후에 등록이 가능합니다");break;
							case "9":alert("발급 받은 쿠폰입니다.");break;
							case "333_fit"://핏쿠폰!!
								if(confirm("핏모의고사 시험지를 제작하러 가시겠습니까? ")){
									var url_fit="/pass_sidae_new/html/fit_coupon.php?chk_cart_mb_id="+mb_id+"&chk_cart_ca_id="+replace_data+"&type="+type;
									console.log(url_fit);
									window.location.href=url_fit;
								}else{
									alert('마이페이지 > 모의고사 핏 모의고사에서 제작 하실 수 있습니다.');
								}
								break;
							case '333_':if(confirm('쿠폰이 발급 되었습니다. 발급내역을 확인하시겠습니까?')){ location.href="/myclass/mock_exam.php";}break;
							case '99':alert('쿠폰번호를 정확히 입력해 주세요');break;
							//default:break;
						}
					}
				});

				chk_q_coupon = true;
			}

			// !!!! 위에서 합격시대랑 관련있다~ 싶으면 스탑합니다!!
			if(chk_q_coupon){return false;}

			//설문조사 쿠폰 // 설문조사 쿠폰 번호인지 확인 로직 추가 20190410 조재훈 2019-06-14 sd_kandyg 이슬아 더 추가
			if (coupon_no=="OVW-00000-C859D"/*삼1*/||coupon_no=="KXE-00000-EA9A4"/*엔씨2*/||coupon_no=="TIH-00000-751BA"/*엘ㅈ3*/||coupon_no=="CLW-00000-1E0E9"/*인천4*/||coupon_no=="VKE-00000-8FE2A"/*/한산인공5*/
			||coupon_no=="EIG-00000-FA9CE"/*한농공6*/||coupon_no=="CNE-00000-24400"/*스크7*/||coupon_no=="NLD-00000-CB94E"/*한철공8*/||coupon_no=="SZU-00000-72B84"/*국민긍강9*/||coupon_no=="ALD-00000-1EB47"/*크트0*/
			||coupon_no=="ECJ-00000-0D269"/*롯인1*/||coupon_no=="CVU-00000-7F356"/*롯이2*/||coupon_no=="JDB-00000-7F328"/*한전공3*/||coupon_no=="OWX-00000-3DA74"/*한토주공4*/||coupon_no=="DXG-00000-B6B90"/*한수원5*/
			||coupon_no=="MQL-00000-F1F60"/*횬다이6*/||coupon_no=="FKN-00000-BAD3D"/*서교공7*/||coupon_no=="POQ-00000-F0D22"/*포스코*/){
				var location = "/myclass/mock_exam.php";//모의고사이동
				var couponText=coupon_no;//$("[name='text1']").val()+"-"+$("[name='text2']").val()+"-"+$("[name='text3']").val();
				$.post("../../myroom/my_research_answer.php",	{post:'couponUsed',mb_id:mb_id, couponText:couponText},function(result){
					console.log(result);
						if(result == 9){
						$("#question_coupon").hide();
						$("#question_popup_bg").hide();
						alert('해당 쿠폰번호로 이미 참여하셨습니다. \n감사합니다.');
						return false;
					}else if(result == 999){
						$("#question_coupon").hide();
						$("#question_popup_bg").hide();
						alert('이미 동일한 모의고사를 보유하고 있습니다.');
						return false;
					}else if(result == 99){
					}else{
						var f_result=result.split("_"); //"설문조사참여여부_모의고사코드"
						console.log("0> "+f_result[0]);console.log("1> "+f_result[1]);
						if(f_result[0] == 777){
							$("#question_popup_bg").show();//설문지배경끄기끄기
							$("#question_popup_wrap").show();
							$("#get_it_id").val(f_result[1]);
						}else if(f_result[0] == 333){
							var get_it_id = f_result[1];
							$("#question_coupon").hide();
							$("#question_popup_bg").hide();//설문지배경끄기끄기
							//모의고사 저장
							$.post("../../myroom/my_research_answer.php",{ post:'save2',mb_id:mb_id,it_id:get_it_id},function(result){
								console.log("f_1-> "+f_result[1]);
								if(result == "ok"){
									if(confirm("설문조사 참여이력이 있습니다. 해당 무료 모의고사가 지급되었습니다.")){
										var newWindow = window.open("about:blank");
										newWindow.location.href = location;
									}
								}else if(result == "error"){
									alert("잘못된 요청입니다.");
									return false;
								}
							});
						}
					}
				});
				return false;
			}else{
				setOffCoupon(th);
			}
		});
	})	
})

//모의고사 추가 기업&핏
function another_mock(coupon_no, mb_id) {
	console.log('★ another_mock = ' + coupon_no + " / " + mb_id);

	//요 이푸문과 type은 어디다 쓰는 물건인고..? 이 펑션에선 쓰는곳이안보이는데...
	if(coupon_no ==  'XLY-00000-57D6C'){type = "30";	} else if(coupon_no == 'UBM-00000-B2271'){type = "60";}	
	else if(coupon_no == 'OPH-00000-CD907' || coupon_no == 'NHZ-00000-5865C'){type = "50";}	else if(coupon_no == 'PHB-00000-79065' || coupon_no == 'GYZ-00000-1FD46'){type = "100";}

	send_data = "couponText="+coupon_no+"&mb_id="+mb_id+"&post=couponUsed";
	$.ajax({
		type: "POST",
		url: "/question_bank/data/coupon_test.php",
		data:  send_data ,
		dataType: 'html',
		success: function (data) { 
			var data_search = '333_fit';
			var replace_data = data.replace('333_fit_',"");
			var location = "/myclass/mock_exam.php";//모의고사이동
			if(data.indexOf('333_fit')>-1){data = '333_fit';}
			var ths=$(".coupouAddArea");
			setOffCoupon(ths,data);
		}
	});
}

function setOffCoupon(th,next_go){
	var jj = 0;
	jj++;
	var coupon_no = "";
	var chk_val = 0;
	var mb_id = $("#mb_id").val();

	$(th).find("[name^='coupon-num']").each(function(idx){
		if($(this).val()){
			chk_val++;
		}
		coupon_no += (coupon_no)? "-" + $(this).val() : $(this).val();
	});

	//번호상태가 좀 이상할때
	if(chk_val !== 3 && !coupon_no && jj == 1){
		alert("쿠폰 번호를 확인해 주세요183");
		return false;
	}

	$.post('./ajax_offcoupon_update.php', {coupon_no: coupon_no}, function(rec) { //next_go는 another_mock 펑션에서 한번돌고나서 나온 리턴값
		console.log("★ setOffCoupon "+mb_id+" / "+ coupon_no + " / " + rec + " / "+next_go);
		if(rec=='99'){
			alert('로그인을 해야 이용 가능합니다!');
			return false;
		}else if(rec=='noaddr'){
			alert('교환 상품에 도서가 포함된 경우 회원 정보란에 주소가 입력 되어있어야 합니다.\n\r상단 정보수정을 클릭하신후 주소를 입력하시고 쿠폰을 재사용 부탁드립니다.');
			return;
		}else if(rec=='1') { // 동영상
			if(next_go=="333_"){//합격시대꺼도있어
				if(!confirm("쿠폰이 정상 등록되었습니다. \n마이페이지 > 각 메뉴에서 확인하실 수 있습니다")) {
					return false;
				} else{
					location.href = "/myclass/";
				}
			}else{
				if(!confirm("쿠폰이 정상 등록되었습니다. \n발급내역을 확인하시겠습니까?")) {
					return false;
				} else{
					location.href = "/myclass/class_mylec.php?type=free";
				}
			}
		}else if(rec=='3'){  // 모의고사
			if(next_go=="333_"){//합격시대꺼도있어
				if(!confirm("쿠폰이 정상 등록되었습니다. \n마이페이지 > 각 메뉴에서 확인하실 수 있습니다")) {
					return false;
				} else{
					location.href = "/myclass/";
				}
			}else{
				if(!confirm("쿠폰이 정상 등록되었습니다. \n발급내역을 확인하시겠습니까?")) {
					return false;
				} else{
					location.href = "/myclass/mock_exam.php";
				}
			}
		}else if(rec=='2'){ // 쿠폰
			if(next_go=="333_"){//합격시대꺼도있어
				if(!confirm("쿠폰이 정상 등록되었습니다. \n마이페이지 > 각 메뉴에서 확인하실 수 있습니다")) {
					return false;
				} else{
					location.href = "/myclass/";
				}
			}else{
				// 일반 할인쿠폰일때
				if(!confirm("쿠폰이 정상 등록되었습니다. \n발급내역을 확인하시겠습니까?")) {
					return false;
				} else{
					location.reload();
				}
			}
		}else if(rec=='44'){
			if(!confirm("쿠폰이 정상 등록되었습니다. \n마이페이지 > 각 메뉴에서 확인하실 수 있습니다")) {
					return false;
				} else{
					location.href = "/myclass/";
				}
		}else if(rec=='pass' || rec=='999' || rec=='4'){

			if(next_go=="333_" || next_go=="333_fit"){
				if(!confirm("쿠폰이 정상 등록되었습니다. \n발급내역을 확인하시겠습니까?")) {
					return false;
				} else{
					location.href = "/myclass/mock_exam.php?type=company";
				}
			}else if(next_go=="9"){
				alert("발급 받은 쿠폰입니다.");	
				return false;
			}else if(next_go=="99"){
				alert('해당 쿠폰은 본 이벤트 쿠폰이 아닙니다.');
				return false;
			}else{
				console.log(next_go);
				return false;
			}

		}else  if (rec=='w'){//ai 오프라인 쿠폰 등록후 ai 쿠폰페이지로 이동
			if(next_go=="333_"){//합격시대꺼도있어
				alert("AI 면접 쿠폰과 모의고사가 등록었습니다!");
				var win = window.open("https://www.sdedu.co.kr/winsidaero/mypage", '_blank');
				win.focus();
			}else{
				alert("AI 면접 쿠폰이 발행되었습니다!");
				var win = window.open("https://www.sdedu.co.kr/winsidaero/mypage", '_blank');
				win.focus();
			}
		}else{
			if(next_go=="333_"){
				/* $(".coupon-confirm").show();
				$(".coupon-confirm #passCoupon").show(); */
				if(!confirm("쿠폰이 정상 등록되었습니다. \n발급내역을 확인하시겠습니까?")) {
					return false;
				} else{
					location.href = "/myclass/mock_exam.php?type=company";
				}
			}else{
				// rec == 'jw' 있었는데 아예 jw를 리턴하는애가 없어서 지움
				$(th).find("[name^='coupon-num']").focus();

				if(next_go=="9" || rec=='j'){
					alert('발급 받은 쿠폰입니다. ');
					return false;
				}else if(next_go=="99" || rec=='d'){
					alert('유효기간이 만료되었습니다.');
					return false;
				}else if(rec=='n') {
					alert('쿠폰번호를 정확히 입력해주세요');
				}else{
					alert('정상적인 쿠폰이 아닙니다.');
				}
			}
		}

	});
	return false;
}