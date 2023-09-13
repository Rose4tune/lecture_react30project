export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  constructor(){
    this.#aasignElement();
    this.#addEvent();
  }

  #aasignElement(){ // 객체 가져오는 함수
    this.#containerEl = document.getElementById('container');
    this.#switchEl = this.#containerEl.querySelector('#switch');
    this.#fontSelectEl = this.#containerEl.querySelector('#font');
    this.#keyboardEl = this.#containerEl.querySelector('#keyboard');
    this.#inputGroupEl = this.#containerEl.querySelector('#input-group');
    this.#inputEl = this.#inputGroupEl.querySelector('#input');
  }
  #addEvent(){ // 이벤트 실행 함수
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", (event)=> {
      this.#inputGroupEl.classList.toggle("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key))
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add('active');
    });
    document.addEventListener("keyup", (event)=> {
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove('active');
    });
    this.#inputEl.addEventListener("input", (event) => {
      this.#inputEl.value = this.#inputEl.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
      
    })
  }
  #onChangeTheme(event){
    document.documentElement.setAttribute("theme", event.target.checked ? "dark-mode" : "");
  }
  #onChangeFont(event){
    document.body.style.fontFamily = event.target.value;
  }
}