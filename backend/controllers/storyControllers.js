// controllers/storyController.js
const Story = require('../model/storyModel');
//const { body, validationResult } = require('express-validator');

// Create a new story


//const Story = require('../models/Story');

const createStory = async (req, res, next) => {
    try {
      const { userId } = req;
        const {
            postedBy,
            stories,
            // likes,
            // bookmarkedBy,
            // shareLink
        } = req.body;
        console.log(req.userId);
        // console.log(req);
        if (!userId || !stories || stories.length < 3  ) {
            return res.status(400).json({
                errorMessage: "Bad request. Ensure postedBy is provided and stories is an array with at least 3 elements."
            });
        }

        const newStory = new Story({
            postedBy:userId,
            stories
            // likes,
            // bookmarkedBy,
            // shareLink
        });

        await newStory.save();
        res.status(201).json({ message: "Story created successfully", data: newStory });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStory
};
