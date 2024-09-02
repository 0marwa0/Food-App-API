import validator from "validator";
import bcrypt from "bcrypt";
import UserModle from "../modles/userModle.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { checkOTP, sendOTP } from "../utilizFun/index.js";
let getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await UserModle.findOne({ _id: id });
    res.json({ success: true, massage: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "User is not found!" });
  }
};

let deleteAccount = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await UserModle.findOne({ _id: id });
    if (user) {
      await UserModle.deleteOne({ _id: id });
      res.json({ success: true, massage: "User deleted!" });
    } else {
      res.json({ success: false, massage: "User is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "Something worng happen!" });
  }
};
let resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    await sendOTP(email);
    res.json({ success: true, massage: "OTP sended!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, massage: "Something went wrong!!" });
  }
};
let resetPassword = async (req, respone) => {
  const { otp, email, newPassword } = req.body;
  try {
    await checkOTP(otp, email, newPassword);

    respone.json({ success: true, massage: "Password reset done!" });
  } catch (error) {
    console.log(error);
    respone.json({ success: false, massage: "Could not change the password" });
  }
};

let loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModle.findOne({ email });
  if (!user) {
    res.json({ success: false, massage: "User is not exist" });
  }

  const matchPassword = bcrypt.compare(password, user.password);
  if (!matchPassword) {
    res.json({ success: false, massage: "wrong password" });
  } else {
    const token = createToken(user._id);
    res.json({ success: true, token: token });
  }
};

let registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check the email
  if (!validator.isEmail(email)) {
    res.status(200).json({ success: false, massage: "Please write " });
  } // check the password
  if (!validator.isStrongPassword(password)) {
    res
      .status(200)
      .json({ success: false, massage: "Please enter strong password" });
  }
  // encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModle({
    name: name,
    password: hashedPassword,
    email: email,
  });
  const user = await newUser.save();
  const token = createToken(user._id);
  // create token and send it in the respone
  try {
    res.json({
      success: true,
      massage: "add user done!",
      token: token,
    });
  } catch (error) {
    res.json({ success: false, massage: "something went worng!" });
  }
};

let createToken = (userId) => {
  let secret = process.env.SECERT;
  let token = jwt.sign({ userId }, secret);
  return token;
};

export {
  registerUser,
  loginUser,
  resetPassword,
  resetPasswordRequest,
  getUser,
  deleteAccount,
};
