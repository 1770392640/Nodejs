var mongoose = require("mongoose")
var https = require("https")

mongoose.connect("mongodb://192.168.31.130:27017/admin1916",{useNewUrlParser:true},function(err){
    if(err){
        throw Error(err)
    }else{
        console.log("数据库连接成功")
    }
})

var apiSchema = mongoose.Schema({
	"nameType": Number,
	"apiUrl": String,
	"name": String,
	"tabType": Number,
	"id": Number
})

var videoApi = mongoose.model("videoApi",apiSchema)
var url = "https://api.apiopen.top/videoHomeTab"
 https.get(url,(res)=>{
	 var data = ""
	 res.on("data",(chunk)=>{
		 data += chunk
		//  console.log("data==>",data)
	 })
	 res.on("end",()=>{
		 let jsondata = JSON.parse(data)
		 let videojson = jsondata.result;
		//  console.log("videojson==>",videojson)
		for(var key in videojson){
		// console.log(videojson[key].data.header ? videojson[key].data.header.title :"空");

			 videoApi.insertMany({
				"nameType": videojson[key].nameType,
				"apiUrl": videojson[key].apiUrl,
				"name": videojson[key].name,
				"tabType": videojson[key].tabType,
				"id": videojson[key].id
			 })
		 }
	 })
 }).on("error",()=>{
	 console.log("数据请求失败")
 })