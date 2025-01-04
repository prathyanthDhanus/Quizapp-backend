const AppError = require("../../../utils/appError");
const Quiz = require("../model/quizSchema");

module.exports = {
  //=================== Create quiz ================

  // Create a new quiz instance using the provided data
  createQuizDb: async (quizData) => {
    const constructQuiz = new Quiz({
      ...quizData,
    });
    // Save the quiz to the database
    await constructQuiz.save();
    return constructQuiz;
  },

  //=================== Get all quiz ================

  getAllQuizDb: async () => {
    // Fetch all quizzes from the database
    const fetchAllQuiz = await Quiz.find();
    // If no quizzes are found, throw an error
    if (fetchAllQuiz.length === 0) {
      throw new AppError(
        "Quiz collection is empty",
        "Field validation error:Empty Quiz collection",
        404
      );
    }
    return fetchAllQuiz;
  },

  //=================== Update quiz  by id ================

  updateQuizDb: async (quizData, quizId) => {
    // Find and update the quiz by ID
    const findQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { ...quizData },
      { new: true } // Return the updated quiz
    );

    // If the quiz is not found, throw an error
    if (!findQuiz) {
      throw new AppError(
        "Quiz not found",
        "Field validation error:Quiz not found",
        404
      );
    }
    return findQuiz;
  },

  //=================== Delete quiz by id ================

  deleteQuizDb: async (quizId) => {
    // Find and delete the quiz by ID
    const removeQuiz = await Quiz.findByIdAndDelete(quizId);
    // If the quiz is not found, throw an error
    if (!removeQuiz) {
      throw new AppError(
        "Quiz not found",
        "Field validation error:Quiz not found",
        404
      );
    }
    return removeQuiz;
  },
};
