import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [proceedToPayment, setProceedToPayment] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
      setProceedToPayment(tempData.length > 0);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-8 sm:pt-14 px-3 sm:px-6 lg:px-8">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) {
            console.warn("Product not found for ID:", item._id);
            return null;
          }

          return (
            <div
              key={index}
              className="py-4 border-t text-gray-700 flex items-center gap-3 sm:gap-4"
            >
              {/* Product image + info */}
              <div className="flex items-start gap-3 sm:gap-6 flex-1 min-w-0">
                <img
                  src={productData.image?.[0] || "/placeholder.jpg"}
                  alt={productData.name || "Product"}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-medium line-clamp-2">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-4 mt-1.5 text-sm text-gray-600">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 py-0.5 border bg-slate-50 text-xs sm:text-sm">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border w-12 sm:w-20 px-1 sm:px-2 py-1 text-sm text-center flex-shrink-0"
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
              />

              {/* Delete */}
              <img
                src={assets.bin_icon}
                alt="Remove"
                className="w-4 h-4 cursor-pointer flex-shrink-0"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-10 sm:my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="w-full mt-6 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer"
              onClick={() =>
                !proceedToPayment
                  ? toast.error("Add Items to cart")
                  : navigate("/place-order")
              }
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
