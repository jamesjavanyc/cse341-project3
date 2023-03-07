const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// 加密
const bcrypt = require("bcrypt");
export {}

//create new post
router.post("/", async (req:any,res:any)=>{
    const newPost = await new Post(req.body);
    try{
        const savedPost = newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

//update put
router.put("/:id",async (req:any,res:any)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username=== req.body.username ){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {$set:req.body},
                    {new:true});
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can only update your own posts.")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//delete post
router.delete("/:id",async (req:any,res:any)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username=== req.body.username ){
            try{
                await post.delete();
                res.status(200).json("Your post has been deleted!");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can only delete your own posts.")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//GET POST
router.get("/:id", async (req:any,res:any) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req:any,res:any) => {
    const username = req.query.user;
    //catagory
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            // query all by username
            //  es6简化   posts = await Post.find({username: username });
            posts = await Post.find({ username });
        } else if (catName) {
            // query all by catagory name
            // https://segmentfault.com/a/1190000016087635
            posts = await Post.find({categories: {$in: [catName]},});
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
