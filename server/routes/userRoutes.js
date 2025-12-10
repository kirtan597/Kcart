import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  changePassword,
} from "../controllers/userControllerSimple.js"; // Using simple controller for demo mode

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/forgot", changePassword);

export default userRouter;
