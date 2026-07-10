import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// saved as a JSON string in Redis
app.post("/user/:id/json", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  await redis.set(`user:${userId}:json`, JSON.stringify(userData));
  res.send({ status: "success", message: "User data cached as JSON" });
});

// retrieved and parsed back into an object
app.get("/user/:id/json", async (req, res) => {
  const userId = req.params.id;
  const cachedData = await redis.get(`user:${userId}:json`);
  res.json({
    status: "success",
    data: cachedData ? JSON.parse(cachedData) : null,
  });
});

// saved as a Redis Hash, where each field corresponds to a property of the user data object. This allows for more efficient storage and retrieval of individual fields without needing to parse the entire JSON string.
app.post("/user/:id/hash", async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  await redis.hset(`user:${userId}:hash`, userData);
  res.send({ status: "success", message: "User data cached as Hash" });
});

/*
hgetall returns all fields and values of the hash stored at key. If the key does not exist, it returns an empty list. If the value stored at key is not a hash, an error is returned.
*/
app.get("/user/:id/hash", async (req, res) => {
  const userId = req.params.id;
  const cachedData = await redis.hgetall(`user:${userId}:hash`);
  res.json({
    status: "success",
    data: cachedData,
  });
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});

/*
hset - Sets the value of a field in a hash
hget - Gets the value of a field in a hash
hgetall - Gets all fields and values of a hash
hdel - Deletes a field from a hash
hexists - Checks if a field exists in a hash
hincrby - Increments the integer value of a field in a hash by a given amount
hkeys - Gets all the fields in a hash
hlen - Gets the number of fields in a hash
hmget - Gets the values of multiple fields in a hash
hmset - Sets multiple fields in a hash
*/