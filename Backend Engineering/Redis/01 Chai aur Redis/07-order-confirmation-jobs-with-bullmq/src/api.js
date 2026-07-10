import express from "express";
import { emailQueue } from "./queue.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/welcome-email", async (req, res) => {
  try {
    const { to, name } = req.body;

    if (!to) {
      return res.status(400).json({
        error: "Recipient email is required",
      });
    }

    const job = await emailQueue.add(
      "send-welcome-email",
      {
        to,
        name: name || "Learner",
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      }
    );

    res.json({
      message: "Welcome email job added to the queue!",
      jobId: job.id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});