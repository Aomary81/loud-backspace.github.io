const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const Household = require('../models/mongodb_schemas/Household');

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


router.post('/userByID/idInBody', (req, res) => {
	console.log("User data retrieval started");
    const token = req.cookies.token || req.body.token;
    // Check if user is logged in
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, 'thisIsSecret');
	  const userID = req.params.userId;
	  console.log("Attempting to get data for " + userID);
      const filter = req.params.userId;
      
	  User.findById(req.body.userID, function (err, result) {
		
		console.log(result);
		
		if (err) {
			console.log('Error:', err);
			return res.status(400).json({ message: err.message });
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
				my_household
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
				my_household
			};
				
			
			//res.send(safeData);
			console.log(safeData);
			return res.status(200).json(safeData);
        }
		  
	  });
      
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
	  console.log("Error detected when attempting to load user")
	  console.log(error);
      return res.status(403).json({ message: 'Request error on submission' });
    }
});

//const household = await User.findById(user.id).select('my_household').populate('my_household')

router.post('/roommates', (req, res) => {
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
		console.log("Attempting to get roommates for " + userId);
		const filter = userId;


		User.findById(filter, function (err, result) {


			if (err) {
				console.log('Error:', err);
				return res.status(400).json({ message: err.message });
			}
			if (result) {
				
				
				console.log("User data for household: " + result);
				
				//Making the data safe to return
				const {
					household
				} = result;
				
				houseFilter = household;
				
				//res.send(safeData);
				console.log("Household ID to load roommates from = " + houseFilter);
				
				/*
				mongoose.connection.db.collection("household", function(err, householdColl){
					householdColl.find({}, function(err, data){
						console.log("House Collection:\n"+data);
					});
				});
				//*/
				
				Household.findById(houseFilter, function(houseErr, houseResult) {
					
					let roommateList = [];
					if(houseErr){
						
						console.log('House Load Error:', err);
						return res.status(400).json({ message: err.message });
					}
					else{
						if(houseResult){
							const {
								members
							} = houseResult;
							console.log("house data "+houseResult);
							console.log("member list \n"+members);
							
							User.find({'_id': {$in: members}}).select("first_name last_name email").then(data => {
								console.log("single command output: " + data);
								return res.status(200).json(data);
							}).catch(error => {
								console.log('Roommates not found:', err);
								return res.status(404).json({ message: err.message });
							});;
							
						}
						else{
							console.log('House Not Found:', houseResult);
							return res.status(404).json({ message: "House not found" });
						}
					}
					
					
				});
				
			}
			  
		});
      
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
	  console.log(error);
      return res.status(403).json({ message: 'Request error on submission' });
    }
});


module.exports = router;
