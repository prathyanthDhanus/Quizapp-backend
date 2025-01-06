const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const Question = require("./controller");
const {tokenVerifyUser} = require("../../utils/jwtToken");

router.post("/",tryCatch(Question.createQuestion));

router.get("/:quizId",tokenVerifyUser,tryCatch(Question.getAllQuestionsByQuizId));
router.get("/:quizId/admin",tryCatch(Question.getAllQuestionsByQuizId));

router.put("/:questionId",tryCatch(Question.updateQuestion));

router.delete("/:questionId",tryCatch(Question.deleteQuestion));


module.exports = router;