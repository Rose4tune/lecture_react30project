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
    'December'
  ];

  #calenderDate = {
    data:'',
    date:0,
    month:0,
    year:0,
  };

  selectedDate = {
    data:'',
    date:0,
    month:0,
    year:0,
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
    this.assignElement();
    this.addEvent();
  }

  // 날짜정보 초기화
  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calenderDate = {
      data,
      date,
      month,
      year
    }
  }

  assignElement(){
    this.dataPickerEl = document.getElementById('date-picker')
    this.dataInputEl = this.dataPickerEl.querySelector('#date-input')
    this.calendarEl = this.dataPickerEl.querySelector('#calendar');
    this.calendarMonthEl = this.dataPickerEl.querySelector('#month');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates')
  }

  addEvent() {
    this.dataInputEl.addEventListener('click', this.toggleCalendar.bind(this))
  }

  toggleCalendar() {
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  }

  updateMonth() {
    this.monthContentEl.textContent = `${this.#calenderDate.year} ${this.monthData[this.#calenderDate.month]}`
  }

  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.#calenderDate.year,
      this.#calenderDate.month + 1,
      0
    ).getDate();

    const fragment = new DocumentFragment();

    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }

    this.calendarDatesEl.appendChild(fragment)
  }
}

new DatePicker();