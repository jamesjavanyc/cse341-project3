const router = require("express").Router();
const Category = require("../models/Category");
export {}

router.post("/", async (req:any,res:any) => {
const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req:any,res:any) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;