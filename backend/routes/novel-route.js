import express from "express";
import {
  createNovel,
  deleteNovel,
  getNovelById,
  getNovels,
  updateNovel,
} from "../controllers/novel-controller.js";

const router = express.Router();

router.get("/", getNovels);
router.get("/:id", getNovelById);
router.post("/", createNovel);
router.put("/:id", updateNovel);
router.delete("/:id", deleteNovel);

export default router;
