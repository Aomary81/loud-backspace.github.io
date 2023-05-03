const mongoose = require("mongoose");

const TagPrefSchema = new mongoose.Schema({
	
	//reviewRef: {type: Schema.Types.ObjectId, ref: "User"}
	//userRef: {type: Schema.Types.ObjectId, ref: "User"}
	tagRef: {type: Schema.Types.ObjectId, ref: "Tag"},
	score: Number
	
});