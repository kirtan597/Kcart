import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

export const ForgotPassword = () => {
  const { navigate, backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== reenterPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/forgot", {
        email,
        password,
        reenterpassword: reenterPassword,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black heading-font mb-2">Kcart</h1>
          <div className="w-16 h-1 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span className="text-sm font-medium">Back to login</span>
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-black mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600">
              Enter your email and create a new password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showReenterPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={reenterPassword}
                  onChange={(e) => setReenterPassword(e.target.value)}
                  required
                  minLength="8"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowReenterPassword(!showReenterPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showReenterPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Match Indicator */}
            {password && reenterPassword && (
              <div className={`text-sm ${password === reenterPassword ? 'text-black' : 'text-gray-600'}`}>
                {password === reenterPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || password !== reenterPassword}
              className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Note:</span> After resetting your password, you'll be redirected to the login page.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2024 Kcart. All rights reserved.
        </p>
      </div>
    </div>
  );
};
