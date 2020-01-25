const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const dbModel = require('./auth-model');

beforeEach(async () => {
  db.seed.run();
});

test('register a user', async () => {
  const res = await supertest(server)
    .post('/api/auth/register')
    .send({ username: 'mikey', password: 'abc123' });
  //expect(res.status).toBe(201);
  expect(res.status).toBe(201);
  expect(res.type).toBe('application/json');
  expect(res.body.username).toBe('mikey');
});

test('login user', async () => {
  const res = await supertest(server)
    .post('/api/auth/login')
    .send({ name: 'jay', password: 'abc' });

  expect(res.status).toBe(200);
  expect(res.type).toBe('application/json');
  expect(res.username).toBe('jay');
});
