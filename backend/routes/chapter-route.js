import express from "express";
import {
  createChapter,
  deleteChapter,
  getChapter,
  getChaptersByNovel,
  updateChapter,
} from "../controllers/chapterController.js";
// import { verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

// Routes for chapters
router.post("/:novelId/chapters", createChapter);
router.get("/:novelId/chapters", getChaptersByNovel);
router.get("/:novelId/chapters/:chapterId", getChapter);
router.put("/:novelId/chapters/:chapterId", updateChapter);
router.delete("/:novelId/chapters/:chapterId", deleteChapter);

export default router;
