const express = require('express');
const router = express.Router();
const { POOL: { QUERY }} = require('../config/database');

router.get('/', async (req, res) => {
  // TODO: process offset and limit
  // TODO: add 'show deleted' option
  const { offset, limit } = req.params;
  const todos = await QUERY `
    SELECT *
    FROM todo
    WHERE deleted=false
    ORDER BY id DESC`;
  res.send(todos);
});

router.get('/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const todo = await QUERY `SELECT * FROM todo WHERE deleted=false AND id=${todoId} ORDER BY id DESC`;
  res.send(todo.length ? todo[0] : {});
});

module.exports = router;
