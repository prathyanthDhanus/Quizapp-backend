const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const Quiz = require("./controller");

router.post("/", tryCatch(Quiz.createQuiz));

router.get("/", tryCatch(Quiz.getAllQuiz));

router.put("/:quizId", tryCatch(Quiz.updateQuiz));

router.delete("/:quizId", tryCatch(Quiz.deleteQuiz));

module.exports = router;
