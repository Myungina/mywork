import sidaeDateTimerSet from "./Timer.js";

export default class sidaePopupSlide {
    constructor(el , option) {
        this.container = el || document.querySelectorAll('.cm_popup_rolling');
        this.autoplay = option.autoplay || "auto";
        this.speed = option.speed || 2000;
    }

    init = () => {
        const swipercontainer = Array.from(this.container);
        swipercontainer.forEach((el, index) => {
            let AutoBnCnt = el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
            let AutoBnLoot = AutoBnCnt > 1 ? true : false;
            let AutoBnCntSettings = AutoBnCnt > 1 ? {delay: this.speed, disableOnInteraction: true} : false;
            //console.log(AutoBnCnt)
            if (AutoBnCnt == 0) {
                //0개 일시 해당 html삭제
                el.remove();
            } else {
                el.style.display="block";

                if (!this.validateElement(el  , index)) return;  //값이 없으면 실행 안함.
                setTimeout(() => {
                    this.swiperSet(el , index, AutoBnCnt, AutoBnLoot, AutoBnCntSettings);
                }, 100);

            }
        })
        console.log('Swiper 확인:', typeof Swiper);
    }

    validateElement = (el , index) => {
        if (!el) {
            console.warn(`swiper container 없음.`);
            return false;
        }
        return true;
    }    
    
    swiperInTimer = (el , index) => {
        const swiperTimer = Array.from(el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)'));
        
        swiperTimer.forEach((slideEl, index)=>{
            const timerArea = slideEl.querySelector('.swiperTimer'); // querySelector 사용 (단일 요소)
            if(timerArea){
                const setEndTime = timerArea.dataset.target;
                const timerSet = new sidaeDateTimerSet(timerArea, {setenddate: setEndTime});
                timerSet.init();
        }
            
        })
    }

    swiperSet = (el, index,  AutoBnCnt, AutoBnLoot, AutoBnCntSettings) => {
        const self = this;
        let cm_popup_rolling = new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 25,
            loop: AutoBnLoot,
            autoplay: AutoBnCntSettings,
            touchRatio: AutoBnLoot,
            pagination: {
                el: el.querySelector('.rolling_page'),
                type: 'bullets',
                clickable:true
            },
            on: {
                slideChangeTransitionStart: function () {                                        
                    if(document.querySelectorAll('.sdDateTimer').length > 0){
                        self.swiperInTimer(el , index);
                    }
                }
                ,init:function(){
                    if(document.querySelectorAll('.sdDateTimer').length > 0){
                        self.swiperInTimer(el , index);
                    }
                }
            }
        });

        //클릭시 자동롤링 재시작
        cm_popup_rolling.on('click touchEnd', function () {
            if (cm_popup_rolling.autoplay.running) {
                cm_popup_rolling.autoplay.stop();
            }
            clearTimeout(window._rollingTimer);
            window._rollingTimer = setTimeout(() => {
                cm_popup_rolling.autoplay.start();
            }, 5000);
        });

        cm_popup_rolling.on('touchStart', () => {
            if (cm_popup_rolling.autoplay.running) {
                cm_popup_rolling.autoplay.stop();
            }
            clearTimeout(window._rollingTimer);
        });

        cm_popup_rolling.update();
    }

}