import { go, pipe, strMap, tap, each } from 'fxjs';
import { $qs, $find, $el, $prependTo, $appendTo, $on, $delegate, $text, $children,
  $toggleClass, $setVal, $closest, $val, $replaceAll, $remove, $hasClass } from 'fxdom';
import TodoApi from './api/todo';
import UiHelper from './helper/ui';

const tmpl = todos => `
  <main>
    <button type="button" id="show">Show success toast</button>
    <h1>TODO</h1>
    <form class="todo-form">
      <div class="input-field">
        <input 
          type="text"
          id="input--add"
          placeholder="Enter todo"
          autocomplete="off"
        />
        <label for="input--add"></label>
      </div>
      <input type="submit" class="button--add" value="Add" />
    </form>
    <ul class="todo-list">
      ${strMap(Todo.tmpl, todos)}
    </ul>
  </main>
`;

const Todo = {};

Todo.tmpl = (todo) => `
  <li class="todo-list__item ${todo.completed ? 'completed' : ''}" data-todo-id=${todo.id}">
    <input type="checkbox" id="todo${todo.id}" class="todo__completed" ${todo.completed ? 'checked' : '' }/>
    <label for="todo${todo.id}" class="todo__title">${todo.title}</label>
    <input class="input--todo hidden" type="text" value="${todo.title}">
    <button class="button--todo button--edit">Edit</button>
    <button class="button--todo button--save hidden">Save</button>
    <button class="button--todo button--delete">Delete</button>
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
      title => ({
        todoId: parseInt(todoItem.dataset.todoId),
        title,
        completed: $hasClass('completed', todoItem)
      }),
    );

    // TODO: 이런 검사 로직은 어떻게 넣으면 좋을지 고민해보기
    if (!newTodo.todoId) throw new Error();

    // TODO: 오류가 발생하면 loading이 중단되고 toast message로 유저에게 알려주기
    UiHelper.loading(go(
      newTodo,
      TodoApi.updateTodo,
      Todo.tmpl,
      $el,
      $replaceAll(todoItem)
    ));
  }),
  $delegate('click', '.button--delete', async ({ currentTarget }) => {
    await UiHelper.confirm('정말 삭제하시겠습니까?') && 
      UiHelper.loading(go(
        currentTarget,
        $closest('.todo-list__item'),
        tap(({ dataset }) => TodoApi.deleteTodo(parseInt(dataset.todoId))),
        $remove)
      );
  }),
  $delegate('change', '.todo__completed', ({ target }) => {
    const todoItem = $closest('.todo-list__item', target);
    const todoToUpdate = {
      todoId: parseInt(todoItem.dataset.todoId),
      title: $text($find('.todo__title', todoItem)),
      completed: !$hasClass('completed', todoItem)
    };

    go(
      todoItem,
      $toggleClass('completed'),
      tap(_ => go(
        todoToUpdate,
        TodoApi.updateTodo,
      )),
    );
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

      UiHelper.loading(go(
        title,
        TodoApi.createTodo,
        Todo.tmpl,
        $el,
        $prependTo($qs('.todo-list')),
        tap(_ => $setVal('', addInput))
      ));
    }),
  ),
);

UiHelper.loading(go(
  TodoApi.fetchTodos(),
  tmpl,
  $el,
  $appendTo($qs('body')),
  Todo.addEvents,
  tap(_ => {
      const addShowToastEvent = $on('click', (e) => {
        UiHelper.toast('success', 3000, 'This is title', 'This is message');
      });
      const btn = $qs('#show');
      addShowToastEvent(btn);
      console.log(btn)
    }
  ))
);



