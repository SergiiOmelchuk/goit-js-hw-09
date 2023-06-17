const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timeIntervalId = null;
refs.stopBtn.disabled = true;

const randomColorGen = {
  DELAY: 1000,

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  },

  timeInterval() {
    timeIntervalId = setInterval(() => {
      randomColorGen.changeBgColor();
      console.log(randomColorGen.changeBgColor());
    }, randomColorGen.DELAY);
    refs.stopBtn.disabled = false;
    console.log(`set interval func`);
  },

  start() {
    refs.startBtn.addEventListener('click', () => {
      randomColorGen.timeInterval();
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false;
      console.log(`start function`);
    });
    refs.startBtn.addEventListener('click', randomColorGen.stop);
  },

  stop() {
    clearInterval(timeIntervalId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  },

  changeBgColor() {
    refs.bodyEl.style.backgroundColor = `${randomColorGen.getRandomHexColor()}`;
    console.log(`change bg func`);
  },
};

randomColorGen.start();
