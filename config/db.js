import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/food_app").then(() => {
    console.log("db connected");
  });
};

export default connectDB;
