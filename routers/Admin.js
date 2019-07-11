var express = require("express")
var router = express.Router();

var adminController = require("../controller/adminController")
var categoryController = require("../controller/categoryController")
var goodsController = require("../controller/goodsController")
var jokesController = require("../controller/jokesController")

router.get("/login",adminController.login)
router.post("/login",adminController.loginPost)
router.use(adminController.validate) //能通过后台验证是否登录
router.get("/",adminController.index)
router.get("/out",adminController.out)

// 分类功能
router.get("/category",categoryController.index)
router.get("/category/add",categoryController.add)
router.post("/category/add",categoryController.addPost)
router.get("/category/edit",categoryController.edit)
router.post("/category/edit",categoryController.editPost)
router.get("/category/del",categoryController.del)

// 商品分类
router.get("/goods",goodsController.index)
router.get("/goods/add",goodsController.add)
router.post("/goods/add",goodsController.addPost)
router.post("/goods/upload",goodsController.upload)
router.get("/goods/del",goodsController.del)
router.post("/goods/deleteImg",goodsController.deleteImg)
router.get("/goods/edit",goodsController.edit)
router.post("/goods/edit",goodsController.editPost)

// api数据
router.get("/jokes",jokesController.index)
router.get("/jokes/del",jokesController.del)



module.exports = router;