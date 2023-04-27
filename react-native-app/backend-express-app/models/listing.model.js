const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  street_number: {
    type: String,
    required: true,
  },
  street_name: {
    type: String,
    required: true,
  },
  apartment_number: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  bio: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true
  },
  bed: {
    type: Number,
    required: true
  },
  bath: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
});

// unique index for apartments
listingSchema.index(
  {
    street_number: 1,
    street_name: 1,
    apartment_number: 1,
    city: 1,
    state: 1,
    zip_code: 1,
  },
  { unique: true, sparse: true }
);

// unique index for houses
listingSchema.index(
  { street_number: 1, street_name: 1, city: 1, state: 1, zip_code: 1 },
  { unique: true, sparse: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
