import SideaDateTimerSet from './Timer.js';
import slide from './Slide.js';

document.addEventListener('DOMContentLoaded', function () {

const timerSet = new SideaDateTimerSet();


timerSet.init();
new slide().init();

});
