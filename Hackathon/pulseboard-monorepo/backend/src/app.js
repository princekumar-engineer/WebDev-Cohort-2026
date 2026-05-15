import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Body Parsers - Keep these together and remove the duplicate below
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ROOT ROUTE
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PulseBoard API Running",
  });
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/public", publicRoutes);

// GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export default app;