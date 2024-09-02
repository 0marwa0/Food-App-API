import express from "express";
import {
  addResurant,
  deleteResturant,
  editResturant,
  getAllResturant,
} from "../controllers/resturantController.js";
import multer from "multer";

const multConfig = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, Date.now() + "resturant" + file.originalname);
  },
});

const upload = multer({ storage: multConfig }).fields([
  { name: "cover", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);
const resturantRouter = express.Router();
resturantRouter.post("/add", upload, addResurant);
resturantRouter.delete("/delete", deleteResturant);
resturantRouter.get("/get-all", getAllResturant);
resturantRouter.put("/edit", upload, editResturant);

export default resturantRouter;
