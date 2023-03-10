
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { ApolloServer } = require("apollo-server-express");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 定义 typeDefs
const typeDefs = `
    type Query {
        hello: String
    }
`;

// 定义 resolver
const resolvers = {
    Query: {
        hello: () => 'Hello Rest Blog!'
    }
};

const apolloServer = new ApolloServer({

    typeDefs,

    resolvers

});
app.use("/", require("./routes"))

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async() =>{
        await apolloServer.start();
        apolloServer.applyMiddleware({ app });
        app.listen(port, () => {
            console.log("Server start on port " + port);
        });
    });

const port = process.env.PORT || "5000"

