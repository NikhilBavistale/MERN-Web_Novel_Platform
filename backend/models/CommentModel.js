import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    content: {
      type: String,
      required: true,
    },
    upvote: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    targetType: {
      type: String,
      enum: ["novel", "chapter"],
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
