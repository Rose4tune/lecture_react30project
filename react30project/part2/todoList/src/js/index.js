import "@fortawesome/fontawesome-free/js/all.min.js";
import "../scss/style.scss";

class Router {
  routes = [];
  notFoundCallback = () => {}

  addRoute(url, callback) {
    this.routes.push({
      url,
      callback,
    });
    return this
  }

  checkRoute() {
    const currentRoute = this.routes.find((route) =>
      route.url === window.location.hash
    );

    if(!currentRoute) {
      this.notFoundCallback();
      return
    }

    currentRoute.callback();
  }

  init() {
    window.addEventListener('hashchange', this.checkRoute.bind(this));
    if(!window.location.hash) {
      window.location.hash = '#/';
    }
    this.checkRoute();
  }

  setNotFound(callback) {
    this.notFoundCallback = callback;
    return this
  }
}

class Storage {
  saveTodo(id, todoContent) {
    const todosData = this.getTodos();
    todosData.push({id, content: todoContent, status: 'TODO'});
    localStorage.setItem('todos', JSON.stringify(todosData));
  }
  editTodo() {}
  deletTodo() {}
  getTodos() {
    return localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'))
  }
}

class TodoList {
  constructor(storage) {
    this.initStorage(storage);
    this.assingElement();
    this.addEvent();
    this.loadSavedData();
  }

  initStorage(storage) {
    this.storage = storage;
  }

  assingElement(){
    this.inputContainerEl = document.getElementById('input-container');
    this.inputAreaEl = this.inputContainerEl.querySelector('#input-area');
    this.todoInputEl = this.inputAreaEl.querySelector('#todo-input');
    this.addBtnEl = this.inputAreaEl.querySelector('#add-btn');

    this.redioAreaEl = this.inputContainerEl.querySelector('#radio-area');
    this.filterRadioBtnEls = this.redioAreaEl.querySelectorAll('input[name="filter"]');

    this.todoContainer = document.getElementById('todo-container');
    this.todoListEl = this.todoContainer.querySelector('#todo-list');
  }

  addEvent(){
    this.addBtnEl.addEventListener('click', this.onClickAddBtn.bind(this));
    this.todoListEl.addEventListener('click', this.onClickTodoList.bind(this));
    this.addRadioBtnEvent();
  }

  loadSavedData() {
    const todosData = this.storage.getTodos();
    for (const todoData of todosData) {
      const {id, content, status} = todoData;
      this.createTodoElement(id, content, status);
    }
  }

  addRadioBtnEvent() {
    for (const filterRadioBtnEl of this.filterRadioBtnEls) {
      filterRadioBtnEl.addEventListener('click', this.onClickRadioBtn.bind(this))
    }
  }

  onClickRadioBtn(event) {
    const { value } = event.target;
    window.location.href = `#/${value.toLowerCase()}`;
  }

  filterTodo(status) {
    const todoDivEls = this.todoListEl.querySelectorAll('div.todo');

    for (const todoDivEl of todoDivEls) {
      switch (status) {
        case 'ALL':
          todoDivEl.style.display = 'flex';
          break;

        case 'DONE':
          todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'flex' : 'none';
          break;

        case 'TODO':
          todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'none' : 'flex';
          break;
      
        default:
          break;
      }
    }
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
    if(this.todoInputEl.value.length === 0) {
      alert('내용을 입력해주세요');
      return;
    }
    const id = Date.now();
    this.storage.saveTodo(id, this.todoInputEl.value);
    this.createTodoElement(id, this.todoInputEl.value);
  }

  createTodoElement(id, value, status = null) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    if(status === 'DONE') {
      todoDiv.classList.add('done');
    }

    todoDiv.dataset.id = id;

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
  const router = new Router();
  const todoList = new TodoList(new Storage);

  const routeCallback = (status) => () => {
    todoList.filterTodo(status);
    document.querySelector(
      `input[type='radio'][value='${status}']`
    ).checked = true;
  }

  router
    .addRoute('#/all', routeCallback('ALL'))
    .addRoute('#/todo', routeCallback('TODO'))
    .addRoute('#/done', routeCallback('DONE'))
    .setNotFound(routeCallback('ALL'))
    .init();
})