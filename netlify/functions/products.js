// Netlify Function for Products API
import { dummyProducts } from '../../server/data/dummyProducts.js';

// CORS headers for all responses
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { httpMethod, path, queryStringParameters } = event;
  
  try {
    // GET /api/products - List all products
    if (httpMethod === 'GET' && path.includes('/products')) {
      const { 
        page = 1, 
        limit = 20, 
        category, 
        search 
      } = queryStringParameters || {};

      let products = dummyProducts;
      
      // Filter by category
      if (category) {
        products = products.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Pagination
      const totalProducts = products.length;
      const totalPages = Math.ceil(totalProducts / limit);
      const skip = (page - 1) * limit;
      const paginatedProducts = products.slice(skip, skip + parseInt(limit));

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

    // GET /api/products/[id] - Single product
    if (httpMethod === 'GET' && path.includes('/products/')) {
      const productId = path.split('/').pop();
      const product = dummyProducts.find(p => p._id === productId);
      
      if (!product) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Product not found'
          })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          singleProduct: product
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