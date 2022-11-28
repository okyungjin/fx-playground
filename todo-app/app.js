import { go, strMap, tap, each, delay } from 'fxjs';
import { $qs, $find, $el, $els, $appendTo, $remove, $on, $delegate, $children, $toggleClass, $setVal, $closest } from 'fxdom';

go(
  $qs('main'),
  $on('submit', e => {
    e.preventDefault();
    go(
      $qs('#input--add'),
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
      each($toggleClass('hidden'))
    );
  }),
  $delegate('click', '.button--delete', ({ currentTarget }) => {
    go(
      currentTarget,
      $closest('.todo-list__item'),
      $remove,
    );
  }),
);

const Todo = {};
Todo.list = () => ['A', 'B', 'C'];
Todo.tmpl = (todo) => `
  <li class="todo-list__item">
    <span class="todo-list__item__title">${todo}</span>
    <input class="input input--todo hidden" type="text" value="${todo}">
    <button class="button button--todo button--edit">Edit</button>
    <button class="button button--todo button--save hidden">Save</button>
    <button class="button button--todo button--delete">Delete</button>
  </li>`;

go(
  Todo.list(),
  strMap(Todo.tmpl),
  $els,
  each($appendTo($qs('.todo-list'))),
);

function addTodo(newTodo) {
  if (!newTodo) shakeInputIfValueIsEmpty();
  else go(
    Todo.tmpl(newTodo),
    $el,
    $appendTo($qs('.todo-list')),
  );
}

function shakeInputIfValueIsEmpty() {
  const SAHKE_HORIZONTAL = 'shake-horizontal';
  go(
    $qs('.todo-form'),
    $toggleClass(SAHKE_HORIZONTAL),
    delay(500, $toggleClass(SAHKE_HORIZONTAL))
  );
}
