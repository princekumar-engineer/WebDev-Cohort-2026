import fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import { AsyncDatabase } from "promised-sqlite3";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize or create the database
const db = await AsyncDatabase.open("./chai.sqlite");

server.get("/api", async (req, res) => {
  res.send({ message: "Welcome to Chaicode" });
});

server.get("/api/all-chai", async (req, res) => {
  const chaiList = await db.all(
    `SELECT 
      c.chai_type_id as id,
      c.name,
      c.category,
      c.description,
      c.image_url,
      v.size,
      v.price
    FROM chai_types c
    JOIN chai_variants v ON c.chai_type_id = v.chai_type_id`,
  );

  // Group by chai type
  const grouped = {};
  chaiList.forEach((item) => {
    if (!grouped[item.id]) {
      grouped[item.id] = {
        id: item.id,
        name: item.name,
        category: item.category,
        description: item.description,
        image: item.image_url,
        sizes: {},
      };
    }
    grouped[item.id].sizes[item.size] = item.price;
  });

  res.send(Object.values(grouped));
});

server.get("/api/special-chai", async (req, res) => {
  const chaiTypes = await db.all(
    `SELECT chai_type_id as id, name, category, description, image_url FROM chai_types`,
  );

  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  const chaiIndex = daysSinceEpoch % chaiTypes.length;
  const chai = chaiTypes[chaiIndex];

  const sizes = await db.all(
    `SELECT size, price FROM chai_variants WHERE chai_type_id = ?`,
    [chai.id],
  );

  const sizeObj = sizes.reduce((acc, current) => {
    acc[current.size] = +current.price;
    return acc;
  }, {});

  res.send({
    ...chai,
    sizes: sizeObj,
  });
});

server.get("/api/orders", async (req, res) => {
  const orders = await db.all("SELECT order_id, date, time FROM orders");
  res.send(orders);
});

server.get("/api/order", async (req, res) => {
  const id = req.query.id;

  const order = await db.get(
    "SELECT order_id, date, time FROM orders WHERE order_id = ?",
    [id],
  );

  const items = await db.all(
    `SELECT 
      c.chai_type_id as chaiTypeId,
      c.name,
      c.category,
      c.description,
      c.image_url,
      d.quantity,
      v.price,
      v.size,
      d.quantity * v.price as total
    FROM order_details d
    JOIN chai_variants v ON d.variant_id = v.variant_id
    JOIN chai_types c ON v.chai_type_id = c.chai_type_id
    WHERE d.order_id = ?`,
    [id],
  );

  const orderItems = items.map((item) => ({
    ...item,
    price: +item.price,
    quantity: +item.quantity,
  }));

  const total = orderItems.reduce((acc, item) => acc + item.total, 0);

  res.send({
    order: { ...order, total },
    orderItems,
  });
});

server.post("/api/order", async (req, res) => {
  const { cart } = req.body;

  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).send({ error: "Invalid cart" });
  }

  try {
    await db.run("BEGIN TRANSACTION");

    const result = await db.run(
      "INSERT INTO orders (date, time) VALUES (?, ?)",
      [date, time],
    );
    const orderId = result.lastID;

    const mergedCart = cart.reduce((acc, item) => {
      const id = item.chai.id;
      const size = item.size.toLowerCase();
      const variantId = `${id}_${size}`;
      if (!acc[variantId]) {
        acc[variantId] = { variantId, quantity: 1 };
      } else {
        acc[variantId].quantity += 1;
      }
      return acc;
    }, {});

    for (const item of Object.values(mergedCart)) {
      await db.run(
        `INSERT INTO order_details (order_id, variant_id, quantity) VALUES (?, ?, ?)`,
        [orderId, item.variantId, item.quantity],
      );
    }

    await db.run("COMMIT");
    res.send({ orderId });
  } catch (err) {
    req.log.error(err);
    await db.run("ROLLBACK");
    res.status(500).send({ error: "Order creation failed" });
  }
});

server.get("/api/past-orders", async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const offset = (page - 1) * 10;
  const orders = await db.all(
    "SELECT order_id, date, time FROM orders ORDER BY order_id DESC LIMIT 10 OFFSET ?",
    [offset],
  );
  res.send(orders);
});

