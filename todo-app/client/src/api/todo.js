import axios from 'axios';

const API_URL = 'http://localhost:3000/api'
axios.defaults.baseURL = API_URL;

const fetchTodos = ({ offset = 0, limit = 10 } = {}) =>
  axios.get('/v1/todos').then(({ data }) => data);

const createTodo = (title) =>
  axios.post('/v1/todos', {
    title,
    body: '',
  }).then(({ data }) => data);

const deleteTodo = (todoId) =>
  axios.delete(`/v1/todos/${todoId}`).then(({ data }) => data);

const updateTodo = ({ todoId, title, completed }) =>
  axios.put(`/v1/todos/${todoId}`, {
    id: todoId,
    title,
    completed,
    deleted: false,
  }).then(({ data }) => data);

export default {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
