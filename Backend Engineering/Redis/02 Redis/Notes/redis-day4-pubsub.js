import Redis from "ioredis";

/**
 * =========================================
 * Redis Clients
 * =========================================
 *
 * Pub/Sub requires separate connections.
 */

const publisher = new Redis(process.env.REDIS_URL);
const subscriber = new Redis(process.env.REDIS_URL);

async function main() {
  console.log("✅ Redis Connected");

  /**
   * =========================================
   * SUBSCRIBE
   * =========================================
   */

  await subscriber.subscribe("chat-room");

  console.log(
    "📡 Listening on channel: chat-room"
  );

  /**
   * =========================================
   * RECEIVE MESSAGES
   * =========================================
   */

  subscriber.on(
    "message",
    (channel, message) => {
      console.log("\n📩 New Message");

      console.log("Channel:", channel);

      console.log(
        "Message:",
        message
      );
    }
  );

  /**
   * =========================================
   * SEND DEMO MESSAGES
   * =========================================
   */

  setTimeout(async () => {
    await publisher.publish(
      "chat-room",
      "Hello Redis Pub/Sub!"
    );
  }, 1000);

  setTimeout(async () => {
    await publisher.publish(
      "chat-room",
      "User John Joined"
    );
  }, 2000);

  setTimeout(async () => {
    await publisher.publish(
      "chat-room",
      "New Notification Available"
    );
  }, 3000);
}

main().catch(console.error);

/**
 * Graceful shutdown
 */
process.on("SIGINT", async () => {
  console.log("\n👋 Closing Redis");

  await publisher.quit();
  await subscriber.quit();

  process.exit(0);
});