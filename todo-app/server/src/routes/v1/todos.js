const express = require('express');
const router = express.Router();
const { POOL: { QUERY, QUERY1, VALUES, SET }} = require('../../config/database');

// TODO: how to select column by camelCase

router.get('/', async (req, res) => {
  // TODO: process offset and limit
  // TODO: add 'show deleted' option
  const { offset, limit, showDeleted = false } = req.params;
  const todos = await QUERY `
    SELECT *
    FROM todo
    WHERE deleted=${showDeleted}
    ORDER BY id DESC`;
  res.status(200).json(todos);
});

router.post('/', async (req, res) => {
  const { body: todo } = req;
  const createdTodo = await QUERY1 `
    INSERT INTO todo
    ${VALUES(todo)}
    RETURNING *;
  `;
  res.status(201).json(createdTodo);
});

router.get('/:todoId', async (req, res) => {
  const { todoId, showDeleted = false } = req.params;
  const todo = await QUERY1 `
    SELECT *
    FROM todo
    WHERE deleted=${showDeleted} AND id=${todoId}
    ORDER BY id DESC`;
  res.status(200).json(todo);
});

router.put('/:todoId', async (req, res) => {
  const { body: todo } = req;
  const { todoId } = req.params;
  const updatedTodo = await QUERY1 `
    UPDATE todo
    ${SET(todo)}
    WHERE id=${todoId}
    RETURNING *;
  `;
  res.status(200).json(updatedTodo);
});

router.delete('/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const deletedTodo = await QUERY1 `
    UPDATE todo
    ${SET({ deleted: true })}
    WHERE id=${todoId}
    RETURNING *;
  `;
  res.status(200).json(deletedTodo);
});

module.exports = router;
