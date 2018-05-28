// BUTTONS

//visState = default, help, test
let visState = 'default';
const testEl = document.querySelector('#test')
const helpEl = document.querySelector('#help')
const testTarget = document.querySelectorAll('.test-target')
const helpTarget = document.querySelectorAll('.help-target')

testEl.addEventListener('click', handleTestClick)
helpEl.addEventListener('click', handleHelpClick)

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
const onBreakEls = document.querySelectorAll('.onbreak-target');

// format timer widget
function formatTime(timer){
	return `${pad(parseInt(timer / 60, 10))}:${pad(parseInt(timer % 60, 10))}`
}
function pad(num) {
	return (num < 10 ? '0' : '') + num
}

// timer functionality
function initTimer(duration, timerEl){
	var timer = duration;
	var timerInterval = setInterval(function () {
		timerEl.innerHTML = formatTime(timer);

		// tick timer
		if (--timer < 0) {
			clearInterval(timerInterval);

			// update view
			if (onBreak) onBreakEls.forEach(el => el.classList.remove('on-break'))
			else onBreakEls.forEach(el => el.classList.add('on-break'))

			// reset timer
			initTimer(onBreak ? (30 * 60) : (5 * 60), timerEl);
			onBreak = !onBreak
		}
	}, 1000);
}
window.onload = () => initTimer(30 * 60, timerEl)