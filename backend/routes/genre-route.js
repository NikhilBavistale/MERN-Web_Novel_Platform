import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createGenre, getAllGenres } from "../controllers/genre-controller.js";

const router = express.Router();

router.get("/", getAllGenres );

router.post("/", verifyToken, createGenre);

export default router;
