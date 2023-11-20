history.replaceState({}, null, location.pathname);
/* 쿠폰페이지에서 get으로 들어오는거때매 넣엇슴. */

$(document).ready(function(){
	console.log("주문배송 js");
	
	$(".search-btn").click(function() {
		var s_date = new Date($("[name='s_date']").val());
		var e_date = new Date($("[name='e_date']").val());

		if(s_date > e_date) {
			alert("검색기간 설정이 잘못되었습니다.");
			return false;
		}

		$("#searchFrm").submit();
	})

	$('.paymentInfo').each(function(){
		var purchaseVal = $(this).find('#purchase_txt').val();
		if(purchaseVal == 'Y'){  //구매확정 함
			$(this).find('.purchase-succ').show();
			$(this).find('.OrderDecideBtn').hide();
		}else{  //구매확정 안함
			$(this).find('.purchase-succ').hide();
			$(this).find('.OrderDecideBtn').show();
		}
	})	

	$('.in-date').datepicker({
		closeText: '닫기', 
		prevText: '전달', 
		nextText: '다음달', 
		currentText: '오늘', 
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)', '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'], 
		dayNames: ['일','월','화','수','목','금','토'], 
		dayNamesShort: ['일','월','화','수','목','금','토'], 
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk', 
		dateFormat: 'yy-mm-dd', 
		maxDate: new Date,  //미래날자 선택 비활성화
		firstDay: 0, 
		isRTL: false, 
		showMonthAfterYear: true, 
		yearSuffix: ''
	});		
	
	
	$(".searchBtnArea ").find("a.date-btn").click(function(e){
		e.preventDefault();				 
		var ndate = new Date(); //현재								
		var d = $(this).attr("href").split("#")[1] || undefined;
		var s = ndate.setDate(ndate.getDate() - d);
		var s_date = new Date(s);
		var year = s_date.getFullYear();
		var month = ((s_date.getMonth() + 1) < 10)? "0"+(s_date.getMonth() + 1) : (s_date.getMonth() + 1);
		var date = (s_date.getDate() < 10)? "0"+s_date.getDate() : s_date.getDate();
		
		$("[name='s_date']").val(year+"-"+month+"-"+date);	
		$('.in-date[name=e_date]').datepicker('setDate', new Date()); //정해진 기간 클릭시 오늘날자로 달력 바꿈
		
		$(".searchBtnArea").find("a").removeClass("selected");
		$(this).addClass("selected");			
	});

	$(".cmListMenu .cmTypeBtn").click(function() {
		// 탭누를때 날짜유지
		var order_type = $(this).attr('href').split("#");
		$("[name='order_type']").val(order_type[1]);
		$("#searchFrm").submit();
	});
})

/***********************************************/
/***********************************************/
/******************function*********************/
/***********************************************/

var HTTP_PGWEB_DOMAIN_SERVICE = "https://pgweb.tosspayments.com";
var HTTP_PGWEB_DOMAIN_TEST  = "https://pgweb.tosspayments.com:7086";
var HTTP_PG_DACOM_SERVICE	= "http://pg.tosspayments.com";
var HTTP_PG_DACOM_TEST		= "http://pretest.tosspayments.com:7080";

// 마이페이지 영수증 출력 호출 스크립트
function myroom_showReceiptByTID_new(tid){
	var HTTP_PGWEB_DOMAIN_SERVICE = "https://pgweb.uplus.co.kr:9091";
	window.open(HTTP_PGWEB_DOMAIN_SERVICE +"/MpFlowCtrl?eventDiv1=search&eventDiv2=getReceipt&TRANSACTIONID=" + tid + "&SYSTEM=NEW&authResultParam=Y","eCreditReceipt","toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=450, height=600");
}

// 마이페이지 영수증 출력 호출 스크립트 - 카카오페이
function myroom_showReceiptByTID_kakaopay(tid,shax){
	var HTTP_PGWEB_DOMAIN_SERVICE = "https://pg-web.kakao.com/v1/confirmation/p/";
	window.open(HTTP_PGWEB_DOMAIN_SERVICE+tid+"/"+shax,"eCreditReceipt","toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=600, height=900");
}

// 마이페이지 영수증 출력 호출 스크립트 - 핸드폰
function showReceiptByTID_phone(tid){
	var HTTP_PGWEB_DOMAIN_SERVICE = "https://pgweb.uplus.co.kr:9091";
	window.open(HTTP_PGWEB_DOMAIN_SERVICE +"/MpFlowCtrl?eventDiv1=search&eventDiv2=getWirelessReceipt&trxid=" + tid + "&SYSTEM=NEW&authResultParam=Y","eCreditReceipt","toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=450, height=600");
}

