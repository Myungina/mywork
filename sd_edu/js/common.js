$(document).ready(function(){
    function init(){
		/*head만큼 띄우기*/
		 var gnbH = $('#brd_header').innerHeight ();
        $('.wrap').css({
            'padding-top' : gnbH+'px'
        });

        gnbAct();
        mGnbFn();
        familyFn();
        topFn();
		faqlistFn();
        resizeFt();
        scrollGnb();
        subSwiper();
        mobileChk();

    };

    $(window).resize(function(){
        resizeFt();
        subSwiper();
        scrollGnb();

        var gnbH = $('#brd_header').innerHeight ();
        $('.wrap').css({
            'padding-top' : gnbH+'px'
        });

    });

    // board 회사소개 반응형 적용 class
    $('.table_section').addClass('dhei');
    var boardBtnLen = $('.bottom_btn_wrap li').length;
    if(boardBtnLen == 3){
        $('.bottom_btn_wrap').addClass('item3')
    };

    function mobileChk(){
        if(jQuery.browser.mobile == true){
            $('.gnb_menu').addClass('mobile');
        };
    };

    function subSwiper(){
        var gnbList = $('.gnb_menu li');
        var gnbLen = $('.gnb_menu li').length;
        var arr = [];
        var sum = 0;
        var $width = $(window).width();



        gnbList.each(function(){
           var listWidth = ($(this).outerWidth());
           arr.push(listWidth);
        });

        for (var i = 0; i < gnbLen; i++) {
            sum += arr[i]
        };



        var $width = $(window).width();

        if(sum > $width){
            $('.gnb_menu ul').css({
                'width' : (sum+40) + 'px'
            });
            $('.gnb_menu').addClass('scr_gnb');
        }else{
            $('.gnb_menu ul').css({
                'width' :  'auto'
            });
            $('.gnb_menu').removeClass('scr_gnb');
        };
    };


    function scrollGnb(){
        $(window).scroll(function(){
            var scrTop =  $(window).scrollTop();
            var gnbH = $('#brd_header').innerHeight ();

            if(scrTop > 0){
                $('#brd_header').addClass('act');
                $('.wrap').css({
                    'padding-top' : gnbH+'px'
                });
            }else{
                $('#brd_header').removeClass('act');
                $('.wrap').css({
                    'padding-top' : gnbH+'px'
                })
            };
        });
    };

    function resizeFt(){

        var $width = $(window).width();
        var $fontsize = 36/700*$width;

        if($width < 701){
            $('html').css('font-size',$fontsize);
        }else{
            $('html').css('font-size','initial');
        }
    };


    function mGnbFn(){
        $('#show-mgnb').on('click',function(){
            $('.m_gnb-wrap').show();
        });

        $('.gnb_list li').each(function(){
            var gnbTh = $(this).children('p');
            var gnbLi = $(this).parents('li');
            gnbTh.on('click',function(){
                var otherList = $(this).parents('li').siblings('li').children('dl');
                var otherP = $(this).parents('li').siblings('li').children('p');
                $(this).toggleClass('act');

                if(($(this).hasClass('act')) == true){
                    otherP.removeClass('act');
                    $(this).siblings('dl').slideDown();
                    otherList.slideUp();
                }else{
                    $(this).siblings('dl').slideUp();
                }
            });

            if(($(this).hasClass('selected'))==true){
                $(this).children('dl').slideDown();
            };
        });

        $('#m_gnb-wrap .close_btn').on('click',function(){
            // $('.gnb_list li p').removeClass('act');
            // $('.gnb_list li dl').slideUp();
            $('#m_gnb-wrap').hide();
        });

        $('.m_gnb-wrap .bg').on('click',function(){
            $('#m_gnb-wrap').hide();
        });

    };

    function gnbAct(){ // 메뉴 지앤비 FN
        $('#brd_header li').each(function(){
            $(this).on('mouseover',function(){
                $(this).addClass('act').siblings('li').removeClass('act');
            });
            $(this).on('mouseout',function(){
                $(this).removeClass('act');
            });
        });


        $('#show-gnb').on('click',function(){ // 메뉴 아이콘 클릭시
            $('#gnb-wrap').show();
        });

        $('#gnb-wrap .close-btn').on('click',function(){ // 메뉴안에 닫기 버튼 클릭시
            $('#gnb-wrap').hide();
        });

        $('.sub-depth li').each(function(){ // 하단배너 바뀌는 FN
            $(this).on('mouseover',function(){
                var idx = $(this).index()+1;
                $('#gnb-banner').removeClass();
                $('#gnb-banner').addClass('type'+idx);

            });
        });
    };

     function familyFn(){ //푸터 패밀리 GNB
        $('#family_btn').on('click',function(){
            $(this).toggleClass('act');

            if(($(this).hasClass('act'))== true){
                $(this).parents('.select_wrap').addClass('act');
                $(this).siblings('ul').show();
            }else{
                $(this).parents('.select_wrap').removeClass('act');
                $(this).siblings('ul').hide();
            };
        });
    };


    function topFn(){ // 맨위로 FN
        var $width =  $(window).width();

        $('#top_btn').on('click',function(){
            $('html,body').animate({
                scrollTop : 0
            },200);
        });

        $('#brd_footer .more_txt').on('click',function(){
            $(this).toggleClass('act');

            if(($(this).hasClass('act'))==true){
                $('#brd_footer li p').slideDown();
            }else{
                $('#brd_footer li p').slideUp();
            }
        });
    };

	//faq 리스트
	function faqlistFn(){
		setTimeout(function(){
			$('.faq_list li').eq(0).addClass('selected');
			$('.faq_list').children('li').each(function(){
				$(this).on('click',function(){
					if($(this).hasClass('selected') == true){
						$(this).removeClass('selected');
					}else{
						$(this).addClass('selected').siblings('li').removeClass('selected');
					}
				});
			});
		},500);
	};

    init();
});

