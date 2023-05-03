const mongoose = require('mongoose');
const User = require('../user.model');
const Household = require('./Household');

const householdCodeSchema = new mongoose.Schema({
  invitingMember: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: User,
    required: true,
    description: "the object id of the invitee house"
  },
  houseID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Household,
    required: true,
    description: "the object id of the invitee house"
  },
  acceptedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: User,
    default: null,
    description: "the object id of the added user once accepted"
  },
  addCode: {
    type: String,
    required: true,
    unique: true ,
    description: "generated add code"
  },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }
});

module.exports = mongoose.model('AddCode', householdCodeSchema);

/*

db.createCollection("householdCodes", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["invitingMember", "houseID"],
         properties: {
            invitingMember: {
               bsonType: "objectId",
               description: "the object id of the invitee house"
            },
            houseID: {
               bsonType: "objectId",
               description: "the object id of the invitee house"
            },
            acceptedBy: {
               bsonType: ["objectId","null"],
               description: "the object id of the added user once accepted"
            },
            addCode: {
               bsonType: "objectId",
               description: "generated add code"
            }
         }
      }
   }
})

db.householdCodes.createIndex({ addCode: 1 }, { unique: true });

//In order to create the add code a new unique object id needs to be created otherwise an error will be thrown

// Define a few test invite codes
var code1 = {
  invitingMember: ObjectId("63feca83b97f90f8015068f1"),
  houseID: ObjectId("61599a7a9b6855f5c5cf5b5a"),
  addCode: ObjectId()
};

var code2 = {
  invitingMember: ObjectId("640fd9ff8940083715e26b35"),
  houseID: ObjectId("61599a7a9b6855f5c5cf5b5b"),
  addCode: ObjectId()
};

var code3 = {
  invitingMember: ObjectId("640ab3c3ceae7dcacea85f8f"),
  houseID: ObjectId("61599a7a9b6855f5c5cf5b5c"),
  acceptedBy: ObjectId("63feca83b97f90f8015068f1"),
  addCode: ObjectId()
};

// Insert the test invite codes into the "householdCodes" collection
db.householdCodes.insertMany([code1, code2, code3]);

//*/