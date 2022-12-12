const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');

router.get('/', (req, res) =>
  res.status(200).send('<h1>Welcome~</h1><a href="/posts">Go to /posts</a>'));

router.use('/posts', postsRouter);

module.exports = router;
