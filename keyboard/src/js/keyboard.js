export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  constructor(){
    this.#aasignElement();
    this.#addEvent();
  }

  #aasignElement(){ // 객체 가져오는 함수
    this.#containerEl = document.getElementById('container');
    this.#switchEl = this.#containerEl.querySelector('switch');
    this.#fontSelectEl = this.#containerEl.querySelector('font');
  }
  #addEvent(){ // 이벤트 실행 함수
    this.#switchEl.addEventListener("change", (event) => {
      document.documentElement.setAttribute("theme",event.target.checked ? "dark-mode" : "")
    })
    this.#fontSelectEl.addEventListener("change", (event) => {
      document.body.style.fontFamily = event.target.value;
    })
  }
}