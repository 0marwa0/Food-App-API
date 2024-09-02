import crypto from "crypto";
import nodemailer from "nodemailer";
import UserModle from "../modles/userModle.js";
import bcrypt from "bcrypt";
async function checkOTP(otp, email, newPassword) {
  // get the user from db
  const user = await UserModle.findOne({ email });
  // check user email
  if (!user) {
    throw new Error("User not found");
  }
  // check otp
  if (otp != user.otp) {
    throw new Error("OTP invalied");
  }
  // check expiry
  if (user.otpExpiry < Date.now()) {
    throw new Error("OTP expired!");
  }
  // hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 11);
  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  // update user password with hashed password
}

async function sendOTP(email) {
  // genrate otp & otp expiry
  const otp = crypto.randomInt(100, 999).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  // get the user
  const user = await UserModle.findOne({ email });
  // check the email of the user
  if (!user) {
    throw new Error("User is not found");
  }
  // save the otp & otp expiry in user table
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();
  const hostConfig = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "marwajawad19@gmail.com",
      pass: "cysy ssbk ymyu nrwz",
    },
  });
  const mailOptions = {
    from: "marwajawad19@gmail.com",
    to: email,
    subject: "Reset Password",
    text: `Your OTP is ${otp}`,
  };
  await hostConfig.sendMail(mailOptions);
  // send the an email with otp to the user
}
function removeEmptyProperties(obj) {
  const result = {};
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && obj[k] != null) {
      result[k] = obj[k];
    }
  }
  return result;
}
export { sendOTP, checkOTP, removeEmptyProperties };
