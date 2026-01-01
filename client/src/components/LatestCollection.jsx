import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import { Container, Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts([...products].reverse().slice(0, 10));
    }
  }, [products]);

  // Always show products - fallback products are loaded by default
  if (!products || products.length === 0) {
    return (
      <section className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-light tracking-widest text-gray-500">
            LOADING PRODUCTS...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Title text1="LATEST" text2="COLLECTIONS" />
          </div>
          <p className="max-w-2xl mx-auto text-sm font-light tracking-wide text-gray-600 leading-relaxed">
            Discover our exclusive curation of premium pieces that redefine modern elegance.
            Each item is meticulously selected to embody timeless sophistication.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {latestProducts.map((item) => (
            <ProductsItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* View More */}
        <div className="mt-16 text-center">
          <Link
            to="/collection"
            className="inline-block"
          >
            <button className="border-2 border-gray-900 bg-transparent hover:bg-gray-900 hover:text-white transition-all duration-300 px-8 py-3 text-sm tracking-widest font-medium text-gray-900 rounded-lg shadow-sm hover:shadow-md cursor-pointer">
              VIEW FULL COLLECTION
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
