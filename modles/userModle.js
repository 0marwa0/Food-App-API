import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cart: { default: {} },
    otp: { type: String },
    otpExpiry: { type: String },
  },
  { minimize: true }
);

const UserModle = mongoose.model.user || mongoose.model("user", userSchema);

export default UserModle;
