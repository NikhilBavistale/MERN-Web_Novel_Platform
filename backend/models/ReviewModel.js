const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        novelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Novel",
        required: true,
        },
        content: {
            type: String,
            required: true,
        },
        upvote: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'user' 
            }],
            default: []
        },
        downvote: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'user' 
            }],
            default: []
        }
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;