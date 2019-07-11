var controller = require("./controller")
var student = require("../models/Student")
class studentController extends controller{
    constructor(){
        super()
    }
    index(req,res){
        /* student.insertMany({
                name:"小华",
                xs:"蓝翔",
                zy:"挖掘机",
                datetime:new Date()
        },function(err,doc){
            console.log(doc)
        }) */

        student.find(function(err,result){
            // console.log(result)
            res.json({code:"200",msg:"数据请求成功",result})
        })
    }
    stuJsonp(req,res){
        student.find(function(err,result){
            console.log(result)
            res.json({code:"200",msg:"jsonp数据请求成功",result})
        })
    }
}






module.exports = new studentController