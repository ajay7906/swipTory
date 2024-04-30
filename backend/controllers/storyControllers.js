
const Story = require('../model/storyModel');



//create post
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




// get  stories all and by category filter
const getStoriesByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;

    let stories;
   
    if (category) {
      console.log(category);
      stories = await Story.find({ 'stories.chooseCategory': category });
    } else {
      stories = await Story.find();
    
      extractedStories = stories.map(entry => entry.stories);

    

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
     return  res.status(400).json({ success: false, error: "stories not found" });

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
// like  the post api
const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params
  
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
//get like count data
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
//unlike post
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

//  bookmark  post
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


   
    

    
    const story = await Story.findByIdAndUpdate(postId, { $addToSet: { bookmarkedBy: userId } }, { new: true });



    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

    



    res.status(200).json({ success: true, message: "Post bookmarked successfully" });
  } catch (error) {
    next(error);
  }
};

//get  data of bookmark  // Find all posts that have been bookmarked by the user
const getBookmarkedPosts = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad Request: user ID is missing",
      });
    }

   
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
        success: false,
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

//unbook mark post
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

  
    const story = await Story.findByIdAndUpdate( postId,
      { $pull: { bookmarkedBy: userId } }, 
      { new: true });
    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

  

    res.status(200).json({ success: true, message: "Post unbookmarked successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createStory, getStoriesByCategory, getStoryById
  , getUserStories, updateStoryById, likePost, unlikePost
  , bookmarkPost, unbookmarkPost, TrackbookmarkPost,
  getBookmarkedPosts, getLikeCount, TrackIsLikePost
};
