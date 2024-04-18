// models/Story.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const storySchema = new mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: "users"
    },
    stories: [
        {
            postId: {
                type: String,
                required: true
            },
            heading: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },

            imageUrl: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },


            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    likes:
        [{
            type: ObjectId,
            ref: "users"
        }],
    bookmarkedBy: [
        {
            type: ObjectId,
            ref: "users"
        }
    ],
    shareLink: { type: String },

});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;