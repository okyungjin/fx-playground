import { } from 'fxjs';
import { } from 'fxdom';

const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo-item');
const todoItemCheckbox = document.querySelector('.todo-item > input');
const todoAddBtn = document.querySelector('.todo-add-btn');

const convertTmplToElem = tmpl => {
  const wrap = document.createElement('div');
  wrap.innerHTML = tmpl;
  return wrap.children[0];
}

const createNewTodoByName = todoName => {
  if (!todoName) {
    alert('Todo name is required.');
    return;
  }

  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.addEventListener('click', toggleTodoItem);

  const span = document.createElement('span');
  span.innerHTML = todoName;

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('click', () => {
    input.checked = !input.checked;
  });

  li.appendChild(span);
  li.appendChild(input);
  todoList.appendChild(li);
}

const clearTodoInput = () => {
  todoInput.value = '';
}

const focusOnTodoInput = () => {
  todoInput.focus();
}

todoAddBtn.addEventListener('click', e => {
  e.preventDefault();
  createNewTodoByName(todoInput.value);
  clearTodoInput();
  focusOnTodoInput();
});

const toggleTodoItem = ({ currentTarget: ct }) => {
  ct.classList.toggle('done');
  const curCheckbox = ct.querySelector('input[type="checkbox"]');
  curCheckbox.checked = !curCheckbox.checked;
};
