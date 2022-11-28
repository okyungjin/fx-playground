import { go, strMap, each, map, tap, curry, pipe } from 'fxjs';
import { $qs, $qsa, $el, $els, $find, $appendTo, $remove, $on, $trigger, $delegate, $setAttr, $closest } from 'fxdom';

const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add-btn');

const Todo = {};
Todo.list = [
  { id: 1, title: 'Todo 1', done: true },
  { id: 2, title: 'Todo 2', done: false },
];

// [

//   { id: 1, title: 'Todo 1', done: false },
//   { id: 2, title: 'Todo 2', done: true },
// ];
Todo.tmpl = todos => `
  <ul class="todo-list">
    ${strMap(todo => `
      <li class="todo-item" data-todo-id="${todo.id}">
        <input
          type="checkbox"
          id=${todo.id}
          name="${todo.title}"
          ${todo.done ? 'checked' : ''}
        />
        <label for=${todo.id}>${todo.title}</label>
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
Todo.render(Todo.list);

// go(
//   $qs('.todo-container'),
//   $delegate('click', '.todo-item', e => {
//     const id = parseInt($find('input', e.currentTarget).id);
//     if (!id) return;
//     const idx = Todo.list.findIndex(todo => todo.id === id);
//     Todo.list[idx].checked = !Todo.list[idx].checked
//     $setAttr({ done: true }, e.currentTarget);
//   })
// );

$qs('.todo-container')
  .addEventListener('click', (e) => {
    const todoItem = $closest('.todo-item', e.target);

    if (todoItem) {
      const todoId = parseInt(todoItem.dataset.todoId);

      const input = $find('input', todoItem);
      input.checked = !input.checked;
      

      console.log(todoId);
    }
      

    



    // Todo.list.set(todoId, 1);
    // console.log(Todo.list);
  });


// $qs('.todo-container').onclick = ({ target }) => {
//   const todoItem = target.closest('.todo-item');
//   if (!todoItem) return;

  // const { todoId } = todoItem.dataset;
  
  
//   if (Todo.list[idx].checked) {
//     todoItem.classList.add('done'); 
//   }
//   else
//     todoItem.classList.remove('done');

//   const todoCheckbox = $find('input[type="checkbox"]', todoItem);
//   console.log(todoCheckbox.checked)
//   todoCheckbox.checked = !todoCheckbox.checked
// }

const createNewTodoByName = todoName => {
  if (!todoName) {
    alert('Todo name is required.');
    return;
  }

  const newTodo = { 
    id: Date.now(),
    title: todoName,
    done: false,
  };
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
