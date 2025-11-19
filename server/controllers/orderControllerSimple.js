import { users } from "./userControllerSimple.js";

// In-memory orders storage
const orders = [];
let orderIdCounter = 1;

// Place order - COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      _id: String(orderIdCounter++),
      userId,
      items,
      amount,
      address,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    orders.push(orderData);

    // Clear user cart
    const user = users.get(userId);
    if (user) {
      user.cartData = {};
      users.set(userId, user);
    }

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Place order - Stripe
const placeOrderStripe = async (req, res) => {
  try {
    res.json({ success: false, message: "Stripe not configured in demo mode" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Place order - Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    res.json({ success: false, message: "Razorpay not configured in demo mode" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All orders - Admin
const allOrders = async (req, res) => {
  try {
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const userOrdersList = orders.filter((order) => order.userId === userId);
    res.json({ success: true, orders: userOrdersList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = orders.find((o) => o._id === orderId);
    if (order) {
      order.status = status;
      res.json({ success: true, message: "Status Updated" });
    } else {
      res.json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
