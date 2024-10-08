class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #calenderDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  dataPickerEl;
  dataInputEl;
  calendarEl;
  calendarMonthEl;
  monthContentEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assignElement();
    this.setDateInput();
    this.addEvent();
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calenderDate = {
      data,
      date,
      month,
      year,
    };
  }

  initSelectedDate() {
    this.selectedDate = { ...this.#calenderDate };
  }

  setDateInput() {
    this.dataInputEl.textContent = this.formatDate(this.selectedDate.data);
    this.dataInputEl.dataset.value = this.selectedDate.data;
  }

  assignElement() {
    this.dataPickerEl = document.getElementById('date-picker');
    this.dataInputEl = this.dataPickerEl.querySelector('#date-input');
    this.calendarEl = this.dataPickerEl.querySelector('#calendar');
    this.calendarMonthEl = this.dataPickerEl.querySelector('#month');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    this.dataInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    this.nextBtnEl.addEventListener('click', this.moveToNextMonth.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToPrevMonth.bind(this));
    this.calendarDatesEl.addEventListener(
      'click',
      this.onClickSelectDate.bind(this),
    );
  }

  toggleCalendar() {
    if (this.calendarEl.classList.contains('active')) {
      this.#calenderDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  }

  updateMonth() {
    this.monthContentEl.textContent = `${this.#calenderDate.year} ${
      this.monthData[this.#calenderDate.month]
    }`;
  }

  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.#calenderDate.year,
      this.#calenderDate.month + 1,
      0,
    ).getDate();

    const fragment = new DocumentFragment();

    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }

    fragment.firstChild.style.gridColumnStart =
      new Date(this.#calenderDate.year, this.#calenderDate.month, 1).getDay() +
      1;

    this.calendarDatesEl.appendChild(fragment);
    this.colorSaturday();
    this.colorSunday();
    this.markToday();
    this.markSelectedDate();
  }

  colorSaturday() {
    const saturdayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calenderDate.year, this.#calenderDate.month, 1).getDay()
      })`,
    );

    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue';
    }
  }

  colorSunday() {
    const sundayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        (8 -
          new Date(
            this.#calenderDate.year,
            this.#calenderDate.month,
            1,
          ).getDay()) %
        7
      })`,
    );

    for (let i = 0; i < sundayEls.length; i++) {
      sundayEls[i].style.color = 'red';
    }
  }

  markToday() {
    const currentDate = new Date();
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if (
      currentYear === this.#calenderDate.year &&
      currentMonth === this.#calenderDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${today}']`)
        .classList.add('today');
    }
  }

  markSelectedDate() {
    if (
      this.selectedDate.year === this.#calenderDate.year &&
      this.selectedDate.month === this.#calenderDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add('selected');
    }
  }

  moveToNextMonth() {
    this.#calenderDate.month++;
    if (this.#calenderDate.month > 11) {
      this.#calenderDate.month = 0;
      this.#calenderDate.year++;
    }
    this.updateMonth();
    this.updateDates();
  }

  moveToPrevMonth() {
    this.#calenderDate.month--;
    if (this.#calenderDate.month < 0) {
      this.#calenderDate.month = 11;
      this.#calenderDate.year--;
    }
    this.updateMonth();
    this.updateDates();
  }

  onClickSelectDate(event) {
    const eventTarget = event.target;
    if (eventTarget.dataset.date) {
      this.calendarDatesEl
        .querySelector('.selected')
        ?.classList.remove('selected');
      eventTarget.classList.add('selected');
      this.selectedDate = {
        data: new Date(
          this.#calenderDate.year,
          this.#calenderDate.month,
          eventTarget.dataset.date,
        ),
        date: eventTarget.dataset.date,
        month: this.#calenderDate.month,
        year: this.#calenderDate.year,
      };
      this.setDateInput();
      this.calendarEl.classList.remove('active');
    }
  }

  formatDate(dateData) {
    let date = dateData.getDate();
    if (date < 10) {
      date = `0${date}`;
    }

    let month = dateData.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }

    let year = dateData.getFullYear();
    return `${year}/${month}/${date}`;
  }
}

new DatePicker();
