const express = require("express");
const app = express();
const cors = require("cors");

//Middeleware
app.use(express.json());
app.use(cors());

//User routes middleware
const userRoute = require("./src/app/user/route");
app.use("/api/user", userRoute);

//Refreshtoken routes middleware
const refreshToken = require("./src/app/refreshToken/route");
app.use("/api/auth",refreshToken);

//Quiz routes middleware
const quizRoute = require("./src/app/quiz/route");
app.use("/api/quiz", quizRoute);

//Question routes middleware
const questionRoute = require("./src/app/question/route");
app.use("/api/question", questionRoute);

//Result routes middleware
const result = require("./src/app/result/route");
app.use("/api/result",result);

module.exports = app;
