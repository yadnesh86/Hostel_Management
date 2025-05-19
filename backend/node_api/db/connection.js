require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const db = mysql.createPool(dbConfig);

db.getConnection()
  .then(() => console.log('✅ Connected to MySQL'))
  .catch((err) => console.error('❌ Error connecting to MySQL:', err));

module.exports = db;
