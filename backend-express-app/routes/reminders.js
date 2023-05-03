const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Reminder = require("../models/mongodb_schemas/reminderSchema");
const User = require("../models/user.model");
const household = require("../models/mongodb_schemas/Household");

router.post("/add", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  const { title, description, dueDate } = req.body;
  // Check if user is logged in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Fetch the user from the database using the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Return the protected resource to the user
    const newReminder = new Reminder({
      title,
      description,
      dueDate,
      userId: user.id,
      houseHoldId: user.household,
    });
    try {
      await newReminder.save();
      try {
        await household.findByIdAndUpdate(
          user.household,
          { $push: { reminders: newReminder.id } },
          { runValidators: true }
        );
        return res.status(200).json({ message: "OK" });
      } catch (error) {
        await Reminder.findByIdAndDelete(newReminder.id);
        return res.status(400).json({ message: "Failed" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: "Failed" });
    }
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/edit", (req, res) => {
  const token = req.cookies.token || req.body.token;
  const { reminder_id } = req.body;
  // Check if user is logged in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and extract the user ID
    const update = ({ title, description, dueDate } = req.body);

    Reminder.findByIdAndUpdate(
      reminder_id,
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

router.post("/my_reminders", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  // Get user token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    try {
      // May ned to be reworked, unable to test
      const houseHoldId = await User.findById(userId).select("household");
      const reminders = await household
        .findById(houseHoldId.household)
        .select("reminders")
        .populate("reminders");
      // .populate("household");
      //.select("reminders")
      //.populate("reminders");
      console.log(reminders);
      return res.status(200).json({ reminders: reminders.reminders });
      //
    } catch (error) {
      console.log(error);
      return res.status(502).json({ message: "Database error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/my_reminders_day", async (req, res) => {
  const token = req.cookies.token || req.body.token;
  const {selectedDay} = req.body
  const day = new Date(selectedDay)
  // Get user token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    try {
      // May need to be reworked, unable to test
      const houseHoldId = await User.findById(userId).select("household");
      //houseHoldId.household
      const reminders = await household.aggregate([
        {
          $match: {
            _id: houseHoldId.household,
          },
        },
        {
          $lookup: {
            from: "reminders",
            as: "reminders",
            let: { reminder: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$houseHoldId', '$$reminder'] },
                      { $eq: ['$dueDate', day] },
                    ]
                  }
                }
              }
            ]
          }
        }
      ])
      return res.status(200).json({ reminders: reminders[0].reminders });
      //
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
  const { reminder_id } = req.body;
  console.log(reminder_id);
  // Get user token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const deletedReminder = await Reminder.findByIdAndDelete(reminder_id);
    console.log(deletedReminder);
    if (!deletedReminder) {
      return res.status(404).json({ message: "reminder found" });
    }
    await household.findByIdAndUpdate(
      { _id: deletedReminder.houseHoldId },
      { $pull: { reminders: reminder_id } }
    );
    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    // If the token is invalid or has expired, return a 401 Unauthorized response
    console.error(err);
    return res.status(500).json({ message: "Unauthorized" });
  }
});

module.exports = router;
