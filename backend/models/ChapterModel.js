import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
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
    number: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

chapterSchema.index({ novelId: 1, slug: 1 }, { unique: true });

chapterSchema.index({ novelId: 1, number: 1 }, { unique: true });

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;
