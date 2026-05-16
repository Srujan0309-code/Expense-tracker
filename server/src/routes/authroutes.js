import express from "express";

import {
  getMe,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post("/logout", logoutUser);

export default router;
