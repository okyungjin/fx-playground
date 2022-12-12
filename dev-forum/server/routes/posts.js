const express = require('express');
const router = express.Router();

const { go } = require('fxjs');
const { POOL: { QUERY, QUERY1, EQ, VALUES, SET, ASSOCIATE, COLUMN, SQL }} = require('../config/database');

router.get('/', async (req, res, next) => {
  try {
    const posts = await ASSOCIATE`
      posts
        - user ${{
      column: COLUMN('name'),
    }}
        < posts_likes ${{
      hook: likes => likes.length
    }}
        - board ${{
      column: COLUMN('name'),
      query: SQL`WHERE is_hidden = false`
    }}
    `;
    const sorted = posts.sort((a, b) => a.id > b.id ? 1 : -1);
    res.render('index', { title: '게시판~' });
  } catch (e) {
    next(e);
  }
});

router.get('/:board_id', async (req, res, next) => {
  const { board_id } = req.params;
  try {
    // const todos = await QUERY1`
    //   SELECT *
    //   FROM posts
    //   ORDER BY created_at DESC
    // `;
    res.status(200).json([]);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const { title } = req.body;
  try {
    const createdTodo = await QUERY1`
      INSERT INTO todos
      ${VALUES({ title })}
      RETURNING *;
    `;
    res.status(201).json(createdTodo);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
