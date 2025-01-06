const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const Result = require("./controller");
const {tokenVerifyUser} = require("../../utils/jwtToken");

router.post("/",tokenVerifyUser,tryCatch(Result.createResult));

router.get("/",tokenVerifyUser,tryCatch(Result.getAllResultOfAUser));
router.get("/admin",tryCatch(Result.getAllResultOfAUser));


module.exports = router;