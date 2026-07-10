import express from "express";
import axios from "axios";
import { Redis } from "@upstash/redis";

/**
 * =========================================
 * Environment Validation
 * =========================================
 */
if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
  throw new Error(
    "REDIS_URL and REDIS_TOKEN must be defined in .env"
  );
}

/**
 * =========================================
 * Redis Client
 * =========================================
 */
const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const app = express();

app.use(express.json());

/**
 * =========================================
 * Utility Function
 * =========================================
 */
async function getCachedData(
  key,
  fetchFunction,
  ttl = 300
) {
  const cached = await redis.get(key);

  if (cached) {
    console.log(`⚡ CACHE HIT -> ${key}`);

    return {
      source: "cache",
      data: cached,
    };
  }

  console.log(`🐢 CACHE MISS -> ${key}`);

  const freshData = await fetchFunction();

  await redis.set(key, freshData, {
    ex: ttl,
  });

  return {
    source: "api",
    data: freshData,
  };
}

/**
 * =========================================
 * HOME
 * =========================================
 */
app.get("/", (req, res) => {
  res.json({
    message: "Redis Day 5 Caching Project 🚀",
  });
});

/**
 * =========================================
 * POSTS API
 * =========================================
 */
app.get("/posts", async (req, res) => {
  try {
    const result = await getCachedData(
      "cache:posts",
      async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        return response.data;
      },
      300
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * =========================================
 * SINGLE POST
 * =========================================
 */
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getCachedData(
      `cache:post:${id}`,
      async () => {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        return response.data;
      },
      300
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * =========================================
 * USERS API
 * =========================================
 */
app.get("/users", async (req, res) => {
  try {
    const result = await getCachedData(
      "cache:users",
      async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        return response.data;
      },
      600
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * =========================================
 * CACHE STATS
 * =========================================
 */
app.get("/cache/stats", async (req, res) => {
  try {
    const postsTTL = await redis.ttl(
      "cache:posts"
    );

    const usersTTL = await redis.ttl(
      "cache:users"
    );

    res.json({
      cache: {
        posts: {
          ttl: postsTTL,
        },
        users: {
          ttl: usersTTL,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * =========================================
 * CLEAR ALL CACHE
 * =========================================
 */
app.delete("/cache", async (req, res) => {
  try {
    await redis.del("cache:posts");
    await redis.del("cache:users");

    res.json({
      message: "Cache cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * =========================================
 * CLEAR SINGLE POST CACHE
 * =========================================
 */
app.delete("/cache/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await redis.del(`cache:post:${id}`);

    res.json({
      message: `Cache for post ${id} cleared`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * =========================================
 * SERVER
 * =========================================
 */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});