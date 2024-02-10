import Novel from "../models/NovelModel.js";
export const createNovel = async (req, res) => {
  try {
    const { title, authorName, description, genre, imageURL } = req.body;
    const newNovel = new Novel({ title, authorName, description, genre, imageURL });
    await newNovel.save();
    res.status(201).json(newNovel);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
export const getNovels = async (req, res) => {
  try {
    const novels = await Novel.find();
    res.json(novels);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
export const updateNovel = async (req, res) => {
  try {
    const novelId = req.params.id;
    const { title, authorName, description, genre, imageURL } = req.body;
    const updatedNovel = await Novel.findByIdAndUpdate(
      novelId,
      { title, authorName, description, genre, imageURL },
      { new: true }
    );
    if (!updatedNovel) {
      return res.status(404).json({ msg: "Novel not found" });
    }
    res.json(updatedNovel);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
export const deleteNovel = async (req, res) => {
  try {
    const novelId = req.params.id;
    // Check if the novel exists
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ msg: "Novel not found" });
    }
    // Delete the novel
    await Novel.findByIdAndDelete(novelId);
    res.json({ msg: "Novel deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
export const getNovelById = async (req, res) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ msg: "Novel not found" });
    }
    res.json(novel);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
