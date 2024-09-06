import express from "express";
import { addFood, getFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();
const multConfig = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: multConfig });
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/get", getFood);
export default foodRouter;
