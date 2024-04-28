// controllers/storyController.js
const Story = require('../model/storyModel');
const mongoose = require('mongoose')
//const { body, validationResult } = require('express-validator');

// Create a new story


//const Story = require('../models/Story');

// const createStory = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     const {
//       postedBy,
//       stories,
//       category,
//       slide
//       // likes,
//       // bookmarkedBy,
//       // shareLink
//     } = req.body;


//     // console.log(req);
//     if (!userId ) {
//       return res.status(400).json({
//         errorMessage: "Bad request. userId s."
//       });
//     }
//     const filteredSlides = jsonData.slide.filter(slide => slide.stories.length > 3);
//     console.log(filteredSlides);
//     if ( filteredSlides) {
//       return res.status(400).json({
//         errorMessage: "Bad request. story."
//       });
//     }

//     if (!filteredSlides) {
//       return res.status(400).json({
//         errorMessage: "Bad request.length ."
//       });
//     }
//     let newCategory ;
//     const existingStoryCategory = await Story.findOne({ category });
//     if (!existingStoryCategory) {
//        newCategory =  category;

//     }
//     const newStory = new Story({
//       postedBy: userId,
//       stories,


//       // likes,
//       // bookmarkedBy,
//       // shareLink
//     });

//     await newStory.save();
//     res.status(201).json({ message: "Story created successfully", data: newStory });
//   } catch (error) {
//     next(error);
//   }
// };

const createStory = async (req, res, next) => {
  try {
    const { userId } = req;
    const { stories } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad request. userId is required."
      });
    }
    console.log(stories);
    // Validate slide structure
    if (!Array.isArray(stories) || stories.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'At least three stories are required'
      });
    }

    // Validate each slide item


    // Create a new story
    const newStory = new Story({
      postedBy: userId,
      stories,
    });

    // Save the new story to the database
    await newStory.save();

    // Send success response
    res.status(201).json({ message: "Story created successfully", data: newStory });
  } catch (error) {
    // Handle errors
    next(error);
  }
};


// const getStoriesByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.query;
//     const regexCategory = category || ""; // Ensure category is a string or set to an empty string if not provided

//     const postList = await Story.find(
//       { category: { $regex: regexCategory, $options: "i" } },
//       { _id: 1 }
//     );

//     res.json({ data: postList });
//   } catch (error) {
//     next(error);
//   }
// };


const getStoriesByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;

    let stories;
    let extractedStories;
    if (category) {
      console.log(category);
      stories = await Story.find({ 'stories.chooseCategory': category });
    } else {
      stories = await Story.find();
      let categoryMap = ['education', 'sports', 'food', 'movies', 'travel'];
      extractedStories = stories.map(entry => entry.stories);

      // Iterate through each category in the category map
      // categoryMap.forEach(cat => {
      //   // Filter stories based on the current category
      //   const filteredStories = stories.filter(story => story.stories.some(storyItem => storyItem.category === cat));

      //   // Add filtered stories to the categorized stories object
      //   categorizedStories[cat] = filteredStories.map(story => {
      //     return {

      //       stories: story.stories.filter(storyItem => storyItem.category === cat)
      //     };
      //   });
      // });

    }

    res.status(200).json({ success: true, data: stories });
  } catch (error) {
    next(error);
  }
};
// const getStoriesByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.query;

//     let stories;
//     let groupedStories = {};
//     if (category) {
//       stories = await Story.find({ 'stories.category': category });
//     } else {
//       const allStories = await Story.find();

//       // Group stories by category using reduce
//       // const storiesByCategory = allStories.reduce((acc, item) => {
//       //   item.stories.forEach(story => {
//       //     const category = story.category;
//       //     if (!acc[category]) {
//       //       acc[category] = [];
//       //     }
//       //     if (!acc[category].some(existingStory => existingStory.postId === story.postId)) {
//       //       acc[category].push(story);
//       //     }
//       //   });
//       //   return acc;
//       // }, {});

//       // stories = storiesByCategory;


//     res.status(200).json({ success: true, data: allStories });
//   } catch (error) {
//     next(error);
//   }
// };



