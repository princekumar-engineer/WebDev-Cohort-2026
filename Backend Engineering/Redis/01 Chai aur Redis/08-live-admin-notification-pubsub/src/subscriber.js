import Redis from "ioredis";

const subscriber = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

subscriber.subscribe("notifications", (err, count) => {
  if (err) {
    return console.error("Failed to subscribe:", err.message);
  }

  console.log(
    `Subscribed successfully! Currently subscribed to ${count} channel(s).`
  );
});

subscriber.on("message", (channel, message) => {
  try {
    const parsedMessage = JSON.parse(message);

    console.log("Received notification:");
    console.log("Channel:", channel);
    console.log("Payload:", parsedMessage);
  } catch (error) {
    console.error("Failed to parse message:", message);
  }
});

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err.message);
});