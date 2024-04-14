import Comment from "../models/CommentModel.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { targetType, novelId, chapterId } = req.body;
    if (!novelId) {
      return next(errorHandler(400, "Novel ID is required"));
    }
    if (targetType === 'chapter' && !chapterId) {
      return next(errorHandler(400, "Chapter ID is required for chapter comments"));
    }
    const comment = new Comment({
      ...req.body,
      targetType,
      userId: req.user.id,
    });
    await comment.save();
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    next(error);
  }
};
// Fetch all comments
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      return next(errorHandler(404, "Comments not found"));
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Fetch comments based on novelId
export const getCommentsByNovel = async (req, res, next) => {
  try {
    const comments = await Comment.find({ novelId: req.params.novelId, targetType: 'novel' });
    if (!comments) {
      return next(errorHandler(404, "Comments not found"));
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Fetch comments based on chapterId
export const getCommentsByChapter = async (req, res, next) => {
  try {
    const comments = await Comment.find({ chapterId: req.params.chapterId, targetType: 'chapter' });
    if (!comments) {
      return next(errorHandler(404, "Comments not found"));
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (!req.user.isAdmin && req.user.id !== comment.userId.toString()) {
      return next(
        errorHandler(403, "You are not allowed to update this comment")
      );
    }
    Object.assign(comment, req.body);
    await comment.save();
    res.json({ message: "Comment updated successfully", comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    if (!req.user.isAdmin && req.user.id !== comment.userId.toString()) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await Comment.deleteOne({ _id: comment._id });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
