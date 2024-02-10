// models/NovelModel.js
import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    unique: true,
  },
  authorName: {
    type: String,
    required: true,
    unique: true,

  },
  imageURL: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
},
{ timestamps: true }
);

const Novel = mongoose.model("Novel", novelSchema);
export default Novel;
