const User = require('../model/userModel');
const Story = require('../model/storyModel');
const Notification = require('../model/notificationModel');

const publicUser = (user) => ({
  _id: user._id, username: user.username, bio: user.bio, avatar: user.avatar,
  followers: user.followers?.length || 0, following: user.following?.length || 0,
  createdAt: user.createdAt,
});

exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'Creator not found' });
    const viewer = await User.findById(req.userId).select('following blockedUsers');
    if (viewer?.blockedUsers?.some((id) => id.equals(user._id)) || user.blockedUsers?.some((id) => id.equals(viewer?._id))) return res.status(404).json({ message: 'Creator not found' });
    const stories = await Story.find({ postedBy: user._id.toString(), isDraft: false }).sort({ createdAt: -1 });
    res.json({ user: publicUser(user), isFollowing: Boolean(viewer?.following?.some((id) => id.equals(user._id))), stories });
  } catch (e) { next(e); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { bio, avatar } = req.body;
    if (bio !== undefined && String(bio).length > 300) return res.status(400).json({ message: 'Bio must be 300 characters or fewer' });
    if (avatar !== undefined && String(avatar).length > 2_000_000) return res.status(413).json({ message: 'Profile image is too large' });
    const user = await User.findByIdAndUpdate(req.userId, { $set: { ...(bio !== undefined ? { bio } : {}), ...(avatar !== undefined ? { avatar } : {}) } }, { new: true, runValidators: true });
    res.json({ user: publicUser(user) });
  } catch (e) { next(e); }
};

exports.follow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId === req.userId) return res.status(400).json({ message: 'You cannot follow yourself' });
    const [actor, target] = await Promise.all([User.findById(req.userId), User.findById(userId)]);
    if (!target) return res.status(404).json({ message: 'Creator not found' });
    if (actor.blockedUsers.some((id) => id.equals(target._id)) || target.blockedUsers.some((id) => id.equals(actor._id))) return res.status(403).json({ message: 'This creator is unavailable' });
    const alreadyFollowing = actor.following.some((id) => id.equals(target._id));
    await Promise.all([
      User.updateOne({ _id: actor._id }, { $addToSet: { following: target._id } }),
      User.updateOne({ _id: target._id }, { $addToSet: { followers: actor._id } }),
      ...(!alreadyFollowing ? [Notification.create({ recipient: target._id, actor: actor._id, type: 'follow', message: 'started following you' })] : []),
    ]);
    res.json({ following: true });
  } catch (e) { next(e); }
};

exports.unfollow = async (req, res, next) => {
  try {
    await Promise.all([
      User.updateOne({ _id: req.userId }, { $pull: { following: req.params.userId } }),
      User.updateOne({ _id: req.params.userId }, { $pull: { followers: req.userId } }),
    ]);
    res.json({ following: false });
  } catch (e) { next(e); }
};

exports.followingFeed = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('following blockedUsers blockedBy');
    const blocked = [...user.blockedUsers, ...user.blockedBy].map(String);
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(30, Math.max(1, Number(req.query.limit) || 12));
    const stories = await Story.find({ postedBy: { $in: user.following.map(String), $nin: blocked }, isDraft: false })
      .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    res.json({ data: stories, page, hasMore: stories.length === limit });
  } catch (e) { next(e); }
};

exports.comments = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    await story.populate('comments.author', 'username avatar');
    res.json({ data: story.comments });
  } catch (e) { next(e); }
};

exports.addComment = async (req, res, next) => {
  try {
    const text = String(req.body.text || '').trim();
    if (!text || text.length > 1000) return res.status(400).json({ message: 'Comment must be between 1 and 1000 characters' });
    const story = await Story.findById(req.params.storyId);
    if (!story || story.isDraft) return res.status(404).json({ message: 'Story not found' });
    if (req.body.parent && !story.comments.some((existing) => String(existing._id) === String(req.body.parent))) return res.status(400).json({ message: 'Reply target was not found in this story' });
    const comment = { author: req.userId, text, ...(req.body.parent ? { parent: req.body.parent } : {}) };
    story.comments.push(comment);
    await story.save();
    await story.populate('comments.author', 'username avatar');
    if (story.postedBy !== req.userId) await Notification.create({ recipient: story.postedBy, actor: req.userId, type: 'comment', story: story._id, message: 'commented on your story' });
    res.status(201).json({ comment: story.comments[story.comments.length - 1] });
  } catch (e) { next(e); }
};

exports.report = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story || story.isDraft) return res.status(404).json({ message: 'Story not found' });
    if (story.reports.some((r) => String(r.reporter) === req.userId)) return res.status(409).json({ message: 'You already reported this story' });
    story.reports.push({ reporter: req.userId, reason: String(req.body.reason || 'Other').slice(0, 500) });
    await story.save();
    res.status(201).json({ message: 'Report received' });
  } catch (e) { next(e); }
};

exports.block = async (req, res, next) => {
  try {
    if (req.params.userId === req.userId) return res.status(400).json({ message: 'You cannot block yourself' });
    const [actor, target] = await Promise.all([User.findById(req.userId), User.findById(req.params.userId)]);
    if (!target) return res.status(404).json({ message: 'Creator not found' });
    await Promise.all([
      User.updateOne({ _id: actor._id }, { $addToSet: { blockedUsers: target._id }, $pull: { following: target._id, followers: target._id } }),
      User.updateOne({ _id: target._id }, { $addToSet: { blockedBy: actor._id } }),
      User.updateOne({ _id: target._id }, { $pull: { following: actor._id, followers: actor._id } }),
    ]);
    res.json({ blocked: true });
  } catch (e) { next(e); }
};

exports.notifications = async (req, res, next) => {
  try {
    const data = await Notification.find({ recipient: req.userId }).populate('actor', 'username avatar').sort({ createdAt: -1 }).limit(50);
    res.json({ data });
  } catch (e) { next(e); }
};

exports.readNotifications = async (req, res, next) => {
  try {
    await Notification.updateMany({ recipient: req.userId, read: false }, { $set: { read: true } });
    res.json({ success: true });
  } catch (e) { next(e); }
};
