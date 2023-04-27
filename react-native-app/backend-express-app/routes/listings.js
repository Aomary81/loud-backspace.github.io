const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Listing = require("../models/listing.model");
const User = require("../models/user.model");

router.post("/add", async (req, res) => {
  const token = req.cookies.token || req.body.token;
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
    contact,
    bed,
    bath
  } = req.body;
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
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Return the protected resource to the user
    const { email } = user;
    const newListing = new Listing({
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
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
      contact,
      bed,
      bath
    });
    try {
      await newListing.save();
      try {
        await User.findByIdAndUpdate(
          userId,
          { $push: { my_listings: newListing.id } },
          { runValidators: true }
        );
        return res.status(200).json({ message: "OK" });
      } catch (error) {
        await Listing.findByIdAndDelete(newListing.id);
        return res.status(400).json({ message: "Failed" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: "Failed" });
    }
    //const listing = await Listing.findOne({email: email});
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    console.log(error)
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/search", async (req, res) => {
  const { zip_code, page_num, gender, sort } = req.body;
  const pageNum = page_num;
  const pageSize = 16;
  const skip = (pageNum - 1) * pageSize;

  if (sort == 0) {
    const listing = await Listing.find({
      $and: [{ zip_code: zip_code }, { gender: { $in: gender } }],
    })
      .skip(skip)
      .limit(pageSize);

    const numResults = await Listing.find({
      $and: [{ zip_code: zip_code }, { gender: { $in: gender } }],
    }).count();
    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    return res.status(200).json({ listing: listing, numResults: numResults });
  } else {
    const listing = await Listing.find({
      $and: [{ zip_code: zip_code }, { gender: { $in: gender } }],
    })
      .sort({ rent: sort })
      .skip(skip)
      .limit(pageSize);
    const numResults = await Listing.find({
      $and: [{ zip_code: zip_code }, { gender: { $in: gender } }],
    }).count();
    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    return res.status(200).json({ listing: listing, numResults: numResults });
  }
});

router.post("/edit", (req, res) => {
  const token = req.cookies.token || req.body.token;
  const { listing_id } = req.body;
  // Check if user is logged in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and extract the user ID
    const update = ({
      street_number,
      street_name,
      apartment_number,
      city,
      state,
      zip_code,
      rent,
      tags,
      bio,
      contact,
      bed,
      bath
    } = req.body);

    Listing.findByIdAndUpdate(
      listing_id,
      update,
      { runValidators: true },
      function (err, result) {
        if (err) {
          console.log("Error:", err.message);
          return res.status(400).json({ message: "Failed" });
        }
        if (result) {
          return res.status(200).json({ message: "OK" });
        } else {
          return res.status(400).json({ message: "Failed" });
        }
      }
    );
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/my_listings", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  // Get user token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, "thisIsSecret");
    const userId = decodedToken.userId;

    try {
      const listings = await User.findById(userId)
        .select("my_listings")
        .populate("my_listings");
      return res.status(200).json({ my_listings: listings.my_listings });
    } catch (error) {
      console.log(error);
      return res.status(502).json({ message: "Database error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/delete", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  const { listing_id } = req.body;
  console.log(listing_id);
  // Check if user is logged in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const deletedListing = await Listing.findByIdAndDelete(listing_id);
    console.log(deletedListing);
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    console.error(err);
    return res.status(500).json({ message: "Unauthorized" });
  }
});

module.exports = router;