server.get("/api/past-order/:order_id", async (req, res) => {
  const id = req.params.order_id;

  const order = await db.get(
    "SELECT order_id, date, time FROM orders WHERE order_id = ?",
    [id],
  );

  const items = await db.all(
    `SELECT 
      c.chai_type_id as chaiTypeId,
      c.name,
      c.category,
      c.description,
      c.image_url,
      d.quantity,
      v.price,
      v.size,
      d.quantity * v.price as total
    FROM order_details d
    JOIN chai_variants v ON d.variant_id = v.variant_id
    JOIN chai_types c ON v.chai_type_id = c.chai_type_id
    WHERE d.order_id = ?`,
    [id],
  );

  const formattedItems = items.map((item) => ({
    ...item,
    price: +item.price,
    quantity: +item.quantity,
  }));

  const total = formattedItems.reduce((acc, item) => acc + item.total, 0);

  res.send({
    order: { ...order, total },
    orderItems: formattedItems,
  });
});

server.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ error: "All fields are required" });
  }

  await db.run("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)", [
    name,
    email,
    message,
  ]);

  res.send({ success: "Message received" });
});

server.get("/api/contacts", async (req, res) => {
  const contacts = await db.all("SELECT * FROM contacts");
  res.send(contacts);
});

server.post("/api/seed", async function seedDatabase(req, res) {
  try {
    await db.run("BEGIN TRANSACTION");

    await db.exec(`
      DROP TABLE IF EXISTS chai_types;
      DROP TABLE IF EXISTS chai_variants;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS contacts;
    `);

    await db.exec(`
      CREATE TABLE chai_types (
        chai_type_id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        description TEXT,
        image_url TEXT
      );

      CREATE TABLE chai_variants (
        variant_id TEXT PRIMARY KEY,
        chai_type_id INTEGER,
        size TEXT,
        price REAL
      );

      CREATE TABLE orders (
        order_id INTEGER PRIMARY KEY,
        date TEXT,
        time TEXT
      );

      CREATE TABLE order_details (
        detail_id INTEGER PRIMARY KEY,
        order_id INTEGER,
        variant_id TEXT,
        quantity INTEGER
      );

      CREATE TABLE contacts (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT
      );
    `);

    const chaiTypes = [
      {
        name: "Masala Chai",
        category: "Spiced",
        description: "Strong tea with ginger, cardamom, and spices.",
        image_url:
          "https://images.unsplash.com/photo-1510626176961-4bfb7fa3ff49",
      },
      {
        name: "Elaichi Chai",
        category: "Flavored",
        description: "Tea with cardamom for a fragrant twist.",
        image_url:
          "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
      },
      {
        name: "Adrak Chai",
        category: "Ginger",
        description: "Tea brewed with fresh ginger root.",
        image_url:
          "https://images.unsplash.com/photo-1623650083829-2021161514a2",
      },
    ];

    for (const [i, chai] of chaiTypes.entries()) {
      await db.run(
        `INSERT INTO chai_types (chai_type_id, name, category, description, image_url) VALUES (?, ?, ?, ?, ?)`,
        [i + 1, chai.name, chai.category, chai.description, chai.image_url],
      );
    }

    const variants = [
      { id: "1_small", chai_type_id: 1, size: "small", price: 20 },
      { id: "1_large", chai_type_id: 1, size: "large", price: 35 },
      { id: "2_small", chai_type_id: 2, size: "small", price: 25 },
      { id: "2_large", chai_type_id: 2, size: "large", price: 40 },
      { id: "3_small", chai_type_id: 3, size: "small", price: 22 },
      { id: "3_large", chai_type_id: 3, size: "large", price: 38 },
    ];

    for (const variant of variants) {
      await db.run(
        `INSERT INTO chai_variants (variant_id, chai_type_id, size, price) VALUES (?, ?, ?, ?)`,
        [variant.id, variant.chai_type_id, variant.size, variant.price],
      );
    }

    await db.run(
      `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
      ["Chai Fan", "chai@lover.com", "Best chai ever!"],
    );

    await db.run("COMMIT");
    res.send({ success: "Database seeded successfully" });
  } catch (err) {
    await db.run("ROLLBACK");
    req.log.error(err);
    res.status(500).send({ error: "Seeding failed" });
  }
});

const start = async () => {
  try {
    await server.listen({ port: PORT });
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
