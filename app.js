const express = require("express");
const app = express();
const cors = require("cors");

//Middeleware
app.use(express.json());
app.use(cors());

//User routes middleware
const userRoute = require("./src/app/user/route");
app.use("/api/user",userRoute);



module.exports = app;