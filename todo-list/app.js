import { } from 'fxjs';
import { $, $el, $find } from 'fxdom';

const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo-item');
const todoItemCheckbox = document.querySelector('.todo-item > input');
const todoAddBtn = document.querySelector('.todo-add-btn');

const createNewTodoByName = todoName => {
  if (!todoName) {
    alert('Todo name is required.');
    return;
  }

  const li = $el(`
    <li class="todo-item">
      <span>${todoName}</span>
      <input type="checkbox" />
    </li>
  `);
  li.addEventListener('click', toggleTodoItem);
  
  const input = $find('input[type="checkbox"]', li);
  input.addEventListener('click', () => {
    input.checked = !input.checked;
  });
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
