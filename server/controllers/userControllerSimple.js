import jwt from "jsonwebtoken";

const JWT_SECRET = "demo-secret-key-12345";

// Dummy users storage (in-memory for demo)
const users = new Map();
let userIdCounter = 1;

// Admin credentials
const ADMIN_EMAIL = "admin@demo.com";
const ADMIN_PASSWORD = "admin123";

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    let user = null;
    for (let [id, u] of users.entries()) {
      if (u.email === email && u.password === password) {
        user = { _id: id, ...u };
        break;
      }
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    for (let u of users.values()) {
      if (u.email === email) {
        return res.json({ success: false, message: "User already exists" });
      }
    }

    const userId = String(userIdCounter++);
    users.set(userId, {
      name,
      email,
      password,
      cartData: {},
    });

    const token = jwt.sign({ id: userId }, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: "admin" }, JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, users, JWT_SECRET };
