
const Story = require('../model/storyModel');
const User = require('../model/userModel');
const notifyUser = require('../utils/notifyUser');
const Notification = require('../model/notificationModel');
const { getIO } = require('../utils/realtime');



//create post
const createStory = async (req, res, next) => {
  try {
    const { userId } = req;
    const { stories, tags = [], isDraft = false } = req.body;
    const postType = req.body.postType === 'status' ? 'status' : 'article';

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Bad request. userId is required."
      });
    }
    // Validate slide structure
    if (!Array.isArray(stories) || stories.length > 20 || (!isDraft && (!stories.length || stories.some((slide) => !slide.heading || !slide.description || (postType === 'article' && !slide.image) || !slide.chooseCategory)))) {
      return res.status(400).json({
        success: false,
        message: 'Add at least one complete slide before publishing'
      });
    }

    // Validate each slide item


    // Create a new story
    const newStory = new Story({
      postedBy: userId,
      stories,
      postType,
      title: String(req.body.title || stories[0]?.heading || '').trim(),
      body: String(req.body.body || stories[0]?.description || '').trim(),
      coverImage: String(req.body.coverImage || stories[0]?.image || ''),
      expiresAt: postType === 'status' && !isDraft ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null,
      tags: [...new Set((Array.isArray(tags) ? tags : []).map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))].slice(0, 15),
      isDraft: Boolean(isDraft),
    });

    // Save the new story to the database
    await newStory.save();

    if (!isDraft) {
      try {
        const creator = await User.findById(userId).select('username followers blockedUsers blockedBy');
        const excluded = new Set([String(userId), ...creator.blockedUsers.map(String), ...creator.blockedBy.map(String)]);
        const recipients = [...new Set(creator.followers.map(String))].filter((id) => !excluded.has(id));
        // Persist in batches and fan out through authenticated per-user rooms.
        for (let i = 0; i < recipients.length; i += 500) {
          const batch = recipients.slice(i, i + 500);
          const created = await Notification.insertMany(batch.map((recipient) => ({ recipient, actor: userId, type: 'post', story: newStory._id, message: `published a new ${postType}` })), { ordered: false });
          const io = getIO();
          if (io) for (const notification of created) io.to(`user:${notification.recipient}`).emit('notification:new', { _id: notification._id, actor: { _id: userId, username: creator.username }, type: 'post', story: newStory._id, message: notification.message, read: false, createdAt: notification.createdAt });
        }
      } catch (notificationError) {
        console.error('Post published, but follower notifications could not be delivered:', notificationError.message);
      }
    }

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
    const { category, q = '', sort = 'newest', page = 1, limit = 12, tag } = req.query;

    let stories;
   
    const query = { isDraft: false, postType: { $ne: 'status' } };
    if (req.userId) {
      const viewer = await User.findById(req.userId).select('blockedUsers blockedBy');
      if (viewer) query.postedBy = { $nin: [...viewer.blockedUsers, ...viewer.blockedBy].map(String) };
    }
    if (category) query['stories.chooseCategory'] = category;
    if (tag) query.tags = String(tag).toLowerCase();
    if (q) {
      const safeSearch = String(q).slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const creatorIds = (await User.find({ username: { $regex: safeSearch, $options: 'i' } }).select('_id')).map((user) => user._id.toString());
      query.$or = [{ 'stories.heading': { $regex: safeSearch, $options: 'i' } }, { 'stories.description': { $regex: safeSearch, $options: 'i' } }, { tags: { $regex: safeSearch, $options: 'i' } }, { postedBy: { $in: creatorIds } }];
    }
    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(30, Math.max(1, Number(limit) || 12));
    const sortOrder = sort === 'popular' ? { likes: -1, createdAt: -1 } : sort === 'viewed' ? { viewCount: -1, createdAt: -1 } : { createdAt: -1 };
    stories = await Story.find(query).sort(sortOrder).skip((pageNumber - 1) * pageSize).limit(pageSize);
    const authors = await User.find({ _id: { $in: [...new Set(stories.map((item) => item.postedBy))] } }).select('username avatar');
    const authorMap = new Map(authors.map((author) => [String(author._id), author]));
    const data = stories.map((story) => ({ ...story.toObject(), author: authorMap.get(String(story.postedBy)) || null }));
    res.status(200).json({ success: true, data, page: pageNumber, hasMore: stories.length === pageSize });
  } catch (error) {
    next(error);
  }
};

