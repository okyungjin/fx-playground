import { go, pipe, strMap, tap, each } from 'fxjs';
import { $qs, $find, $el, $prependTo, $appendTo, $on, $delegate, 
  $children, $toggleClass, $setVal, $closest, $val, $replaceAll, $remove } from 'fxdom';
import TodoApi from './api/todo';
import UiHelper from './helper/ui';

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
  
Todo.addEvents = pipe(
  $delegate('click', '.button--edit', ({ currentTarget }) => {
    go(
      currentTarget,
      $closest('.todo-list__item'),
      $children,
      each($toggleClass('hidden'))
    );
  }),
  $delegate('click', '.button--save', ({ currentTarget }) => {
    const todoItem = $closest('.todo-list__item', currentTarget);
    const newTodo = go(
      todoItem,
      $find('.input--todo'),
      $val,
      title => ({ id: parseInt(todoItem.dataset.todoId), title })
    );
    go(
      newTodo,
      TodoApi.updateTodo,
      Todo.tmpl,
      $el,
      $replaceAll(todoItem)
    );
  }),
  $delegate('click', '.button--delete', async ({ currentTarget }) => {
    await UiHelper.confirm('정말 삭제하시겠습니까?') && 
      go(
        currentTarget,
        $closest('.todo-list__item'),
        tap(({ dataset }) => TodoApi.deleteTodo(parseInt(dataset.todoId))),
        $remove);
  }),
  pipe(
    $find('.todo-form'),
    $on('submit', e => {
      e.preventDefault();
      const addInput = $qs('#input--add');
      const title = addInput.value;

      if (!title) {
        UiHelper.shakeElement($qs('.todo-form'));
        return;
      }

      go(
        title,
        TodoApi.createTodo,
        Todo.tmpl,
        $el,
        $prependTo($qs('.todo-list')),
        tap(_ => $setVal('', addInput))
      );
    }),
  ),
);

go(
  TodoApi.fetchTodos(),
  tmpl,
  $el,
  $appendTo($qs('body')),
  Todo.addEvents,
);

