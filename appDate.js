var mongoose = require("mongoose")
var http = require("https")


mongoose.connect("mongodb://192.168.31.130:27017/admin1916",{useNewUrlParser:true},function(err){
    if(err){
        throw Error(err)
    }else{
        console.log("数据库连接成功")
    }
})

var jokesSchema = mongoose.Schema({
    "type":Number,
    "text":String,
    "user_id":String,
    "name":String,
    "screen_name":String,
    "profile_image":String,
    "created_at":String,
    "theme_name":String,
    "bookmark":Number
})
var jokes = mongoose.model("jokes",jokesSchema)

var url = 'https://www.apiopen.top/satinApi?type=1&page=1'

http.get(url,(res)=>{
    var data = "";
    res.on("data",(chunk)=>{
        data += chunk;
    })
    res.on("end",()=>{
        let jsondata = JSON.parse(data)
        let jokesjson = jsondata.data;
        // console.log(videojson)
        for(var key in jokesjson ){
            jokes.insertMany({
                "type":jokesjson[key].type,
                'text':jokesjson[key].text,
                "user_id":jokesjson[key].user_id,
                "name":jokesjson[key].name,
                "screen_name":jokesjson[key].screen_name,
                "profile_image":jokesjson[key].profile_image,
                "created_at":jokesjson[key].created_at,
                "theme_name":jokesjson[key].theme_name,
                "bookmark":jokesjson[key].bookmark
            },function(err,doc){
                console.log(doc[0].name +"-----------"+doc[0].type)
            })
        }
    })
}).on("error",()=>{
    console.log("数据请求失败")
})

