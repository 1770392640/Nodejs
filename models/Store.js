var mongoose = require("mongoose")
var storeSchema = mongoose.Schema({
    text:String,
    name:String,
    create_at:String,
    profile_image:String,
    type:String
})

module.exports = mongoose.model("store",storeSchema)