const { PostgreSQL } = require('fxsql');
const { CONNECT } = PostgreSQL;

const POOL = CONNECT({
  host: 'localhost',
  user: 'kyungjin',
  password: 'root1234',
  database: 'forum',
});

module.exports = { POOL };
