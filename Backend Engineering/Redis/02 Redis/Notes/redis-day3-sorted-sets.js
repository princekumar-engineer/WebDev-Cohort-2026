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
  await redis.del("game:leaderboard");

  /**
   * =========================================
   * 1. SORTED SET BASICS
   * =========================================
   *
   * Member + Score
   *
   * player1 -> 100
   * player2 -> 250
   * player3 -> 180
   */

  console.log("\n===== SORTED SETS =====");

  await redis.zadd("game:leaderboard", {
    score: 100,
    member: "player1",
  });

  await redis.zadd("game:leaderboard", {
    score: 250,
    member: "player2",
  });

  await redis.zadd("game:leaderboard", {
    score: 180,
    member: "player3",
  });

  await redis.zadd("game:leaderboard", {
    score: 320,
    member: "player4",
  });

  console.log("Players added");

  /**
   * =========================================
   * Get Scores
   * =========================================
   */

  const player2Score = await redis.zscore(
    "game:leaderboard",
    "player2"
  );

  console.log(
    "\nPlayer2 Score:",
    player2Score
  );

  /**
   * =========================================
   * Ranking
   * =========================================
   */

  const player2Rank = await redis.zrevrank(
    "game:leaderboard",
    "player2"
  );

  console.log(
    "Player2 Rank:",
    player2Rank + 1
  );

  /**
   * =========================================
   * Top Players
   * =========================================
   */

  console.log(
    "\n===== TOP 3 PLAYERS ====="
  );

  const topPlayers =
    await redis.zrange(
      "game:leaderboard",
      0,
      2,
      {
        rev: true,
      }
    );

  console.log(topPlayers);

  /**
   * =========================================
   * Full Leaderboard
   * =========================================
   */

  console.log(
    "\n===== FULL LEADERBOARD ====="
  );

  const leaderboard =
    await redis.zrange(
      "game:leaderboard",
      0,
      -1,
      {
        rev: true,
      }
    );

  leaderboard.forEach(
    (player, index) => {
      console.log(
        `#${index + 1} ${player}`
      );
    }
  );

  /**
   * =========================================
   * Update Score
   * =========================================
   */

  console.log(
    "\n===== SCORE UPDATE ====="
  );

  await redis.zadd(
    "game:leaderboard",
    {
      score: 450,
      member: "player3",
    }
  );

  const newRank =
    await redis.zrevrank(
      "game:leaderboard",
      "player3"
    );

  console.log(
    "Player3 New Rank:",
    newRank + 1
  );

  /**
   * =========================================
   * Score Range Query
   * =========================================
   */

  console.log(
    "\n===== SCORE >= 200 ====="
  );

  const highScorers =
    await redis.zrange(
      "game:leaderboard",
      200,
      "+inf",
      {
        byScore: true,
        rev: true,
      }
    );

  console.log(highScorers);

  /**
   * =========================================
   * Total Players
   * =========================================
   */

  const totalPlayers =
    await redis.zcard(
      "game:leaderboard"
    );

  console.log(
    "\nTotal Players:",
    totalPlayers
  );

  /**
   * =========================================
   * Remove Player
   * =========================================
   */

  await redis.zrem(
    "game:leaderboard",
    "player1"
  );

  console.log(
    "player1 removed"
  );

  const updatedCount =
    await redis.zcard(
      "game:leaderboard"
    );

  console.log(
    "Remaining Players:",
    updatedCount
  );

  /**
   * =========================================
   * REAL WORLD EXAMPLE
   * =========================================
   */

  console.log(
    "\n===== TRENDING POSTS ====="
  );

  await redis.del("trending:posts");

  await redis.zadd(
    "trending:posts",
    {
      score: 95,
      member: "post_101",
    }
  );

  await redis.zadd(
    "trending:posts",
    {
      score: 210,
      member: "post_102",
    }
  );

  await redis.zadd(
    "trending:posts",
    {
      score: 180,
      member: "post_103",
    }
  );

  const trending =
    await redis.zrange(
      "trending:posts",
      0,
      2,
      {
        rev: true,
      }
    );

  console.log(
    "Top Trending Posts:"
  );

  console.log(trending);

  /**
   * =========================================
   * Summary
   * =========================================
   */

  console.log(`
=================================
DAY 3 SUMMARY
=================================

ZADD     -> Add member with score
ZSCORE   -> Get score
ZRANK    -> Ascending rank
ZREVRANK -> Descending rank
ZRANGE   -> Get members
ZCARD    -> Count members
ZREM     -> Remove member

Use Cases:
- Leaderboards
- Rankings
- Trending Posts
- Most Viewed Videos
- Ratings
=================================
`);

  console.log(
    "\n🎉 Day 3 Completed Successfully"
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });