// Netlify Function for Cart API
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, token',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// In-memory cart storage (in production, use a database)
let cartStorage = {};

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { httpMethod, path } = event;
  const body = event.body ? JSON.parse(event.body) : {};
  const token = event.headers.token || event.headers.authorization;
  
  try {
    // POST /cart - Handle cart operations based on body content
    if (httpMethod === 'POST') {
      // Check if it's an add operation (has itemId and size)
      if (body.itemId && body.size && !body.hasOwnProperty('quantity')) {
      const { itemId, size } = body;
      
      if (!itemId || !size) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Item ID and size are required'
          })
        };
      }

      // Use token as user identifier (in production, decode JWT)
      const userId = token || 'guest';
      
      if (!cartStorage[userId]) {
        cartStorage[userId] = {};
      }
      
      if (!cartStorage[userId][itemId]) {
        cartStorage[userId][itemId] = {};
      }
      
      cartStorage[userId][itemId][size] = (cartStorage[userId][itemId][size] || 0) + 1;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Item added to cart'
        })
      };
    }

      // Get cart items (empty body or no specific operation)
      } else if (!body.itemId && !body.size && !body.quantity) {
      const userId = token || 'guest';
      const cartData = cartStorage[userId] || {};

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          cartData
        })
      };
    }

      // Update cart quantity (has itemId, size, and quantity)
      } else if (body.itemId && body.size && body.hasOwnProperty('quantity')) {
      const { itemId, size, quantity } = body;
      const userId = token || 'guest';
      
      if (!cartStorage[userId]) {
        cartStorage[userId] = {};
      }
      
      if (!cartStorage[userId][itemId]) {
        cartStorage[userId][itemId] = {};
      }
      
      if (quantity <= 0) {
        delete cartStorage[userId][itemId][size];
        if (Object.keys(cartStorage[userId][itemId]).length === 0) {
          delete cartStorage[userId][itemId];
        }
      } else {
        cartStorage[userId][itemId][size] = quantity;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Cart updated'
        })
      };
      }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Cart API endpoint not found'
      })
    };

  } catch (error) {
    console.error('Cart API Error:', error);
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