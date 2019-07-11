var controller = require("./controller")
var formidable = require("formidable")
var path = require("path")
var fs = require("fs")
var sd = require("silly-datetime")
var goods = require("../models/Goods")
class goodsController extends controller{
    constructor(){
        super()
    }

    index(req,res){
        goods.getGoodsDateAddCount(3, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/goods", req.session);
        })

    }
    add(req,res){
        res.render("admin/goodsAdd",req.session)
    }
    addPost(req,res){
        // console.log(req.body)
        goods.insertMany(req.body,function(err,result){
            if(err){
                res.render("admin/error",{err:"数据操作失败",url:"/admin/goods",data:300})
            }else{
                res.redirect("/admin/goods")
            }
        })
    }
    upload(req,res){
        var form = new formidable.IncomingForm()
        form.uploadDir = "./tupianhuancun"
        form.parse(req,function(err,fields,files){
            if(err){
                throw Error(err)
            }
            var size = parseInt(files.file.size/1024/1024)
            if(size > 5){
                fs.unlink("./"+files.file.path,function(err){
                    res.render("admin/error",{err:"图片不能超过5M",url:"/admin/goods/add",data:3000})
                })
            }
            // 修改图片名称 时间戳+随机数“+后缀名
            var tt = sd.format(new Date(),"yyyyyyyyyyy")
            var rr = parseInt(Math.random()*89999 + 10000)
            var ext = path.extname(files.file.name)

            // 旧路径
            var oldPath = "./"+files.file.path
            // 新路径
            var newPath = path.normalize(__dirname + "/../uploads/"+ tt + rr + ext)

            fs.rename(oldPath,newPath,function(err){
                if(err){
                    throw err
                }
                var imgurl = "/uploads/" + tt +rr + ext;
                res.json({url:imgurl})
            })
        })
    }

    // 修改功能
    edit(req,res){
        var id = req.query.id
        goods.findOne({"_id":id},function(err,result){
            req.session.result = result
            res.render("admin/goodsEdit",req.session)
        })
    }

    // 提交修改
    editPost(req,res){
        var id = req.body.id
        goods.updateOne({"_id":id},req.body,function(err,result){
            if(err){
                throw Error(err);
                res.render("admin/error",{err:"数据操作失败",url:"/admin/goods",data:3000})
            }else{
                res.redirect("/admin/goods")
            }
        })
    }


    // 删除数据
    del(req,res){
        goods.FindAndDelete(req.query.id,function(){
            res.redirect("/admin/goods")
            return;
        })
    }
    // 删除图片
    deleteImg(req,res){
        fs.unlink("./"+req.body.url,function(err){
            res.send("1")
            return;
        })
    }
}

module.exports = new goodsController;