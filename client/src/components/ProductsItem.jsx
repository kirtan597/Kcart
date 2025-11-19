import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShopContext } from "../context/ShopContext";
import "swiper/css";

const ProductsItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const images = Array.isArray(image) ? image : [image];

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to={`/product/${id}`}
      onClick={handleClick}
      className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 bg-white"
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-50 to-gray-100">
        <Swiper spaceBetween={0} slidesPerView={1}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`${name} - ${idx + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-gradient-to-b from-white to-gray-50">
        <h3 className="font-semibold text-base mb-2 text-gray-800 group-hover:text-gray-900 transition-colors line-clamp-2 heading-font">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl text-gray-900 font-bold price-text">{currency}{price}</span>
          <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductsItem;
