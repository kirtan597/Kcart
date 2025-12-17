import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("googlepay");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );

    if (emptyFields.length > 0) {
      toast.error("Please fill in all fields before placing the order.");
    } else {
      setValidated(true);
    }
    if (!validated) return;
    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        // Google Pay (using UPI)
        case "googlepay":
          if (validated) {
            // Simulate Google Pay payment
            toast.info("Redirecting to Google Pay...");
            setTimeout(() => {
              toast.success("Payment successful via Google Pay!");
              setCartItems("");
              navigate("/orders");
            }, 2000);
          }
          break;
        
        // Paytm
        case "paytm":
          if (validated) {
            // Simulate Paytm payment
            toast.info("Redirecting to Paytm...");
            setTimeout(() => {
              toast.success("Payment successful via Paytm!");
              setCartItems("");
              navigate("/orders");
            }, 2000);
          }
          break;
        
        // PhonePe
        case "phonepe":
          if (validated) {
            // Simulate PhonePe payment
            toast.info("Redirecting to PhonePe...");
            setTimeout(() => {
              toast.success("Payment successful via PhonePe!");
              setCartItems("");
              navigate("/orders");
            }, 2000);
          }
          break;
        
        // Cash on Delivery
        case "cod":
          if (validated) {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItems("");
              navigate("/orders");
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message);
            }
          }
          break;
        
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            name="firstName"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            name="lastName"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          name="phone"
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          
          {/* Payment Method Selection */}
          <div className="mt-8 space-y-4">
            {/* Google Pay */}
            <div
              onClick={() => setMethod("googlepay")}
              className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                method === "googlepay" 
                  ? "border-black bg-gray-50 shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  method === "googlepay" 
                    ? "bg-black border-black" 
                    : "border-gray-300"
                }`}
              >
                {method === "googlepay" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <img 
                src={assets.googlepay_logo} 
                alt="Google Pay" 
                className="h-8 w-auto object-contain"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Google Pay</p>
                <p className="text-xs text-gray-500">UPI, Cards & Wallet</p>
              </div>
              {method === "googlepay" && (
                <div className="text-green-600 text-sm font-medium">Selected</div>
              )}
            </div>

            {/* Paytm */}
            <div
              onClick={() => setMethod("paytm")}
              className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                method === "paytm" 
                  ? "border-black bg-gray-50 shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  method === "paytm" 
                    ? "bg-black border-black" 
                    : "border-gray-300"
                }`}
              >
                {method === "paytm" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <img 
                src={assets.paytm_logo} 
                alt="Paytm" 
                className="h-8 w-auto object-contain"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Paytm</p>
                <p className="text-xs text-gray-500">Wallet & UPI</p>
              </div>
              {method === "paytm" && (
                <div className="text-green-600 text-sm font-medium">Selected</div>
              )}
            </div>

            {/* PhonePe */}
            <div
              onClick={() => setMethod("phonepe")}
              className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                method === "phonepe" 
                  ? "border-black bg-gray-50 shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  method === "phonepe" 
                    ? "bg-black border-black" 
                    : "border-gray-300"
                }`}
              >
                {method === "phonepe" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <img 
                src={assets.phonepe_logo} 
                alt="PhonePe" 
                className="h-8 w-auto object-contain"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">PhonePe</p>
                <p className="text-xs text-gray-500">UPI Payments</p>
              </div>
              {method === "phonepe" && (
                <div className="text-green-600 text-sm font-medium">Selected</div>
              )}
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-4 border-2 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                method === "cod" 
                  ? "border-black bg-gray-50 shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  method === "cod" 
                    ? "bg-black border-black" 
                    : "border-gray-300"
                }`}
              >
                {method === "cod" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className="w-12 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when delivered</p>
              </div>
              {method === "cod" && (
                <div className="text-green-600 text-sm font-medium">Selected</div>
              )}
            </div>


          </div>

          {/* Payment Method Description */}
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="font-semibold text-gray-800">Payment Details</span>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {method === "googlepay" && (
                <div>
                  <p className="font-medium text-gray-800 mb-1">Google Pay - Quick & Secure</p>
                  <p>Pay instantly using Google Pay with UPI, debit/credit cards, or wallet balance. Trusted by millions worldwide with bank-level security.</p>
                </div>
              )}
              {method === "paytm" && (
                <div>
                  <p className="font-medium text-gray-800 mb-1">Paytm - India's Payment Leader</p>
                  <p>Use your Paytm wallet, UPI, or linked bank accounts. Enjoy cashback offers and instant payment confirmation.</p>
                </div>
              )}
              {method === "phonepe" && (
                <div>
                  <p className="font-medium text-gray-800 mb-1">PhonePe - Simple UPI Payments</p>
                  <p>India's leading digital payment platform. Quick UPI payments directly from your bank account with 24/7 customer support.</p>
                </div>
              )}
              {method === "cod" && (
                <div>
                  <p className="font-medium text-gray-800 mb-1">Cash on Delivery - Pay Later</p>
                  <p>No advance payment required. Pay with cash when your order is delivered to your doorstep. Additional ₹{delivery_fee} delivery charge applies.</p>
                </div>
              )}

            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white font-bold px-16 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onSubmitHandler}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                method === "cod" 
                  ? `Pay ₹${(getCartAmount() + delivery_fee).toLocaleString()}` 
                  : `Pay ₹${getCartAmount().toLocaleString()}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
