// // models/Story.js
// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema.Types
// const storySchema = new mongoose.Schema({
//     postedBy: {
//         type: ObjectId,
//         ref: "users"
//     },


//     slide: [
//         {
//             stories: [
//                 {
//                     postId: {
//                         type: String,
//                         required: true
//                     },
//                     heading: {
//                         type: String,
//                         required: true
//                     },
//                     description: {
//                         type: String,
//                         required: true
//                     },

//                     imageUrl: {
//                         type: String,
//                         required: true
//                     },
//                     category: {
//                         type: String,
//                         required: true
//                     },


//                     createdAt: {
//                         type: Date,
//                         default: Date.now
//                     }
//                 }
//             ],

//         }
//     ],
//     likes:
//         [{
//             type: ObjectId,
//             ref: "users"
//         }],
//     bookmarkedBy: [
//         {
//             type: ObjectId,
//             ref: "users"
//         }
//     ],
//     shareLink: { type: String },
// });

// const Story = mongoose.model('Story', storySchema);

// module.exports = Story;



const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: "users"
    },
    slide: {
        type: [{
            stories: [{
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
            }]
        }],
        default: [],
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

// Define a pre-save hook to check if a new user is being assigned
storySchema.pre('save', async function (next) {
    const story = this;
    if (story.isModified('postedBy')) {
        // If a new user is being assigned, create a new entry in the slide array
        story.slide.push({ stories: story.stories });
        // Clear the stories array after adding them to the slide
        story.stories = [];
    }
    next();
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
