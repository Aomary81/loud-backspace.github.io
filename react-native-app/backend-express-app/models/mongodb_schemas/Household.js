const mongoose = require('mongoose');
const User = require('../user.model');
const Reminder = require('./reminderSchema');

const Household = new mongoose.Schema({
	
	members: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: User
	}],
	
   reminders: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: Reminder
	}],
	//*/
	name: {
		type: String
	}
});

module.exports = mongoose.model('Household', Household);

/*
//Commands used

db.createCollection("household", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["members", "name"],
         properties: {
            houseID: {
               bsonType: "objectId",
               description: "must be an ObjectId and is required"
            },
            members: {
               bsonType: "array",
               items: {
                  bsonType: "objectId",
                  description: "A user from users"
               }
            },
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            }
         }
      }
   }
})


// Define a few test households
var household1 = {
  houseID: ObjectId("61599a7a9b6855f5c5cf5b5a"),
  members: [
    ObjectId("63feca83b97f90f8015068f1"),
    ObjectId("640fd9ff8940083715e26b35")
  ],
  name: "Test Household 1"
};

var household2 = {
  houseID: ObjectId("61599a7a9b6855f5c5cf5b5b"),
  members: [
    ObjectId("640ab3c3ceae7dcacea85f8f"),
    ObjectId("640e8041e7fc5b8072e23e31"),
    ObjectId("640fc40336f292882eff18f8")
  ],
  name: "Test Household 2"
};

var household3 = {
  houseID: ObjectId("61599a7a9b6855f5c5cf5b5c"),
  members: [
    ObjectId("64080336fb3b37cf2fffdf35"),
    ObjectId("640ac325063bc8877fd7ba80")
  ],
  name: "Test Household 3"
};

// Insert the test households into the "household" collection
db.household.insertMany([household1, household2, household3]);


//*/