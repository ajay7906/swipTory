



const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now, index: true },
    postedBy: {
        type: String,
        ref: "users"
    },

    stories: [{

        heading: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        chooseCategory: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
   
    chooseCategory: {
        type: String,
       
    },
     
    likes: [{
        type: ObjectId,
        ref: "users"
    }],
    bookmarkedBy: [{
        type: ObjectId,
        ref: "users"
    }],
    shareLink: {
        type: String
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    isDraft: { type: Boolean, default: false },
    views: [{ type: ObjectId, ref: "User" }],
    viewCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    comments: [{
        author: { type: ObjectId, ref: "User", required: true },
        text: { type: String, required: true, maxlength: 1000 },
        parent: { type: ObjectId },
        createdAt: { type: Date, default: Date.now }
    }],
    reports: [{
        reporter: { type: ObjectId, ref: "User" },
        reason: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now }
    }],
});




storySchema.pre('save', function (next) {
    if (this.isModified('stories')) {
        // Extract the chooseCategory value from the first story
        const firstStory = this.stories[0];
        if (firstStory && firstStory.chooseCategory) {
            this.chooseCategory = firstStory.chooseCategory;
        }
    }
    next();
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story


