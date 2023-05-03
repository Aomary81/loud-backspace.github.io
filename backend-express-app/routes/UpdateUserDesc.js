const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.route('/users/desc').post((req,res) => {
	const token = req.cookies.token || req.body.token;
	
	if(!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	
	try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const userId = decodedToken.userId;
      const filter = userId;
	  
	  // Extracts the 'desc' property from the request body (Chat GPT analysis)
      const update = {
        desc
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
      return res.status(403).json({ message: 'Request error on submission' });
    }
});