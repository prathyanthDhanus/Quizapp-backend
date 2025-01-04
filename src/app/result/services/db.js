const AppError = require("../../../utils/appError");
const Result = require("../model/resultSchema");
const Question = require("../../question/model/questionSchema");

module.exports = {
  //================== create result ==============

  createResultDb: async (userId, quizId, answers) => {
    let score = 0;

    // Iterate over the answers array
    for (const answer of answers) {
      const { questionId, selectedOption } = answer;

      // Fetch the question from the database
      const question = await Question.findById(questionId);

      if (!question) {
        throw new AppError(
          `Question with ID ${questionId} not found`,
          "Field validation error: Invalid question id",
          404
        );
      }

      // Find the correct option in the question's options array
      const correctOption = question.options.find((option) => option.isCorrect);

      if (correctOption && correctOption.text === selectedOption) {
        score++; // Increment score if the selected option matches the correct one
      }
    }

    // Create a new Result document
    const result = new Result({
      userId,
      quizId,
      answers,
      score, // Store the calculated score
    });

    // Save the result to the database
    await result.save();

    return result;
  },

  //================== get all result of a user ==============

  getAllResultOfAUserDb: async (userId) => {
    const findResult = await Result.find(userId);
    if (findResult.length === 0) {
      throw new AppError(
        "Result not found ",
        "Field validation error: Invalid result id",
        404
      );
    }
    return findResult;
  },
};
