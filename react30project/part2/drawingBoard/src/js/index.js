class DrawingBoard {
  MODE = "NONE"; // NONE BRUSH ERASER

  constructor() {
    this.assingElement();
    this.initContext();
    this.addEvent();
  }
  assingElement() {
    this.containerEl = document.getElementById('container');
    this.canvasEl = this.containerEl.querySelector('#canvas');
    this.toolbarEl = this.containerEl.querySelector('#toolbar');
    this.brushEl = this.toolbarEl.querySelector('#brush');
  }
  initContext() {
    this.context = this.canvasEl.getContext("2d");
  }
  addEvent() {
    this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
  }
  onClickBrush(event) {
    const IsActive = event.currentTarget.classList.contains('active')
    this.MODE = IsActive ? "NONE" : "BRUSH";
    this.canvasEl.style.cursor = IsActive ? "default" : "crosshair";
    this.brushEl.classList.toggle("active");
  }
}

new DrawingBoard()