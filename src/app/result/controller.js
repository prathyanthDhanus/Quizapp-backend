const AppError = require("../../utils/appError");
const { createResultDb, getAllResultOfAUserDb } = require("./services/db");

module.exports = {
  //================== create result ==============

  createResult: async (req, res) => {
    //Extracting user id from the middleware(token);
    const userId = req.user.userId;
    const { quizId, answers } = req.body;

    // Validate required fields
    if (!quizId || !answers || answers.length === 0) {
      throw new AppError(
        "Invalid data",
        "Field validation error: quizId and answers are required",
        400
      );
    }

    const constructQuiz = await createResultDb(userId, quizId, answers);
    return res.status(201).json({
      status: "success",
      message: "Result created successfully",
      data: constructQuiz,
    });
  },

  //================== get all result of a user ==============

  getAllResultOfAUser: async (req, res) => {
    //Extracting user id from the middleware(token);
    const userId = req.user.userId;
    //Fetch score from the database
    const fetchAllResultOfAuser = await getAllResultOfAUserDb(userId);
    return res.status(200).json({
      status: "success",
      message: "Result fetched successfully",
      data: fetchAllResultOfAuser,
    });
  },
};
