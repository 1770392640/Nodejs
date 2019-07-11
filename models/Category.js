var mongoose = require("mongoose")
var CategorySchema = mongoose.Schema({
    name:String
})

CategorySchema.statics.getCategoryDateAddCount = function(limin,pageDate,callback){
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


module.exports = mongoose.model("Category",CategorySchema)