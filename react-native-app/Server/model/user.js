const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  reviewScore: {
    type: String,
  },
  email: {},
});

module.exports = mongoose.model("user", user, "users");
