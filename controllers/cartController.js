import userModel from "../models/userModel.js";

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cart;

    return res.json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cart;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    return res.json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cart;

    if (cartData[req.body.itemId]) {
      if (cartData[req.body.itemId] == 1) {
        delete cartData[req.body.itemId];
      } else {
        cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed From cart" });
    } else {
      res.json({ success: false, message: "Nothing To Remove" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { getCart, addToCart, removeFromCart };
