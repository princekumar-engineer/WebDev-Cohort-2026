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

async function main() {
  console.log("✅ Connected to Redis");

  /**
   * Clean previous demo data
   */
  await redis.del("username");
  await redis.del("otp");
  await redis.del("emailQueue");
  await redis.del("undoStack");
  await redis.del("rate:user123");

  /**
   * ===========================
   * 1. REDIS STRING
   * ===========================
   */
  console.log("\n===== STRING =====");

  await redis.set("username", "codesnippet");

  const username = await redis.get("username");

  console.log("Username:", username);

  /**
   * String with TTL
   */
  await redis.set("otp", "123456", {
    ex: 60,
  });

  const ttl = await redis.ttl("otp");

  console.log("OTP set with TTL");
  console.log("OTP TTL:", ttl, "seconds");

  /**
   * ===========================
   * 2. REDIS QUEUE (FIFO)
   * ===========================
   */
  console.log("\n===== QUEUE (FIFO) =====");

  await redis.rpush(
    "emailQueue",
    "user1@gmail.com"
  );

  await redis.rpush(
    "emailQueue",
    "user2@gmail.com"
  );

  const emailJob = await redis.lpop(
    "emailQueue"
  );

  console.log(
    "Processing email job:",
    emailJob
  );

  /**
   * ===========================
   * 3. REDIS STACK (LIFO)
   * ===========================
   */
  console.log("\n===== STACK (LIFO) =====");

  await redis.lpush(
    "undoStack",
    "ACTION_1"
  );

  await redis.lpush(
    "undoStack",
    "ACTION_2"
  );

  const lastAction = await redis.lpop(
    "undoStack"
  );

  console.log(
    "Undo last action:",
    lastAction
  );

  /**
   * ===========================
   * 4. SIMPLE RATE LIMIT LOGIC
   * ===========================
   */
  console.log("\n===== RATE LIMIT =====");

  const userId = "user123";
  const rateKey = `rate:${userId}`;

  const count = await redis.incr(rateKey);

  if (count === 1) {
    await redis.expire(rateKey, 60);
  }

  console.log(
    `Requests in last minute: ${count}`
  );

  const remainingTTL =
    await redis.ttl(rateKey);

  console.log(
    `Window resets in: ${remainingTTL} seconds`
  );
}

main()
  .then(() => {
    console.log("\n🎉 Redis demo completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
