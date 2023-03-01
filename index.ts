import {Response} from "express";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes"))
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("database connected..."))
    .catch((e:any)=> console.log(e));

const port = process.env.PORT || "5000"

app.listen(port,()=>{
    console.log("Express is running...");
});
