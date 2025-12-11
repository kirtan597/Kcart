// Netlify Function for Products API

// Dummy products data embedded directly
const dummyProducts = [
  {
    _id: "1",
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 499,
    image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    bestseller: true
  },
  {
    _id: "2",
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "Lightweight denim jacket perfect for casual outings. Features classic button closure and multiple pockets.",
    price: 1899,
    image: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    date: 1716621345448,
    bestseller: false
  },
  {
    _id: "3",
    name: "Girls Round Neck Cotton Top",
    description: "Comfortable cotton top for girls with vibrant colors and soft fabric.",
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
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Classic cotton t-shirt with comfortable fit and breathable fabric.",
    price: 549,
    image: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716621345448,
    bestseller: false
  },
  {
    _id: "5",
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "Stylish and comfortable jacket for women with zip-front closure.",
    price: 1599,
    image: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716622345448,
    bestseller: false
  },
  {
    _id: "6",
    name: "Girls Round Neck Cotton Top",
    description: "Soft and comfortable cotton top perfect for everyday wear.",
    price: 449,
    image: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716623423448,
    bestseller: false
  },
  {
    _id: "7",
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "Professional looking trousers with tapered fit and flat-front design.",
    price: 1299,
    image: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716621542448,
    bestseller: false
  },
  {
    _id: "8",
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Premium quality cotton t-shirt with round neck design.",
    price: 599,
    image: ["https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716622345448,
    bestseller: true
  },
  {
    _id: "9",
    name: "Girls Round Neck Cotton Top",
    description: "Cute and comfortable top for girls with quality cotton fabric.",
    price: 349,
    image: ["https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?w=500"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716621235448,
    bestseller: false
  },
  {
    _id: "10",
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "Comfortable trousers with modern tapered fit.",
    price: 1199,
    image: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716622235448,
    bestseller: false
  },
  {
    _id: "11",
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Essential cotton t-shirt for everyday comfort.",
    price: 479,
    image: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716623345448,
    bestseller: false
  },
  {
    _id: "12",
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "Classic denim jacket with slim fit design.",
    price: 1799,
    image: ["https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716624445448,
    bestseller: true
  },
  {
    _id: "13",
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
    _id: "14",
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "Versatile denim jacket for all seasons.",
    price: 1699,
    image: ["https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716626645448,
    bestseller: false
  },
  {
    _id: "15",
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
    _id: "16",
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "Comfortable relaxed fit jacket with zip closure.",
    price: 1499,
    image: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716628845448,
    bestseller: false
  },
  {
    _id: "17",
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "Quality cotton t-shirt for active boys.",
    price: 449,
    image: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716629945448,
    bestseller: false
  },
  {
    _id: "18",
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "Durable and comfortable t-shirt for boys.",
    price: 499,
    image: ["https://images.unsplash.com/photo-1516826957135-700dedea698c?w=500"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716631045448,
    bestseller: true
  },
  {
    _id: "19",
    name: "Women Palazzo Pants with Waist Belt",
    description: "Trendy palazzo pants with comfortable fit.",
    price: 1099,
    image: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716632145448,
    bestseller: false
  },
  {
    _id: "20",
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "Stylish jacket perfect for layering.",
    price: 1699,
    image: ["https://images.unsplash.com/photo-1525450824786-227cbef70703?w=500"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716633245448,
    bestseller: false
  }
];

// CORS headers for all responses
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler = async (event, context) => {
  console.log('Products API called:', event.httpMethod, event.path);
  
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
    // GET /api/product/list - List all products
    if (httpMethod === 'GET') {
      const { 
        page = 1, 
        limit = 20, 
        category, 
        search 
      } = queryStringParameters || {};

      let products = [...dummyProducts]; // Create a copy
      
      console.log('Total products available:', products.length);
      
      // Filter by category
      if (category) {
        products = products.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
        console.log('Filtered by category:', category, 'Count:', products.length);
      }
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
        console.log('Filtered by search:', search, 'Count:', products.length);
      }
      
      // Pagination
      const totalProducts = products.length;
      const totalPages = Math.ceil(totalProducts / limit);
      const skip = (page - 1) * limit;
      const paginatedProducts = products.slice(skip, skip + parseInt(limit));

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