var mongoose = require("mongoose")
var jokesSchema = mongoose.Schema({
    "type":Number,
    "text":String,
    "user_id":String,
    "name":String,
    "screen_name":String,
    "profile_image":String,
    "created_at":String,
    "theme_name":String,
    "bookmark":Number
})
jokesSchema.statics.getJokesDateAddCount = function(limin,pageDate,callback){
    var page = 0;
    if(page != undefined){
        page = pageDate;
    }
    var _this = this;
    _this.find({}).limit(limin).skip(page*limin).sort({_id:-1}).then(function(result){
        _this.find({}).countDocuments().then(function(num){
            callback(result,Math.ceil(num/limin))
        })
    })
}

module.exports = mongoose.model("Jokes",jokesSchema)