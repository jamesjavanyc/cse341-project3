import { Request, Response } from "express";

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const axios = require("axios");

export const oauthLogin = (req: Request, res: Response): void => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_ID}&redirect_uri=${process.env.GITHUB_OAUTH_DOMAIN}/auth/oauth-callback&scope=user:email`);
};

export const oauthCallback = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.query.code) {
            res.status(401).send("Unauthorized, access denied.");
        } else {
            const body = {
                client_id: process.env.GITHUB_OAUTH_ID, // 必须
                client_secret: process.env.GITHUB_OAUTH_SECRET, // 必须
                code: req.query.code // 必须,这个不用我们填写，当授权跳转后，会在/oauth-callback 自动添加code
            };
            const response = await axios.post(
                `https://github.com/login/oauth/access_token`,
                body
            );
            // 获取token
            const token = response.data.split("&")[0].substring(13);
            // 获取用户信息
            const emailRes = await axios({
                method: "get",
                url: "https://api.github.com/user/emails",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `token ${token}`
                }
            });
            //获取email
            let email;
            emailRes.data.map((emailInfo: any) => {
                if (emailInfo.primary) {
                    email = emailInfo.email;
                }
            });
            //执行email登陆逻辑， 但是不需要密码
            if (email) {
                const user = await User.findOne({ email: email });
                if (user) {
                    console.log("User exist o auth");
                    res.status(200).cookie("token", generateRestToken(user.email)).cookie("email",email).send();
                } else {
                    console.log("User not exist o auth");
                    const newUser = new User({
                        email: email
                    });
                    await newUser.save();
                    console.log("Oauth new user created");
                    res.status(200).cookie("token", generateRestToken(newUser.email)).cookie("email",email).send();
                }
            } else {
                res.status(401).send("Bad Credential. OAUTH AUTHORITY NOT ENOUGH TO GET EMAIL.");
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const generateRestToken =  function (payload:any):string {
    const token = jwt.sign({payload}, "secretkey", {
        expiresIn: 60 * 60 * 365 * 24 ,
    });
    console.log(payload, "Token generated", token)
    return token
};


