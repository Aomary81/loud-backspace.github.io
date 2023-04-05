const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  houseHoldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Household",
    required: true,
  },
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;

//This is the validator for the reminder Schema with input information to test.
/*db.createCollection("reminderSchema", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "dueDate", "userId", "houseHoldId"],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "The unique identifier for the reminder document"
          },
          title: {
            bsonType: "string",
            description: "The title of the reminder",
            minLength: 1,
            maxLength: 50
          },
          description: {
            bsonType: "string",
            description: "The description of the reminder",
            maxLength: 500
          },
          dueDate: {
            bsonType: "date",
            description: "The due date of the reminder"
          },
          createdAt: {
            bsonType: "date",
            description: "The date and time when the reminder was created"
          },
          completed: {
            bsonType: "bool",
            description: "Whether the reminder has been completed or not"
          },
          userId: {
            bsonType: "objectId",
            description: "The user ID associated with the reminder"
          },
          houseHoldId: {
            bsonType: "objectId",
            description: "The household ID associated with the reminder"
          }
        }
      }
    }
  })


  //////////Inserting data 1
  db.reminderSchema.insertOne({
   title: "Buy groceries",
   description: "Buy milk, eggs, and bread",
   dueDate: new Date("2023-03-20"),
   userId: ObjectId("6020dce710e7c44744a0a3db"),
   houseHoldId: ObjectId("6020dce710e7c44744a0a3dc")
 })
{
  acknowledged: true,
  insertedId: ObjectId("6412a1afaf761a1608a23366")
}
//////////Inserting data 2
db.reminderSchema.insertOne({
   title: "Meeting with clients",
   description: "Discuss project scope and timeline",
   dueDate: new Date("2023-03-25"),
   userId: ObjectId("602c775e35eb24004439c529"),
   houseHoldId: ObjectId("602c775e35eb24004439c52a")
 })
{
  acknowledged: true,
  insertedId: ObjectId("6412a240af761a1608a23367")
}

////Inserting data 3
db.reminderSchema.insertOne({
   title: "Submit monthly report",
   description: "Include sales data and revenue projections",
   dueDate: new Date("2023-04-05"),
   userId: ObjectId("602c775e35eb24004439c529"),
   houseHoldId: ObjectId("602c775e35eb24004439c52a")
 })
{
  acknowledged: true,
  insertedId: ObjectId("6412a26aaf761a1608a23368")
}

db.reminderSchema.insertMany([
...   {
...     title: 'Buy groceries',
...     description: 'Buy milk, eggs, and bread',
...     dueDate: new Date("2023-03-20T00:00:00.000Z"),
...     userId: ObjectId("6020dce710e7c44744a0a3db"),
...     houseHoldId: ObjectId("6020dce710e7c44744a0a3dc")
...   },
...   {
...     title: 'Meeting with clients',
...     description: 'Discuss project scope and timeline',
...     dueDate: new Date("2023-03-25T00:00:00.000Z"),
...     userId: ObjectId("602c775e35eb24004439c529"),
...     houseHoldId: ObjectId("602c775e35eb24004439c52a")
...   },
...   {
...     title: 'Submit monthly report',
...     description: 'Include sales data and revenue projections',
...     dueDate: new Date("2023-04-05T00:00:00.000Z"),
...     userId: ObjectId("602c775e35eb24004439c529"),
...     houseHoldId: ObjectId("602c775e35eb24004439c52a")
...   },
...   {
...     title: 'Send follow-up email',
...     description: 'Send email to follow up on project status',
...     dueDate: new Date("2023-03-28T00:00:00.000Z"),
...     userId: ObjectId("602c775e35eb24004439c529"),
...     houseHoldId: ObjectId("602c775e35eb24004439c52a")
...   }
... ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("6412ac6baf761a1608a2336a"),
    '1': ObjectId("6412ac6baf761a1608a2336b"),
    '2': ObjectId("6412ac6baf761a1608a2336c"),
    '3': ObjectId("6412ac6baf761a1608a2336d")
  }
}


///////////Results

db.reminderSchema.findOne({ _id: ObjectId("6412a240af761a1608a23367") })
{
  _id: ObjectId("6412a240af761a1608a23367"),
  title: 'Meeting with clients',
  description: 'Discuss project scope and timeline',
  dueDate: ISODate("2023-03-25T00:00:00.000Z"),
  userId: ObjectId("602c775e35eb24004439c529"),
  houseHoldId: ObjectId("602c775e35eb24004439c52a")
}

db.reminderSchema.findOne({
...   title: "Buy groceries",
...   dueDate: new Date("2023-03-20T00:00:00.000Z")
... })
{
  _id: ObjectId("6412a9f4af761a1608a23369"),
  title: 'Buy groceries',
  description: 'Buy milk, eggs, and bread',
  dueDate: ISODate("2023-03-20T00:00:00.000Z"),
  userId: ObjectId("6020dce710e7c44744a0a3db"),
  houseHoldId: ObjectId("6020dce710e7c44744a0a3dc")
}



  */
