import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('.value[data-days]'),
  spanHours: document.querySelector('.value[data-hours]'),
  spanMinutes: document.querySelector('.value[data-minutes]'),
  spanSeconds: document.querySelector('.value[data-seconds]'),
};
let timerId = null;

refs.startBtnEl.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      return;
    }
    refs.startBtnEl.removeAttribute('disabled');

    const startTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      refs.spanDays.textContent = days;
      refs.spanHours.textContent = addLeadingZero(hours);
      refs.spanMinutes.textContent = addLeadingZero(minutes);
      refs.spanSeconds.textContent = addLeadingZero(seconds);

      if (
        refs.spanDays.textContent === '0' &&
        refs.spanHours.textContent === '00' &&
        refs.spanMinutes.textContent === '00' &&
        refs.spanSeconds.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      startTimer();
      timerId = setInterval(startTimer, 1000);
    };

    refs.startBtnEl.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });
