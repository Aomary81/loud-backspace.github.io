const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');

router.post('/user', (req, res) => {
	console.log("User data retrieval started");
    const token = req.cookies.token || req.body.token;
    // Check if user is logged in
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, 'thisIsSecret');
      const userId = decodedToken.userId;
	  console.log("Attempting to get data for " + userId);
      const filter = userId;
      
	  User.findById(filter, function (err, result) {
		 
		if (err) {
			console.log('Error:', err);
			return res.status(400).json({ message: err.message })
		}
		if (result) {
			
			//Making the data safe to return
			const {first_name,
				last_name,
				email,
				address,
				city,
				state,
				zip_code,
				desc,
				my_listings,
				household
			} = result;
			
			//Only sending the data that is safe
			const safeData = {
				first_name,
				last_name,
				email,
				address,
				city,
				state,
				zip_code,
				desc,
				my_listings,
				household
			};
				
			
			//res.send(safeData);
			console.log(safeData);
			return res.status(200).json(safeData);
        }
		  
	  })
      
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
      return res.status(403).json({ message: 'Request error on submission' });
    }
});

module.exports = router;
