import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../data/users.json");

// Initialize users file
const initializeUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
      console.log("✅ Created users.json file");
    }
  } catch (error) {
    console.error("Error initializing users file:", error);
  }
};

// Read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write users to file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);
    res.json({ success: true, message: "User credentials are correct", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration - Direct registration without OTP
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const users = readUsers();
    const exists = users.find((u) => u.email === email);

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid Email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message:
          "Password Length must be greater than or equal to 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user directly
    const newUser = {
      _id: String(Date.now()),
      name,
      email,
      password: hashedPassword,
      cartData: {},
    };

    users.push(newUser);
    writeUsers(users);

    // Generate token
    const token = createToken(newUser._id);

    res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for password change
const changePassword = async (req, res) => {
  try {
    const { email, password, reenterpassword } = req.body;

    const users = readUsers();
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = users[userIndex];
    const isMatched = await bcrypt.compare(password, user.password);

    if (password !== reenterpassword) {
      return res.json({
        success: false,
        message: "Two Password must be same.",
      });
    }

    if (isMatched) {
      return res.json({
        success: false,
        message: "New password should not be same as current password.",
      });
    }

    // Hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reenterpassword, salt);

    // Updating user password
    users[userIndex].password = hashedPassword;
    writeUsers(users);

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Initialize on module load
initializeUsers();

export { loginUser, registerUser, adminLogin, changePassword };
