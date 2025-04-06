const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // this should point to your db connection file

// POST /api/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    console.log('Login request received:', email, password); // Log inputs
  
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error('Database error during login:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      console.log('Login results:', results);
  
      if (results.length === 0) {
        console.warn('No user found or wrong password');
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const user = results[0];
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  });
  
  
module.exports = router;
