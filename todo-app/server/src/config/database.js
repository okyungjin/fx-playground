const { PostgreSQL } = require('fxsql');
const { CONNECT } = PostgreSQL;

const POOL = CONNECT({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = { POOL };
