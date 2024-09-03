import resturantModal from "../modles/resturantModle.js";
import { removeEmptyProperties } from "../utilizFun/index.js";

const addResurant = async (req, res) => {
  const { name, category, reviews, rating, delivery } = req.body;
  let coverImage = req.files.cover[0].filename;
  let logoImage = req.files.logo[0].filename;
  const resturant = new resturantModal({
    name: name,
    category: category,
    reviews: reviews,
    delivery: delivery,
    rating: rating,
    coverImage: coverImage,
    logImage: logoImage,
  });
  try {
    console.log(req.files);
    await resturant.save();
    res.json({ success: true, massage: "resturant added successfully!" });
  } catch (error) {
    res.json({ success: false, massage: "could not add resutrant!" });
  }
};

const deleteResturant = async (req, res) => {
  const { id } = req.body;
  try {
    await resturantModal.findByIdAndDelete(id);

    res.json({ success: true, massage: "resturant deleted successfull!" });
  } catch (error) {
    res.json({ success: false, massage: "could not delete resturant!" });
  }
};
const getAllResturant = async (req, res) => {
  try {
    const allResturant = await resturantModal.find({});
    res.json({ success: true, resturants: allResturant });
  } catch (error) {
    res.json({ success: false, massage: "could not get all resturant" });
  }
};

const filterResturant = async (req, res) => {
  const { rating, delivery } = req.body;
  try {
    let query = { delivery: delivery, rating: { $gte: rating } };
    const filteredRedsturant = await resturantModal.find(
      removeEmptyProperties(query)
    );
    res.json({ success: true, resturants: filteredRedsturant });
  } catch (error) {
    res.json({ success: false, massage: "Something wen wrong!!" });
  }
};

const editResturant = async (req, res) => {
  let coverImage = req.files.cover[0].filename;
  let logoImage = req.files.logo[0].filename;
  const { id, name, category, delivery, rating, reviews, menu } = req.body;
  const editedResutrant = removeEmptyProperties({
    name: name,
    category: category,
    delivery: delivery,
    rating: rating,
    reviews: reviews,
    coverImage: coverImage,
    logoImage: logoImage,
    menu: menu,
  });
  try {
    await resturantModal.findByIdAndUpdate(id, editedResutrant);
    res.json({ success: true, massage: "resturant edited successfully!" });
  } catch (error) {
    res.json({ success: false, massage: "could not edit the resturant!" });
  }
};
export {
  addResurant,
  deleteResturant,
  getAllResturant,
  editResturant,
  filterResturant,
};
