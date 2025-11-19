import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dummyProducts } from "../data/dummyProducts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, "../data/products.json");

// Initialize products file with dummy data if empty
const initializeProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, "utf8");
    const products = JSON.parse(data);
    if (products.length === 0) {
      fs.writeFileSync(productsFilePath, JSON.stringify(dummyProducts, null, 2));
      console.log("✅ Initialized with dummy products");
    }
  } catch (error) {
    fs.writeFileSync(productsFilePath, JSON.stringify(dummyProducts, null, 2));
    console.log("✅ Created products file with dummy data");
  }
};

// Read products from file
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write products to file
const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // For demo, use placeholder images
    const imageUrls = [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
    ];

    const products = readProducts();
    const newProduct = {
      _id: String(Date.now()),
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
      image: imageUrls,
      date: Date.now(),
    };

    products.push(newProduct);
    writeProducts(products);

    res.json({ success: true, message: "Product Added Successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for list product
const listProduct = async (req, res) => {
  try {
    const products = readProducts();
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing product
const removeProduct = async (req, res) => {
  try {
    const products = readProducts();
    const filteredProducts = products.filter((p) => p._id !== req.body.id);
    writeProducts(filteredProducts);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const products = readProducts();
    const product = products.find((p) => p._id === productId);
    res.json({ success: true, singleProduct: product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Initialize on module load
initializeProducts();

export { addProduct, listProduct, removeProduct, singleProduct };
