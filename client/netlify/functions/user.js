// Netlify Function for User Authentication API
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// Demo users (in production, use a database)
const demoUsers = [
  {
    _id: '1',
    name: 'Demo User',
    email: 'user@gmail.com',
    password: '12345678', // In production, hash passwords
    cartData: {}
  },
  {
    _id: '2',
    name: 'Admin User',
    email: 'admin@kcart.com',
    password: 'admin123',
    isAdmin: true,
    cartData: {}
  }
];

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
  
  try {
    // POST /user - Handle user operations based on body content
    if (httpMethod === 'POST') {
      // Check if it's a login operation (has email and password, no name)
      if (body.email && body.password && !body.name) {
      const { email, password } = body;
      
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid credentials'
          })
        };
      }

      // Generate simple token (in production, use JWT)
      // For admin users, include 'admin' in token for easy identification
      const tokenPrefix = user.isAdmin ? 'admin_token' : 'demo_token';
      const token = `${tokenPrefix}_${user._id}_${Date.now()}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin || false
          }
        })
      };

      // Register operation (has name, email, and password)
      } else if (body.name && body.email && body.password) {
      const { name, email, password } = body;
      
      // Check if user already exists
      const existingUser = demoUsers.find(u => u.email === email);
      if (existingUser) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'User already exists'
          })
        };
      }

      // Create new user (in production, hash password and save to database)
      const newUser = {
        _id: String(demoUsers.length + 1),
        name,
        email,
        password,
        cartData: {}
      };
      
      demoUsers.push(newUser);
      
      // Generate token
      const token = `demo_token_${newUser._id}_${Date.now()}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          message: 'User registered successfully'
        })
      };
      }
    }

    // Handle admin login separately if needed
    if (httpMethod === 'POST' && path.includes('/admin')) {
      const { email, password } = body;
      
      const admin = demoUsers.find(u => 
        u.email === email && 
        u.password === password && 
        u.isAdmin
      );
      
      if (!admin) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid admin credentials'
          })
        };
      }

      const token = `admin_token_${admin._id}_${Date.now()}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          message: 'Admin login successful'
        })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'User API endpoint not found'
      })
    };

  } catch (error) {
    console.error('User API Error:', error);
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