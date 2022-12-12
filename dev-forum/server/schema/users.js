const usersTable = t => {
  t.string('id', 20).primary();
  t.string('name', 20).notNullable();
  t.string('email', 30).notNullable();
  t.timestamp('created_at').notNullable(); // FIXME: set default date
  t.timestamp('deleted_at');
};

module.exports = {
  usersTable
};
