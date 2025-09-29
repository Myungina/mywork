import SideaDateTimerSet from './Timer.js';
import slide from './Slide.js';

document.addEventListener('DOMContentLoaded', function () {

const TimerContainer = document.querySelectorAll('.sdDateTimer')
const timerSet = new SideaDateTimerSet(TimerContainer,{setenddate:"2026-08-29T23:59:59" , type:"secTimer"});
timerSet.init();

const SlideContainer = document.querySelectorAll('.full_rolling')
new slide(SlideContainer, {autoplay:'auto' , speed:'5000'}).init();

});
