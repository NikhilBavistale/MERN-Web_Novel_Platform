const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "chapter",
    },
  },
  { timestamps: true }
);

librarySchema.index({ userId: 1, novelId: 1 }, { unique: true });

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
