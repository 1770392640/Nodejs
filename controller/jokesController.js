var controller = require("./controller")
var Jokes = require("../models/Jokes")
class jokesController extends controller{
    constructor(){
        super()
    }
    index(req,res){
        Jokes.getJokesDateAddCount(5, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/jokes", req.session);
        })
    }
    del(req,res){
        var id = req.query.id
        Jokes.deleteOne({"_id":id},function(err,result){
            if(err){
                res.render("admin/eror",{err:"数据操作失败",url:"/admin/jokes",data:3000})
            }else{
                console.log("删除成功！")
                res.redirect("/admin/jokes")
            }
        })
    }
}





module.exports = new jokesController

