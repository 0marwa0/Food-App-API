import foodModel from "../modles/foodModle.js";

const addFood = async (req, res) => {
  let imageFileName = req.file.filename;
  const { name, price, category, description } = req.body;
  const food = new foodModel({
    name: name,
    price: price,
    category: category,
    description: description,
    image: imageFileName,
  });
  try {
    await food.save();
    res.json({ success: true, massage: "Food added successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      massage: "Something went wrong!!",
    });
  }
};

export { addFood };
