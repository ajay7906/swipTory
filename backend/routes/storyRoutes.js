const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/storyControllers");
const verifyToken = require("../middleware/verifyToken");

router.post("/createpost", verifyToken, postControllers.createStory );
router.get("/allpost", postControllers.getStoriesByCategory);
router.get("/mypost", verifyToken, postControllers.getUserStories);
router.get("/post-details/:postId", postControllers.getStoryById);
router.put("/update-post/:postId", verifyToken, postControllers.updateStoryById);
router.put("/post-details/:postId/like", verifyToken, postControllers.likePost);
router.put("/post-details/:postId/unlike", verifyToken, postControllers.unlikePost);
module.exports = router;