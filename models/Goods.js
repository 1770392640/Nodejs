var mongoose = require("mongoose")
var fs = require("fs")
var goodsSchema = mongoose.Schema({
    // 分类
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    // 标题
    title:{
        type:String,
        default:""
    },
    // 地址
    address:{
        type:String,
        default:""
    },
    // 价格
    price:{
        type:String,
        default:""
    },
    // 旧价格
    oldPrice:{
        type:String,
        default:""
    },
    // 收藏
    iscollect:{
        type:Boolean,
        default:false
    },
    // 简介
    description:{
        type:String,
        default:""
    },
    // 内容
    content:{
        type:String,
        default:""
    },
    // 缩略图
    thumbnail:{
        type:String,
        default:""
    },
    // 多图片
    imgs:{
        type:Array
    },
    // 添加的时间
    addTime:{
        type:Date,
        default:new Date()
    }

})
goodsSchema.statics.getGoodsDateAddCount = function(limin,pageDate,callback){
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

// 删除数据，图片
goodsSchema.statics.FindAndDelete = function(id,callback){
    var _this = this
    _this.findOne({_id:id},function(err,result){
        result.imgs.push(result.thumbnail)
        _this.deleteOne({_id:id},function(err){
            if(result.imgs.length !=0){
                (function add(i){
                    if(i == result.imgs.length){
                        callback()
                    }
                    fs.unlink("./"+result.imgs[i],function(err){
                        add(i + 1)
                    })
                }(0))
            }else{
                callback()
            }
        })
    })
}

module.exports = mongoose.model("Goods",goodsSchema)