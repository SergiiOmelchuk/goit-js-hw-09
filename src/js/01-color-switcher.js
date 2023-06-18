const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;
refs.startBtn.addEventListener('click', changeBgColor);
function changeBgColor() {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  refs.startBtn.disabled = true;
}

refs.stopBtn.addEventListener('click', stopChangeBgColor);
function stopChangeBgColor() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
