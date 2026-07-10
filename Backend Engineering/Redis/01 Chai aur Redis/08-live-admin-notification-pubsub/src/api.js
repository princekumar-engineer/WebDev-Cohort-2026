import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const publisher = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

app.post("/notifications", async (req, res) => {
  try {
    const payload = {
      title: req.body.title ?? "Default Title",
      message: req.body.message ?? "Default Message",
      createdAt: new Date().toISOString(),
    };

    const receivers = await publisher.publish(
      "notifications",
      JSON.stringify(payload)
    );

    res.json({
      message: `Notification sent to ${receivers} subscribers`,
      payload,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("API Server is running at http://localhost:3000");
});