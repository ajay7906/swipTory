



const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
    postedBy: {
        type: String,
        ref: "users"
    },

    stories: [{

        heading: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        chooseCategory: {
            type: String,
            required: true
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


