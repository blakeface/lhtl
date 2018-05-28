// BUTTONS

//visState = default, help, test
let visState = 'default';
const test = document.querySelector('#test')
const help = document.querySelector('#help')
const testTarget = document.querySelectorAll('.test-target')
const helpTarget = document.querySelectorAll('.help-target')

test.addEventListener('click', handleTestClick)
help.addEventListener('click', handleHelpClick)

function handleTestClick() {
	if (visState == 'default') {
		visState = 'test';
		testTarget.forEach(el => el.classList.add('hidden'))
	}
	else {
		visState = 'default';
		testTarget.forEach(el => el.classList.remove('hidden'))
	}
}

function handleHelpClick() {
	if (visState == 'test') {
		visState = 'help';
		helpTarget.forEach(el => el.classList.remove('hidden'))
	}
}


// POMODORO
var onBreak = false;
const timerEl = document.querySelector('#timer')
const noticeEl = document.querySelector('#notice')
const mainEl = document.querySelector('main')
const footerEl = document.querySelector('footer')
function formatTime(timer){
	return `${pad(parseInt(timer / 60, 10))}:${pad(parseInt(timer % 60, 10))}`
}
function pad(num) {
	return (num < 10 ? '0' : '') + num
}
function initTimer(duration, timerEl){
	var timer = duration;
	var timerInterval = setInterval(function () {
		timerEl.innerHTML = formatTime(timer);

		console.log(timer)
		if (--timer < 0) {
			clearInterval(timerInterval);
			if (onBreak) {
				noticeEl.classList.remove('on-break');
				mainEl.classList.remove('on-break');
				footerEl.classList.remove('on-break');
			}
			else {
				noticeEl.classList.add('on-break');
				mainEl.classList.add('on-break')
				footerEl.classList.add('on-break')
			}
			initTimer(onBreak ? (30 * 60) : (5), timerEl);
			onBreak = !onBreak
		}
	}, 1000);
}
window.onload = () => initTimer(2, timerEl)