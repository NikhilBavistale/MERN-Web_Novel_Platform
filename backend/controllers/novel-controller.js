import Novel from "../models/NovelModel.js";
import { errorHandler } from "../utils/error.js";

// Route to get all novels sorted by updatedAt
export const getAllNovels = async (req, res, next) => {
  try {
    const { sort = "updatedAt" } = req.query;
    const novels = await Novel.find()
      .populate("genres")
      .sort({ [sort]: -1 });
    const novelsWithGenreName = novels.map((novel) => {
      return {
        ...novel._doc,
        genres: novel.genres.map((genre) => genre.name),
      };
    });
    res.status(200).json(novelsWithGenreName);
  } catch (error) {
    next(error);
  }
};
// Route to get novels for a specific user sorted by updatedAt
export const getUserNovels = async (req, res, next) => {
  try {
    const novels = await Novel.find({ userId: req.user.id })
      .populate("genres", "name")
      .sort({
        updatedAt: -1,
      });
    res.status(200).json(novels);
  } catch (error) {
    next(error);
  }
};
// Route to get a single novel by id
export const getNovelById = async (req, res, next) => {
  try {
    const novel = await Novel.findById(req.params.novelId).populate(
      "genres",
      "name"
    );
    if (!novel) {
      return next(errorHandler(404, "Novel not found"));
    }
    res.status(200).json(novel);
  } catch (error) {
    next(error);
  }
};
// Create novel for a Specific user:
export const createNovel = async (req, res, next) => {
  if (!req.user) {
    return next(
      errorHandler(403, "You need to be logged in to create a novel")
    );
  }
  const newNovel = new Novel({
    ...req.body,
    userId: req.user.id,
    slug: req.body.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, ""),
  });
  try {
    const savedNovel = await newNovel.save();
    res.status(201).json(savedNovel);
  } catch (error) {
    next(error);
  }
};
// Route to update an existing novel
export const updateNovel = async (req, res, next) => {
  try {
    const novel = await Novel.findById(req.params.novelId);
    if (!novel) {
      return next(errorHandler(404, "Novel not found"));
    }

    if (!req.user.isAdmin && req.user.id !== novel.userId.toString()) {
      return next(
        errorHandler(403, "You are not allowed to update this novel")
      );
    }
    const updatedNovel = await Novel.findByIdAndUpdate(
      req.params.novelId,
      {
        $set: {
          ...req.body,
          slug: req.body.title
            ? req.body.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
            : novel.slug,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedNovel);
  } catch (error) {
    next(error);
  }
};

export const deleteNovel = async (req, res, next) => {
  try {
    const novel = await Novel.findById(req.params.novelId);
    if (!novel) {
      return next(errorHandler(404, "Novel not found"));
    }

    if (!req.user.isAdmin && req.user.id !== novel.userId.toString()) {
      return next(
        errorHandler(403, "You are not allowed to delete this novel")
      );
    }
    await Novel.findByIdAndDelete(req.params.novelId);
    res.status(200).json("The novel has been deleted");
  } catch (error) {
    next(error);
  }
};
