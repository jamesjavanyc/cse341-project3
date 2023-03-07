const router = require("express").Router();
const User = require("../models/User");
// 加密
const bcrypt = require("bcrypt");
const {register, login} = require( "../controllers/auth")
export {}
//register
//update-put save-post del-delete request-get
router.post("/register",register);

//login
router.post("/login", login)

module.exports = router;
