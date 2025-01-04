const AppError = require("../../utils/appError");
const { userLoginDb, userRegisterDb } = require("./services/db");

module.exports = {
    
  //================= user register ===============

  userRegister: async (req, res) => {
    // Destructure user input from request body
    const { userName, email, password } = req.body;
    // Check for missing fields
    if (!userName || !email || !password) {
      throw new AppError(
        "All field is required",
        "Field validation error:All field is required",
        400
      );
    }
    const createUser = await userRegisterDb(userName, email, password);
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: createUser,
    });
  },

  //================= user login ===============

  userLogin: async (req, res) => {
    // Destructure user input from request body
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        "All field is required",
        "Field validation error:All field is required",
        400
      );
    }

    const logUser = await userLoginDb(email, password);
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: logUser,
    });
  },
};
