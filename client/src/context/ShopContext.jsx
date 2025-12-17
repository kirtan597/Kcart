// context/ShopContext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import userTrackingService from "../services/userTrackingService";
import { fallbackProducts } from "../data/fallbackProducts";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  // Use environment variable or fallback to Netlify Functions
  const backendUrl = import.meta.env.VITE_BACKEND_URL || `${window.location.origin}/.netlify/functions`;

  const [products, setProducts] = useState(fallbackProducts); // Start with fallback products
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const navigate = useNavigate();

  // -------------------- CART --------------------
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.warn("Cart add failed:", error.message);
        // Removed toast error for cleaner development experience
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartItemCopy = structuredClone(cartItems);
    cartItemCopy[itemId][size] = quantity;
    setCartItems(cartItemCopy);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.warn("Cart update failed:", error.message);
        // Removed toast error for cleaner development experience
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((p) => p._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  // -------------------- PRODUCT & USER DATA --------------------
  const getProductsData = async () => {
    setIsLoadingProducts(true);
    
    try {
      console.log("🔍 Fetching products from API:", backendUrl + "/api/product/list");
      
      // Set a timeout for the API call
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await axios.get(backendUrl + "/api/product/list", {
        signal: controller.signal,
        timeout: 10000
      });
      
      clearTimeout(timeoutId);
      console.log("📦 API Response:", response.data);
      
      if (response.data.success && response.data.products && response.data.products.length > 0) {
        console.log("✅ API products loaded successfully:", response.data.products.length, "products");
        setProducts(response.data.products);
        // Removed toast notification for cleaner development experience
      } else {
        console.warn("⚠️ API returned no products, using fallback");
        setProducts(fallbackProducts);
        // Removed toast notification for cleaner development experience
      }
    } catch (error) {
      console.error("💥 Error fetching products from API:", error);
      console.log("🔄 Using fallback products instead");
      
      // Always use fallback products if API fails
      setProducts(fallbackProducts);
      
      if (error.name === 'AbortError') {
        console.warn(`⏱️ API timeout - showing ${fallbackProducts.length} demo products`);
      } else {
        console.warn(`🔌 API unavailable - showing ${fallbackProducts.length} demo products`);
      }
      // Removed toast notifications for cleaner development experience
      
      console.log("✅ Fallback products loaded:", fallbackProducts.length, "products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.warn("Get cart failed:", response.data.message);
        // Removed toast error for cleaner development experience
      }
    } catch (error) {
      console.warn("Get cart error:", error.message);
      // Removed toast error for cleaner development experience
    }
  };

  useEffect(() => {
    getProductsData();

    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, []);

  // -------------------- SEARCH --------------------
  const performSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // -------------------- LOGOUT HANDLER --------------------
  const logout = () => {
    // Record logout in tracking service
    userTrackingService.recordLogout();
    
    // Clear authentication state
    setToken("");
    localStorage.removeItem("token");
    setCartItems({});
    
    // Navigate to login page
    navigate("/login");
    
    toast.success("Logged out successfully");
  };

  // -------------------- CONTEXT VALUE --------------------
  const value = {
    products,
    currency,
    delivery_fee,
    backendUrl,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setCartItems,
    token,
    setToken,
    logout,
    navigate,
    searchQuery,
    setSearchQuery,
    searchResults,
    performSearch,
    showSearchBar,
    setShowSearchBar,
    isLoadingProducts,
    getProductsData, // Expose for manual refresh
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