// 마이페이지 영수증 출력 호출 스크립트
function showCashReceipts(mid, oid, seqno, stype, mode) {
	var paramStr = "";
	var receiptURL = "";
	var testURL = HTTP_PG_DACOM_TEST +"/transfer/cashreceipt_mp.jsp";
	var svcURL  = HTTP_PG_DACOM_SERVICE + "/transfer/cashreceipt_mp.jsp";

	if (mid == "" || oid == "") {
		return ;
	}

	if(stype == "CAS" || stype == "cas" || stype == "SC0040"){
		stype = "SC0040";
		if (seqno == "") seqno = "001";
		paramStr = "orderid="+oid+"&mid="+mid+"&seqno="+seqno+"&servicetype="+stype;
	}else if(stype == "BANK" || stype == "bank" || stype == "SC0030"){
		stype = "SC0030";
		paramStr = "orderid="+oid+"&mid="+mid+"&servicetype="+stype;
	}else if(stype == "CR" || stype == "cr" || stype == "SC0100"){
		stype = "SC0100";
				paramStr = "orderid="+oid+"&mid="+mid+"&servicetype="+stype;
	}

	if (mode == "service") {
		receiptURL = svcURL;
	} else {
		receiptURL = testURL;
	}

	popupWin = window.open(receiptURL+"?"+paramStr, "popWinName","menubar=0,toolbar=0,scrollbars=yes,width=380,height=600,resize=1,left=252,top=116");
}

// 마이페이지 영수증 출력 호출 스크립트
function showReceiptByTID(mertid, tid, authdata) {
	window.open(HTTP_PGWEB_DOMAIN_SERVICE +"/pg/wmp/etc/jsp/Receipt_Link.jsp?mertid="+mertid+"&tid="+tid+"&authdata="+authdata,"eCreditReceipt","toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no, width=450, height=600");
}

function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//구매확정 [S]
function PurchaseConfirm(od_id, me, res_price){
	event.preventDefault();	
		var od_id = od_id;
		$("[name='confirm_order_id']").val(od_id);
		$('.save_cash').text(priceToString(res_price));
		return false;
}
function PurchaseConfirmGo(){
	event.preventDefault();
	var thisChk = $('#confirm_succ');	
	if(thisChk.is(":checked") == false){
		alert("구매확정 동의에 체크해주세요");
		return false;
	}else{
		var purchase_od_id = $("[name='confirm_order_id']").val();					
		var purchase_mb_id = $("[name='purchase_mb_id']").val();
		$.post('/myclass/ajax_purchase_confirm.php',{purchase_od_id : purchase_od_id, mb_id : purchase_mb_id},function(rec){
		if (rec == 1){//정상
			//구매확정 완료시
			alert("구매확정처리가 완료 되었습니다");
			$('.confirm-btn-'+purchase_od_id+', .purchaseArea').hide(); 
			$('.purchaseConfirm.fullLayer').hide(); 
			$('.purchase-succ-'+purchase_od_id).show();
			// 구매확정 완료시					
		}else if (rec == 90){//잘못된접근
			alert("정상적인 접근이 아닙니다.");
			return false;
		}else if (rec == 99){//DB에러
				alert("ERROR");
				return false;
			}
		});
	}	
}
//구매확정 [E]

//주문취소 [S]
function orderCancel(od_id, it_id, it_cash, it_name, bank_use, od_tid, od_settle_use){
	if (confirm("주문을 취소하시겠습니까?") == true){    //확인
			$.post('/myclass/ajax_resPay_Cancel.php',{od_id : od_id, it_id : it_id, it_cash : it_cash, it_name : it_name, bank_use : bank_use, od_tid : od_tid, od_settle_use : od_settle_use},function(rec){
				if (rec == 1){//정상
					location.reload(); 
				} else if (rec == 9999) {
					alert("정상적이지 않은 접근입니다.");
					location.reload();
				} else if (rec == 888) {
					alert("이미 취소된 주문건입니다.");
					location.reload();
				} else {
					rec == 999
				}
		});
	}else{   //취소
		$(".loading").hide();
		return false;
	};
};
//주문취소 [E]
/***********************************************/
/***********************************************/
/******************function*********************/
/***********************************************/