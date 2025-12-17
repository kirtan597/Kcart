// Netlify Function for Products API - Integrated with Backend Data
import { backendProducts } from './data/backendProducts.js';

// Use the backend products data
const products = backendProducts;

// CORS headers for all responses
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler = async (event) => {
  console.log('Products API called:', event.httpMethod, event.path);
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { httpMethod, queryStringParameters } = event;
  const body = event.body ? JSON.parse(event.body) : {};
  const token = event.headers.token || event.headers.authorization;
  
  try {
    // GET /api/product/list - List all products
    if (httpMethod === 'GET') {
      const { 
        page = 1, 
        limit = 20, 
        category, 
        subCategory,
        search,
        bestseller,
        sortBy = 'date',
        sortOrder = 'desc'
      } = queryStringParameters || {};

      let filteredProducts = [...products]; // Create a copy
      
      console.log('Total products available:', filteredProducts.length);
      
      // Filter by category
      if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
        console.log('Filtered by category:', category, 'Count:', filteredProducts.length);
      }
      
      // Filter by subcategory
      if (subCategory) {
        filteredProducts = filteredProducts.filter(p => 
          p.subCategory.toLowerCase() === subCategory.toLowerCase()
        );
        console.log('Filtered by subCategory:', subCategory, 'Count:', filteredProducts.length);
      }
      
      // Filter by bestseller
      if (bestseller === 'true') {
        filteredProducts = filteredProducts.filter(p => p.bestseller === true);
        console.log('Filtered by bestseller, Count:', filteredProducts.length);
      }
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.subCategory.toLowerCase().includes(searchLower)
        );
        console.log('Filtered by search:', search, 'Count:', filteredProducts.length);
      }
      
      // Sort products
      filteredProducts.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === 'price' || sortBy === 'rating' || sortBy === 'date') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      // Pagination
      const totalProducts = filteredProducts.length;
      const totalPages = Math.ceil(totalProducts / limit);
      const skip = (page - 1) * limit;
      const paginatedProducts = filteredProducts.slice(skip, skip + parseInt(limit));

      console.log('Returning products:', paginatedProducts.length);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          products: paginatedProducts,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalProducts,
            perPage: parseInt(limit),
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        })
      };
    }

    // POST /products - Add new product (admin)
    if (httpMethod === 'POST' && body.name) {
      // Simple admin check (in production, verify JWT token)
      if (!token || !token.includes('admin')) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Admin access required'
          })
        };
      }

      const { name, description, price, category, subCategory, sizes, bestseller } = body;
      
      const newProduct = {
        _id: String(products.length + 1),
        name,
        description,
        price: parseInt(price),
        image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"], // Default image
        category,
        subCategory,
        sizes: sizes || ["S", "M", "L"],
        date: Date.now(),
        bestseller: bestseller || false,
        status: "active",
        stock: 50,
        rating: 4.0
      };

      products.push(newProduct);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Product added successfully',
          product: newProduct
        })
      };
    }

    // POST /products - Remove product (admin)
    if (httpMethod === 'POST' && body.id) {
      // Simple admin check
      if (!token || !token.includes('admin')) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Admin access required'
          })
        };
      }

      const productIndex = products.findIndex(p => p._id === body.id);
      if (productIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Product not found'
          })
        };
      }

      products.splice(productIndex, 1);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Product removed successfully'
        })
      };
    }

    // Default response for unmatched routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'API endpoint not found'
      })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};