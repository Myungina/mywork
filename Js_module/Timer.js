/*
 * SideaDateTimer : 디데이 타이머 계산 fn -> return
 * SideaDateTimerSet :  타이머 적용 fn
 * 
 * el : 타이머가 적용될 html
 *      ㄴ default : sdDateTimer
 *      ㄴ 다른 클래스를 사용하여 젹용시
 *          const timerContainer = document.querySelectorAll('.sdDateTimer') 선언후 new sidaeDateTimerSet(timerContainer) 전달
 *  endDate : 이벤트 종료 일자 (data-target)
 *  timerType : 타이머 형식 (data-type)
 *  TimerHtml : 콜백함수
 *
 *  - 25.07.17 ina
 */
//디데이 타이머
class SideaDateTimer {
    constructor({el, endDate, timerType, TimerHtml = () => {} }) {

        //받아온 날자 변환
        if (typeof endDate === 'string') {
            const dateStr = endDate.replace(/\s+/g, 'T').replace(/T(\d{2}:\d{2}:\d{2})$/, 'T$1');
            this.endDate = new Date(dateStr);
        } else {
            this.endDate = new Date(endDate);
        }

        this.el = el; // 타이머 출력 html
        this.endDate = new Date(endDate); // 이벤트 종료 날자
        this.timerType = timerType; //타이머 종류 (D-10일 :dayTimer , D- 11일 11시11분11초 : secTimer , D- 11일 11시 11분: hourTimer)
        this.TimerHtml = TimerHtml; 
        this.intervalId = null; // 디뎨이 결과 실행
        this.isRunning = false; // 상태값


        // 타이머 타입별 계산 함수 미리 정의
        this.calcFunctions = {
            'secTimer': (countDate) => this.calcWithSeconds(countDate),
            'minTimer': (countDate) => this.calcWithMinutes(countDate),
            'dayTimer': (countDate) => this.calcDaysOnly(countDate)
        };

        // 시간 계산 값
        this.TIME_CONSTANTS = {
            SECOND: 1000,
            MINUTE: 60 * 1000,
            HOUR: 60 * 60 * 1000,
            DAY: 24 * 60 * 60 * 1000
        };
    }

    // 날짜 계산 - 타입별
    calcDate = () => {
        const countDate = this.endDate - Date.now();
        const timer_status = this.el.dataset.status;
        if (countDate <= 0) {
            this.stop();
            this.removeCount();
            if(timer_status == 'set_txt'){ //data-status == 'set_txt'면 타이머 종료시 'DAY'출력 -> 단, 디데이 타입이 day일때만
                return {day: "DAY"}; 
            }else{
                return {day: 0, hour: 0, minute: 0, seconds: 0 };
            }

        }else{
            const calcFunction = this.calcFunctions[this.timerType] || this.calcWithSeconds; //모든 디데이 카운터 디폴트는 초단위까지 생성
            return calcFunction(countDate);
        }
    }

    calcWithSeconds = (countDate) => { //초
        const {DAY, HOUR,MINUTE, SECOND} = this.TIME_CONSTANTS;

        // 더 자세한 디버깅
        const totalHours = countDate / HOUR;
        const totalMinutes = countDate / MINUTE;

        const result =  {
            day: Math.floor(countDate / DAY),
            hour: Math.floor((countDate % DAY) / HOUR),
            minute: Math.floor((countDate % HOUR) / MINUTE),
            seconds: Math.floor((countDate % MINUTE) / SECOND)
        };
        return result;
    }

    calcWithMinutes = (countDate)=> { //분
        const {DAY, HOUR, MINUTE} = this.TIME_CONSTANTS;
        return {
            day: Math.floor(countDate / DAY),
            hour: Math.floor((countDate % DAY) / HOUR),
            minute: Math.floor((countDate % HOUR) / MINUTE),
            seconds: 0
        };
    }

    calcDaysOnly = (countDate) => { //일
        return {
            day: Math.floor(countDate / this.TIME_CONSTANTS.DAY),
            hour: 0,
            minute: 0,
            seconds: 0
        };
    }

    //타이머 시작
    start = () => {
        if (this.isRunning) return;

        this.stop();
        this.isRunning = true;
        this.TimerHtml(this.calcDate());

        this.intervalId = setInterval(() => {
            if (!this.isRunning) return;
            this.TimerHtml(this.calcDate());
        }, 1000);
    }

    //타이머 리셋
    stop = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    }

    //메모리정리
    destroy = () => {
        this.stop();
        this.el = null;
        this.TimerHtml = null;
    }
}

//타이머 적용fn
export default class SideaDateTimerSet {
    constructor(el , option) {
        
        if (el instanceof Element) {  //혹시 한개여도 배열로 감싸기
                this.container = [el]; 
            } else if (el instanceof NodeList || el instanceof HTMLCollection) {
                this.container = Array.from(el);
            }else {
                this.container = Array.from(document.querySelectorAll('.sdDateTimer'));
            }
        this.endDate = option.setenddate;
        this.timerType = option.type || 'setTimer'; //default 초단위
        this.timers = new Map(); // 타이머
    }

    init = ()=> {
        const containers = Array.from(this.container);
        const EndTime = this.endDate;
        const TimerType = this.timerType;
        containers.forEach((TimerEl, index) => {
            if (!this.validateElement(TimerEl, EndTime , index)) return;  //값이 없으면 실행 안함.
            this.createTimer(TimerEl, EndTime , TimerType, index);
        });
    }
    //유효성 검사
    validateElement = (el, endDate, index) => {
        if (!el) {
            console.warn(`${index}번째 container 없음.`);
            return false;
        }

        if (!endDate) {
            console.warn('종료날짜가 없음 : ', el);
            return false;
        }

        if (isNaN(new Date(endDate))) {
            console.warn('2025-08-29T23:59:00 형식이 아님:', endDate);
            return false;
        }
        return true;
    }

    //타이머 생성
    createTimer = (el, endDate, timerType, index) => {  //container, 이벤트 종료일 , 디데이 타입 , index
        const elements = {
            day: el.querySelector('.day'),
            hour: el.querySelector('.hour'),
            min: el.querySelector('.min'),
            sec: el.querySelector('.sec')
        };

        const timer = new SideaDateTimer({
            el,
            endDate,
            timerType,
            TimerHtml: this.createTimerHtml(elements)
        });
                
        this.timers.set(index, timer);
        timer.start();
    }

    //타이머 html 생성
    createTimerHtml = (elements) => {
        return ({day, hour, minute, seconds}) => {
            // 존재하는 요소만 업데이트
            if (elements.day) elements.day.innerHTML  = this.splitNumber(day);
            if (elements.hour) elements.hour.innerHTML  = this.splitNumber(hour);
            if (elements.min) elements.min.innerHTML  = this.splitNumber(minute);
            if (elements.sec) elements.sec.innerHTML  = this.splitNumber(seconds);
        };
    }

    //2자릿수 자르기
    splitNumber = (number) => {
        return number.toString()
            .padStart(2, '0')
            .split('')
            .map(digit => `<span>${digit}</span>`)
            .join('');
    };

    // 모든 타이머 정리
    destroy = () => {
        this.timers.forEach(timer => timer.destroy());
        this.timers.clear();
    }
}