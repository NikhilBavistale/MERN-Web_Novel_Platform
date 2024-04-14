//models/LibraryModel.js
import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isReadingNow: {
      type: Boolean,
      default: false,
    },
    bookmark: {
      type: Number,
      default: 0,
    },
    bookmark_id: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Chapter",
    },
  },
  { timestamps: true }
);

librarySchema.index({ userId: 1, novelId: 1 }, { unique: true });

const Library = mongoose.model("Library", librarySchema);

export default Library;
