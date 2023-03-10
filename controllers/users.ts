const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

export const update =async (req:any,res:any)=>{
    console.log(req)
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                //update 到数据库
                {$set:req.body},
                //更新信息并发送给客户端，否则客户端保持旧的user信息
                {new: true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can only update your account.");
    }
}
export const deleteU = async (req:any,res:any)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.userId);
            try{
                //根据username删除掉所有的post
                //bug: 如果没有post 会报错
                await Post.deleteMany({ username: user.username });
                //删除user
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("deleted successfully");
            }catch(err){
                res.status(500).json(err);
            }
        }catch(err){
            res.status(404).json("User not found");
        }
    }else{
        res.status(401).json("You can only delete your account.");
    }
}
export const get = async (req:any,res:any)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can only update your account.");
    }
}