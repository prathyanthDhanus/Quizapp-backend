const User = require("../model/userSchema");
const AppError = require("../../../utils/appError");
const bcrypt = require("bcrypt");
const { userTokenService } = require("./common");

module.exports = {

  //====================== User register =================

  userRegisterDb: async (userName, email, password) => {
    //Checking if user is already exist or not
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      throw new AppError(
        "User already exist",
        "Field validation error:User already exist",
        409
      );
    }
    //Password hashing using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Saving user details inside the db
    const createUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await createUser.save();
    return createUser;
  },

  //====================== User login =================

  userLoginDb: async (email, password) => {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      throw new AppError(
        "User not found",
        "Field validation error:User not found",
        404
      );
    }
    // Compare the provided password with the hashed password in the database
    const comparePassword = await bcrypt.compare(password, findUser?.password);
    // If the password is incorrect, throw an error
    if (!comparePassword) {
      throw new AppError(
        "Wrong Password",
        "Field validation error:Wrong Password",
        401
      );
    }
    // Generate a token using the user's ID
    const token = await userTokenService(findUser?._id);
    const userName = findUser?.userName;
    return { token, userName };
  },
};
