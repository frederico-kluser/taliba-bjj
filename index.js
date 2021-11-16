/* eslint-disable complexity */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */

/*
bell.play();
*/

const bell = new Audio('src/assets/sound/start-bell.mp3');
const over = new Audio('src/assets/sound/acabou.mp3');

let rounds = 0;
let fightTime = 0;
let restTime = 0;
let firstClick = false;
let started = false;

let initialTime = 0;
let actualRound = 0;
let counter = null;

let fightBell = true;
let restBell = true;

const timer = document.getElementsByClassName('background-timer')[0];
const deskRound = document.getElementById('desk-round');
const deskTime = document.getElementById('desk-time');
const deskTimeText = document.getElementById('desk-time-h5');
const deskTimeBackground = document.getElementById('desk-time-background');

// eslint-disable-next-line complexity
const main = () => {
  if (!firstClick) {
    firstClick = true;
    clean();
  } else if (rounds !== 0 && fightTime !== 0 && restTime !== 0 && !started) {
    start();
  } else if (started) {
    clean();
  }
};

const start = () => {
  started = true;
  const buttonGroup = document.getElementsByClassName('button-group');
  for (let index = 0; index < buttonGroup.length; index++) {
    buttonGroup[index].setAttribute('class', 'button-group opacity');
  }

  setTimeout(() => {
    for (let index = 0; index < buttonGroup.length; index++) {
      buttonGroup[index].setAttribute('class', 'button-group opacity none');
    }

    timerControl(fightTime, '100');
    initialTime = new Date().getTime();
    actualRound = rounds;
    counter = setInterval(setIntervalFunc, 1);
  }, 500);
};

const setIntervalFunc = () => {
  const currentTime = new Date().getTime();
  const discount = Math.trunc((currentTime - initialTime) / 1000);
  const fightCurrentTime = fightTime - discount;
  const restCurrentTime = restTime + fightCurrentTime;
  deskRound.innerHTML = actualRound < 10 ? `0${actualRound}` : actualRound;

  if (fightCurrentTime > 0) {
    if (fightBell) {
      bell.play();
      fightBell = false;
      restBell = true;
    }
    deskTimeText.innerHTML = 'FIGHT TIME';
    deskTimeBackground.removeAttribute('style');
    const {minutes, seconds} = calcTime(fightCurrentTime);
    deskTime.innerHTML = `${minutes}:${seconds}`;
  } else if (restCurrentTime > 0) {
    if (restBell) {
      bell.play();
      restBell = false;
      fightBell = true;
    }
    deskTimeText.innerHTML = 'REST TIME';
    deskTimeBackground.style.backgroundColor = '#00796B';
    const {minutes, seconds} = calcTime(restCurrentTime);
    deskTime.innerHTML = `${minutes}:${seconds}`;
  } else if (actualRound > 1) {
    restBell = true;
    fightBell = true;
    bell.play();
    actualRound--;
    initialTime = new Date().getTime();
  } else {
    over.play();
    clean();
  }
};

const timerControl = (time = '0', height = '0') => {
  const {minutes, seconds} = calcTime(fightTime);
  deskRound.innerHTML = rounds < 10 ? `0${rounds}` : rounds;
  deskTime.innerHTML = `${minutes}:${seconds}`;
  timer.style.transitionDuration = `${time}s`;
  timer.style.height = `${height}%`;
};

const calcTime = time => {
  let minutes = Math.trunc(time / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = time % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return {minutes, seconds};
};

const clean = () => {
  clearInterval(counter);
  started = false;
  rounds = 0;
  fightTime = 0;
  restTime = 0;
  document.getElementById('fightTime').innerHTML = '00:00';
  document.getElementById('restTime').innerHTML = '00:00';
  document.getElementById('rounds').innerHTML = '00';
  deskTimeText.innerHTML = 'FIGHT TIME';
  deskTimeBackground.removeAttribute('style');
  timerControl();

  // button-group opacity none
  const buttonGroup = document.getElementsByClassName('button-group');
  for (let index = 0; index < buttonGroup.length; index++) {
    buttonGroup[index].setAttribute('class', 'button-group opacity');
  }

  setTimeout(() => {
    for (let index = 0; index < buttonGroup.length; index++) {
      buttonGroup[index].setAttribute('class', 'button-group');
    }
  }, 1);
};

const rodadasFunc = boolean => {
  if (boolean) {
    rounds++;
  } else if (rounds > 0) {
    rounds--;
  }

  document.getElementById('rounds').innerHTML = rounds < 10 ? `0${rounds}` : rounds;
};

const fightTimeFunc = boolean => {
  if (boolean) {
    fightTime += 30;
  } else if (fightTime > 0) {
    fightTime -= 30;
  }

  const {minutes, seconds} = calcTime(fightTime);
  document.getElementById('fightTime').innerHTML = `${minutes}:${seconds}`;
};

const restTimeFunc = boolean => {
  if (boolean) {
    restTime += 30;
  } else if (restTime > 0) {
    restTime -= 30;
  }

  const {minutes, seconds} = calcTime(restTime);
  document.getElementById('restTime').innerHTML = `${minutes}:${seconds}`;
};

const clickStart = () => {};

window.main = main;
window.clickStart = clickStart;
window.restTimeFunc = restTimeFunc;
window.fightTimeFunc = fightTimeFunc;
window.rodadasFunc = rodadasFunc;
