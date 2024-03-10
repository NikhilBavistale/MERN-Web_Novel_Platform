import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createNovel,
  deleteNovel,
  getAllNovels,
  getNovelById,
  getUserNovels,
  updateNovel,
} from "../controllers/novel-controller.js";

const router = express.Router();
// Routes for novels
router.get("/", getAllNovels);
router.get("/getnovels",verifyToken, getUserNovels);
router.get("/:novelId", getNovelById);
router.post("/create", verifyToken, createNovel);
router.put("/update/:novelId", verifyToken, updateNovel);
router.delete("/delete/:novelId", verifyToken, deleteNovel);

export default router;
