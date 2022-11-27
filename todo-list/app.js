import { go, strMap, each, map, tap, curry, pipe } from 'fxjs';
import { $qs, $qsa, $el, $els, $find, $appendTo, $remove, $on, $trigger } from 'fxdom';

const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add-btn');

const Todo = {};
Todo.list = [];
Todo.tmpl = todos => `
  <ul class="todo-list">
    ${strMap(todo => `
      <li class="todo-item">
        <span>${todo.title}</span>
        <input type="checkbox" />
      </li>`, todos)}
  </ul>
`;
Todo.render = todos => go(
  todos,
  Todo.tmpl,
  $el,
  tap(() => each($remove, $qsa('.todo-list'))),
  $appendTo($qs('.todo-container')),
);

const createNewTodoByName = todoName => {
  if (!todoName) {
    alert('Todo name is required.');
    return;
  }

  const newTodo = { id: Date.now(), title: todoName };
  Todo.list = [newTodo, ...Todo.list];
  Todo.render(Todo.list);
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
