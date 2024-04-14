import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addNovelToFavorites,
  addNovelToReadingNow,
  createLibrary,
  deleteLibrary,
  getAllLibraries,
  getLibraryById,
  getUserLibraries,
  updateLibrary,
} from "../controllers/library-controller.js";

const router = express.Router();
// Routes for libraries
router.get("/", getAllLibraries);
router.get("/getlibraries",verifyToken, getUserLibraries);
router.get("/:libraryId", getLibraryById);
router.post("/create", verifyToken, createLibrary);
router.post("/favorite/:novelId",verifyToken, addNovelToFavorites);
router.post("/add/:novelId",verifyToken, addNovelToReadingNow);
router.put("/update/:libraryId", verifyToken, updateLibrary);
router.delete("/delete/:libraryId", verifyToken, deleteLibrary);

export default router;