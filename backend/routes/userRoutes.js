const express = require("express");
const router = express.Router();
const authController = require("../controllers/userControllers");
const verifyToken = require("../middleware/verifyToken")
const social = require("../controllers/socialControllers");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/verify-email", authController.verifyEmail);
router.post("/forgot-password", authController.requestPasswordReset);
router.post("/reset-password", authController.resetPassword);
// router.get()
// check the token is valid or not  for the home page to show the login and logout button
router.get('/check-token', verifyToken, (req, res) => {
    res.json({ 
        success: true,
        user: req.user
    });
})
router.get('/profile/:userId', (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next();
    try { req.userId = require('jsonwebtoken').verify(token, process.env.SECRET_CODE).userId; } catch (_) { /* Public profiles remain viewable without a valid optional token. */ }
    next();
}, social.profile);
router.patch('/profile', verifyToken, social.updateProfile);
router.post('/:userId/follow', verifyToken, social.follow);
router.delete('/:userId/follow', verifyToken, social.unfollow);
router.post('/:userId/block', verifyToken, social.block);
router.get('/feed/following', verifyToken, social.followingFeed);
router.get('/notifications', verifyToken, social.notifications);
router.put('/notifications/read', verifyToken, social.readNotifications);

module.exports = router;
