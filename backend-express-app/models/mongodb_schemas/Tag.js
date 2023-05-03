const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
	
	tagID: Schema.Types.ObjectID,
	tag: String
	
});

/* Entered Schema

 db.createCollection("tag",{
... validator: {
... $jsonSchema:{
... bsonType: "object",
... required: ["tag"],
... properties: {
... tagID: {
... bsonType: "objectId",
... description: "automatically generated tag ID"
... },
... tag: {
... bsonType: "string",
... description: "a tag string that can be associated with a person"
... }}}}})


*/

/*
//Tags created for LB-192

db.tag.insertOne({tag: "funny"})
db.tag.insertOne({tag: "organized"})

db.tag.insertOne({ tag: "kind" });
db.tag.insertOne({ tag: "compassionate" });
db.tag.insertOne({ tag: "generous" });
db.tag.insertOne({ tag: "talented" });
db.tag.insertOne({ tag: "intelligent" });
db.tag.insertOne({ tag: "creative" });
db.tag.insertOne({ tag: "thoughtful" });
db.tag.insertOne({ tag: "confident" });
db.tag.insertOne({ tag: "courageous" });
db.tag.insertOne({ tag: "reliable" });
db.tag.insertOne({ tag: "empathetic" });
db.tag.insertOne({ tag: "motivated" });
db.tag.insertOne({ tag: "optimistic" });
db.tag.insertOne({ tag: "patient" });
db.tag.insertOne({ tag: "resilient" });

db.tag.insertOne({ tag: "arrogant" });
db.tag.insertOne({ tag: "selfish" });
db.tag.insertOne({ tag: "inconsiderate" });
db.tag.insertOne({ tag: "manipulative" });
db.tag.insertOne({ tag: "hypocritical" });
db.tag.insertOne({ tag: "disrespectful" });
db.tag.insertOne({ tag: "stubborn" });
db.tag.insertOne({ tag: "judgmental" });
db.tag.insertOne({ tag: "lazy" });
db.tag.insertOne({ tag: "incompetent" });
db.tag.insertOne({ tag: "dishonest" });
db.tag.insertOne({ tag: "irresponsible" });
db.tag.insertOne({ tag: "impatient" });
db.tag.insertOne({ tag: "unreliable" });
db.tag.insertOne({ tag: "rude" });

Results:

Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({tag: "funny"})
{
  acknowledged: true,
  insertedId: ObjectId("640fe562cc6ba228ada2c249")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.createIndex({tag:1}, {unique: true})
tag_1
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({tag: "organized"})
{
  acknowledged: true,
  insertedId: ObjectId("640fe902cc6ba228ada2c24a")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.findOne()
{ _id: ObjectId("640fe562cc6ba228ada2c249"), tag: 'funny' }
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { tag: 1 }, name: 'tag_1', unique: true }
]
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.updateMany({},{$rename: {"tag_1":"tagValue"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 0,
  upsertedCount: 0
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { tag: 1 }, name: 'tag_1', unique: true }
]
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.findOne()
{ _id: ObjectId("640fe562cc6ba228ada2c249"), tag: 'funny' }
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "kind" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab4cc6ba228ada2c24b")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "compassionate" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab4cc6ba228ada2c24c")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "generous" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab4cc6ba228ada2c24d")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "talented" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab4cc6ba228ada2c24e")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "intelligent" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab4cc6ba228ada2c24f")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "creative" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab4cc6ba228ada2c250")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "thoughtful" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c251")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "confident" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c252")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "courageous" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c253")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "reliable" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c254")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "empathetic" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c255")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "motivated" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c256")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "optimistic" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c257")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "patient" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c258")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "resilient" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c259")
}
Atlas atlas-zb7q23-shard-0 [primary] app>

Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "arrogant" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c25a")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "selfish" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab5cc6ba228ada2c25b")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "inconsiderate" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c25c")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "manipulative" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c25d")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "hypocritical" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c25e")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "disrespectful" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c25f")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "stubborn" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c260")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "judgmental" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c261")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "lazy" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c262")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "incompetent" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c263")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "dishonest" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c264")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "irresponsible" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c265")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "impatient" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c266")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "unreliable" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab6cc6ba228ada2c267")
}
Atlas atlas-zb7q23-shard-0 [primary] app> db.tag.insertOne({ tag: "rude" });
{
  acknowledged: true,
  insertedId: ObjectId("640feab8cc6ba228ada2c268")
}

//*/