// Ultra-simple products function for testing

export const handler = async (event, context) => {
  console.log('Simple products function called');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const simpleProducts = [
    {
      _id: "1",
      name: "Test Product 1",
      price: 100,
      category: "Men",
      image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"]
    },
    {
      _id: "2", 
      name: "Test Product 2",
      price: 200,
      category: "Women",
      image: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500"]
    }
  ];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      products: simpleProducts,
      message: "Simple products API working!"
    })
  };
};