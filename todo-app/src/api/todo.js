import { $get, $post, $del } from 'fxdom';
import { curry, defaults, go } from 'fxjs';

const $patch = curry((url, data, headers) => go(
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: defaults({
      'Content-type': 'application/json; charset=UTF-8'
    }, headers),
  }),
  resJSON,
));

const resJSON = (res) => res.ok ? res.json() : go(res.json(), (v) => Promise.reject(v));

const API_URI = 'https://jsonplaceholder.typicode.com';
const fakeData = {
  userId: 1,
  body: '',
};

const fetchTodos = ({ offset = 0, limit = 10 } = {}) => 
  $get(`${API_URI}/todos`, { _start: offset, _limit: limit });

// jsonplaceholder api에 create, delete, update가 실제로 동작하는 것은 아니라서,
// id가 중복되는 것을 방지하기 위해 추가함.
let todoCount = 200;
const createTodo = (title) => 
  $post(`${API_URI}/todos`, {
    title,
    userId: fakeData.userId,
    body: fakeData.body,
  }).then(res => ({ ...res, id: ++todoCount }));

const deleteTodo = (todoId) =>
  $del(`${API_URI}/todos/${todoId}`, undefined);

const updateTodo = ({ todoId, title }) => 
  $patch(`${API_URI}/todos/${todoId}`, { title });

export default {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};