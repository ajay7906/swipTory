const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/storyControllers");
const verifyToken = require("../middleware/verifyToken");
const social = require("../controllers/socialControllers");

router.post("/createpost", verifyToken, postControllers.createStory );
router.get("/allpost", (req, res, next) => {
    const token = req.headers.authorization;
    if (token) { try { req.userId = require('jsonwebtoken').verify(token, process.env.SECRET_CODE).userId; } catch (_) { /* Public stories remain available. */ } }
    next();
}, postControllers.getStoriesByCategory);
router.get("/mypost", verifyToken, postControllers.getUserStories);
router.get("/post-details/:postId", (req, res, next) => {
    const token = req.headers.authorization;
    if (token) { try { req.userId = require('jsonwebtoken').verify(token, process.env.SECRET_CODE).userId; } catch (_) { /* Story reading is public. */ } }
    next();
}, postControllers.getStoryById);
router.get("/share/:postId", (req, res, next) => {
    const token = req.headers.authorization;
    if (token) { try { req.userId = require('jsonwebtoken').verify(token, process.env.SECRET_CODE).userId; } catch (_) { /* Story sharing is public. */ } }
    next();
}, postControllers.getShareStoryById);
router.put("/update-post/:postId", verifyToken, postControllers.updateStoryById);
router.put("/post-details/:postId/like", verifyToken, postControllers.likePost);
router.put("/post-details/:postId/unlike", verifyToken, postControllers.unlikePost);
router.put("/post-details/:postId/bookmark", verifyToken, postControllers.bookmarkPost);
router.get("/post-details/:postId/bookMarkTrack", verifyToken, postControllers.TrackbookmarkPost);
router.get("/bookmarkspost", verifyToken, postControllers.getBookmarkedPosts);
router.get("/post-details/:postId/getlikecount",  postControllers.getLikeCount);
router.get("/post-details/:postId/islikepost",verifyToken, postControllers.TrackIsLikePost)
router.put("/post-details/:postId/unbookmark", verifyToken, postControllers.unbookmarkPost);
router.get('/:storyId/comments', social.comments);
router.post('/:storyId/comments', verifyToken, social.addComment);
router.post('/:storyId/report', verifyToken, social.report);

module.exports = router;
