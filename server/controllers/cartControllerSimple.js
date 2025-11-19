import { users } from "./userControllerSimple.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = users.get(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    user.cartData = cartData;
    users.set(userId, user);

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const user = users.get(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};
    cartData[itemId][size] = quantity;

    user.cartData = cartData;
    users.set(userId, user);

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = users.get(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
