var mongoose = require("mongoose")
var videoSchema = mongoose.Schema({
	"nameType": Number,
	"apiUrl": String,
	"name": String,
	"tabType": Number,
	"id": Number
})


module.exports = mongoose.model("video",videoSchema)