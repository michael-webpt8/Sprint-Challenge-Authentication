const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
//const dbModel = require('./auth-model');
//const bcrypt = require('bcryptjs');

beforeEach(async () => {
  await db.seed.run();
});
describe('auth router', () => {
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
      .send({ username: 'mikey', password: 'abc123' });
    //console.log('U', user);
    //console.log('R', res);
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.username).toBe('mikey');
  });
});
