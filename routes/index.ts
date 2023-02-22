const authRoute = require("./auth");
const userRoute = require("./users");
const postRoute = require("./posts");
const catagoriesRoute = require("./categories");
const router = require("express").Router()

router.use("/api/auth",authRoute);
router.use("/api/users",userRoute);
router.use("/api/posts",postRoute);
router.use("/api/catagories",catagoriesRoute);

module.exports = router