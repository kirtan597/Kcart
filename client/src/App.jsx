import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import { initializeDemoData } from "./utils/demoDataInitializer";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import NotFound from "./pages/NotFound";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/smoothScroll.css";
import { Verify } from "./pages/Verify";
import { ForgotPassword } from "./pages/ForgotPassword";
import SearchResults from "./pages/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  // Initialize demo data for dashboard (only if needed)
  useEffect(() => {
    // Only initialize demo data if no existing data
    initializeDemoData(false);
  }, []);

  // Initialize Lenis smooth scrolling with optimized settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: 'vertical', // Updated property name
      gestureDirection: 'vertical', // Updated property name
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true, // Automatically resize on window resize
      syncTouch: false, // Disable sync touch for better mobile performance
    });

    // Make Lenis globally accessible for utility functions
    window.lenis = lenis;

    // Optional: Listen to scroll events for custom animations
    lenis.on('scroll', () => {
      // You can add custom scroll-based animations here
      // console.log('Scroll position:', e.scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="px-2 sm:px-4 md:px-6 max-w-[100vw] mx-auto overflow-x-hidden">
      {/* Notifications */}
      <ToastContainer />

      {/* Persistent Layout Components */}
      <Navbar />
      <SearchBar />

      {/* Routing */}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/collection" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/product/:productId" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/verify" element={<ProtectedRoute><Verify /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;
