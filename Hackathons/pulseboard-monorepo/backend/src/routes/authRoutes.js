import express from "express";
import {
  login,
  register,
  getMe,
} from "../controllers/authController.js";

import authValidation from "../validations/authValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  authValidation,
  register
);

router.post(
  "/login",
  authValidation,
  login
);

router.get("/me", authMiddleware, getMe);

export default router;