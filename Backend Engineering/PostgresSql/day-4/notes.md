
---

# 🧱 CREATE TABLE QUERIES

## 1️⃣ `classes` table

```sql
CREATE TABLE classes (
  class_id INT PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL
);

```

---

## 2️⃣ `students` table

```sql
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  class_id INT
);

```

> `class_id` is kept optional so we can show **LEFT JOIN behavior** easily.

---

# 🧾 INSERT DATA QUERIES

## Insert into `classes`

```sql
INSERT INTO classes (class_id, class_name) VALUES
(101, 'JavaScript'),
(102, 'Python'),
(103, 'Java');

```

---

## Insert into `students`

```sql
INSERT INTO students (student_id, name, class_id) VALUES
(1, 'Alex Mercer', 101),
(2, 'Emma Watson', 102),
(3, 'Liam Nguyen', 101),
(4, 'Sophia Martinez', NULL);

```

---

# 🔍 VERIFY DATA

```sql
SELECT * FROM students;
SELECT * FROM classes;

```

---

# 🔗 SQL JOINs in **PostgreSQL** PostgreSQL supports **ALL major join types**.

A JOIN is used to combine data from two or more tables using a common related column.

JOIN helps us see related data together instead of keeping it scattered in different tables.

.

### 🤔 Why do we need JOINs?

In real databases, data is not stored in one big table.

Instead, data is split into multiple tables to:

* Avoid duplicate data
* Keep data clean
* Improve performance
* Follow good database design (normalization)

---

## 1️⃣ INNER JOIN

### ✅ Definition

Returns **only rows that match in both tables**.

### 📌 Query

```sql
SELECT s.name, c.class_name
FROM students s
INNER JOIN classes c
ON s.class_id = c.class_id;

```

🧠 **Use when:**
You only want data that exists in **both tables**.

---

## 2️⃣ LEFT JOIN (LEFT OUTER JOIN)

### ✅ Definition

Returns:

* **All rows from the left table**
* Matching rows from the right table
* `NULL` when no match exists

### 📌 Query

```sql
SELECT s.name, c.class_name
FROM students s
LEFT JOIN classes c
ON s.class_id = c.class_id;

```

🧠 **Most used join in real projects**

---

## 3️⃣ RIGHT JOIN (RIGHT OUTER JOIN)

### ✅ Definition

Returns:

* **All rows from the right table**
* Matching rows from the left table
* `NULL` when no match exists

### 📌 Query

```sql
SELECT s.name, c.class_name
FROM students s
RIGHT JOIN classes c
ON s.class_id = c.class_id;

```

🧠 **Tip:**
Most developers avoid RIGHT JOIN and rewrite it as LEFT JOIN.

---

## 4️⃣ FULL OUTER JOIN ✅ (Postgres Special)

### ✅ Definition

Returns:

* All rows from **both tables**
* Matching rows combined
* Non-matching rows filled with `NULL`

### 📌 Query

```sql
SELECT s.name, c.class_name
FROM students s
FULL OUTER JOIN classes c
ON s.class_id = c.class_id;

```

🧠 **Think:**
LEFT JOIN + RIGHT JOIN together

---

## 5️⃣ CROSS JOIN

### ✅ Definition

Returns **every possible combination** of rows from both tables.

### 📌 Query

```sql
SELECT s.name, c.class_name
FROM students s
CROSS JOIN classes c;

```

🧠 **Used rarely**, but good to know.

---

## 6️⃣ SELF JOIN (Very Common in Postgres)

### ✅ Definition

Joining a table **with itself**.

### Example use case:

* Employee → Manager
* User → Referred by another user

### 📌 Example Query

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.employee_id;

```

Below is a **complete, runnable example** so you can **create the table, insert data, and simulate the SELF JOIN** easily in **PostgreSQL**.

---

## 🧱 `employees` Table (Manager Example)

### 📌 Create Table

```sql
CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  manager_id INT
);

```

> `manager_id` refers to **employee_id of the same table**.

---

### 📌 Insert Sample Data

```sql
INSERT INTO employees (employee_id, name, manager_id) VALUES
(1, 'Alex Mercer', NULL),      -- Top-level manager
(2, 'Emma Watson', 1);        -- Reports to Alex Mercer
(3, 'Liam Nguyen', 1),          -- Reports to Alex Mercer
(4, 'Sophia Martinez', 2);      -- Reports to Emma Watson

