// Netlify Function for Orders API
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, token',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// In-memory order storage (in production, use a database)
let orderStorage = [];
let orderIdCounter = 1;

// Demo order data
const demoOrders = [
  {
    _id: '1',
    userId: '1',
    items: [
      { _id: '1', name: 'Men Round Neck Pure Cotton T-shirt', price: 499, quantity: 2, size: 'M' }
    ],
    amount: 1048,
    address: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipcode: '400001',
      country: 'India',
      phone: '9876543210'
    },
    status: 'Order Placed',
    paymentMethod: 'COD',
    payment: false,
    date: Date.now() - 86400000 // 1 day ago
  }
];

// Initialize with demo data
orderStorage = [...demoOrders];

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
    // POST /api/order/place - Place COD order
    if (httpMethod === 'POST' && path.includes('/order/place')) {
      const { userId, items, amount, address } = body;
      
      if (!userId || !items || !amount || !address) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Missing required fields'
          })
        };
      }

      const newOrder = {
        _id: String(orderIdCounter++),
        userId,
        items,
        amount,
        address,
        status: 'Order Placed',
        paymentMethod: 'COD',
        payment: false,
        date: Date.now()
      };

      orderStorage.push(newOrder);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Order placed successfully',
          orderId: newOrder._id
        })
      };
    }

    // POST /api/order/stripe - Place Stripe order (demo)
    if (httpMethod === 'POST' && path.includes('/order/stripe')) {
      const { userId, items, amount, address } = body;
      
      const newOrder = {
        _id: String(orderIdCounter++),
        userId,
        items,
        amount,
        address,
        status: 'Order Placed',
        paymentMethod: 'Stripe',
        payment: false,
        date: Date.now()
      };

      orderStorage.push(newOrder);

      // Demo Stripe session URL
      const demoSessionUrl = `https://checkout.stripe.com/demo?orderId=${newOrder._id}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          session_url: demoSessionUrl,
          message: 'Order placed successfully'
        })
      };
    }

    // POST /api/order/razorpay - Place Razorpay order (demo)
    if (httpMethod === 'POST' && path.includes('/order/razorpay')) {
      const { userId, items, amount, address } = body;
      
      const newOrder = {
        _id: String(orderIdCounter++),
        userId,
        items,
        amount,
        address,
        status: 'Order Placed',
        paymentMethod: 'Razorpay',
        payment: false,
        date: Date.now()
      };

      orderStorage.push(newOrder);

      // Demo Razorpay order
      const demoOrder = {
        id: `order_${newOrder._id}`,
        amount: amount * 100,
        currency: 'INR',
        receipt: newOrder._id
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          order: demoOrder
        })
      };
    }

    // POST /api/order/userorders - Get user orders
    if (httpMethod === 'POST' && path.includes('/order/userorders')) {
      const { userId } = body;
      
      if (!userId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'User ID is required'
          })
        };
      }

      const userOrders = orderStorage.filter(order => order.userId === userId);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orders: userOrders
        })
      };
    }

    // POST /api/order/list - Get all orders (admin)
    if (httpMethod === 'POST' && path.includes('/order/list')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orders: orderStorage
        })
      };
    }

    // POST /api/order/status - Update order status (admin)
    if (httpMethod === 'POST' && path.includes('/order/status')) {
      const { orderId, status } = body;
      
      const orderIndex = orderStorage.findIndex(order => order._id === orderId);
      if (orderIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Order not found'
          })
        };
      }

      orderStorage[orderIndex].status = status;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Order status updated successfully'
        })
      };
    }

    // POST /api/order/verifyStripe - Verify Stripe payment
    if (httpMethod === 'POST' && path.includes('/order/verifyStripe')) {
      const { orderId, success, userId } = body;
      
      const orderIndex = orderStorage.findIndex(order => order._id === orderId);
      if (orderIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Order not found'
          })
        };
      }

      if (success === 'true') {
        orderStorage[orderIndex].payment = true;
        orderStorage[orderIndex].status = 'Paid';
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Payment verified successfully'
          })
        };
      } else {
        // Remove failed order
        orderStorage.splice(orderIndex, 1);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Payment failed'
          })
        };
      }
    }

    // POST /api/order/verifyRazorpay - Verify Razorpay payment
    if (httpMethod === 'POST' && path.includes('/order/verifyRazorpay')) {
      const { userId, razorpay_order_id } = body;
      
      // Demo verification - in production, verify with Razorpay API
      const orderId = razorpay_order_id.replace('order_', '');
      const orderIndex = orderStorage.findIndex(order => order._id === orderId);
      
      if (orderIndex !== -1) {
        orderStorage[orderIndex].payment = true;
        orderStorage[orderIndex].status = 'Paid';
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment successful'
        })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Order API endpoint not found'
      })
    };

  } catch (error) {
    console.error('Order API Error:', error);
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