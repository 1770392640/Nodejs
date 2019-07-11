var mongoose = require("mongoose")
var useSchema = mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        defoult:false
    }
})

useSchema.statics.isUsernameAndPassword = function(fields,callback){
    this.findOne({'username':fields.username},function(req,result){
        if(result != null && fields.password == result.password && result.isAdmin == true){
            callback(true)
        }else{
            callback(false)
        }
    })
}

module.exports = mongoose.model("User",useSchema) 