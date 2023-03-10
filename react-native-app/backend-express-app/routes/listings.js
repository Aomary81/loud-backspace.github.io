const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Listing = require("../models/listing.model");
const User = require("../models/user.model");

router.post("/add", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  console.log(token);
  const {
    street_number,
    street_name,
    apartment_number,
    city,
    state,
    zip_code,
    rent,
    tags,
    bio,
  } = req.body;
  console.log(req.body);
  // Check if user is logged in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, "thisIsSecret");
    const userId = decodedToken.userId;

    // Fetch the user from the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      console.log("no User");
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Return the protected resource to the user
    const { email } = user;
    const newListing = new Listing({
      email,
      street_number,
      street_name,
      apartment_number,
      city,
      state,
      zip_code,
      rent,
      tags,
      bio,
    });
    await newListing.save(function (err, result) {
      if (err) {
        return res.status(400).json({ message: "Failed" });
      }
      return res.status(200).json({ message: "OK" });
    });

    //const listing = await Listing.findOne({email: email});
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/search", async (req, res) => {
  const { zip_code, page_num } = req.body;
  const pageNum = parseInt(page_num)||1;
  const pageSize = 30;
  const skip = (pageNum-1)*pageSize;

  const listing = await Listing.find({zip_code: zip_code})
  .skip(skip)
  .limit(pageSize);
  if(!listing){
    return res.status(400).json({message:"Listing not found"})
  }
  
  return res.status(200).json({listing:listing});
  
});
module.exports = router;
