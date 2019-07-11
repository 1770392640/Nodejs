var mongoose = require("mongoose");

var StudentSchema = mongoose.Schema({
    name:String,
    xs:String,
    zy:String,
    datetime:{
        type:Date,
        default:new Date()
    }
})


module.exports = mongoose.model("Student" ,StudentSchema);