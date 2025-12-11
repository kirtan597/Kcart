import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // Original fields
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true },
  
  // Enhanced fields for better product management
  title: { type: String }, // Alternative to name
  isNew: { type: Boolean, default: false },
  oldPrice: { type: Number },
  discountedPrice: { type: Number },
  type: { type: String }, // Product type (jacket, t-shirt, etc.)
  stock: { type: Number, default: 0 },
  brand: { type: String },
  rating: { type: Number, min: 1, max: 5, default: 3 },
  
  // Additional metadata
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive', 'out-of-stock'], default: 'active' }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better search performance
productSchema.index({ category: 1, type: 1, brand: 1 });
productSchema.index({ name: 'text', title: 'text', description: 'text' });

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
