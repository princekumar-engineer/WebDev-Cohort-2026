import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import express from "express";
import axios from "axios";

dotenv.config();

/**
 * =========================================
 * REDIS CONNECTION
 * =========================================
 */
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const app = express();

app.use(express.json());

/**
 * =========================================
 * EXERCISE 1: RATE LIMITER
 *
 * Goal:
 * Allow only 10 requests per minute per user.
 *
 * Redis Key Example:
 * rate:123
 *
 * Redis Commands Used:
 * INCR
 * EXPIRE
 * =========================================
 */
const rateLimiter = async (req, res, next) => {
  // Get user id from request header
  const userId = req.headers["user-id"] || "anonymous";

  // Create unique Redis key
  const key = `rate:${userId}`;

  /**
   * Increment request count
   *
   * First request:
   * 1
   *
   * Second request:
   * 2
   *
   * Third request:
   * 3
   */
  const count = await redis.incr(key);

  console.log(`User: ${userId}, Count: ${count}`);

  /**
   * Set expiry only on first request
   *
   * After 60 seconds:
   * key automatically deleted
   */
  if (count === 1) {
    await redis.expire(key, 60);
  }

  /**
   * Block after 10 requests
   */
  if (count > 10) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Try again after 1 minute.",
    });
  }

  next();
};

/**
 * Test Rate Limiter
 */
app.get("/rate-limited-api", rateLimiter, (req, res) => {
  res.json({
    success: true,
    message: "Request Allowed ✅",
  });
});

/**
 * =========================================
 * EXERCISE 2: API CACHING
 *
 * Goal:
 * Avoid calling external API every time.
 *
 * Flow:
 *
 * Client
 *   |
 *   v
 * Redis Cache?
 *   |
 *  YES ---> Return Cached Data
 *   |
 *  NO
 *   |
 * External API
 *   |
 * Save in Redis
 *   |
 * Return Response
 *
 * Redis Commands Used:
 * GET
 * SET
 * =========================================
 */
app.get("/posts", async (req, res) => {
  const cacheKey = "posts_cache";

  /**
   * Step 1:
   * Check cache first
   */
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("CACHE HIT");

    return res.json({
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  console.log("CACHE MISS");

  /**
   * Step 2:
   * Fetch from API
   */
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  /**
   * Step 3:
   * Store in Redis for 5 minutes
   */
  await redis.set(
    cacheKey,
    JSON.stringify(response.data),
    {
      ex: 300, // 5 minutes
    }
  );

  /**
   * Step 4:
   * Return fresh data
   */
  res.json({
    source: "api",
    data: response.data,
  });
});

/**
 * Home Route
 */
app.get("/", (req, res) => {
  res.send("Hello World");
});

/**
 * Start Server
 */
app.listen(3000, () => {
  console.log("🚀 SERVER RUNNING ON http://localhost:3000");
});