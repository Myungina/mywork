$(document).ready(function(e){
	
	//1:1 동영상 문의관련 추가 
	var add_tb_id;
	//var book_name;
	
	$(".chosen-select").chosen({
		width: "100%",
		single_backstroke_delete: false
	});		
	
	$('.chosen-select').change(function() {
		var jqSelect = $(this);
		$( "[name='" + jqSelect.attr("name").replace("_chosen", "") + "']" ).val( jqSelect.val() ); //+(	($(this).val()) ? ',':'' )+$('#lec_idm').val()				
	});
	
	var w = "";
	var wr_id = "";
	var it_id = "";
	var subject_idx ="";
	var type_idx = "";
	var chkType2 = 0;	//동영상관련 체크 중복으로 append 안되게
	var optionVal = "";
	$("#ca_type").on("change", function(){
		var options = "";
		$(".type-sub2").hide();		
		switch($(this).val()){
			case "공지사항" :
				chkType2=0;
			
		$("#wr_4").val('');
		$("#wr_4place").hide();
				//캡쳐시간값초기화
				$(".play_time").hide();
				$("[name='wr_4']").val("");

				$("#isAdmNotice").show();				
				$("[name^='wr_12']").eq(0).prop("checked",true);
				$(".on-study").css("visibility","hidden");
				$(".req-sub1").attr("required", false);
				$(".req-sub2").attr("required", false);
				$(".req-sub3").attr("required", false);
				$("#info_book_page").attr("required", false);

				$("#wr_bg_info").hide();
				$("#ca_type_sub").hide();
				$("[name='it_id']").val("");
				$(".fwrite tr").eq(1).hide();//상세분류 닫기
				$(".fwrite tr").eq(3).hide();//상세분류 닫기
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub2").hide();
				$("#ca_type_sub3").hide();
				$(".fwrite tr").eq(2).find(".relation-key-list .searchList").children().remove();
			break;
			
			case "고객상담안내":

				chkType2=0;
				$("#wr_4").val('');
				$("#wr_4place").hide();

				//캡쳐시간값초기화
				$(".play_time").hide();
				$("[name='wr_4']").val("");

				$("#ca_type_sub").show();
				$("#isAdmNotice").hide();
				$("[name^='wr_12']").eq(1).prop("checked",true);
				$(".on-study").css("visibility","hidden");
				$("#top-col").prop("colspan",3);
				$(".req-sub1").attr("required", true);
				$(".req-sub2").attr("required", false);
				$(".req-sub3").attr("required", false);
				$("#info_book_page").attr("required", false);

				$("#wr_bg_info").hide();
				$("[name='it_id']").val("");
				$(".fwrite tr").eq(1).hide();//상세분류 닫기
				$(".fwrite tr").eq(3).hide();//상세분류 닫기
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub2").hide();
				$("#ca_type_sub3").hide();
				$(".fwrite tr").eq(2).find(".relation-key-list .searchList").children().remove();
			break; 
			
			case "동영상학습문의":
				$("#isAdmNotice").hide();
				$(".req-sub1").attr("required", false);
				$(".req-sub2").attr("required", false);
				$(".req-sub3").attr("required", true);
				$("[name^='wr_12']").prop("checked",false);
				$(".on-study").css("visibility","visible");
				$("#top-col").prop("colspan",1);
				$("#info_book_page").attr("required", false);

				$("#wr_bg_info").hide();
				$("[name='it_id']").val("");
				$(".fwrite tr").eq(3).hide();//상세분류 닫기
				$(".fwrite tr").eq(2).hide();
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub2").find("option:first").prop("selected",true);
				$("#ca_type_sub").hide();
				$("#ca_type_sub3").hide();
				$(".fwrite tr").eq(2).find(".relation-key-list .searchList").children().remove();
				$("#ca_type_sub3").remove("input[name='it_id']");
				$(".fwrite tr").eq(1).show();//상세분류 닫기
				chkType2++;
				if(chkType2==1){
    				$.getJSON("/skin/board/basic_inquery_v2/json_inquery_category.php",{ mode : "mylec", w : w, wr_id : wr_id },function(data){
						$(data).each(function(index){										
							options += "<option value=\""+data[index].it_id+"\">"+data[index].it_name+"</option>";		
						});
						if(data == ""){
							alert("현재 수강중인 경우에만 동영상 학습문의를 이용하실 수 있습니다.");
							$(".req-sub3").prop("required", false);
							$(".on-study").css("visibility","hidden");
							$(".lec-subwrap").hide();
							$("#ca_type option:eq(0)").prop("selected",true);
							chkType2 = 0;
						}else{
							$("#ca_type_sub2").append(options);
						}						
					});
				}
				$("#ca_type_sub2").show();
			break;
			case "도서학습문의":
				chkType2=0;
				$("#wr_4").val('');
				$("#wr_4place").hide();
				//캡쳐시간값초기화
				$(".play_time").hide();
				$("[name='wr_4']").val("");

				$("#isAdmNotice").hide();
				$("#ca_type_sub3").show();
				$(".req-sub1").attr("required", false);
				$(".req-sub2").attr("required", true);
				$(".req-sub3").attr("required", false);
				$("#info_book_page").attr("required", false);

				$("#wr_bg_info").hide();
				$("[name^='wr_12']").prop("checked",false);
				$(".on-study").css("visibility","visible");
				$("#top-col").prop("colspan",1);
				$(".fwrite tr").eq(1).hide();//상세분류 닫기
				$(".fwrite tr").eq(2).hide();//상세분류 닫기
				$("#ca_type_sub").hide();
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub2").hide();
				$(".fwrite tr").eq(3).show();
			break;
			case "AI모의면접문의":
				chkType2=0;
				$("#wr_4").val('');
				$("#wr_4place").hide();
				$(".play_time").hide();//캡쳐시간값초기화
				$("[name='wr_4']").val("");
				$("#ca_type_sub").hide();
				$("#isAdmNotice").hide();
				//$("[name^='wr_12']").eq(1).prop("checked",true);
				$("[name^='wr_12']").prop("checked",false);
				$(".on-study").css("visibility","visible");
				$("#top-col").prop("colspan",3);
				$("#ca_type_sub").attr("required", false);
				$("#ca_type_sub2").attr("required", false);
				$("#ca_type_sub3").attr("required", false);
				$("#ca_type_sub2_1").attr("required", false);
				$("#ca_type_sub2_2").attr("required", false);
				$("#ca_type_sub2_3").attr("required", false);
				$("#info_book_page").attr("required", false);

				$("#wr_bg_info").hide();
				$("[name='it_id']").val("");
				$(".fwrite tr").eq(1).hide();//상세분류 닫기
				$(".fwrite tr").eq(3).hide();//상세분류 닫기
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub").hide();
				$("#ca_type_sub2").hide();
				$("#ca_type_sub3").hide();
				$(".fwrite tr").eq(2).find(".relation-key-list .searchList").children().remove();
			break;			
			case "온라인모의고사문의":
				console.log("온라인모의고사문의");
				chkType2=0;
				$("#wr_4").val('');
				$("#wr_4place").hide();
				$(".play_time").hide();//캡쳐시간값초기화
				$("[name='wr_4']").val("");
				$("#ca_type_sub").hide();
				$("#isAdmNotice").hide();
				$("[name^='wr_12']").eq(1).prop("checked",true);
				$(".on-study").css("visibility","visible");
				$("#top-col").prop("colspan",3);
				$("#wr_bg_info").hide();
				$("[name='it_id']").val("");
				$(".fwrite tr").eq(1).hide();//상세분류 닫기
				$(".fwrite tr").eq(3).hide();//상세분류 닫기
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub").hide();
				$("#ca_type_sub2").hide();
				$("#ca_type_sub3").hide();
				$(".fwrite tr").eq(2).find(".relation-key-list .searchList").children().remove();

				$("#ca_type_sub").attr("required", false);
				$("#ca_type_sub2").attr("required", false);
				$("#ca_type_sub3").attr("required", false);
				$("#ca_type_sub2_1").attr("required", false);
				$("#ca_type_sub2_2").attr("required", false);
				$("#ca_type_sub2_3").attr("required", false);
				$("#info_book_page").attr("required", false);

			break;
			default:
				chkType2=0;
				$("#ca_type_sub2 option:nth-child(1)").attr("selected","selected");
				$("#ca_type_sub").hide();
				$("#ca_type_sub2 option[value!='']").remove();
				$("#ca_type_sub2").hide();
				$("#ca_type_sub3").hide();
				$("#wr_bg_info").hide();
				$(".on-study").css("visibility","hidden");
				$(".fwrite tr").eq(2).find(".relation-key-list .searchList").children().remove();
				$(".fwrite tr").eq(1).hide();
				$(".fwrite tr").eq(2).hide();
				$(".fwrite tr").eq(3).hide();
				
				$("[name='it_id']").val("");
				$(".type-sel").find("select").not("#ca_type").hide();
			break;
		}
	});
	
	$("#ca_type_sub2").on("change",function(){
		$("#wr_4").val('');
		$("#wr_4place").hide();
		var options = "";
		var tab = "";	//뭔지모르겠지만 input이 options에 안붙음
		$(".type-sub2 #ca_type_sub2_1").children("option").not("#chk1").remove();
		$(".type-sub2 #ca_type_sub2_1").children("input").remove();
		$("[name='info_book_page']").val("");
		
		if($("#ca_type_sub2 option:selected").val()==''){
			$("div.type-sub2").hide();
			$(".fwrite").find("input[name='wr_1']").val('');	
			$(".fwrite").find("input[name='wr_5']").val('');
		}else{
			$(".fwrite").find("input[name='wr_1']").val($("#ca_type_sub2 option:selected").text());
			$(".fwrite").find("input[name='wr_5']").val($("#ca_type_sub2 option:selected").val());
			$("#ca_type_sub2_2").hide();
			$("#ca_type_sub2_3").hide();
			$(".type-sub2").show();
			$("#ca_type_sub2_1").show();
		}
		it_id = $(this).val();
		$.getJSON("/skin/board/basic_inquery_v2/json_inquery_category.php",{ mode : "subject", it_id : it_id },function(data){
					$(data).each(function(index){												
						options += "<option value=\""+data[index].tbsubject_idx+":"+data[index].tbtypes_idx+"\" class='ellip'>"+data[index].tbsubject_name+"</option>";
					});						
					$("#ca_type_sub2_1").append(options);
					// $("#ca_type_sub2_1").append("<input type='hidden' name='tbtypes_idx' value="++"></input>");
		});
	});
	
	$("#ca_type_sub2_1").on("change",function(){
		
				$("#wr_4").val('');
				$("#wr_4place").hide();
		optionVal = $(this).val().split(":");
		subject_idx =optionVal[0]; 
		type_idx = optionVal[1];
		it_id = $("#ca_type_sub2 option:selected").val();
		var options = "";
		$("[name='info_book_page']").val("");
		
		$(".type-sub2 #ca_type_sub2_2").children("option").not("#chk1").remove();
		
		if($("#ca_type_sub2 option:selected").val()!=''){
			$(".fwrite").find("input[name='tbtypes_idx']").val();
		}else{
			$(".fwrite").find("input[name='tbtypes_idx']").val('');
		}
		
		if($("#ca_type_sub2_1 option:selected").val()==''){
			$("#ca_type_sub2_2").hide();
			$("#ca_type_sub2_3").hide();  				
		}else{
			$("#ca_type_sub2_3").hide();
			$("#ca_type_sub2_2").show();
		}
		
		$("#tbtypes_idx").val(type_idx);
		$.getJSON("/skin/board/basic_inquery_v2/json_inquery_category.php",{ mode : "tbitem", it_id : it_id, type_idx : type_idx, subject_idx : subject_idx },function(data){
			
					$(data).each(function(index){												
						options += "<option value=\""+data[index].tb_id+"\">"+data[index].tb_name+"</option>";						
					});						
					$("#ca_type_sub2_2").append(options);
		});
	});
	
	$("#ca_type_sub2_2").on("change",function(){
		var options = "";
		
		
		$("#wr_4").val('');
		$("#wr_4place").hide();
		$("[name='info_book_page']").val("");
		
		
		$(".type-sub2 #ca_type_sub2_3").children("option").not("#chk1").remove();
		
		if($("#ca_type_sub2_2 option:selected").val()==''){
			$(".fwrite").find("input[name='tb_id']").val("");
			$(".fwrite").find("input[name='tb_name']").val("");
			$("#ca_type_sub2_3").hide();  				
		}else{
			$(".fwrite").find("input[name='wr_6']").val($("#ca_type_sub2_2 option:selected").val());
			$(".fwrite").find("input[name='wr_2']").val($("#ca_type_sub2_2 option:selected").text());
			$("#ca_type_sub2_3").show();
		}
		
		var tb_id = $(this).val();
		add_tb_id = tb_id;
		
		$.getJSON("/skin/board/advanced_cs/json_inquery_category.php",{ mode : "lecturer", tb_id : tb_id },function(data){
			$(data).each(function(index){												
				options += "<option value=\""+data[index].lec_name+"\">"+data[index].lec_name+"</option>";						
			});						
			$("#ca_type_sub2_3").append(options);
		});
	});
	
	$("#ca_type_sub2_3").on("change",function(){
		
		$("#wr_4").val('');
		$("#wr_4place").hide();
		if($("#ca_type_sub2_3 option:selected").val()==''){
			$(".fwrite").find("input[name='wr_3']").val("");
			if($('#wr_bg_info').length >0){
				$('#wr_bg_info').hide();
			}
		}else{
			$(".fwrite").find("input[name='wr_3']").val($("#ca_type_sub2_3 option:selected").text());
			/* 교재교안 정보 추가 스크립트 */
			if($('#wr_bg_info').length >0){
				$.getJSON("/skin/board/advanced_cs/json_inquery_category.php",{ mode : "plan", tb_id : add_tb_id },function(data){
					if (data == null){
						console.log("null");
						$('#wr_book_false').show();
						$('#wr_book_true').hide();
						$("#add_it_name").val("");
						$("#info_book_page").attr("required", false);

					} else {
						console.log("not null");
						$('#wr_book_true').show();
						$('#wr_book_false').hide();
						$("#info_book_name").html(data);
						$("#add_it_name").val(data);
						$("#info_book_page").attr("required", true);
					}						
				});
				console.log("오픈");
				$('#wr_bg_info').show();

				//add_it_name
				//$("#add_it_name").remove();
			}
		}
	});	


	
	//고객상담안내 관련
	$("#ca_type_sub").on("change", function(){
				//캡쳐시간값초기화
				$(".play_time").hide();
				$("[name='wr_4']").val("");


		$(".fwrite tr").eq(2).show();//상세분류 닫기
		console.log($(this).val());
		var goVal = $(this).val();
		var faqList = "";
		$(".fwrite tr .faq-list").text("");
		switch(goVal){ 
			case "": case "이벤트": case "고객제안":
			$(".fwrite tr").eq(2).hide();//상세분류 닫기
			break;
			case "사이트이용":
				$(".cs_list_title").html("연관 FAQ");
				/*
					요기에 추가되어야 하는것들은 앞에 **** 이거 붙여있어요 그냥 주석처리한건 없애는거에요 from.ina
				*/
				//faqList =   "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=91' target='_blank'>1. 적립금 / 쿠폰 이용 안내</a></li><br>";
				faqList =   "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=90' target='_blank'>1. 정오표 / mp3 / 기출 / 법령/ 프로그램 / 도서업데이트 학습 자료실 이용 안내</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=89' target='_blank'>2. 무료강의 (시대플러스) 이용방법 안내</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=91' target='_blank'>3. 온라인 모의고사 쿠폰등록 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=91' target='_blank'>4. AI 면접 무료쿠폰 등록 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=47' target='_blank'>5. 회원가입 안내</a></li>";
				// **** faqList += "<li><a href='/popkon/?f=cscenter&from=cs2&csnum=47' target='_blank'>6. 회원탈퇴 안내</a></li>";
			break;
			case "모바일":
				$(".cs_list_title").html("연관 FAQ");
				faqList =   "<li><a href='/popkon/?f=cscenter&from=cs7&csnum=81' target='_blank'>1. 모바일 다운로드 안내(안드로이드)</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs7&csnum=75' target='_blank'>2. 모바일 강의실 이용 안내(안드로이드)</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs7&csnum=98' target='_blank'>3. 다운로드가 중지 or 완료되지 않은 파일을 이어서 받는 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs7&csnum=96' target='_blank'>4. 강의 다운로드 후 수강기간이 종료 되었을 경우</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs7&csnum=94' target='_blank'>5. 모바일 기기 변경 시 다운로드 안내</a></li>";
				//faqList += "<li><a href='/popkon/?f=cscenter&from=cs7&csnum=93' target='_blank'>5. 다운로드 완료된 파일 재생 시 오류 메세지 안내</a></li>";
			break;
			case "배송":
				$(".cs_list_title").html("배송안내");
				faqList =   "<li><strong>출고 일정 및 배송기간</strong></li>";
				faqList += "<li>택배사 : CJ대한통운</li>";
				faqList += "<li>평   일 :  오후 4시 일괄 출고되며 출고 후 배송일은 영업일 기준 1~7일 소요예정</li>";
				faqList += "<li>토요일 : 11시 이전 주문건은 토요일 출고되며 배송시일은 영업일 기준 1~7일 소요예정</li>";
				faqList += "<li>※ 출고 이후 환불 신청 하실 경우 왕복 택배비 차감 후 환불이 진행됩니다. </li>";
			break;
			case "상품":     //상품ㅇ ㅏㄴ씀!!!!
				$(".cs_list_title").html("연관 FAQ");
				faqList =   "<li><a href='/popkon/?f=cscenter&from=cs4&csnum=92' target='_blank'>1. 환급반 환급 절차 안내</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs4&csnum=73' target='_blank'>2. 동영상 강좌 휴강신청 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs4&csnum=73' target='_blank'>3. 동영상 강좌 수강신청 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs4&csnum=59' target='_blank'>4. 수강 중인 강의의 수강 잔여일 또는 수강 종료일은 어디서 확인하나요?</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs4&csnum=49' target='_blank'>5. 강의의 수강 횟수가 정해져 있나요?</a></li>";
			break;
			case "강의이용방법":
				$(".cs_list_title").html("연관 FAQ");				
				faqList =   "<li><a href='/popkon/?f=cscenter&from=cs3&csnum=92' target='_blank'>1. 환급반 환급 절차 안내</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs3&csnum=106' target='_blank'>2. 수강기간 연장신청 안내</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs3&csnum=73' target='_blank'>3. 동영상 강좌 휴강신청 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs3&csnum=59' target='_blank'>4. 수강 중인 강의의 수강 잔여일 또는 수강 종료일은 어디서 확인하나요?</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs3&csnum=49' target='_blank'>5. 강의의 수강 횟수가 정해져 있나요?</a></li>";
			break;
			case "환불":
				$(".cs_list_title").html("연관 FAQ");
				faqList =   "<li><a href='/popkon/?f=cscenter&from=cs4' target='_blank'>1. 결제안내 도우미 바로가기</a></li>";
				//faqList += "<li><a href='/popkon/?f=cscenter&from=cs4' target='_blank'>2. LG 유플러스 전자결제 - Active X 수동설치</a></li>";
				//faqList += "<li><a href='/popkon/?f=cscenter&from=cs4&csnum=86' target='_blank'>3. 온라인 송금으로 주문/결제 했을 경우 며칠 이내에 송금해야 하나요?</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs5&csnum=71' target='_blank'>2. 도서 환불규정</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs5&csnum=42' target='_blank'>3. 동영상 환불규정</a></li>"; 
			break;
			case "기타":
				$(".cs_list_title").html("연관 FAQ");
				faqList =   "<li><a href='/popkon/?f=cscenter&from=cs6&csnum=72' target='_blank'>1. 맥(MAC) 관련 기기 동영상 재생 불가</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs6&csnum=45' target='_blank'>2. 동영상 Player 끊김 또는 화면이 안나올때 (흑백, 깨짐) 대체 방법</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs9' target='_blank'>3. 동영상 강의가 실행되고 2-10초 사이에 꺼지면서 익스플로러가 재시작 됩니다.</a></li>";
				faqList += "<li><a href='/popkon/?f=cscenter&from=cs6&csnum=45' target='_blank'>4. 동영상 강의를 듣는 도중에 버퍼링이 자주 생기거나 자꾸만 끊깁니다.</a></li>";
				//faqList += "<li><a href='/popkon/?f=cscenter&from=cs6' target='_blank'>5. 동영상의 배속기능 조절이 안됩니다.</a></li>";
			break;
		}
		
		$(".fwrite tr .faq-list").append(faqList);
		
	});
});