const { Pool, Client } = require('pg');
const config = require('./config');

const pool = {
    user: config.DB_USER,
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    port: config.DB_PORT,
    // ssl: {rejectUnauthorized: false}
};

const database = new Pool(pool);

module.exports = database;