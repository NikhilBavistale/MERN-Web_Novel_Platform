import Genre from "../models/GenreModel.js";
import { errorHandler } from "../utils/error.js";

export const getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

export const createGenre = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create genre"));
  }
  const newGenre = new Genre({
    name: req.body.genre,
  });
  try {
    const genre = await newGenre.save();
    res.status(200).json(genre);
  } catch (error) {
    next(error);
  }
};