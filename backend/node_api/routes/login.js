// routes/login.js
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/connection'); // Import the db connection
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // ✅ Hardcoded admin login check
  if (email === 'admin@gmail.com' && password === 'admin') {
    const adminUser = {
      id: 0, // You can use a placeholder ID
      name: 'Admin User',
      email: 'admin@gmail.com',
      role: 'admin',
    };


    return res.status(200).json({
      message: 'Admin login successful',
      user: adminUser,
    });
  }

  try {
    // Execute the query using the promise-based API
    const [results] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // Check if the password matches (assuming plain text comparison here for simplicity)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,  // Send the token to the client
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
