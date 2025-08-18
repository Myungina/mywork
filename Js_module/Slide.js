import SideaDateTimerSet from "./Timer.js";

export default class sidaePopupSlide {
    constructor(el) {
        this.container = el || document.querySelectorAll('.cm_popup_rolling');
    }

    init = () => {
        const swipercontainer = Array.from(this.container);
        swipercontainer.forEach((el, index) => {
            let AutoBnCnt = el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
            let AutoBnLoot = AutoBnCnt > 1 ? true : false;
            let AutoBnCntSettings = AutoBnCnt > 1 ? {delay: 3000, disableOnInteraction: true} : false;
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
    }

    validateElement = (el , index) => {
        if (!el) {
            console.warn(`swiper container 없음.`);
            return false;
        }
        return true;
    }

    swiperSet = (el, index,  AutoBnCnt, AutoBnLoot, AutoBnCntSettings) => {

        let cm_popup_rolling = new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 25,
            loop: AutoBnLoot,
            autoplay: AutoBnCntSettings,
            touchRatio: AutoBnLoot,
            pagination: {
                el: el.querySelector('.rolling_page'),
                type: 'bullets',
            },
            on: {
                slideChangeTransitionStart: function () {                
                    document.querySelectorAll('.swiper-slide-active').forEach((el , index) => {
                        if(el.querySelector('.event_timer_area')){
                            const timer = el.querySelector('.sdDateTimer').dataset.target;
                            const SlideTimer = new SideaDateTimerSet({
                                timerContainer : el.querySelector('.event_timer_area .sdDateTimer'),
                                timer_val : timer
                            });
                            SlideTimer.init();
                        }
                    })                 
                }
            }
        });

        //console.log(cm_popup_rolling);

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