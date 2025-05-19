const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { authenticateToken } = require('../middleware/auth');

// ✅ Get all hostels
router.get('/hostels', authenticateToken, async (req, res) => {
  try {
    const [hostels] = await db.query('SELECT id, name FROM hostels');
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hostels', error: err.message });
  }
});

// ✅ Get rooms for a selected hostel
router.get('/rooms/:hostelId', authenticateToken, async (req, res) => {
  const { hostelId } = req.params;
  try {
    const [rooms] = await db.query(
      `SELECT id, room_number, capacity, (capacity - current_occupants) AS beds_available 
       FROM rooms 
       WHERE hostel_id = ? AND (capacity - current_occupants) > 0`,
      [hostelId]
    );
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rooms', error: err.message });
  }
});

// ✅ Submit hostel application with full form
router.post('/apply', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {
    name, email, mobile, gender, dob, address,
    college_name, university, course, year,
    tenth_percent, twelfth_percent, other_qualification,
    hostel_id, room_id
  } = req.body;

  if (!hostel_id || !room_id || !name || !email || !mobile || !gender || !dob || !address ||
      !college_name || !university || !course || !year || !tenth_percent || !twelfth_percent) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  try {
    // Check for existing pending application
    const [existing] = await db.query(
      `SELECT * FROM hostel_applications 
       WHERE user_id = ? AND application_status = 'pending'`,
      [userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'You already have a pending application.' });
    }

    // Check if room has space
    const [roomCheck] = await db.query(
      `SELECT capacity, current_occupants FROM rooms WHERE id = ? AND hostel_id = ?`,
      [room_id, hostel_id]
    );

    if (roomCheck.length === 0 || roomCheck[0].current_occupants >= roomCheck[0].capacity) {
      return res.status(400).json({ message: 'Selected room is full.' });
    }

    // Insert full application
    await db.query(
      `INSERT INTO hostel_applications (
        user_id, name, email, mobile, gender, dob, address,
        college_name, university, course, year,
        tenth_percent, twelfth_percent, other_qualification,
        hostel_id, room_id, application_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        userId, name, email, mobile, gender, dob, address,
        college_name, university, course, year,
        tenth_percent, twelfth_percent, other_qualification,
        hostel_id, room_id
      ]
    );

    // Update room occupancy
    await db.query(
      `UPDATE rooms SET current_occupants = current_occupants + 1 WHERE id = ?`,
      [room_id]
    );

    res.json({ message: 'Application submitted successfully.' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to submit application', error: err.message });
  }
});

module.exports = router;
