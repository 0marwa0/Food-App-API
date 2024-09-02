import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: { type: String, require: true, unique: true },
  image: { type: String, require: true },
});

const categoryModle =
  mongoose.model.category || mongoose.model("category", categorySchema);

export default categoryModle;
