const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const user = require("../user/controller");

router.post("/register", tryCatch(user.userRegister));
router.post("/login", tryCatch(user.userLogin));

module.exports = router;
