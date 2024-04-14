import Library from "../models/LibraryModel.js";
import { errorHandler } from "../utils/error.js";

// Route to get all libraries
export const getAllLibraries = async (req, res, next) => {
  try {
    const libraries = await Library.find();
    res.status(200).json(libraries);
  } catch (error) {
    next(error);
  }
};
// Route to get libraries for a specific user
export const getUserLibraries = async (req, res, next) => {
  try {
    const libraries = await Library.find({ userId: req.user.id }).populate('novelId');;
    res.status(200).json(libraries);
  } catch (error) {
    next(error);
  }
};
// Route to get a single library by id
export const getLibraryById = async (req, res, next) => {
  try {
    const library = await Library.findOne({
      _id: req.params.libraryId,
      userId: req.user.id,
    });
    if (!library) {
      return next(errorHandler(404, "Library not found"));
    }
    res.status(200).json(library);
  } catch (error) {
    next(error);
  }
};
// Create library for a Specific user and novel:
export const createLibrary = async (req, res, next) => {
  if (!req.user) {
    return next(
      errorHandler(403, "You need to be logged in to create a library")
    );
  }
  const newLibrary = new Library({
    ...req.body,
    userId: req.user.id,
    novelId: req.params.novelId,
  });
  try {
    const savedLibrary = await newLibrary.save();
    res.status(201).json(savedLibrary);
  } catch (error) {
    next(error);
  }
};
// Update library by id
export const updateLibrary = async (req, res, next) => {
  try {
    const updatedLibrary = await Library.findOneAndUpdate(
      { _id: req.params.libraryId, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedLibrary) {
      return next(errorHandler(404, "Library not found"));
    }
    res.status(200).json(updatedLibrary);
  } catch (error) {
    next(error);
  }
};
// Route to add a novel to the "Reading Now" section
export const addNovelToReadingNow = async (req, res, next) => {
  if (!req.user) {
    return next(
      errorHandler(403, "You need to be logged in to create a library")
    );
  }
  try {
    let library = await Library.findOne({
      userId: req.user.id,
      novelId: req.params.novelId,
    });

    if (!library) {
      library = new Library({
        userId: req.user.id,
        novelId: req.params.novelId,
      });
      await library.save();
    }

    library.isReadingNow = true;

    await library.save();

    res.status(200).json(library);
  } catch (error) {
    next(error);
  }
};
// Route to add a novel to the "Favorites" section
export const addNovelToFavorites = async (req, res, next) => {
  if (!req.user) {
    return next(
      errorHandler(403, "You need to be logged in to create a library")
    );
  }
  try {
    let library = await Library.findOne({
      userId: req.user.id,
      novelId: req.params.novelId,
    });

    if (!library) {
      library = new Library({
        userId: req.user.id,
        novelId: req.params.novelId,
      });
      await library.save();
    }

    library.isFavorite = true;
    await library.save();

    res.status(200).json(library);
  } catch (error) {
    next(error);
  }
};
// Delete library by id
export const deleteLibrary = async (req, res, next) => {
  try {
    const deletedLibrary = await Library.findOneAndDelete({
      _id: req.params.libraryId,
      userId: req.user.id,
    });
    if (!deletedLibrary) {
      return next(errorHandler(404, "Library not found"));
    }
    res.status(200).json(deletedLibrary);
  } catch (error) {
    next(error);
  }
};
