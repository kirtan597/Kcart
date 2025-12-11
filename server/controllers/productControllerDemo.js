import { dummyProducts } from "../data/dummyProducts.js";

// Function for add product (demo mode - just return success)
const addProduct = async (req, res) => {
  try {
    res.json({ success: true, message: "Product Added Successfully (Demo Mode)." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for list product - returns dummy products
const listProduct = async (req, res) => {
  try {
    const products = dummyProducts;
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing product (demo mode - just return success)
const removeProduct = async (req, res) => {
  try {
    res.json({ success: true, message: "Product removed successfully (Demo Mode)" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = dummyProducts.find(p => p._id === productId);
    res.json({ success: true, singleProduct: product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };