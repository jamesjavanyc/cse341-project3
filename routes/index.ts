const authRoute = require("./auth");
const userRoute = require("./users");
const postRoute = require("./posts");
const catagoriesRoute = require("./categories");
const router = require("express").Router()
export {}
router.use("/api/auth",authRoute);
router.use("/api/users",userRoute);
router.use("/api/posts",postRoute);
router.use("/api/categories",catagoriesRoute);

module.exports = router