const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate();

  await knex('users').insert([
    { username: 'jay', password: 'abc' },
    { username: 'mik', password: '123' },
  ]);
};
