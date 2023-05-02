const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');
const Listing = require('../models/listing.model');
const serverless = require("serverless-http");

//Might need to use post instead of patch
router.patch('/user', async (req, res) => {
    const token = req.cookies.token || req.body.token;
    // Check if user is logged in
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, 'thisIsSecret');
      const userId = decodedToken.userId;
	  
      const update = {
        first_name,
        last_name,
		zip_code,
        gender,
        email,
		    desc
      } = req.body;
      // Check if user already exists
      try {
        await User.findByIdAndUpdate(userId, update, {runValidators: true});
        try {
          const result = await User.findById(userId).select('my_listings');
          const listings = result.my_listings;
          const listingUpdate = {
            first_name,
            last_name,
            gender
          } = update;
          await Listing.updateMany({_id: {$in: listings}}, listingUpdate, {runValidators: true});
        } catch (err) {
          console.log('Error:', err);
          return res.status(400).json({ message: err.message })
        }
        return res.status(200).json({ message: 'OK' });
      } catch (err) {
		//Validation failures happen here
		if(!err.path){
			
			const errorField = Object.keys(err.errors)[0];
			
			console.log('Error Database Failed Validation:', errorField);
			return res.status(400).json({ message: errorField })
		}
		else{
			console.log('Error Database Failed To Post:', err.path);
			return res.status(400).json({ message: err.path })
		}
      }    
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
	  console.log('Schema Error', error);
      return res.status(403).json({ message: 'Request error on submission' });
    }
});

module.exports.handler = serverless(router);
