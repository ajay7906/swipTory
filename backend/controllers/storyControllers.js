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

  
    // console.log(req);
    if (!userId || !stories || stories.length < 3) {
      return res.status(400).json({
        errorMessage: "Bad request. Ensure postedBy is provided and stories is an array with at least 3 elements."
      });
    }

    const newStory = new Story({
      postedBy: userId,
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




const getStoriesByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;

    let stories;
    if (category) {
      stories = await Story.find({ 'stories.category': category });
    } else {
      stories = await Story.find();
    }

    res.status(200).json({ success: true, data: stories });
  } catch (error) {
    next(error);
  }
};


// Get story by ID
const getStoryById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId);
   
    const story = await Story.findById(postId);

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    res.status(200).json({ success: true, data: story });
  } catch (error) {
    next(error);
  }
};
// Get all stories of a user
const getUserStories = async (req, res, next) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad request. User ID is required."
      });
    }

    const userStories = await Story.find({ postedBy: userId });

    res.status(200).json({ success: true, data: userStories });
  } catch (error) {
    next(error);
  }
};

// Update a story by ID
const updateStoryById = async (req, res, next) => {
  try {
      const { postId } = req.params;
      const { stories } = req.body;
      console.log(req.body);

      if (!postId) {
          return res.status(400).json({
              errorMessage: "Bad Request: Story ID is missing",
          });
      }

      if (!stories || stories.length < 3) {
          return res.status(400).json({
              errorMessage: "Bad Request: Please provide an array of at least 3 stories",
          });
      }

      const updatedStory = await Story.findByIdAndUpdate(postId, { stories }, { new: true });

      if (!updatedStory) {
          return res.status(404).json({
              errorMessage: "Story not found",
          });
      }

      res.status(200).json({ success: true, data: updatedStory });
  } catch (error) {
      next(error);
  }
};

module.exports = {
  createStory, getStoriesByCategory, getStoryById
  , getUserStories, updateStoryById
};
