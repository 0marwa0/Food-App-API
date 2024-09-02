import express from "express";

import {
  registerUser,
  loginUser,
  resetPasswordRequest,
  resetPassword,
  getUser,
  deleteAccount,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/rest-password-request", resetPasswordRequest);
userRouter.post("/rest-password", resetPassword);
userRouter.get("/getUser", getUser);
userRouter.delete("/delete-account", deleteAccount);
export default userRouter;