// Get story by ID
const getStoryById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(postId);

    const story = await Story.findById(postId);

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    res.status(200).json({ success: true, data: story.stories });
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
    if (!userStories || userStories.length === 0) {
      res.status(400).json({ success: false, error: "stories not found" });

    }

    res.status(200).json({ success: true, stories: userStories });
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

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params
    console.log(postId);
    const userId = req.userId;
    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: post ID is missing",
      });
    }
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }
    const updatedStory = await Story.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true });

    if (!updatedStory) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }
    res.status(200).json({ success: true, data: updatedStory });

  } catch (error) {
    next(error)

  }
}
//get like data
const getLikeCount = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ errorMessage: "Bad Request: post ID is missing" });
    }

    const story = await Story.findById(postId);

    if (!story) {
      return res.status(404).json({ errorMessage: "Story not found" });
    }

    const likeCount = story.likes.length;

    res.status(200).json({ success: true, likeCount });
  } catch (error) {
    next(error);
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: post ID is missing",
      });
    }
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }

    const updatedStory = await Story.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } }, // Use $pull to remove userId from likes array
      { new: true }
    );

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


const bookmarkPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: post ID is missing",
      });
    }
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }


    // Check if the user has already bookmarked the post
    

    // Find the story by postId   postId, { $addToSet: { likes: userId } }, { new: true }
    const story = await Story.findByIdAndUpdate(postId, { $addToSet: { bookmarkedBy: userId } }, { new: true });



    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

    


    // Add the user's ID to the bookmarkedBy array

    // story.bookmarkedBy.push(userId);
    // await story.save();

    res.status(200).json({ success: true, message: "Post bookmarked successfully" });
  } catch (error) {
    next(error);
  }
};

//get  data of bookmark
const getBookmarkedPosts = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }

    // Find all posts that have been bookmarked by the user
    const bookmarkedPosts = await Story.find({ bookmarkedBy: userId });

    res.status(200).json({ success: true, data: bookmarkedPosts });
  } catch (error) {
    next(error);
  }
};


//trackBook Mark 

const TrackbookmarkPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: post ID is missing",
      });
    }
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }

    // Find the story by postId
    const story = await Story.findById(postId);
    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

    // Check if the user has already bookmarked the post
    const isBookmarked = story.bookmarkedBy.includes(userId);
    if (isBookmarked) {
      return res.status(200).json({
        success: true,
        data: userId,
        errorMessage: "Post is already bookmarked",
      });
    }
    else {
      return res.status(400).json({
        success: true,
        data: userId,
        errorMessage: "Post is not bookmarked",
      });

    }



  } catch (error) {
    next(error);
  }
};

//track like post

const TrackIsLikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: post ID is missing",
      });
    }
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }

    // Find the story by postId
    const story = await Story.findById(postId);
    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

    const isPostLiked = await Story.exists({ _id: postId, likes: { $in: [userId] } });
    // const islikemarked = story.likes.includes(userId);
    if (isPostLiked) {
      return res.status(200).json({
        success: true,
        data: userId,
        errorMessage: "Post is already Liked",
      });
    }
    else {
      return res.status(400).json({
        success: false,
        data: userId,
        errorMessage: "Post is not like",
      });

    }



  } catch (error) {
    next(error);
  }
};


const unbookmarkPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: post ID is missing",
      });
    }
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }

    // Find the story by postId
    const story = await Story.findByIdAndUpdate( postId,
      { $pull: { bookmarkedBy: userId } }, // Use $pull to remove userId from book array
      { new: true });
    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

    // // Check if the user has bookmarked the post
    // const isBookmarked = story.bookmarkedBy.includes(userId);
    // if (!isBookmarked) {
    //   return res.status(400).json({
    //     errorMessage: "Post is not bookmarked",
    //   });
    // }

    // Remove the user's ID from the bookmarkedBy array
    // story.bookmarkedBy = story.bookmarkedBy.filter(id => id.toString() !== userId.toString());
    // await story.save();

    res.status(200).json({ success: true, message: "Post unbookmarked successfully" });
  } catch (error) {
    next(error);
  }
};

//share the post
const sharePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Check if the postId is valid
    if (!postId) {
      return res.status(400).json({ errorMessage: "Bad Request: Post ID is missing" });
    }

    // Construct the share link based on the postId
    const shareLink = `${req.protocol}://${req.get('host')}/api/postDetail/${postId}`;

    // Update the shareLink field in the database
    const updatedStory = await Story.findByIdAndUpdate(postId, { shareLink }, { new: true });

    if (!updatedStory) {
      return res.status(404).json({ errorMessage: "Story not found" });
    }

    res.status(200).json({ success: true, shareLink });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createStory, getStoriesByCategory, getStoryById
  , getUserStories, updateStoryById, likePost, unlikePost
  , bookmarkPost, unbookmarkPost, sharePost, TrackbookmarkPost,
  getBookmarkedPosts, getLikeCount, TrackIsLikePost
};
