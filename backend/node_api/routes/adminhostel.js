const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// CREATE - Add a new hostel
router.post('/', async (req, res) => {
  const { name, type, total_rooms = 0, address, warden_name, contact_number, facilities } = req.body;

  if (!name || !type || !address) {
    return res.status(400).json({ error: 'Missing required fields: name, type, and address are required.' });
  }

  try {
    // Use promise-based query and await the result
    const [result] = await pool.query(
      'INSERT INTO hostels (name, type, total_rooms, address, warden_name, contact_number, facilities) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, type, total_rooms, address, warden_name, contact_number, facilities]
    );
    res.status(201).json({ message: 'Hostel added successfully!', hostelId: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// READ - Get all hostels
router.get('/', async (req, res) => {
  try {
    // Use promise-based query and await the result
    const [results] = await pool.query('SELECT * FROM hostels');
    res.status(200).json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// UPDATE - Update hostel by ID
router.put('/:id', async (req, res) => {
  const { name, type, total_rooms, address, warden_name, contact_number, facilities } = req.body;
  const { id } = req.params;

  try {
    // Use promise-based query and await the result
    const [result] = await pool.query(
      'UPDATE hostels SET name = ?, type = ?, total_rooms = ?, address = ?, warden_name = ?, contact_number = ?, facilities = ? WHERE id = ?',
      [name, type, total_rooms, address, warden_name, contact_number, facilities, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.status(200).json({ message: 'Hostel updated successfully!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// DELETE - Delete hostel by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Use promise-based query and await the result
    const [result] = await pool.query('DELETE FROM hostels WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.status(200).json({ message: 'Hostel deleted successfully!' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

module.exports = router;
