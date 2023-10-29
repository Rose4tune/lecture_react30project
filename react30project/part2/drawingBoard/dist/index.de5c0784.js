class DrawingBoard {
    MODE = "NONE";
    IsMouseDown = false;
    eraserColor = "#fff";
    backgroundColor = "#fff";
    IsNavigatorVisible = false;
    undoArray = [];
    constructor(){
        this.assingElement();
        this.initContext();
        this.initCanvasBackgroundColor();
        this.addEvent();
    }
    assingElement() {
        this.containerEl = document.getElementById("container");
        this.canvasEl = this.containerEl.querySelector("#canvas");
        this.toolbarEl = this.containerEl.querySelector("#toolbar");
        this.brushEl = this.toolbarEl.querySelector("#brush");
        this.colorPickerEl = this.toolbarEl.querySelector("#colorPicker");
        this.brushPanelEl = this.containerEl.querySelector("#brushPanel");
        this.brushSliderEl = this.brushPanelEl.querySelector("#brushSize");
        this.brushSizePreviewEl = this.brushPanelEl.querySelector("#brushSizePreview");
        this.eraserEl = this.toolbarEl.querySelector("#eraser");
        this.navigatorEl = this.toolbarEl.querySelector("#navigator");
        this.navigatorImageContainerEl = this.containerEl.querySelector("#imgNav");
        this.navigatorImageEl = this.containerEl.querySelector("#canvasImg");
        this.undoEl = this.toolbarEl.querySelector("#undo");
        this.clearEl = this.toolbarEl.querySelector("#clear");
    }
    initContext() {
        this.context = this.canvasEl.getContext("2d");
    }
    initCanvasBackgroundColor() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }
    addEvent() {
        this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
        this.canvasEl.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvasEl.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvasEl.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvasEl.addEventListener("mouseout", this.onMouseOut.bind(this));
        this.brushSliderEl.addEventListener("input", this.onChangeBrushsize.bind(this));
        this.colorPickerEl.addEventListener("input", this.onChangeColor.bind(this));
        this.eraserEl.addEventListener("click", this.onClickEraser.bind(this));
        this.navigatorEl.addEventListener("click", this.onClickNavigator.bind(this));
        this.undoEl.addEventListener("click", this.onClickUndo.bind(this));
        this.clearEl.addEventListener("click", this.onClickClear.bind(this));
    }
    onClickClear() {
        this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.undoArray = [];
        this.updateNavigator();
        this.initCanvasBackgroundColor();
    }
    onClickUndo() {
        if (this.undoArray.length === 0) {
            alert("\uB354 \uC774\uC0C1 \uC2E4\uD589\uCDE8\uC18C \uBD88\uAC00");
            return;
        }
        let previousDataUrl = this.undoArray.pop();
        let previousImage = new Image();
        previousImage.onload = ()=>{
            this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.context.drawImage(previousImage, 0, 0, this.canvasEl.width, this.canvasEl.height, 0, 0, this.canvasEl.width, this.canvasEl.height);
        };
        previousImage.src = previousDataUrl;
    }
    saveState() {
        if (this.undoArray.length > 4) {
            this.undoArray.shift();
            this.undoArray.push(this.canvasEl.toDataURL());
        } else this.undoArray.push(this.canvasEl.toDataURL());
    }
    onClickNavigator(event1) {
        this.IsNavigatorVisible = !event1.currentTarget.classList.contains("active");
        event1.currentTarget.classList.toggle("active");
        this.navigatorImageContainerEl.classList.toggle("hide");
        this.updateNavigator();
    }
    updateNavigator() {
        if (!this.IsNavigatorVisible) return;
        this.navigatorImageEl.src = this.canvasEl.toDataURL();
    }
    onClickEraser(event1) {
        const IsActive = event1.currentTarget.classList.contains("active");
        this.MODE = IsActive ? "NONE" : "ERASER";
        this.canvasEl.style.cursor = IsActive ? "default" : "crosshair";
        this.brushPanelEl.classList.add("hide");
        event1.currentTarget.classList.remove("active");
        this.eraserEl.classList.toggle("active");
    }
    onChangeColor(event1) {
        console.log(this.brushSizePreviewEl);
        this.brushSizePreviewEl.style.background = event1.target.value;
    }
    onChangeBrushsize(event1) {
        this.brushSizePreviewEl.style.width = `${event1.target.value}px`;
        this.brushSizePreviewEl.style.height = `${event1.target.value}px`;
    }
    onMouseDown(event1) {
        if (this.MODE === "NONE") return;
        this.IsMouseDown = true;
        const currentPosition = this.getMousePosition(event1);
        this.context.beginPath();
        this.context.moveTo(currentPosition.x, currentPosition.y);
        this.context.lineCap = "round";
        if (this.MODE === "BRUSH") {
            this.context.strokeStyle = this.colorPickerEl.value;
            this.context.lineWidth = this.brushSliderEl.value;
        } else if (this.MODE === "ERASER") {
            this.context.strokeStyle = this.eraserColor;
            this.context.lineWidth = 50;
        }
        this.saveState();
    }
    onMouseMove(event1) {
        if (!this.IsMouseDown) return;
        const currentPosition = this.getMousePosition(event1);
        this.context.lineTo(currentPosition.x, currentPosition.y);
        this.context.stroke();
    }
    onMouseUp() {
        if (this.MODE === "NONE") return;
        this.IsMouseDown = false;
        this.updateNavigator();
    }
    onMouseOut() {
        if (this.MODE === "NONE") return;
        this.IsMouseDown = false;
        this.updateNavigator();
    }
    getMousePosition() {
        const boundaries = this.canvasEl.getBoundingClientRect();
        return {
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top
        };
    }
    onClickBrush(event1) {
        const IsActive = event1.currentTarget.classList.contains("active");
        this.MODE = IsActive ? "NONE" : "BRUSH";
        this.canvasEl.style.cursor = IsActive ? "default" : "crosshair";
        this.brushPanelEl.classList.toggle("hide");
        event1.currentTarget.classList.toggle("active");
        this.eraserEl.classList.remove("active");
    }
}
new DrawingBoard();

//# sourceMappingURL=index.de5c0784.js.map
