const { usersTable } = require('../schema/users');

const pg = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'kyungjin',
    password: 'root1234',
    database: 'forum',
  }
});

const createTableIfNotExist = (tb_name, f) => pg.schema
  .hasTable(tb_name)
  .then(exist => !exist && pg.schema.createTable(tb_name, f));


createTableIfNotExist('users', usersTable);
