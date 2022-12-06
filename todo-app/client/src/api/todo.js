import axios from 'axios';

const API_URL = 'http://localhost:3000/api'
axios.defaults.baseURL = API_URL;

const fetchTodos = () =>
  axios.get('/v1/todos').then(({ data }) => data);

const createTodo = (title) =>
  axios.post('/v1/todos', { title }).then(({ data }) => data);

const deleteTodo = (todo_id) =>
  axios.delete(`/v1/todos/${todo_id}`).then(({ data }) => data);

const updateTodo = ({ todo_id, title, is_completed }) =>
  axios.put(`/v1/todos/${todo_id}`, {
    todo_id,
    title,
    is_completed,
    deleted: false,
  }).then(({ data }) => data);

export default {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
