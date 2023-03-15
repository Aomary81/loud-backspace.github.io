const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');

router.patch('/user', (req, res) => {
    const token = req.cookies.token || req.body.token;
    // Check if user is logged in
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, 'thisIsSecret');
      const userId = decodedToken.userId;
      const filter = userId;
      const update = {
        first_name,
        last_name,
        email
      } = req.body;
      // Check if user already exists
      User.findByIdAndUpdate(filter, update, {runValidators: true}, function(err, result) {
        if (err) {
          console.log('Error:', err);
          return res.status(400).json({ message: err.message })
        }
        if (result) {
            return res.status(200).json({ message: 'OK' });
        }
      })
      
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
      return res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
