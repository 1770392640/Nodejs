var express = require("express")
var router = express.Router()

router.get("/",(req,res)=>{
    res.send("前台模块")
})
router.get("/list",(req,res)=>{
    res.send("前台列表模块")
})
router.get("/xq",(req,res)=>{
    res.send("前台详情模块")
})

module.exports = router;