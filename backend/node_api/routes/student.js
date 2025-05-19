const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateToken } = require('../middleware/auth');

// GET student profile
router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      `SELECT users.name, users.email, sp.roll_number, sp.emergency_contact, sp.address
       FROM users
       JOIN student_profiles sp ON users.id = sp.user_id
       WHERE users.id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST (Update or Create) student profile
router.post('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { roll_number, emergency_contact, address } = req.body;

  if (!roll_number || !emergency_contact || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the profile exists
    const [existingProfile] = await db.query(
      `SELECT * FROM student_profiles WHERE user_id = ?`,
      [userId]
    );

    if (existingProfile.length > 0) {
      // Update profile if it exists
      const [result] = await db.query(
        `UPDATE student_profiles
         SET roll_number = ?, emergency_contact = ?, address = ?
         WHERE user_id = ?`,
        [roll_number, emergency_contact, address, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json({ message: 'Profile updated successfully' });
    } else {
      // Create profile if it doesn't exist
      await db.query(
        `INSERT INTO student_profiles (user_id, roll_number, emergency_contact, address)
         VALUES (?, ?, ?, ?)`,
        [userId, roll_number, emergency_contact, address]
      );
      res.json({ message: 'Profile created successfully' });
    }
  } catch (err) {
    console.error('Error updating or creating profile:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
