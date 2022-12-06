const express = require('express');
const { pick } = require('fxjs');
const router = express.Router();
const { POOL: { QUERY, QUERY1, VALUES, SET }} = require('../../config/database');

router.get('/', async (req, res, next) => {
  try {
    const todos = await QUERY `
    SELECT *
    FROM todos
    WHERE is_hidden=false
    ORDER BY todo_id DESC`;
    res.status(200).json(todos);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const { body: todo } = req;
  try {
    const createdTodo = await QUERY1 `
    INSERT INTO todos
    ${VALUES(pick('title', todo))}
    RETURNING *;
  `;
    res.status(201).json(createdTodo);
  } catch (e) {
    next(e);
  }
});

router.get('/:todo_id', async (req, res) => {
  const { todo_id } = req.params;
  const todo = await QUERY1 `
    SELECT *
    FROM todos
    WHERE todo_id=${todo_id}
    ORDER BY todo_id DESC`;
  res.status(200).json(todo);
});

router.put('/:todo_id', async (req, res) => {
  const { body: todo } = req;
  const { todo_id } = req.params;
  const updatedTodo = await QUERY1 `
    UPDATE todos
    ${SET(pick(['title', 'is_completed', 'is_hidden'], todo))}
    WHERE todo_id=${todo_id}
    RETURNING *;
  `;
  res.status(200).json(updatedTodo);
});

router.delete('/:todo_id', async (req, res) => {
  const { todo_id } = req.params;
  const deletedTodo = await QUERY1 `
    UPDATE todos
    ${SET({ deleted: true })}
    WHERE todo_id=${todo_id}
    RETURNING *;
  `;
  res.status(200).json(deletedTodo);
});

module.exports = router;
