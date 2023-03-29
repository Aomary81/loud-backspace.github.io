const mongoose = require("mongoose");

const TagPrefSchema = new mongoose.Schema({
	
	//userRef: {type: Schema.Types.ObjectId, ref: "User"}
	tagRef: {type: Schema.Types.ObjectId, ref: "Tag"},
	score: Number
	
});