```

---

## 🔁 SELF JOIN Query (Employee → Manager)

```sql
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.employee_id;

```

---

## ✅ Result

| employee | manager |
| --- | --- |
| Alex Mercer | NULL |
| Emma Watson | Alex Mercer |
| Liam Nguyen | Alex Mercer |
| Sophia Martinez | Emma Watson |

---

## 🧠 What’s Happening (Simple)

* `employees e` → employee role
* `employees m` → manager role
* `manager_id` points to another row’s `employee_id`

---

## 🔑 Interview-Ready Line

> **A SELF JOIN allows a table to reference itself, commonly used to model hierarchical data like employee-manager relationships.**

---

# 🚫 Joins to Avoid in Postgres

| Join | Why |
| --- | --- |
| **NATURAL JOIN** | Implicit & risky |
| **USING (col)** | Fine, but less explicit |
| **IMPLICIT JOIN** | Old syntax |

---

# 📌 PostgreSQL JOIN Summary (Quick Table)

| Join Type | Supported | Use Case |
| --- | --- | --- |
| **INNER JOIN** | ✅ | Matching data |
| **LEFT JOIN** | ✅ | Optional relation |
| **RIGHT JOIN** | ✅ | Rarely used |
| **FULL JOIN** | ✅ | Audit / reports |
| **CROSS JOIN** | ✅ | Combinations |
| **SELF JOIN** | ✅ | Hierarchies |

---

# 📌 VIEW QUERY (Optional but useful)

```sql
CREATE VIEW student_classes AS
SELECT s.name, c.class_name
FROM students s
INNER JOIN classes c
ON s.class_id = c.class_id;

```

```sql
SELECT * FROM student_classes;

```

---

# 🔍 HAVING QUERY

```sql
SELECT class_id, COUNT(*) AS total_students
FROM students
GROUP BY class_id
HAVING COUNT(*) > 1;

```

---

Here is the **simplest and clearest explanation** — no theory overload, only what actually matters 👇

---

# 🔍 WHERE vs HAVING (Very Easy Difference)

### 👉 Main idea

* **WHERE** filters **rows**
* **HAVING** filters **groups**

---

## 1️⃣ WHERE Clause

### ✔ What it does

Filters data **before grouping happens**.

### ✔ Used with

* Normal columns
* Conditions like `=`, `>`, `<`, `LIKE`, etc.

### ❌ Cannot use

* Aggregate functions (`COUNT`, `SUM`, `AVG`, etc.)

---

### Example using our `students` table

👉 Get students from class `101`

```sql
SELECT *
FROM students
WHERE class_id = 101;

```

📌 Output:

| student_id | name | class_id |
| --- | --- | --- |
| 1 | Alex Mercer | 101 |
| 3 | Liam Nguyen | 101 |

---

## 2️⃣ HAVING Clause

### ✔ What it does

Filters data **after GROUP BY**.

### ✔ Used with

* Aggregate functions (`COUNT`, `SUM`, `AVG`)

### ❌ Cannot work

* Without `GROUP BY` (in most real use cases)

---

### Example

👉 Get classes having **more than 1 student**

```sql
SELECT class_id, COUNT(*) AS total_students
FROM students
GROUP BY class_id
HAVING COUNT(*) > 1;

```

📌 Output:

| class_id | total_students |
| --- | --- |
| 101 | 2 |

---

## 🧠 WHERE vs HAVING — Side-by-Side

| Feature | WHERE | HAVING |
| --- | --- | --- |
| **Filters** | Rows | Groups |
| **Works on** | Individual records | Aggregated data |
| **Used before** | `GROUP BY` | After `GROUP BY` |
| **Supports COUNT/SUM** | ❌ No | ✅ Yes |
| **Performance** | Faster | Slower |

---

## 🔥 Combined Example (MOST IMPORTANT)

👉 First filter rows, then filter groups

```sql
SELECT class_id, COUNT(*) AS total_students
FROM students
WHERE class_id IS NOT NULL
GROUP BY class_id
HAVING COUNT(*) > 1;

```

### Execution order (easy to remember)

1. `FROM`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`

---

## 🧩 Real-Life Analogy

* **WHERE** = filter people **before making teams**
* **HAVING** = filter **teams after they are formed**