const { handleLoginUser, handleRegisterUser, handleLogoutUser } = require("../controllers/auth.controller");

const express = require("express");

const router = express.Router();

router.post("/register", handleRegisterUser);

router.post("/login", handleLoginUser);

router.post("/logout", handleLogoutUser);





module.exports = router;
