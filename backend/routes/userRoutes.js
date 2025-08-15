const express = require("express");
const router = express.Router();
const authController = require("../controllers/userControllers");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
// router.get()

module.exports = router;