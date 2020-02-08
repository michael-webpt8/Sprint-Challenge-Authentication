const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.NODE_ENV || 'dev';

module.exports = knex(knexConfig[environment]);
