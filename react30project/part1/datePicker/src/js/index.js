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
  }
}

new DatePicker();