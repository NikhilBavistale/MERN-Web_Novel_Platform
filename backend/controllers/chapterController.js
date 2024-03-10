// chapterController.js
import Chapter from "../models/ChapterModel.js";
import Novel from "../models/NovelModel.js";
import { errorHandler } from "../utils/error.js";

// Create a new chapter within a specific novel
export const createChapter = async (req, res, next) => {
  const { novelId } = req.params;
  try {
    // if (!req.user) {
    //   return next(
    //     errorHandler(403, "You need to be logged in to create a chapter")
    //   );
    // }
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }
    const existingChapters = await Chapter.find({ novelId: novel._id });

    const newChapter = new Chapter({
      ...req.body,
      novelId: novel._id,
      userId: novel.userId,
      slug: req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, ""),
      number: existingChapters.length + 1,
    });
    const savedChapter = await newChapter.save();
    res.status(201).json(savedChapter);
  } catch (error) {
    next(error);
  }
};

// Get All Novels with Chapters:
export const getAllChapters = async (req, res, next) => {
  try {
    const { userId } = req.params;  
    const chapters = await Chapter.find({ userId: userId }).populate('novelId', 'title');

    res.status(200).json(chapters);
  } catch (error) {
    next(error);
  }
};

// Get all chapters belonging to a specific novel
export const getChaptersByNovel = async (req, res, next) => {
  const { novelId } = req.params;
  try {
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }
    const chapters = await Chapter.find({ novelId: novel._id }).sort({
      number: 1,
    });
    res.status(200).json(chapters);
  } catch (error) {
    next(error);
  }
};

// Get a specific chapter by ID within a specific novel
export const getChapter = async (req, res, next) => {
  const { novelId, chapterId } = req.params;
  try {
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }
    const chapter = await Chapter.findOne({
      _id: chapterId,
      novelId: novel._id,
    });
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    next(error);
  }
};

// Update a specific chapter by ID within a specific novel
export const updateChapter = async (req, res, next) => {
  const { novelId, chapterId } = req.params;
  try {
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return next(errorHandler(404, "Novel not found"));
    }
    // if (!req.user.isAdmin && req.user.id !== novel.userId.toString()) {
    //   return next(
    //     errorHandler(403, "You are not allowed to update this chapter")
    //   );
    // }
    const updatedChapter = await Chapter.findOneAndUpdate(
      { _id: chapterId, novelId: novel._id, userId: novel.userId },
      {
        $set: {
          ...req.body,
          slug: req.body.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, ""),
        },
      },
      { new: true }
    );
    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(updatedChapter);
  } catch (error) {
    next(error);
  }
};

// Delete a specific chapter by ID within a specific novel
export const deleteChapter = async (req, res, next) => {
  const { novelId, chapterId } = req.params;

  if (!chapterId) {
    return res.status(404).json({ message: "Chapter not found" });
  }

  try {
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }
    // if (!req.user.isAdmin && req.user.id !== novel.userId.toString()) {
    //   return next(
    //     errorHandler(403, "You are not allowed to delete this chapter")
    //   );
    // }
    await Chapter.findOneAndDelete({
      _id: chapterId,
      novelId: novel._id,
      userId: novel.userId,
    });
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    next(error);
  }
};
