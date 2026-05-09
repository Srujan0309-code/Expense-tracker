import User from "../model/user.js";
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Existing user check
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send response
    const token = generateToken(user._id);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(201).json({
  message: "User registered successfully",

  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {

    res.json({
      message: "Login User",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
