const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],

  timeLimit: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const quiz = mongoose.model("Quiz", quizSchema);
module.exports = quiz;
