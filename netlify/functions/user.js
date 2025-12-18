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
  console.log('User API called:', event.httpMethod, event.path);
  
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
    // GET /user - Health check
    if (httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'User API is working',
          timestamp: new Date().toISOString(),
          availableUsers: demoUsers.map(u => ({ email: u.email, isAdmin: u.isAdmin || false }))
        })
      };
    }

    // POST /user - Handle user operations based on body content
    if (httpMethod === 'POST') {
      console.log('POST request body:', body);
      
      // Validate required fields
      if (!body.email || !body.password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Email and password are required'
          })
        };
      }

      // Check if it's a login operation (has email and password, no name)
      if (body.email && body.password && !body.name) {
        console.log('Processing login for:', body.email);
        const { email, password } = body;
        
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
          console.log('Login failed - user not found or wrong password');
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Invalid email or password. Please check your credentials and try again.'
            })
          };
        }

        // Generate simple token (in production, use JWT)
        // For admin users, include 'admin' in token for easy identification
        const tokenPrefix = user.isAdmin ? 'admin_token' : 'demo_token';
        const token = `${tokenPrefix}_${user._id}_${Date.now()}`;

        console.log('Login successful for:', email);
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
            },
            message: 'Login successful'
          })
        };

      // Register operation (has name, email, and password)
      } else if (body.name && body.email && body.password) {
        console.log('Processing registration for:', body.email);
        const { name, email, password } = body;
        
        // Basic validation
        if (password.length < 8) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'Password must be at least 8 characters long'
            })
          };
        }
        
        // Check if user already exists
        const existingUser = demoUsers.find(u => u.email === email);
        if (existingUser) {
          console.log('Registration failed - user already exists');
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              message: 'An account with this email already exists. Please try logging in instead.'
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

        console.log('Registration successful for:', email);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            token,
            user: {
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              isAdmin: false
            },
            message: 'Account created successfully'
          })
        };
      } else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Invalid request. Please provide the required information.'
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