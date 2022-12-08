import axios from 'axios';

const API_URL = 'http://localhost:3000/api'
axios.defaults.baseURL = API_URL;

const fetchPosts = () =>
  axios.get('/v1/posts').then(({ data }) => data);

const createPost = (posts) =>
  axios.post('/v1/posts', posts).then(({ data }) => data);

export default {
  fetchPosts,
  createPost,
};
