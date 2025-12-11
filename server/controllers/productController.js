import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

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
    const image1 = req.files.image1?.[0] || null;
    const image2 = req.files.image2?.[0] || null;
    const image3 = req.files.image3?.[0] || null;
    const image4 = req.files.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for list product with filtering and pagination
const listProduct = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      subCategory, 
      type, 
      brand, 
      minPrice, 
      maxPrice, 
      sortBy = 'date', 
      sortOrder = 'desc',
      search,
      isNew,
      bestseller
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };
    
    if (category) filter.category = new RegExp(category, 'i');
    if (subCategory) filter.subCategory = new RegExp(subCategory, 'i');
    if (type) filter.type = new RegExp(type, 'i');
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (isNew !== undefined) filter.isNew = isNew === 'true';
    if (bestseller !== undefined) filter.bestseller = bestseller === 'true';
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get products with pagination
    const products = await productModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count for pagination
    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({ 
      success: true, 
      products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalProducts,
        perPage: Number(limit),
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await productModel.find({ 
      category: new RegExp(category, 'i'),
      status: 'active'
    }).sort({ date: -1 });
    
    res.json({ success: true, products, category });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await productModel.find({ 
      featured: true,
      status: 'active'
    }).sort({ date: -1 }).limit(10);
    
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to get bestsellers
const getBestsellers = async (req, res) => {
  try {
    const products = await productModel.find({ 
      bestseller: true,
      status: 'active'
    }).sort({ rating: -1, date: -1 }).limit(10);
    
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to get new arrivals
const getNewArrivals = async (req, res) => {
  try {
    const products = await productModel.find({ 
      isNew: true,
      status: 'active'
    }).sort({ date: -1 }).limit(10);
    
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
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
    const singleProduct = await productModel.findById(productId);
    res.json({ success: true, singleProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  addProduct, 
  listProduct, 
  removeProduct, 
  singleProduct,
  getProductsByCategory,
  getFeaturedProducts,
  getBestsellers,
  getNewArrivals
};
