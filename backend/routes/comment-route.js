import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByChapter,
  getCommentsByNovel,
  updateComment,
} from "../controllers/comment-controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/", verifyToken, createComment);
router.get("/novel/:novelId", getCommentsByNovel);
router.get("/chapter/:chapterId", getCommentsByChapter);
router.put("/:commentId", verifyToken, updateComment);
router.delete("/:commentId", verifyToken, deleteComment);

export default router;
