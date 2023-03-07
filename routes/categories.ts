const router = require("express").Router();
const Category = require("../models/Category");
const {save, find} = require( "../controllers/category")
export {}

router.post("/", save);

router.get("/", find);

module.exports = router;