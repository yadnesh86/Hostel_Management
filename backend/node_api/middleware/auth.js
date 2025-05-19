require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');

// Get the JWT secret from the .env file
const secret = process.env.JWT_SECRET; 

function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token after "Bearer"
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token using the secret key from .env
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    // Attach the user info to the request object
    req.user = user;
    
    // Call the next middleware or route handler
    next();
  });
}

module.exports = { authenticateToken };
