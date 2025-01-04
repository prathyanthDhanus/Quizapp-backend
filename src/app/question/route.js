const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const Question = require("./controller");


router.post("/",tryCatch(Question.createQuestion));

router.get("/",tryCatch(Question.getAllQuestions));

router.put("/:questionId",tryCatch(Question.updateQuestion));

router.delete("/:questionId",tryCatch(Question.deleteQuestion));


module.exports = router;