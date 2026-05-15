import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          user,
        });
  } catch (error) {
    console.log("Register Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // Optional: Log completion or perform cleanup
    console.log("Register Controller Finished");
  }
};

export const login = async (req, res) => {
  console.log("Login Controller Started");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({email,}).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // --- Added logic below ---
    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    console.log("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    console.log("Login Controller Finished");
  }
};

export const getMe = async (req, res) => {
  try {
    // req.user.id comes from your 'protect' middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("GetMe Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};