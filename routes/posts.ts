const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// 加密
const bcrypt = require("bcrypt");
const {  findById, deleteP, add, findAll, update}  = require( "../controllers/posts");

export {}

//create new post
router.post("/",add );

//update put
router.put("/:id",update)

//delete post
router.delete("/:id",deleteP)

//GET POST
router.get("/:id", findById);

//GET ALL POSTS
router.get("/", findAll);

module.exports = router;
