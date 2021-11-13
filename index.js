/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
let rounds = 0;
let fightTime = 0;
let restTime = 0;
let firstClick = false;
let started = false;

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
  }, 500);
};

const timerControl = (time = '0', height = '0') => {
  const timer = document.getElementsByClassName('background-timer')[0];
  timer.style.transitionDuration = `${time}s`;
  timer.style.height = `${height}%`;
};

const clean = () => {
  started = false;
  rounds = 0;
  fightTime = 0;
  restTime = 0;
  document.getElementById('fightTime').innerHTML = '00:00';
  document.getElementById('restTime').innerHTML = '00:00';
  document.getElementById('rounds').innerHTML = '00';
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

  let minutes = Math.trunc(fightTime / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = fightTime % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  document.getElementById('fightTime').innerHTML = `${minutes}:${seconds}`;
};

const restTimeFunc = boolean => {
  if (boolean) {
    restTime += 30;
  } else if (restTime > 0) {
    restTime -= 30;
  }

  let minutes = Math.trunc(restTime / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = restTime % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  document.getElementById('restTime').innerHTML = `${minutes}:${seconds}`;
};

const clickStart = () => {};

window.main = main;
window.clickStart = clickStart;
window.restTimeFunc = restTimeFunc;
window.fightTimeFunc = fightTimeFunc;
window.rodadasFunc = rodadasFunc;
