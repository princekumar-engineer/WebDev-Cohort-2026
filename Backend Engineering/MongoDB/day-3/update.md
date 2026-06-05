### **MongoDB Update Made Easy: Notes with Coding Examples** **Collection Name:** `comments`

MongoDB provides several methods to update documents in a collection. These include updating specific fields, replacing entire documents, or updating multiple documents at once.

---

### **1. Methods for Updating Documents** 1. **`updateOne()`**: Updates the first matching document.

2. **`updateMany()`**: Updates all documents that match the query.
3. **`replaceOne()`**: Replaces an entire document.

---

### **2. Basic Syntax**  **`updateOne()`**

* Updates the first document that matches the filter.

**Example:**

```javascript
db.comments.updateOne(
  { user: "user1" },          // Filter condition
  { $set: { text: "Updated comment text!" } } // Update action
);

```

* **Explanation**: This finds the first document where `user` is `"user1"` and updates its `text` field.

---

#### **`updateMany()`**

* Updates all documents that match the filter.

**Example:**

```javascript
db.comments.updateMany(
  { likes: { $lt: 10 } },     // Filter condition
  { $set: { priority: "low" } } // Update action
);

```

* **Explanation**: This updates all documents with `likes` less than `10` by setting their `priority` field to `"low"`.

---

#### **`replaceOne()`**

* Replaces the entire document except for the immutable `_id` field.

**Example:**

```javascript
db.comments.replaceOne(
  { user: "user2" },          // Filter condition
  { user: "user2", text: "Completely new comment!", likes: 0 } // New document
);

```

* **Explanation**: This replaces the entire existing document for `"user2"` with the brand-new object provided.

---

### **3. Update Operators** MongoDB uses specialized **update operators** to modify fields within documents without rewriting the entire document.

| Operator | Description | Example |
| --- | --- | --- |
| **`$set`** | Updates or sets a specific field. | `{ $set: { field: value } }` |
| **`$inc`** | Increments/decrements a numeric value. | `{ $inc: { likes: 1 } }` |
| **`$push`** | Adds an element to the end of an array. | `{ $push: { tags: "important" } }` |
| **`$pull`** | Removes all matching values from an array. | `{ $pull: { tags: "spam" } }` |
| **`$unset`** | Deletes a field from the document entirely. | `{ $unset: { field: 1 } }` |

---

### **4. Examples of Update Operators**

#### **Updating a Specific Field**

```javascript
db.comments.updateOne(
  { user: "user3" },
  { $set: { text: "Updated again!", edited: true } }
);

```

* **Explanation**: Modifies the `text` field and adds a completely new boolean field called `edited`.

#### **Incrementing a Value**

```javascript
db.comments.updateOne(
  { user: "user3" },
  { $inc: { likes: 5 } }
);

```

* **Explanation**: Increases the value of the `likes` field by `5`. (Pass a negative number like `-5` to decrement).

#### **Adding to an Array**

```javascript
db.comments.updateOne(
  { user: "user4" },
  { $push: { tags: "favorite" } }
);

```

* **Explanation**: Appends the string `"favorite"` to the existing `tags` array field.

#### **Removing from an Array**

```javascript
db.comments.updateOne(
  { user: "user4" },
  { $pull: { tags: "spam" } }
);

```

* **Explanation**: Filters out and removes `"spam"` from the `tags` array.

#### **Removing a Field**

```javascript
db.comments.updateOne(
  { user: "user4" },
  { $unset: { edited: 1 } }
);

```

* **Explanation**: Completely deletes the `edited` field from the matched document.

---

### **5. Upsert Option**

* **Upsert** (`update` + `insert`) ensures a document is created automatically if no matching document is found by the filter.

**Example:**

```javascript
db.comments.updateOne(
  { user: "newUser" },                        // Filter
  { $set: { text: "This is a new comment!" } }, // Update
  { upsert: true }                             // Upsert option enabled
);

```

* **Explanation**: If `user: "newUser"` exists, it updates their text. If it doesn't exist, a new document containing both the filter criteria and the `$set` payload is created.

---

### **6. Updating Multiple Documents**

**Example:**

```javascript
db.comments.updateMany(
  { likes: { $gte: 100 } },
  { $set: { priority: "high" } }
);

```

* **Explanation**: Scans the entire collection and updates every single comment with `likes` greater than or equal to `100`, changing their `priority` to `"high"`.

---

### **Summary Cheat Sheet**

| Method | Updates | Creates New Document (Upsert) | Core Behavior |
| --- | --- | --- | --- |
| **`updateOne`** | **1** document | Optional (`{ upsert: true }`) | Modifies only the first matching document it finds. |
| **`updateMany`** | **Multiple** documents | Optional (`{ upsert: true }`) | Modifies all documents matching the criteria. |
| **`replaceOne`** | **1** document | Optional (`{ upsert: true }`) | Overwrites the entire document; cannot use update operators. |