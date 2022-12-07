const express = require('express');
const { pick } = require('fxjs');
const router = express.Router();
const { POOL: { QUERY, QUERY1, EQ, VALUES, SET }} = require('../../config/database');

const todoIdErrorHandler = (next) => {
  const error = new Error('todo_id is required.');
  error.status = 400;
  next(error);
};

router.get('/', async (req, res, next) => {
  try {
    const todos = await QUERY`
      SELECT *
      FROM todos
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `;
    res.status(200).json(todos);
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

router.get('/:todo_id', async (req, res, next) => {
  const { todo_id } = req.params;
  if (!todo_id) {
    todoIdErrorHandler(next);
    return;
  }
  try {
    const todo = await QUERY1`
      SELECT *
      FROM todos
      WHERE ${EQ(todo_id)}
    `;
    res.status(200).json(todo);
  } catch (e) {
    next(e);
  }
});

router.put('/:todo_id', async (req, res, next) => {
  const { body: todo } = req;
  const { todo_id } = req.params;
  if (!todo_id) {
    todoIdErrorHandler(next);
    return;
  }
  try {
    const updatedTodo = await QUERY1`
      UPDATE todos
      ${SET(pick(['title', 'is_completed'], todo))}
      WHERE ${EQ({ todo_id })}
      RETURNING *;
    `;
    res.status(200).json(updatedTodo);
  } catch (e) {
    next(e);
  }
});

router.delete('/:todo_id', async (req, res, next) => {
  const { todo_id } = req.params;
  if (!todo_id) {
    todoIdErrorHandler(next);
    return;
  }
  try {
    const deletedTodo = await QUERY1`
      UPDATE todos
      ${SET({ deleted_at: new Date().toISOString() })}
      WHERE ${EQ({ todo_id })}
      RETURNING *;
    `;
    res.status(200).json(deletedTodo);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
