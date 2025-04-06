// backend/routes/signup.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/signup', (req, res) => {
  const { fullName, email, password, role } = req.body;

  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  db.query(sql, [fullName, email, password, role], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

module.exports = router;
