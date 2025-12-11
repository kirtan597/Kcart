import mongoose from 'mongoose';
import productModel from '../models/productModel.js';

const productsData = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Long sleeve Jacket",
    description: "A stylish long sleeve jacket",
    price: 150,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
    date: Date.now()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Casual T-shirt",
    description: "Comfortable cotton t-shirt",
    price: 25,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: false,
    image: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"],
    date: Date.now()
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Blue Jeans",
    description: "Classic blue denim jeans",
    price: 80,
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["28", "30", "32"],
    bestseller: false,
    image: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
    date: Date.now()
  }
];

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