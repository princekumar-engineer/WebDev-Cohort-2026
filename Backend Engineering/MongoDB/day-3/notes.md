## Advanced Queries in MongoDB

### ✅ `$exists` Operator Example

**Use case**: Find products that have a `rating` field (some documents might be missing this field).

```js
db.products.find({
  rating: { $exists: true },
});

```

👉 This query returns all products **where the `rating` field exists**.

If you want to find documents **where `rating` is missing**, use:

```js
db.products.find({
  rating: { $exists: false },
});

```

---

### ✅ `$type` Operator Example

**Use case**: Check the data type of a field. For example, return all products where `price` is a double-precision floating-point number.

```js
db.products.find({
  price: { $type: "double" },
});

```

🧠 Why use this? Because sometimes, certain documents may accidentally store values as **strings instead of numbers** during data ingestion.

> You can also use BSON aliases like `"string"`, `"bool"`, `"array"`, `"object"`, `"date"`, etc.

---

### ✅ `$expr` Operator Example

**Use case**: Use aggregation expressions for advanced comparisons. For example, return products where `price > rating * 5`.

```js
db.products.find({
  $expr: {
    $gt: ["$price", { $multiply: ["$rating", 5] }],
  },
});

```

🔍 This will return products where the **price is greater than 5 times the rating**.

Another `$expr` example: find products where `height` is **greater than width** within the same document:

```js
db.products.find({
  $expr: {
    $gt: ["$height", "$width"],
  },
});

```

---

### Bonus: Combine Them

You can combine these advanced query operators to build highly specific filters:

**Example**: Find products that:

* Have a `rating` field
* The data type of `rating` is a 32-bit integer (`"int"`)
* And `price > 5 * rating`

```js
db.products.find({
  rating: { $exists: true, $type: "int" },
  $expr: {
    $gt: ["$price", { $multiply: ["$rating", 5] }],
  },
});

```