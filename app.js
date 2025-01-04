const express = require("express");
const app = express();
const cors = require("cors");

//Middeleware
app.use(express.json());
app.use(cors());

//User routes middleware
const userRoute = require("./src/app/user/route");
app.use("/api/user", userRoute);

//Quiz routes middleware
const quizRoute = require("./src/app/quiz/route");
app.use("/api/quiz", quizRoute);

//Question routes middleware
const questionRoute = require("./src/app/question/route");
app.use("/api/question", questionRoute);

module.exports = app;
