# **MongoDB Notes with Examples and Coding Questions**

#### **Projections in MongoDB**

* **Purpose:** Control the fields returned in a query to optimize network bandwidth and application memory.
* To include specific fields, use a projection value of `1` for the desired fields.
* To exclude fields, use a projection value of `0`.
* **Note:** You cannot include and exclude fields simultaneously in the same query projection (e.g., `{ title: 1, author: 0 }` is invalid). The only exception is the `_id` field, which can always be explicitly excluded alongside inclusions (e.g., `{ title: 1, _id: 0 }`).

**Example:**

```javascript
db.collection.find({}, { title: 1, author: 1 });

```

Returns only the `title` and `author` fields (along with the default `_id` field) from each document.

---

#### **Embedded Documents in MongoDB**

* Used to store nested data structures.
* Access nested fields directly by specifying their paths using **dot notation** wrapped in quotes (e.g., `"metadata.likes"`).

**Operators for Embedded Documents:**

1. **$all** Selects documents where an array field contains all specified elements.
2. **$elemMatch** Matches documents containing an array field with at least one element that matches all specified query criteria.

The key difference between **`$all`** and **`$elemMatch`** lies in how they match array elements within a document:

### **1. `$all`**

* **Purpose:** Checks if an array contains all the specified values.
* **Behavior:** It matches documents if *each specified value* exists **anywhere** in the array (but not necessarily inside the same array element).
* **Example Usage:**
```javascript
db.comments.find({
  "metadata.likes": { $all: [45, 78] }
});

```


**Explanation:**
* This query finds documents where the `likes` array contains **both** `45` and `78` (in any order and anywhere inside that array).



---

### **2. `$elemMatch`**

* **Purpose:** Checks if **a single element** in an array satisfies **all specified conditions**.
* **Behavior:** It matches documents if there exists **at least one single array element** that meets all conditions simultaneously.
* **Example Usage:**
```javascript
db.articles.find({
  "comments": {
    $elemMatch: { user: "user5", text: "Just what I needed to understand aggregations." }
  }
});

```


**Explanation:**
* This query finds documents where the `comments` array has **at least one object** that has both `user` equal to `"user5"` **and** `text` equal to `"Just what I needed to understand aggregations."` inside that exact same object.



---

### **Comparison Summary:**

| Feature | **`$all`** | **`$elemMatch`** |
| --- | --- | --- |
| **Match Scope** | Checks for the existence of **multiple distinct elements** across the entire array. | Evaluates multiple conditions on **a single element** within the array. |
| **Logical Nature** | Matches if all target values are found anywhere in the array. | Matches if one compound element meets all criteria at once. |
| **Use Case** | Used when you care about checking if **individual values** exist in an array of scalars (e.g., strings, numbers). | Used when you need to ensure **multiple conditional rules** apply strictly within a single nested object/element. |