const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

module.exports = {
  find,
  findBy,
  findById,
  add,
};

function find() {
  return db('users').select('username');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password');
}

function findById(id) {
  return db('users')
    .where({ id })
    .select()
    .first();
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);

  const [id] = await db('users').insert(user);

  return findById(id);
}
