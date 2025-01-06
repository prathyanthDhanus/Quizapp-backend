const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const Quiz = require("./controller");
const {tokenVerifyUser} = require("../../utils/jwtToken");

router.post("/", tryCatch(Quiz.createQuiz));

router.get("/",tokenVerifyUser, tryCatch(Quiz.getAllQuiz));
router.get("/admin", tryCatch(Quiz.getAllQuiz));

router.put("/:quizId", tryCatch(Quiz.updateQuiz));

router.delete("/:quizId", tryCatch(Quiz.deleteQuiz));

module.exports = router;
