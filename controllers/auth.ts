const User = require("../models/User");
const bcrypt = require("bcrypt");

export const register = async (req:any,res:any)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        // 加密加盐
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        // 等价const newUser = new User(req.body);
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPass
        });
        //返回200状态码
        // async异步请求 先执行前面的语句 在遇到await的时候会等待前面语句执行完毕后继续执行 await后的语句
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}

export const login = async (req:any,res:any)=>{
    try{
        const user = await  User.findOne({username: req.body.username});
        !user && res.status(400).json("No such user.");
        const validate = await bcrypt.compare(req.body.password,user.password);
        !validate && res.status(400).json("Wrong password.");
        // 不给用户端发送 password
        console.log(user._doc);
        const {password, ...others} = user._doc;
        console.log(others);
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
}

