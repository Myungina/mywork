$(document).ready(function() {
    console.log("장바구니 js");

	allChkFn(); 	//장바구니 전체선택 디폴트
	TotalPriceFn(); 	//└그에따른 타입별 금액 계산 	

     
    //장바구니 전체선택 Fn
    $('.cartAllChkArea').on('click',function(){
		allChkFn();
		TotalPriceFn();
	})
	
	$('#allChkBtn').on('click', function(e){
		e.preventDefault();
		$('#cartAllChk').trigger('click');
	})
	//장바구니 개별선택 Fn
	$('.cartProduct .cmChkbox').each(function(){
		$(this).on('click',function(){
			chkselFn();
			TotalPriceFn();
		})
	})    
	
	$('#buyGo').on('click',function(){
		BuyFn();
	})
	
    ////////////////////// 함수 /////////////////////
	 //장바구니 전체선택 Fn
     function allChkFn(){	
		var AllChk = $('#cartAllChk');
		if(AllChk.is(':checked') == true){
			$('.cartProduct .cmChkbox').prop("checked", true);
			$('#allChkBtn').text('전체해제');
		}else{
			$('.cartProduct .cmChkbox').prop("checked", false);
			$('#allChkBtn').text('전체선택');
		}
	}
		
	//장바구니 선택삭제 Fn
	$('#allChkRemoveBtn').on('click',function(e){		
		e.preventDefault();
		var chkCnt = $('.cartProduct .cmChkbox:checked').length;
		var pa_ca_id='';
		var cnt=1;

		$("input[name='cartoneChk']:checked").each(function() {
			if($(this).attr('data-caid')) {
				pa_ca_id += $(this).attr('data-caid');
				if(cnt < $("input[name='cartoneChk']:checked").length) {
					pa_ca_id += ",";
				}
				cnt++;
			}
		});

		if(chkCnt == 0 ){
			alert('선택한 상품이 없습니다.');
			return false;			
		}
		
		var deleteConfirm = confirm('선택한 상품을 삭제하시겠습니까?');
		if(deleteConfirm === true){
			$.post('/myclass/ajax_delete_cart_item.php',{pa_ca_id: pa_ca_id},function(data) {
				if(data == 'ok') {
					location.reload();
				} else {
					console("fail");
				}
			});
		}else{
			return false;
		}
	})	
		
	//장바구니 개별선택 Fn
	function chkselFn(){
		var chkboxCnt = $('.cartProduct .cmChkbox').length;
		var chkCnt = $('.cartProduct .cmChkbox:checked').length;
	
		// 어찌됬든 개별 체크 누르면 결국 전체선택도 변경되어야함
		if(chkboxCnt != chkCnt){
			$('#cartAllChk').prop("checked", false);
			$("#allChkBtn").text("전체선택");
		}else{
			$('#cartAllChk').prop("checked", true);
			$("#allChkBtn").text("전체해제");
		}
	}
	
	//장바구니 총 주문금액 계산 [상품체크유무]
	function TotalPriceFn(){
		var totalPrice = 0;
		var regexp = /\B(?=(\d{3})+(?!\d))/g; // 숫자 콤마찍기 옵션
		
		$('.cartProduct').each(function(){
			var checkWarp = $(this).find('.productName');
			var selectChk = checkWarp.children('.cmChkbox:checked');
			var sum = 0;
			
			selectChk.each(function(){
				var thisVal = parseInt($(this).attr('data-price')*$(this).attr('data-qty')); //금액 int로 치환
				var thisCaid = $(this).val();
				var tatalCaid = '';
				sum += thisVal;
			})
			totalPrice += sum;
		})
		totalPrice = totalPrice.toString().replace(regexp, ',');
		$('#totalPrice, #totalPayPrice').text(totalPrice+'원');
		
	}
	
	//상품결제시
	var clickBugCnt = 0;
	function BuyFn(){
		clickBugCnt++; //연타방지용 주문서 생성용
		var chkCnt = $('.cartProduct .cmChkbox:checked').length;
		var pa_ca_id_group = "";
		
		if(chkCnt == 0){
			alert('선택한 상품이 없습니다');
			clickBugCnt = 0;
            return false;	
		}

		$('.cartProduct .cmChkbox:checked').each(function(idx) {
			// 체크된거 돌면서 ca_id = pa_ca_id 일때
			if($(this).attr('data-caid') == $(this).val()) {
				if(idx > 0) {
					pa_ca_id_group = pa_ca_id_group+",";
				}
				pa_ca_id_group = pa_ca_id_group+$(this).val();
			}
			$("[name='pa_ca_id_group']").val(pa_ca_id_group);
		});
		
		if(clickBugCnt == 1){ 
			var buyChk = confirm('주문을 진행하시겠습니까?');
			if(buyChk === true){
                // /popkon/order_form_from_cart.php 바로 보냄
                $("[name='fcartlist']").submit();
				clickBugCnt = 0;
			}else{
				clickBugCnt = 0;
				return false;
			}
		} 
	}
    ////////////////////// 함수 /////////////////////
})