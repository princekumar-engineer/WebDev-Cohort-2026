import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// Test route: increment post views
app.post("/post/:id/views", async (req, res) => {
  try {
    const { id } = req.params;
    const views = await redis.incr(`post:${id}:views`);

    res.json({ id, views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add or update leaderboard score
app.post("/leaderboard/score", async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (typeof userId !== "string" || typeof score !== "number") {
      return res.status(400).json({
        error: "Invalid input. userId must be string and score must be number",
      });
    }

    await redis.zadd("leaderboard", score, userId);

    res.json({
      message: "Score updated successfully",
      userId,
      score,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top 10 leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await redis.zrevrange(
      "leaderboard",
      0,
      9,
      "WITHSCORES"
    );

    const leaderboard = [];

    for (let i = 0; i < topUsers.length; i += 2) {
      leaderboard.push({
        rank: i / 2 + 1,
        userId: topUsers[i],
        score: Number(topUsers[i + 1]),
      });
    }

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific user's rank and score
app.get("/leaderboard/:id/rank", async (req, res) => {
  try {
    const { id } = req.params;

    const rank = await redis.zrevrank("leaderboard", id);
    const score = await redis.zscore("leaderboard", id);

    if (rank === null || score === null) {
      return res.status(404).json({
        error: "User not found in leaderboard",
      });
    }

    res.json({
      userId: id,
      rank: rank + 1,
      score: Number(score),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});