// Status updates are short-lived and appear only for the current user and followed creators.
const getStatuses = async (req, res, next) => {
  try {
    if (!req.userId) return res.json({ data: [] });
    const user = await User.findById(req.userId).select('following blockedUsers blockedBy');
    if (!user) return res.json({ data: [] });
    const ids = [String(req.userId), ...user.following.map(String)];
    const blocked = [...user.blockedUsers, ...user.blockedBy].map(String);
    const data = await Story.find({ postedBy: { $in: ids, $nin: blocked }, isDraft: false, postType: 'status', expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 }).limit(100);
    const authors = await User.find({ _id: { $in: [...new Set(data.map((item) => item.postedBy))] } }).select('username avatar');
    const byId = new Map(authors.map((author) => [String(author._id), author]));
    res.json({ data: data.map((item) => ({ ...item.toObject(), author: byId.get(String(item.postedBy)) || null })) });
  } catch (error) { next(error); }
};




// Get story by ID
const getStoryById = async (req, res, next) => {
  try {
    const { postId } = req.params;

    let story;
    if (req.userId) {
      const seen = await Story.exists({ _id: postId, views: req.userId });
      story = await Story.findOneAndUpdate({ _id: postId, isDraft: false }, { $addToSet: { views: req.userId }, ...(seen ? {} : { $inc: { viewCount: 1 } }) }, { new: true });
    } else story = await Story.findOneAndUpdate({ _id: postId, isDraft: false }, { $inc: { viewCount: 1 } }, { new: true });

    if (!story) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    res.status(200).json({ success: true, data: story.stories });
  } catch (error) {
    next(error);
  }
};

//get post by of share
const getShareStoryById = async (req, res, next) => {
  try {
    const { postId } = req.params;

    let story;
    if (req.userId) {
      const seen = await Story.exists({ _id: postId, views: req.userId });
      story = await Story.findOneAndUpdate({ _id: postId, isDraft: false }, { $addToSet: { views: req.userId }, ...(seen ? {} : { $inc: { viewCount: 1 } }) }, { new: true });
    } else story = await Story.findOneAndUpdate({ _id: postId, isDraft: false }, { $inc: { viewCount: 1 } }, { new: true });

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

    if (!postId) {
      return res.status(400).json({
        errorMessage: "Bad Request: Story ID is missing",
      });
    }

    const isDraft = Boolean(req.body.isDraft);
    const postType = req.body.postType === 'status' ? 'status' : 'article';
    if (!Array.isArray(stories) || stories.length > 20 || (!isDraft && (!stories.length || stories.some((slide) => !slide.heading || !slide.description || (postType === 'article' && !slide.image) || !slide.chooseCategory)))) {
      return res.status(400).json({
        errorMessage: "Bad Request: Please provide at least one complete slide",
      });
    }

    const tags = Array.isArray(req.body.tags) ? [...new Set(req.body.tags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))].slice(0, 15) : [];
    const updatedStory = await Story.findOneAndUpdate({ _id: postId, postedBy: req.userId }, { stories, isDraft, tags, postType, title: String(req.body.title || stories[0]?.heading || '').trim(), body: String(req.body.body || stories[0]?.description || '').trim(), coverImage: String(req.body.coverImage || stories[0]?.image || ''), expiresAt: postType === 'status' && !isDraft ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null }, { new: true, runValidators: true });

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
    const alreadyLiked = await Story.exists({ _id: postId, likes: userId });
    const updatedStory = await Story.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true });

    if (!updatedStory) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }
    if (!alreadyLiked) await notifyUser({ recipient: updatedStory.postedBy, actor: userId, type: 'like', story: updatedStory._id, message: 'liked your story' });
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


   
    

    
    const alreadyBookmarked = await Story.exists({ _id: postId, bookmarkedBy: userId });
    const story = await Story.findByIdAndUpdate(postId, { $addToSet: { bookmarkedBy: userId } }, { new: true });



    if (!story) {
      return res.status(404).json({
        errorMessage: "Story not found",
      });
    }

    if (!alreadyBookmarked) await notifyUser({ recipient: story.postedBy, actor: userId, type: 'bookmark', story: story._id, message: 'saved your story' });

    



    res.status(200).json({ success: true, message: "Post bookmarked successfully" });
  } catch (error) {
    next(error);
  }
};

const shareStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findOneAndUpdate({ _id: storyId, isDraft: false }, { $inc: { shareCount: 1 } }, { new: true });
    if (!story) return res.status(404).json({ errorMessage: 'Story not found' });
    if (req.userId) await notifyUser({ recipient: story.postedBy, actor: req.userId, type: 'share', story: story._id, message: 'shared your story' });
    res.json({ success: true, shareCount: story.shareCount });
  } catch (error) { next(error); }
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

   
    const bookmarkedPosts = await Story.find({ bookmarkedBy: userId, isDraft: false });

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
  createStory, getStoriesByCategory, getStoryById, getStatuses
  , getUserStories, updateStoryById, likePost, unlikePost
  , bookmarkPost, unbookmarkPost, TrackbookmarkPost,
  getBookmarkedPosts, getLikeCount, TrackIsLikePost , getShareStoryById, shareStory
};
