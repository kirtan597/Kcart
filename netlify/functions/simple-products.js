// Simple Products API - No dependencies, just returns products
export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Simple products data
  const products = [
    {
      _id: "1",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.",
      price: 499,
      image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716634345448,
      bestseller: true
    },
    {
      _id: "2",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "Lightweight denim jacket perfect for casual outings.",
      price: 1899,
      image: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["M", "L", "XL"],
      date: 1716621345448,
      bestseller: false
    },
    {
      _id: "3",
      name: "Girls Round Neck Cotton Top",
      description: "Comfortable cotton top for girls with vibrant colors.",
      price: 399,
      image: ["https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?w=500"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      date: 1716234545448,
      bestseller: false
    },
    {
      _id: "4",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "Stylish and comfortable jacket for women.",
      price: 1599,
      image: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716622345448,
      bestseller: false
    },
    {
      _id: "5",
      name: "Men Tapered Fit Flat-Front Trousers",
      description: "Professional looking trousers with tapered fit.",
      price: 1299,
      image: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"],
      category: "Men",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716621542448,
      bestseller: false
    },
    {
      _id: "6",
      name: "Women Palazzo Pants with Waist Belt",
      description: "Elegant palazzo pants with stylish waist belt.",
      price: 999,
      image: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"],
      category: "Women",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716627745448,
      bestseller: false
    },
    {
      _id: "7",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "Comfortable cotton t-shirt for boys.",
      price: 399,
      image: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      date: 1716625545448,
      bestseller: false
    },
    {
      _id: "8",
      name: "Men Premium Cotton T-shirt",
      description: "Premium quality cotton t-shirt.",
      price: 599,
      image: ["https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716622345448,
      bestseller: true
    }
  ];

  try {
    // Always return success with products
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        products: products,
        message: "Products loaded successfully",
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: products.length,
          perPage: products.length
        }
      })
    };
  } catch (error) {
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