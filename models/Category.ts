const mongoose = require('mongoose');

// 定义category类型规则
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Category",categorySchema)