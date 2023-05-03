const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const Household = require("../models/mongodb_schemas/Household");
const AddCode = require("../models/mongodb_schemas/HouseholdCodes");
const Reminder = require("../models/mongodb_schemas/reminderSchema");
const { updateOne } = require("../models/listing.model");

router.post("/create", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  const { name } = req.body;
  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Check if user exists in the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newHousehold = new Household({
      name,
      members: [user.id],
    });
    try {
      await newHousehold.save();
    } catch (error) {
      return res.status(400).json({ message: "Failed" });
    }
    try {
      await User.findByIdAndUpdate(
        userId,
        { household: newHousehold._id },
        { runValidators: true }
      );
      const household = await User.findById(user.id)
        .select("household")
        .populate("household");
      return res.status(200).json({ household: household.household._id });
    } catch (error) {
      console.log(error);
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
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Check if user exists in the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let addCode = uuidv4().substring(0, 8);
    let householdCode = await AddCode.findOne({ addCode: addCode });
    while (householdCode) {
      addCode = uuidv4().substring(0, 8);
      householdCode = await AddCode.findOne({ addCode: addCode });
    }
    const newAddCode = new AddCode({
      invitingMember: user.id,
      houseID: user.household,
      addCode: addCode,
      expiresAt: expirationDate,
    });
    try {
      await newAddCode.save();
    } catch (error) {
      return res.status(400).json({ message: "Failed" });
    }
    return res.status(200).json({ addCode: addCode });
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/add", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  const { addCode } = req.body;

  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Check if user exists in the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const code = await AddCode.findOne({ addCode: addCode });
    if (!code) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      await Household.findByIdAndUpdate(
        code.houseID,
        { $addToSet: { members: user.id } },
        { runValidators: true }
      );
    } catch (error) {
      return res.status(400).json({ message: "Failed" });
    }
    try {
      await User.findByIdAndUpdate(
        userId,
        { household: code.houseID },
        { runValidators: true }
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      // If adding household id to user fails remove user from household to avoid issues.
      await Household.findByIdAndUpdate(code.houseID, {
        $pull: { members: user.id },
      });
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
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Check if user exists in the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const household = await User.findById(user.id)
        .select("household")
        .populate("household");
      let memberId = household.household.members.pull(userId);
      const members = await User.find({ _id: { $in: memberId } }).select(
        "first_name last_name _id"
      );
      return res
        .status(200)
        .json({ name: household.household.name, members: members, household: household.household._id });
    } catch (error) {
      console.log(error);
      return res.status(502).json({ message: "Database error" });
    }
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/leave", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Check if user exists in the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const household = await User.findById(user.id)
        .select("household")
        .populate("household");

      if(household.household.members.length < 2){
        household.household.reminders.forEach(async rem_id => {
          await Reminder.findByIdAndDelete(rem_id);
        });
        await Household.findByIdAndDelete(household.household._id);
      }

      await Household.findByIdAndUpdate(household.household._id, { $pull: { members: userId }})

      await User.findByIdAndUpdate(userId, {household: null})

      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "Failed" });
    }
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
