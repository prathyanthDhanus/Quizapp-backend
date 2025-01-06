const AppError = require("../../utils/appError");
const {
  createQuestionDb,
  getAllQuestionsByQuizIdDb,
  updateQuestionDb,
  deleteQuestionDb,
} = require("./services/db");

module.exports = {
  //================= Create question =================

  createQuestion: async (req, res) => {
    let { quizId, questionText, options,explanation } = req.body;
    // Perform trim on string fields to remove leading/trailing spaces
    questionText = questionText.trim();

    // Validate required fields
    if (!quizId || !questionText || !options || options.length === 0 ||!explanation) {
      throw new AppError(
        "All fields required",
        "Field validation error: All fields are required",
        400
      );
    }
    // Construct the new question data
    const questionData = { quizId, questionText, options,explanation };
    // Create the question and save it to the database
    const constructQuestion = await createQuestionDb(questionData);
    return res.status(201).json({
      status: "success",
      message: "Question created successfully",
      data: constructQuestion,
    });
  },

  //================= fetch all questions by quiz id =================

  getAllQuestionsByQuizId: async (req, res) => {
   //Extracting quiz id from body
    const quizId = req.params.quizId;
    // Fetch all questions from the database
    const fetchAllQuestons = await getAllQuestionsByQuizIdDb(quizId);
    return res.status(200).json({
      status: "success",
      message: "Fetched all questions successfully",
      data: fetchAllQuestons,
    });
  },

  //=================== Update Question by id =================

  updateQuestion: async (req, res) => {
    let { questionText, options,explanation } = req.body;
    const questionId = req.params.questionId;

    // Perform trim on string fields to remove leading/trailing spaces
    questionText = questionText.trim();
    explanation = explanation.trim();
    // Validate required fields
    if (!questionText || !options || options.length === 0) {
      throw new AppError(
        "All fields required",
        "Field validation error: All fields are required",
        400
      );
    }
    // Construct the updated question data
    const questionData = { questionText, options,explanation };
    // Update the question in the database
    const modifyQuestion = await updateQuestionDb(questionData, questionId);
    return res.status(201).json({
      status: "success",
      message: "Question data updated successfully",
      data: modifyQuestion,
    });
  },

  //=================== Delete Question by id =================

  deleteQuestion: async (req, res) => {
    const questionId = req.params.questionId;

    // Delete the question from the database
    const removeQuestion = await deleteQuestionDb(questionId);

    return res.status(200).json({
      status: "success",
      message: "Question data deleted successfully",
      data: removeQuestion,
    });
  },
};
