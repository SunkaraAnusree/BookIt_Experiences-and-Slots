import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  slots: [String],
});

export default mongoose.model("Experience", experienceSchema);
