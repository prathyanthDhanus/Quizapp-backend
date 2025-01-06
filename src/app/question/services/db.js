const Question = require("../model/questionSchema");
const Quiz = require("../../quiz/model/quizSchema");
const AppError = require("../../../utils/appError");

module.exports = {
  //================= create question =================
  createQuestionDb: async (questionData) => {
    const { quizId, questionText, options ,explanation} = questionData;
    // Validate that the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new AppError(
        "Quiz not found",
        "Validation error: Invalid quizId",
        404
      );
    }
    // Create and save the question
    const question = new Question({
      quizId,
      questionText,
      options,
      explanation
    });
    const savedQuestion = await question.save();

    // Push the saved question's _id into the Quiz's questions array
    quiz.questions.push(savedQuestion._id);
    await quiz.save();

    return savedQuestion;
  },

 //================= fetch all questions by quiz id =================

  getAllQuestionsByQuizIdDb: async (quizId) => {
    const findAllQuestions = await Question.find({quizId:quizId}).populate("quizId");

    if (findAllQuestions === 0) {
      throw new AppError(
        "Question collection is empty",
        "Field validation error:Empty Question collection",
        404
      );
    }
    return findAllQuestions;
  },

  //=================== Update Question by id =================

  updateQuestionDb: async (questionData, questionId) => {
    const findQuestion = await Question.findByIdAndUpdate(
      questionId,
      questionData,
      { new: true }
    );

    if (!findQuestion) {
      throw new AppError(
        "Question not found.Failed to update",
        "Field validation error:Question not found",
        404
      );
    }
    return findQuestion;
  },

  //=================== Delete Question by id =================

  deleteQuestionDb: async (questionId) => {
    const removeQuestion = await Question.findByIdAndDelete(questionId);
    if (!removeQuestion) {
      throw new AppError(
        "Question not found.Failed to delete",
        "Field validation error:Question not found",
        404
      );
    }
    return removeQuestion;
  },
};
