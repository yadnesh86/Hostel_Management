const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// CREATE - Add new room
router.post('/', async (req, res) => {
  const { hostel_id, room_number, capacity, fee_per_month, floor_number, room_type = 'double', status = 'available' } = req.body;

  if (!hostel_id || !room_number || !capacity || !fee_per_month || !floor_number) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO rooms (hostel_id, room_number, capacity, fee_per_month, floor_number, room_type, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [hostel_id, room_number, capacity, fee_per_month, floor_number, room_type, status]
    );
    res.status(201).json({ message: 'Room added successfully!', roomId: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// READ - Get all rooms
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT rooms.*, hostels.name AS hostel_name
      FROM rooms
      JOIN hostels ON rooms.hostel_id = hostels.id
    `);
    res.status(200).json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// UPDATE - Update room by ID
router.put('/:id', async (req, res) => {
  const { hostel_id, room_number, capacity, fee_per_month, floor_number, room_type, status } = req.body;
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `UPDATE rooms SET hostel_id = ?, room_number = ?, capacity = ?, fee_per_month = ?, floor_number = ?, room_type = ?, status = ?
       WHERE id = ?`,
      [hostel_id, room_number, capacity, fee_per_month, floor_number, room_type, status, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json({ message: 'Room updated successfully!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// DELETE - Delete room by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM rooms WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

module.exports = router;
