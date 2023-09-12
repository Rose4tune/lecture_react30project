export class Keyboard {
  #switchEl;
  constructor(){
    this.#aasignElement();
    this.#addEvent();
  }

  #aasignElement(){ // 객체 가져오는 함수
    this.#switchEl = document.getElementById('switch');
  }
  #addEvent(){ // 이벤트 실행 함수
    this.#switchEl.addEventListener("change", (event) => {
      document.documentElement.setAttribute("theme",event.target.checked ? "dark-mode" : "")
    })
  }
}