const mongoose = require('mongoose');
const Listing = require('./listing.model');
const Household = require('./mongodb_schemas/Household');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
	validate: {
		validator: function(value){
			return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i) != null;
		},
	}
  },
  gender: {
    type: String,
    required: true
  },
  address: String,
  desc: String,
  city: String,
  state: String,
  zip_code: {
	type: Number,
	desc: String,
	validate: {
		validator: function(value) {
			return value > 500 && value <= 99950;
		},
	}
  },
  my_listings: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: Listing
  }],
  household: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Household
  }
});

module.exports = mongoose.model('User', userSchema);