// 开启服务
const express = require("express");
const app = express();
//加载配置文件.env
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catagoriesRoute = require("./routes/categories");
const path = require("path");
// 配置
dotenv.config();
// 使用json
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true,  useFindAndModify:true}).
    then(console.log("database myblog connected...")).catch(err=> console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"image");
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});
const upload= multer({storage:storage});



// 绑定路径和中间件
//app.use(path,callback)中的callback既可以是router对象又可以是函数
//app.get(path,callback)中的callback只能是函数
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/catagories",catagoriesRoute);
app.use("./images",express.static(path.join(__dirname,"/images")));
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})

// 监听5000端口 启动时执行consolelog
app.listen("5000",()=>{
    console.log("Node.js backend is running...");
});
