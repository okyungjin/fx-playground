import { go, strMap, tap, each, delay } from 'fxjs';
import { $qs, $find, $el, $prependTo, $appendTo, $remove, $on, $delegate, $children, $toggleClass, $setVal, $closest } from 'fxdom';
import { fetchTodos, createTodo, deleteTodo } from './api';

const tmpl = todos => `
  <main>
    <h1>TODO</h1>
    <form class="todo-form">
      <div class="input-field">
        <input 
          type="text"
          id="input--add"
          class="input"
          placeholder="Enter todo"
          autocomplete="off"
        />
        <label for="input--add"></label>
      </div>
      <input type="submit" class="button button--add" value="Add" />
    </form>
    <ul class="todo-list">
      ${strMap(Todo.tmpl, todos)}
    </ul>
  </main>
`;

const Todo = {};

Todo.tmpl = (todo) => `
  <li class="todo-list__item" data-todo-id=${todo.id}>
    <span class="todo-list__item__title">${todo.title}</span>
    <input class="input input--todo hidden" type="text" value="${todo.title}">
    <button class="button button--todo button--edit">Edit</button>
    <button class="button button--todo button--save hidden">Save</button>
    <button class="button button--todo button--delete">Delete</button>
  </li>`;
  
Todo.addEvents = () => go(
  $qs('main'),
  $on('submit', e => {
    e.preventDefault();
    go(
      $qs('#input--add'),
      // TODO: api call을 이 레벨에 적는 건 어떤지?
      tap(el => addTodo(el.value)),
      $setVal(''),
    );
  }),
  $delegate('click', '.button--edit', ({ currentTarget }) => {
    go(
      currentTarget,
      $closest('.todo-list__item'),
      $children,
      each($toggleClass('hidden'))
    );
  }),
  $delegate('click', '.button--save', ({ currentTarget }) => {
    go(
      currentTarget,
      $closest('.todo-list__item'),
      tap(go(
        $find('.input--todo'),
      )),
      $children,
      each($toggleClass('hidden')),
      tap(_ => console.log('PUT /todos/${todoId}')),
    );
  }),
  $delegate('click', '.button--delete', ({ currentTarget }) => {
    go(
      currentTarget,
      $closest('.todo-list__item'),
      tap(({ dataset }) => deleteTodo(parseInt(dataset.todoId))),
      $remove,
    );
  })
);

go(
  fetchTodos(),
  tmpl,
  $el,
  $appendTo($qs('body')),
  Todo.addEvents,
);

function addTodo(newTodo) {
  if (!newTodo) shakeElement('.todo-form');
  else go(
    createTodo(title),
    Todo.tmpl,
    $el,
    $prependTo($qs('.todo-list')),
  );
}

function shakeElement(sel) {
  const SAHKE_HORIZONTAL = 'shake-horizontal';
  go(
    $qs(sel),
    $toggleClass(SAHKE_HORIZONTAL),
    delay(500, $toggleClass(SAHKE_HORIZONTAL))
  );
}

// 고민해봐야 하는 부분
// 1. Create 하거나 했을 때 내 데이터를 어떻게 업데이트 시킬 것인가?
// 2. 초기에 Fetch해온 데이터만 가지고 있는 것이 좋은가?
