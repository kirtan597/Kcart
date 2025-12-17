import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from '../models/productModel.js';
import { dummyProducts } from './dummyProducts.js';

// Load environment variables
dotenv.config();

// Additional products to mark as bestsellers (by ID)
const additionalBestsellers = ["2", "5", "15"]; // Men Denim Jacket, Women Jacket, Women Palazzo Pants

// Convert dummy products to proper format with required fields
const productsData = dummyProducts.map(product => {
  // Check if this product should be a bestseller (original + additional)
  const isBestseller = product.bestseller || additionalBestsellers.includes(product._id);
  
  return {
    ...product,
    _id: new mongoose.Types.ObjectId(),
    status: 'active', // Required by the controller
    bestseller: isBestseller, // Original bestsellers + additional ones
    featured: isBestseller, // Set featured products based on bestseller status
    isNew: Math.random() > 0.7, // Randomly mark some as new arrivals
    rating: Math.floor(Math.random() * 3) + 3, // Random rating 3-5 (better ratings)
    tags: [product.category, product.subCategory], // Add tags for better search
  };
});

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await productModel.deleteMany({});
    console.log('Cleared existing products');

    const insertedProducts = await productModel.insertMany(productsData);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    console.log('Product seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

if (process.argv[2] === 'seed') {
  seedProducts();
}

export { seedProducts, productsData };