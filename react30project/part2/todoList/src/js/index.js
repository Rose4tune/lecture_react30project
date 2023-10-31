import "@fortawesome/fontawesome-free/js/all.min.js";
import "../scss/style.scss";

class TodoList {
  constructor() {
    this.assingElement()
    this.addEvent()
  }

  assingElement(){
    this.inputContainerEl = document.getElementById('input-container');
    this.inputAreaEl = this.inputContainerEl.querySelector('#input-area');
    this.todoInputEl = this.inputAreaEl.querySelector('#todo-input');
    this.addBtnEl = this.inputAreaEl.querySelector('#add-btn');

    this.todoContainer = document.getElementById('todo-container');
    this.todoListEl = this.todoContainer.querySelector('#todo-list');
  }
  addEvent(){
    this.addBtnEl.addEventListener('click', this.onClickAddBtn.bind(this));
    this.todoListEl.addEventListener('click', this.onClickTodoList.bind(this));
  }

  onClickTodoList(event) {
    const {target} = event;
    const btn = target.closest('button');

    if(!btn) return;

    if(btn.matches('#delete-btn')) {
      this.deleteTodo(target);

    } else if(btn.matches('#edit-btn')) {
      this.editTodo(target);

    } else if(btn.matches('#save-btn')) {
      this.saveTodo(target);

    } else if(btn.matches('#complete-btn')) {
      this.completeTodo(target);

    }
  }

  deleteTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.addEventListener('transitionend', () => {
      todoDiv.remove();
    })
    todoDiv.classList.add('delete');
  }

  editTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.add('edit');

    const todoInputEl = todoDiv.querySelector('input');
    todoInputEl.readOnly = false;
    todoInputEl.focus();
  }

  saveTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.remove('edit');

    const todoInputEl = todoDiv.querySelector('input');
    todoInputEl.readOnly = true;
  }

  completeTodo(target) {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.toggle('done');
  }

  onClickAddBtn(){
    if(this.todoInputEl.value.length === 0) { alert('내용을 입력해주세요'); return; }
    this.createTodoElement(this.todoInputEl.value);
  }

  createTodoElement(value) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoContent = document.createElement('input');
    todoContent.value = value;
    todoContent.readOnly = true;
    todoContent.classList.add('todo-item');

    const fragment = new DocumentFragment();
    fragment.appendChild(todoContent);
    fragment.appendChild(
      this.createBtn('complete-btn', 'complete-btn', ['fas', 'fa-check'])
    );
    fragment.appendChild(
      this.createBtn('edit-btn', 'edit-btn', ['fas', 'fa-edit'])
    );
    fragment.appendChild(
      this.createBtn('delete-btn', 'delete-btn', ['fas', 'fa-trash'])
    );
    fragment.appendChild(
      this.createBtn('save-btn', 'save-btn', ['fas', 'fa-save'])
    );

    todoDiv.appendChild(fragment);
    this.todoListEl.appendChild(todoDiv);
    this.todoInputEl.value = '';
  }

  createBtn(btnId, btnClassName, iconClassName) {
    const btn = document.createElement('button');
    const icon = document.createElement('i');

    icon.classList.add(...iconClassName);

    btn.appendChild(icon)
    btn.id = btnId;
    btn.classList.add(btnClassName);
    return btn
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoList = new TodoList();
})