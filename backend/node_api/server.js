const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const signupRoutes = require('./routes/signup');
const authRoutes = require('./routes/login'); // import the auth route

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use signup route
app.use('/api', signupRoutes);
app.use('/api', authRoutes); // all /api/login requests go here

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
