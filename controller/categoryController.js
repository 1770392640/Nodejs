var Controller = require("./controller")
var Category = require("../models/Category")
class categoryController extends Controller{
    constructor(){
        super()
    }
    index(req,res){
       Category.getCategoryDateAddCount(4,req.query.page,function(result,num){
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/category",req.session)
       })
        
   
    }
    // 添加数据
    add(req,res){
        res.render("admin/categoryAdd",req.session)
    }
    addPost(req,res){
        Category.insertMany(req.body,function(err,result){
            if(err){
                res.render("admin/error",{err:"数据操作失败",url:"/admin/category",data:300})
                return;
            }else{
                res.redirect("/admin/category")
            }
        })
    }


    // 修改数据
    edit(req,res){
        var id = req.query.id
        Category.findOne({_id:id},function(err,result){
            req.session.result = result
            if(err){
                throw Error(err)
                res.render("admin/error",{err:"数据操作失败",url:"/admin/category",data:3000})
            }else{
                res.render("admin/categoryEdit",req.session)
            }
        })
    }
    // 提交修改
    editPost(req,res){
        var id = req.body.id
        Category.updateOne({"_id":id},req.body,function(err,result){
            console.log("req.body==>",req.body)
            if(err){
                throw Error(err)
                res.render("admin/error",{err:"数据操作失败",url:"/admin/category",data:3000})
            }else{
                res.redirect("/admin/category")
            }
        })
    }

    // 删除数据
    del(req,res){
        var id = req.query.id
        Category.deleteOne({"_id":id},function(err){
            if(err){
                res.render("admin/error",{err:"数据操作失败",url:"/admin/category",data:2000})
            }else{
                res.redirect("/admin/category")
            }
        })

    }
}
module.exports = new categoryController;