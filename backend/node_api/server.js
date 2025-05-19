require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const signupRoutes = require('./routes/signup');
const authRoutes = require('./routes/login'); // import the auth route
const studentRoutes = require('./routes/student');
const adminHostelRoutes = require('./routes/adminhostel');
const adminRoomsRoute = require('./routes/adminrooms');
const studentApplicationRoutes = require('./routes/studentapplication');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Use signup route
app.use('/api', signupRoutes);
app.use('/api', authRoutes); // all /api/login requests go here
app.use('/api/student', studentRoutes);
app.use('/api/adminhostel', adminHostelRoutes);
app.use('/api/adminrooms', adminRoomsRoute);
app.use('/api', studentApplicationRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));