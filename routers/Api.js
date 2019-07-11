var express = require("express")
var router = express.Router()

var apiController = require("../controller/apiController")
var goodsApiController = require("../controller/goodsApiController")
var studentController = require("../controller/studentController")

// api首页
router.get("/",apiController.index)
router.post("/",apiController.searchPost)
router.get("/search",apiController.search)
router.post("/search",apiController.searchPost)
router.get("/list",apiController.list)
router.get("/del",apiController.del)
router.post("/getDatePost",apiController.getDatePost)
router.get("/getDate",apiController.getDate)
// api商品页
router.get("/goods",goodsApiController.index)
router.get("/goods/list",goodsApiController.list)


// 学生数据
router.get("/student",studentController.index)
router.get("/stuJsonp",studentController.stuJsonp)


module.exports = router;