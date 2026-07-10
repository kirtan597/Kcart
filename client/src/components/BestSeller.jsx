import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Get latest bestsellers first
  const bestSellers = [...products]
    .filter((item) => item.bestseller)
    .reverse(); // most recently added first

  const productsPerPage = 5;
  const totalPages = Math.ceil(bestSellers.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = bestSellers.slice(start, start + productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 bg-white py-8 sm:py-12 rounded-xl">
      <div className="text-center mb-8 sm:mb-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-600 font-light tracking-wide px-2">
          Exquisite selections adored by our most discerning clientele. Each piece embodies unparalleled craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6">
        {currentProducts.map(({ _id, image, name, price }) => (
          <ProductsItem
            key={_id}
            id={_id}
            image={image}
            name={name}
            price={price}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm border-2 rounded-lg transition-all duration-200 font-medium ${
                  currentPage === page
                    ? "bg-gray-900 text-white border-gray-900"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
