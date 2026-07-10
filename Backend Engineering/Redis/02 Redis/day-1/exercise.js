import express from "express";
import axios from "axios";
import Redis from "ioredis";

const app = express();
app.use(express.json());

/**
 * =========================================
 * Redis Client
 * =========================================
 */
const redis = new Redis(process.env.REDIS_URL);

// Optional local Redis
// const redis = new Redis();

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

/**
 * =========================================
 * EXERCISE 1: RATE LIMITER
 * 10 requests / minute / user
 * =========================================
 */
const rateLimiter = async (req, res, next) => {
  const userId = req.headers["user-id"] || "anonymous";

  const key = `rate:${userId}`;

  const count = await redis.incr(key);

  // First request starts the 60-second window
  if (count === 1) {
    await redis.expire(key, 60);
  }

  if (count > 10) {
    return res.status(429).json({
      message: "Too many requests. Try again later.",
    });
  }

  next();
};

app.get("/rate-limited-api", rateLimiter, (req, res) => {
  res.json({
    message: "Request allowed ✅",
  });
});

/**
 * =========================================
 * EXERCISE 2: CACHE LAYER (5 min)
 * =========================================
 */
app.get("/posts", async (req, res) => {
  try {
    const cacheKey = "posts_cache";

    // Check cache first
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("⚡ CACHE HIT");

      return res.json({
        source: "cache",
        data: JSON.parse(cached),
      });
    }

    console.log("🐢 CACHE MISS");

    // Fetch from external API
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Store for 5 minutes
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      300
    );

    res.json({
      source: "api",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Clear Cache
 */
app.delete("/posts/cache", async (req, res) => {
  await redis.del("posts_cache");

  res.json({
    message: "Cache cleared",
  });
});

/**
 * =========================================
 * EXERCISE 3: JOB QUEUE (FIFO)
 * =========================================
 */

/**
 * Add Job
 */
app.post("/jobs", async (req, res) => {
  const { job } = req.body;

  if (!job) {
    return res.status(400).json({
      message: "Job is required",
    });
  }

  await redis.rpush(
    "job_queue",
    JSON.stringify(job)
  );

  res.json({
    message: "Job added to queue",
  });
});

/**
 * Process Job
 */
app.post("/jobs/process", async (req, res) => {
  const job = await redis.lpop("job_queue");

  if (!job) {
    return res.json({
      message: "No jobs in queue",
    });
  }

  const parsedJob = JSON.parse(job);

  // Simulate worker processing
  console.log("⚙️ Processing job:", parsedJob);

  res.json({
    message: "Job processed",
    job: parsedJob,
  });
});

/**
 * Queue Size
 */
app.get("/jobs/count", async (req, res) => {
  const count = await redis.llen("job_queue");

  res.json({
    totalJobs: count,
  });
});

/**
 * =========================================
 * EXERCISE 4: BROWSER HISTORY
 * Stack-Based (LIFO)
 * =========================================
 */

/**
 * Visit Page
 */
app.post("/history/visit", async (req, res) => {
  const { user, page } = req.body;

  if (!user || !page) {
    return res.status(400).json({
      message: "user and page are required",
    });
  }

  // Push page into back stack
  await redis.lpush(
    `history:${user}:back`,
    page
  );

  // Clear forward stack
  await redis.del(
    `history:${user}:forward`
  );

  res.json({
    message: "Visited page",
    page,
  });
});

/**
 * Go Back
 */
app.post("/history/back", async (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({
      message: "user is required",
    });
  }

  const current = await redis.lpop(
    `history:${user}:back`
  );

  if (!current) {
    return res.json({
      message: "No history available",
    });
  }

  await redis.lpush(
    `history:${user}:forward`,
    current
  );

  const previous = await redis.lindex(
    `history:${user}:back`,
    0
  );

  res.json({
    current: previous || null,
  });
});

/**
 * Go Forward
 */
app.post("/history/forward", async (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({
      message: "user is required",
    });
  }

  const page = await redis.lpop(
    `history:${user}:forward`
  );

  if (!page) {
    return res.json({
      message: "No forward history",
    });
  }

  await redis.lpush(
    `history:${user}:back`,
    page
  );

  res.json({
    current: page,
  });
});

/**
 * =========================================
 * Home Route
 * =========================================
 */
app.get("/", (req, res) => {
  res.send("Redis Day-1 Practical 🚀");
});

/**
 * =========================================
 * Server
 * =========================================
 */
app.listen(3000, () => {
  console.log(
    "🚀 Server running on http://localhost:3000"
  );
});
