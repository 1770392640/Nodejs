var controller = require("./controller")
class goodsApiController extends controller{
    constructor(){
        super()
    }
    index(req,res){
        res.send("api商品首页")
    }
    list(req,res){
        res.send("api列表页")
    }
}

module.exports = new goodsApiController;