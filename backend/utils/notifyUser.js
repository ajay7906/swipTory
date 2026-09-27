const Notification = require('../model/notificationModel');
const { getIO } = require('./realtime');

async function notifyUser({ recipient, actor, type, story, message }) {
  if (!recipient || !actor || String(recipient) === String(actor)) return null;
  try {
    const notification = await Notification.create({ recipient, actor, type, story, message });
    const populated = await Notification.findById(notification._id).populate('actor', 'username avatar');
    getIO()?.to(`user:${recipient}`).emit('notification:new', populated);
    return populated;
  } catch (error) {
    console.error('Could not save notification:', error.message);
    return null;
  }
}

module.exports = notifyUser;
