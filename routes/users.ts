const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// 加密
const bcrypt = require("bcrypt");
const {update, deleteU, get} = require( "../controllers/users");

export {}
//update
//update-put save-post del-delete request-get
router.put("/:id", update );

//delete
router.delete("/:id", deleteU)

//get user
router.get("/:id", get);
module.exports = router;