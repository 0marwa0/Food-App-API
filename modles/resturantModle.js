import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  rating: { type: Number },
  reivews: { type: Number },
  logImage: { type: String, require: true },
  coverImage: { type: String, require: true },
  category: { type: String, require: true },
  delivery: { type: String, require: true },
  menu: [],
});

const resturantModal =
  mongoose.models.resturant || mongoose.model("resturant", resturantSchema);
export default resturantModal;
