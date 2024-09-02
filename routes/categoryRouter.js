import express from "express";
import multer from "multer";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

const multerConfig = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, Date.now() + "category" + file.originalname);
  },
});
const upload = multer({ storage: multerConfig });
categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.get("/get-all", getAllCategory);
categoryRouter.delete("/delete", deleteCategory);
categoryRouter.put("/edit", upload.single("image"), editCategory);
export default categoryRouter;
