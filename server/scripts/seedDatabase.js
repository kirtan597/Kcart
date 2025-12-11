import mongoose from 'mongoose';
import { seedProducts } from '../data/productSeeder.js';
import dotenv from 'dotenv';

dotenv.config();

const runSeeder = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Run product seeder
    await seedProducts();
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Products have been organized by categories:');
    console.log('   👩 Women: Jackets, T-shirts, Jeans, Dresses, Sarees, etc.');
    console.log('   👨 Men: Hoodies, Jackets, Suits, Polo shirts, etc.');
    console.log('   👶 Kids: T-shirts, Overalls, Sets, etc.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

runSeeder();