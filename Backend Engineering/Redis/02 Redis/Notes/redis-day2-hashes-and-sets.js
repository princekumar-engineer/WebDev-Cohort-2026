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
   * =========================================
   * Cleanup
   * =========================================
   */
  await redis.del("user:1");
  await redis.del("online_users");

  /**
   * =========================================
   * 1. HASHES
   * =========================================
   *
   * Think:
   *
   * user:1
   * ├── name  -> John
   * ├── email -> john@gmail.com
   * └── age   -> 25
   */

  console.log("\n===== HASHES =====");

  /**
   * Create Hash
   */
  await redis.hset("user:1", {
    name: "John",
    email: "john@gmail.com",
    age: "25",
    country: "India",
  });

  console.log("User hash created");

  /**
   * Get entire hash
   */
  const user = await redis.hgetall("user:1");

  console.log("\nUser Details:");
  console.log(user);

  /**
   * Get single field
   */
  const name = await redis.hget(
    "user:1",
    "name"
  );

  console.log("\nUser Name:", name);

  /**
   * Update field
   */
  await redis.hset("user:1", {
    age: "26",
  });

  console.log("Age updated");

  /**
   * Get updated field
   */
  const age = await redis.hget(
    "user:1",
    "age"
  );

  console.log("Updated Age:", age);

  /**
   * Delete field
   */
  await redis.hdel("user:1", "country");

  console.log("Country removed");

  const updatedUser = await redis.hgetall(
    "user:1"
  );

  console.log("\nUpdated User:");
  console.log(updatedUser);

  /**
   * =========================================
   * 2. SETS
   * =========================================
   *
   * Unique values only
   */

  console.log("\n===== SETS =====");

  /**
   * Add users
   */
  await redis.sadd(
    "online_users",
    "john"
  );

  await redis.sadd(
    "online_users",
    "alice"
  );

  await redis.sadd(
    "online_users",
    "bob"
  );

  /**
   * Duplicate ignored
   */
  await redis.sadd(
    "online_users",
    "john"
  );

  console.log(
    "Users added to online_users set"
  );

  /**
   * Get all members
   */
  const users = await redis.smembers(
    "online_users"
  );

  console.log("\nOnline Users:");
  console.log(users);

  /**
   * Check membership
   */
  const isJohnOnline =
    await redis.sismember(
      "online_users",
      "john"
    );

  console.log(
    "\nIs John online?",
    isJohnOnline ? "Yes" : "No"
  );

  /**
   * Count members
   */
  const count = await redis.scard(
    "online_users"
  );

  console.log(
    "Total Online Users:",
    count
  );

  /**
   * Remove member
   */
  await redis.srem(
    "online_users",
    "alice"
  );

  console.log("Alice logged out");

  const remainingUsers =
    await redis.smembers(
      "online_users"
    );

  console.log(
    "\nRemaining Users:"
  );

  console.log(remainingUsers);

  /**
   * =========================================
   * REAL WORLD EXAMPLES
   * =========================================
   */

  console.log(
    "\n===== REAL WORLD USE CASES ====="
  );

  console.log(`
HASHES:
- User profiles
- Product details
- Order information
- Settings

SETS:
- Online users
- Unique visitors
- User roles
- Tags
- Followers
`);

  console.log(
    "\n🎉 Day 2 completed successfully"
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });