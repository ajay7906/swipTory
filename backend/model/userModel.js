const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    blockedUsers: [{ type: ObjectId, ref: "User" }],
    blockedBy: [{ type: ObjectId, ref: "User" }],
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
});



const User = mongoose.model("User", userSchema)

module.exports = User;
