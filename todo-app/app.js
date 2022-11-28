const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('input');
const todoCollection = document.querySelector('.todo-list');

todoForm.addEventListener('submit', addTodo);

function addTodo(e) {
  if (!todoInput.value) {
    shakeInputIfValueIsEmpty();
    return;
  }

  else {
    // create elements
    const li = document.createElement('li');
    const todoTitle = document.createElement('span');
    const editableInput = document.createElement('input');
    const editButton = document.createElement('button');
    const saveButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    li.classList.add('todo-list__item');

    todoTitle.classList.add('todo-list__item__title');
    todoTitle.innerText = todoInput.value;

    editableInput.classList.add('input');
    editableInput.classList.add('input--todo');
    editableInput.classList.add('hidden');
    editableInput.type = 'text';
    editableInput.value = todoInput.value;

    editButton.classList.add('button');
    editButton.classList.add('button--todo');
    editButton.classList.add('button--edit');
    editButton.innerText = 'Edit';

    saveButton.classList.add('button');
    saveButton.classList.add('button--todo');
    saveButton.classList.add('button--save');
    saveButton.classList.add('hidden');
    saveButton.innerText = 'Save';

    deleteButton.classList.add('button');
    deleteButton.classList.add('button--todo');
    deleteButton.classList.add('button--delete');
    deleteButton.innerText = 'Delete';

    // add elements to todo list
    li.appendChild(todoTitle);
    li.appendChild(editableInput);
    li.appendChild(editButton);
    li.appendChild(saveButton);
    li.appendChild(deleteButton);
    todoCollection.appendChild(li);

    function toggleTodoEditForm() {
      todoTitle.classList.toggle('hidden');
      editableInput.classList.toggle('hidden');
      editButton.classList.toggle('hidden');
      saveButton.classList.toggle('hidden');
    }

    // button event listeners
    editButton.addEventListener('click', () => {
      toggleTodoEditForm();
      editableInput.focus();
    });

    saveButton.addEventListener('click', () => {
      todoTitle.innerText = editableInput.value;
      toggleTodoEditForm();
    });

    deleteButton.addEventListener('click', () => {
      setTimeout(() => {
        todoCollection.removeChild(li);
      }, 100);
    });
  }
  // clear input
  todoInput.value = '';

  e.preventDefault();
}

function shakeInputIfValueIsEmpty() {
  const SAHKE_HORIZONTAL = 'shake-horizontal';
  todoForm.classList.toggle(SAHKE_HORIZONTAL);
  setTimeout(() => todoForm.classList.toggle(SAHKE_HORIZONTAL), 500);
}
