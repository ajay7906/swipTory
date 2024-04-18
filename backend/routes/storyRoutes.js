const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/storyControllers");
const verifyToken = require("../middleware/verifyToken");

router.post("/createpost", verifyToken, postControllers.createStory );


module.exports = router;