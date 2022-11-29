import { go, strMap, tap, each, delay } from 'fxjs';
import { $qs, $find, $el, $appendTo, $remove, $on, $delegate, $children, $toggleClass, $setVal, $closest } from 'fxdom';

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
Todo.list = () => ['A', 'B', 'C'];
Todo.tmpl = (todo) => `
  <li class="todo-list__item">
    <span class="todo-list__item__title">${todo}</span>
    <input class="input input--todo hidden" type="text" value="${todo}">
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
  })
);

go(
  tmpl(Todo.list()),
  $el,
  $appendTo($qs('body')),
  Todo.addEvents,
);

function addTodo(newTodo) {
  if (!newTodo) shakeElement('.todo-form');
  else go(
    Todo.tmpl(newTodo),
    $el,
    $appendTo($qs('.todo-list')),
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
