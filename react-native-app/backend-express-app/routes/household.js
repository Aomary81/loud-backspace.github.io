const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user.model");
const Household = require('../models/mongodb_schemas/Household');
const AddCode = require('../models/mongodb_schemas/HouseholdCodes');

router.post("/create", async (req, res) => {
    const token = req.cookies.token || req.body.token;
    const { name } = req.body;
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, "thisIsSecret");
      const userId = decodedToken.userId;
  
      // Check if user exists in the database using the user ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newHousehold = new Household({
        name,
        member: [user.id]
      });
      try {
        await newHousehold.save();
      } catch(error) {
        return res.status(400).json({ message: "Failed" });
      }
      try {
        await User.findByIdAndUpdate(userId, {$push: {household: newHousehold.id}}, {runValidators: true});
        return res.status(200).json({ message: "OK" });
      } catch(error) { 
        // If adding household to user that is creating it fails, delete houshold since its not connected
        // to any user. Have user try again.
        await Household.findByIdAndDelete(newHousehold.id);
        return res.status(400).json({ message: "Failed" });
      }
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

  router.post("/invite", async (req, res) => {
    const token = req.cookies.token || req.body.token;
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, "thisIsSecret");
      const userId = decodedToken.userId;
  
      // Check if user exists in the database using the user ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      let addCode = uuidv4().substring(0, 8);
      let householdCode = await AddCode.findOne({ addCode: addCode });
      while(householdCode){
        addCode = uuidv4().substring(0, 8);
        householdCode  = await AddCode.findOne({ addCode: addCode });
      }
      const newAddCode = new AddCode({
        invitingMember: user.id,
        houseID: user.household,
        addCode: addCode,
        expiresAt: expirationDate
      });
      try {
        await newAddCode.save();
      } catch(error) {
        return res.status(400).json({ message: "Failed" });
      }
      return res.status(200).json({ addCode: addCode});
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

  router.post("/add", async (req, res) => {
    const token = req.cookies.token || req.body.token;
    const { addCode } =  req.body;
    try {
        // Verify the token and extract the user ID
        const decodedToken = jwt.verify(token, "thisIsSecret");
        const userId = decodedToken.userId;
    
        // Check if user exists in the database using the user ID
        const user = await User.findById(userId);
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const code = AddCode.findOne({addCode: addCode});
        if(!code){
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            await Household.findByIdAndUpdate(code.houseID, {$push: {member: user.id}}, {runValidators: true});
        } catch(error) {
            return res.status(400).json({ message: "Failed" });
        }
        try {
            await User.findByIdAndUpdate(userId, {$push: {household: code.houseID}}, {runValidators: true});
            return res.status(200).json({ message: "OK" });
        } catch(error) {
            // If adding household id to user fails remove user from household to avoid issues.
            await Household.findByIdAndUpdate(code.houseID, {$pull: {member: user.id}});
            return res.status(400).json({ message: "Failed" });
        }
      } catch (error) {
        // If the token is invalid or has expired, return a 401 Unauthorized response
        return res.status(401).json({ message: "Unauthorized" });
      }
  });

  router.post("/get-household", async (req, res) => {
    const token = req.cookies.token || req.body.token;
    try {
      // Verify the token and extract the user ID
      const decodedToken = jwt.verify(token, "thisIsSecret");
      const userId = decodedToken.userId;
  
      // Check if user exists in the database using the user ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      try {
        const household = await User.findById(user.id).select('household').populate('household');
        return res.status(200).json({household: household.household});
      } catch(error) {
        console.log(error);
        return res.status(502).json({ message: 'Database error' });
      }
    } catch (error) {
      // If the token is invalid or has expired, return a 401 Unauthorized response
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

  module.exports = router;
  