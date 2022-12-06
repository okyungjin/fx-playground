const { PostgreSQL } = require('fxsql');
const dotenv = require('dotenv');
const { CONNECT } = PostgreSQL;

dotenv.config();

const POOL = CONNECT({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = { POOL };
