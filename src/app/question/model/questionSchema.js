const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [{ text: { type: String }, isCorrect: { type: Boolean } }],
});

const question = mongoose.model("Question", questionSchema);
module.exports = question;
