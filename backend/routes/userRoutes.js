const express = require("express");
const router = express.Router();
const authController = require("../controllers/userControllers");
const verifyToken = require("../middleware/verifyToken")

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
// router.get()
// check the token is valid or not  for the home page to show the login and logout button
router.get('/check-token', verifyToken, (req, res) => {
    res.json({ 
        success: true,
        user: req.user
    });
})

module.exports = router;