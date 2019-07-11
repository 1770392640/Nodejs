var controller = require("./controller")
var api = require("../models/Api")
var store = require("../models/Store")
var Video = require("../models/Video")
class apiController extends controller{
    constructor(){
        super()
    }

    index(req,res){
        api.ApiDateAddCount(12,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = num;
            res.render("api/index",req.session)
            // console.log(req.query)
       })

    }

    // 搜索
    search(req,res){
        res.render("api/search",req.session)
    }



    //搜索结果
    searchPost(req,res){
        var val = res.req.body.name
        api.find({name:val},function(err,result){
             if(err){
                 res.render("admin/error",{err:"找不到结果...",url:"/api/search",data:3000})
             }else{
                 req.session.result = result;
                 res.render("api/search",req.session)
             }
      })
 
     }




    list(req,res){
        res.send("list模块")
    }
    del(req,res){
        var id = req.query.id
        api.deleteOne({"_id":id},function(err){
            if(err){
                res.render("admin/error",{err:"数据操作失败",url:"/api",data:2000})
            }else{
                res.redirect("/api")
            }
        })
    }
    getDatePost(req,res){
        api.find(function(err,result){
            // console.log(result)
            res.json({code:"200",msg:"数据请求成功post",result})
        })
    }
    getDate(req,res){
        store.find(function(err,result){
            // console.log(result)
            res.json({code:"200",msg:"数据请求成功get",result})
        })
    }
}



module.exports = new apiController;