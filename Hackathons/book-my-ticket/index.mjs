import express from "express";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;
const SECRET = "mysecretkey"; // use env in real apps

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "sql_class_2_db",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

const app = new express();
app.use(cors());
app.use(express.json());

// ---------- DB INIT ----------
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS seats (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      isbooked INT DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      seat_id INT UNIQUE
    );

    INSERT INTO seats (isbooked)
    SELECT 0
    WHERE NOT EXISTS (SELECT 1 FROM seats LIMIT 1);
  `);
})();

// ---------- AUTH MIDDLEWARE ----------
const authMiddleware = (req, res, next) => {

  // console.log("HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send("No token");

  // 👇 handle Bearer token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "mysecretkey");
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

// ---------- AUTH ROUTES ----------

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
      [name, email, hashed]
    );
    res.send("User registered");
  } catch {
    res.status(400).send("User exists");
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rowCount === 0)
    return res.status(400).send("User not found");

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET);

  res.json({ token });
});

// ---------- EXISTING ROUTES (UNCHANGED) ----------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/seats", async (req, res) => {
  const result = await pool.query("select * from seats");
  res.send(result.rows);
});

// ---------- BOOK SEAT (PROTECTED) ----------

app.put("/:id/:name", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.params.name;
    const userId = req.user.id;

    const conn = await pool.connect();

    await conn.query("BEGIN");

    // lock seat
    const result = await conn.query(
      "SELECT * FROM seats WHERE id=$1 AND isbooked=0 FOR UPDATE",
      [id]
    );

    if (result.rowCount === 0) {
      await conn.query("ROLLBACK");
      return res.send({ error: "Seat already booked" });
    }

    // prevent duplicate booking
    const existing = await conn.query(
      "SELECT * FROM bookings WHERE seat_id=$1",
      [id]
    );

    if (existing.rowCount > 0) {
      await conn.query("ROLLBACK");
      return res.send({ error: "Already booked" });
    }

    // update seat
    await conn.query(
      "UPDATE seats SET isbooked=1, name=$2 WHERE id=$1",
      [id, name]
    );

    // associate booking with user
    await conn.query(
      "INSERT INTO bookings(user_id, seat_id) VALUES($1,$2)",
      [userId, id]
    );

    await conn.query("COMMIT");

    conn.release();

    res.send({ message: "Seat booked successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(port, () =>
  console.log("Server starting on port: " + port)
);