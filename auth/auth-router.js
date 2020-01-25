const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const authModel = require('./auth-model');

router.post('/register', async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: 'username required' });
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'password required' });
  }
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const save = await authModel.add(data);
    res.status(201).json(save);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try {
    const { username, password } = req.body;
    const user = await authModel.findBy({ username }).first();

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const token = jwt.sign(
        {
          subject: user.id,
          username: user.username,
        },
        secrets.jwt,
        {
          expiresIn: '5d',
        }
      );

      res.status(200).json({ message: `hello ${user.username}`, token: token });
    } else {
      res.status(401).json({ message: 'invalid user credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'login server error' });
  }
});

module.exports = router;
