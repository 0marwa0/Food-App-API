import categoryModle from "../modles/categoryModle.js";
import { removeEmptyProperties } from "../utilizFun/index.js";
const addCategory = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const category = new categoryModle({
    title: title,
    image: image,
  });
  try {
    await category.save();
    res.json({ success: true, massage: "category added successfull!" });
  } catch (error) {
    res.json({ success: false, massage: "could not add category!" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryModle.find({});

    res.json({ success: true, categories: allCategory });
  } catch (error) {
    res.json({ success: false, massage: "could not get all the categories" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    await categoryModle.findByIdAndDelete({ _id: id });
    res.json({ success: true, massage: "category deleted successfully" });
  } catch (error) {
    res.json({ success: false, massage: "could not delete category!" });
  }
};

const editCategory = async (req, res) => {
  const { id, title } = req.body;
  let imageFileName = req.file.filename;
  const editedCategory = removeEmptyProperties({
    title: title,
    image: imageFileName,
  });
  console.log(editedCategory, "cat");
  try {
    await categoryModle.findByIdAndUpdate(id, editedCategory);
    res.json({ success: true, massage: "category edited successfully" });
  } catch (error) {
    res.json({ success: false, massage: "could not edit category!" });
  }
};

export { addCategory, getAllCategory, deleteCategory, editCategory };
