import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import validator from "validator";
import userRouter from "./routes/userRouter.js";
import foodRouter from "./routes/foodRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import resturantRouter from "./routes/resturantRouter.js";

// create the app server
const app = express();
const port = 3000;
// set the middlewear
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/test", (req, res) => {
  let name = req.body.name;
  res.json(name);
});
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/category", categoryRouter);
app.use("/api/resturant", resturantRouter);

connectDB();
app.listen(port, () => {
  console.log(`Server is up and running on port${port}`);
});
