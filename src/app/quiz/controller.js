const AppError = require("../../utils/appError");
const {
  createQuizDb,
  getAllQuizDb,
  updateQuizDb,
  deleteQuizDb,
} = require("./services/db");

module.exports = {
  //=================== Create quiz ================

  createQuiz: async (req, res) => {
    let { title, description, category, timeLimit } = req.body;

    // Perform trim on string fields to remove leading/trailing spaces
    title = title.trim();
    description = description.trim();
    category = category.trim();

    // Validate required fields
    if (!title || !description || !category || !timeLimit) {
      throw new AppError(
        "All fields required",
        "Field validation error: All fields are required",
        400
      );
    }

    const quizData = { title, description, category, timeLimit };
    // Create the quiz and save it to the database
    const constructQuiz = await createQuizDb(quizData);

    return res.status(201).json({
      status: "success",
      message: "Quiz created successfully",
      data: constructQuiz,
    });
  },

  //=================== Get all quiz ================

  getAllQuiz: async (req, res) => {
    // Fetch all quizzes from the database
    const fetchAllQuiz = await getAllQuizDb();
    return res.status(200).json({
      status: "success",
      message: "Fetched all quiz successfully",
      data: fetchAllQuiz,
    });
  },

  //=================== Update a quiz by id ================

  updateQuiz: async (req, res) => {
    let { title, description, category, timeLimit } = req.body;
    const quizId = req.params.quizId;
    // Perform trim on string fields to remove leading/trailing spaces
    title = title.trim();
    description = description.trim();
    category = category.trim();

    // Validate required fields
    if (!title || !description || !category || !timeLimit) {
      throw new AppError(
        "All fields required",
        "Field validation error: All fields are required",
        400
      );
    }
    const quizData = { title, description, category, timeLimit };
    // Update the quiz in the database
    const modifyQuiz = await updateQuizDb(quizData, quizId);

    return res.status(201).json({
      status: "success",
      message: "Quiz data updated successfully",
      data: modifyQuiz,
    });
  },

  //=================== Delete a quiz by id ================

  deleteQuiz: async (req, res) => {
    const quizId = req.params.quizId;
    // Delete the quiz from the database
    const removeQuiz = await deleteQuizDb(quizId);
    return res.status(200).json({
      status: "success",
      message: "Quiz data deleted successfully",
      data: removeQuiz,
    });
  },
};
