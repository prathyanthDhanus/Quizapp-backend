const express = require("express");
const router = express.Router();
const refreshTokenController = require("../refreshToken/controller");

router.post("/user/refresh-token",refreshTokenController.userRefreshToken);




module.exports = router;