
---

# 📊 Sample Table (Single Source of Truth)

We will use **one table** so students don’t get confused.

### 🎓 Course Platform Example

```sql
-- Make sure pgvector extension is available if using vectors
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE course_enrollments (
  enrollment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  student_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,

  course_name VARCHAR(50) NOT NULL,
  level VARCHAR(20),

  price NUMERIC(8,2) CHECK (price > 0),

  enrolled_on DATE DEFAULT CURRENT_DATE,
  completion_status BOOLEAN DEFAULT FALSE,

  rating INT CHECK (rating BETWEEN 1 AND 5),

  course_meta JSONB,
  skills TEXT[],
  embedding VECTOR(3)
);

INSERT INTO course_enrollments (student_name, email, course_name, level, price, enrolled_on, completion_status, rating, course_meta, skills) VALUES
('Alex Mercer', 'alex.mercer@devmail.com', 'Next.js Mastery', 'Advanced', 299.99, '2025-12-01', TRUE, 5, '{"duration": "30 hours", "instructor": "Alex"}', ARRAY['React','Next.js','TypeScript']),
('Emma Watson', 'emma.w@example.com', 'React Native Basics', 'Beginner', 149.00, '2025-11-15', FALSE, NULL, '{"duration": "20 hours", "platform": "Expo"}', ARRAY['React Native','JavaScript']),
('Liam Nguyen', 'liam.dev@outlook.com', 'Node.js APIs', 'Intermediate', 249.50, '2025-12-20', TRUE, 4, '{"duration": "25 hours", "tools": ["Prisma","Express"]}', ARRAY['Node.js','Prisma','REST']),
('Sophia Martinez', 'sophia@techcorp.com', 'Full-Stack React', 'Advanced', 399.99, '2025-11-10', TRUE, 5, '{"duration": "40 hours", "projects": 5}', ARRAY['React','Next.js','PostgreSQL']),
('Ryan Gallagher', 'ryan.g@gmail.com', 'Python for AI', 'Intermediate', 199.00, '2025-12-05', FALSE, 3, '{"duration": "22 hours", "libs": ["LangChain"]}', ARRAY['Python','AI/ML']),
('Chloe Dubois', 'chloe.d@yahoo.com', 'Docker Essentials', 'Beginner', 129.99, '2025-11-25', TRUE, 4, '{"duration": "15 hours", "cloud": "Cloudflare"}', ARRAY['Docker','DevOps']),
('Marcus Vance', 'marcus@codecraft.com', 'Advanced SQL', 'Intermediate', 179.50, '2025-12-15', FALSE, NULL, '{"duration": "18 hours", "db": "PostgreSQL"}', ARRAY['SQL','PostgreSQL','Indexes']),
('Anna Schmidt', 'anna.s@edu.de', 'TypeScript Pro', 'Advanced', 279.00, '2025-11-30', TRUE, 5, '{"duration": "28 hours", "focus": "Generics"}', ARRAY['TypeScript','Advanced JS']),
('Kenji Sato', 'kenji@freelance.io', 'Cloudflare Workers', 'Intermediate', 225.75, '2025-12-10', TRUE, 4, '{"duration": "24 hours", "serverless": true}', ARRAY['Cloudflare','Workers','Edge']),
('Sarah Jenkins', 'sarah.j@startup.co.uk', 'AI Integration', 'Advanced', 349.99, '2025-12-25', FALSE, 2, '{"duration": "35 hours", "apis": ["OpenAI"]}', ARRAY['AI','LangChain','Vercel']);

```

---

# 1️⃣ Datatypes in PostgreSQL (Core + Modern)

PostgreSQL supports **multiple data models** side-by-side.

---

## 🔹 Core Datatypes (Most Used)

| Type | Use Case |
| --- | --- |
| **IDENTITY / SERIAL** | Auto-increment unique IDs (IDENTITY is modern SQL standard) |
| **INT** | Counts, integers, ratings |
| **NUMERIC(p,s)** | Financial figures / money where precision is exact |
| **VARCHAR(n)** | Variable text with an upper character limit |
| **TEXT** | Unlimited text string storage (highly optimized) |
| **BOOLEAN** | true / false flags |
| **DATE** | Calendar date only (`YYYY-MM-DD`) |
| **TIMESTAMP** | Date + time combined |
| **JSONB** | Native semi-structured JSON stored in binary format |
| **ARRAY** | Lists of scalar values (e.g., `TEXT[]`, `INT[]`) |
| **ENUM** | Pre-defined custom list of valid static values |
| **VECTOR** | AI embeddings used for similarity search (via `pgvector`) |

```sql
price NUMERIC(8,2)
rating INT
completion_status BOOLEAN

```

---

## 🔹 JSON / JSONB (Modern Backend)

### JSON vs JSONB

| Feature | JSON | JSONB |
| --- | --- | --- |
| **Storage Format** | Exact Text | Parsed Binary |
| **Write Speed** | Fast | Slightly Slower |
| **Query Speed** | Slow | **Blazing Fast** |
| **Indexing** | ❌ No | ✅ Yes (GIN Indexes) |

✅ **Best Practice:** Always default to using `JSONB` for performance and searchability.

### Insert / Update JSON Data

```sql
UPDATE course_enrollments
SET course_meta = '{
  "duration": "8 weeks",
  "mentor": "Hitesh",
  "projects": 5
}'
WHERE course_name = 'Next.js Mastery';

```

### Query JSON

```sql
-- Extract key value as text using ->>
SELECT course_meta->>'mentor'
FROM course_enrollments;

-- Filter by JSON property value
SELECT *
FROM course_enrollments
WHERE course_meta->>'projects' = '5';

```

📌 **Real-World Use Cases:**

* E-commerce product properties
* Dynamic application configuration / Feature flags
* Third-party webhook log snapshots

---

## 🔹 ARRAY Type

```sql
UPDATE course_enrollments
SET skills = ARRAY['JavaScript', 'Async', 'DOM']
WHERE course_name = 'Next.js Mastery';

```

```sql
-- Match if element exists inside array
SELECT *
FROM course_enrollments
WHERE 'React' = ANY(skills);

```

📌 **Real-World Use Cases:**

* Simple item tags or categories
* Days-of-the-week selections

⚠️ **Warning:** Do not use arrays to replace relational normalization if the array grows infinitely.

---

## 🔹 ENUM (Controlled Values)

```sql
CREATE TYPE course_level AS ENUM 
('Beginner', 'Intermediate', 'Advanced');

ALTER TABLE course_enrollments
ALTER COLUMN level TYPE course_level
USING level::course_level;

```

📌 **Why use it?** It enforces type safety at database level, preventing typo bugs (like storing 'begginer').

---

# 2️⃣ Constraints (Data Safety)

Constraints act as validation rules to **prevent dirty data**.

| Constraint | Purpose |
| --- | --- |
| `PRIMARY KEY` | Uniquely identifies each record; implies `UNIQUE` and `NOT NULL`. |
| `NOT NULL` | Prevents empty fields; field becomes mandatory. |
| `UNIQUE` | Guarantees all entries in this column have distinctive values. |
| `CHECK` | Tests data against a custom boolean rule before writing. |
| `DEFAULT` | Auto-assigns an initial fallback value if omitted. |

```sql
email VARCHAR(100) UNIQUE NOT NULL
price CHECK (price > 0)
rating CHECK (rating BETWEEN 1 AND 5)

```

---

# 3️⃣ SELECT & Clauses

## 🔹 WHERE (Filtering rows based on conditions)

Filters rows returned by `SELECT` to match specified criteria using conditional operators.

```sql
SELECT * FROM course_enrollments
WHERE level = 'Beginner';

```

## 🔹 DISTINCT (Removing duplicate rows)

Eliminates duplicate values from the output list, highlighting unique variations.

```sql
SELECT DISTINCT course_name
FROM course_enrollments;

```

## 🔹 ORDER BY (Sorting results)

Sorts results by values in one or more columns in ascending (`ASC`, default) or descending (`DESC`) format.

```sql
SELECT student_name, price
FROM course_enrollments
ORDER BY price DESC;

```

## 🔹 LIMIT (Restricting number of rows)

Clips the returned dataset to a set maximum row count. Perfect for pagination blocks when combined with `OFFSET`.

```sql
SELECT *
FROM course_enrollments
ORDER BY enrolled_on DESC
LIMIT 5;

```

## 🔹 LIKE / ILIKE (Pattern matching in strings)

Evaluates if a string matches target structures via wildcard keys.

| Wildcard Key | Meaning | Example |
| --- | --- | --- |
| `%` | Zero or more wildcard characters | `'A%'` matches everything starting with 'A' |
| `_` | Exactly one wildcard character | `'_a%'` matches text with 'a' as its second letter |

```sql
-- Names starting with 'A' (Case-sensitive)
SELECT * FROM course_enrollments
WHERE student_name LIKE 'A%';

-- Names containing 'an' anywhere
SELECT * FROM course_enrollments
WHERE student_name LIKE '%an%';

-- Case-insensitive match using PostgreSQL-specific ILIKE
SELECT * FROM course_enrollments
WHERE student_name ILIKE 'a%';

-- Exclude items matching a pattern
SELECT * FROM course_enrollments
WHERE student_name NOT LIKE 'Z%';

```

---

# 4️⃣ Conditions & Operators

## 🔹 Comparison Operators

Evaluates scalar relationships between values: `=`, `!=` (or `<>`), `>`, `<`, `>=`, `<=`.

```sql
price > 200.00
rating >= 4

```

## 🔹 Logical Operators

Chains filters together. `AND` means all conditions must pass; `OR` requires a minimum of one to pass; `NOT` flips an evaluation.

```sql
SELECT * FROM course_enrollments
WHERE level = 'Intermediate' AND completion_status = true;

```

```sql
SELECT * FROM course_enrollments
WHERE level = 'Beginner' OR level = 'Advanced';

```

## 🔹 IN (Checking membership in a set)

Evaluates if a target value is inside a declared array or list. Shorthand clean alternative to stacked `OR` statements.

```sql
SELECT * FROM course_enrollments
WHERE course_name IN ('Next.js Mastery', 'Advanced SQL');

```

## 🔹 BETWEEN (Range testing inclusive)

Verifies if an item resides inside an upper and lower boundary limit (bounds included). Works natively on numbers and dates.

```sql
SELECT * FROM course_enrollments
WHERE price BETWEEN 150.00 AND 300.00;

```

---

# 5️⃣ Aggregate Functions

Aggregates perform mathematical operations across **multiple rows to return a single result**.

| Function | Use |
| --- | --- |
| `COUNT()` | Total number of row matches |
| `SUM()` | Calculates total numeric additions |
| `AVG()` | Evaluates target numeric arithmetic mean |
| `MIN()` | Captures absolute lowest value |
| `MAX()` | Captures absolute highest value |

## Examples

```sql
-- Total enrollments
SELECT COUNT(*) FROM course_enrollments;

-- Total revenue
SELECT SUM(price) FROM course_enrollments;

-- Average price
SELECT AVG(price) FROM course_enrollments;

-- Cheapest course price
SELECT MIN(price) FROM course_enrollments;

-- Most expensive course price
SELECT MAX(price) FROM course_enrollments;

```

📌 **Pro-Tip:** Aggregates ignore `NULL` inputs by design (except `COUNT(*)`).

---

# 6️⃣ GROUP BY (Analytics Core)

Collapses rows with identical values in specified columns into summarized metric rows.

```sql
-- Total revenue per course
SELECT course_name, SUM(price) AS revenue
FROM course_enrollments
GROUP BY course_name;

-- Average rating per course
SELECT course_name, AVG(rating) AS average_rating
FROM course_enrollments
GROUP BY course_name;

```

⚠️ **The Golden Rule:** Any column selected that isn't wrapped inside an aggregate function **must** be declared within the `GROUP BY` clause.

---

# 7️⃣ String Functions

## 🔹 UPPER / LOWER

```sql
-- Force uppercase display
SELECT UPPER(student_name) FROM course_enrollments;

```

## 🔹 LENGTH

```sql
-- Count string character lengths
SELECT student_name, LENGTH(student_name) FROM course_enrollments;

```

## 🔹 CONCAT / Concatenation Operator

```sql
-- Combines text via function or standard pipes (||)
SELECT CONCAT(student_name, ' is learning ', course_name) FROM course_enrollments;

```

## 🔹 SUBSTRING

```sql
-- Extracts pieces (Field FROM start_pos FOR length)
SELECT SUBSTRING(email FROM 1 FOR 5) FROM course_enrollments;

```

## 🔹 TRIM

```sql
-- Strips blank padding spaces away
SELECT TRIM('    PostgreSQL Clean text    ');

```

---

# 🧠 PostgreSQL Coding Exercises (With Answers)

## 🧩 Exercise 1: Filter + Sorting

**Problem:** Get the **top 3 most expensive enrollments** where the course level is **Intermediate**.

```sql
SELECT student_name, course_name, price
FROM course_enrollments
WHERE level = 'Intermediate'
ORDER BY price DESC
LIMIT 3;

```

---

## 🧩 Exercise 2: Aggregate + GROUP BY

**Problem:** Find the **total revenue generated by each course**.

```sql
SELECT course_name, SUM(price) AS total_revenue
FROM course_enrollments
GROUP BY course_name;

```

---

## 🧩 Exercise 3: JSONB Query

**Problem:** Fetch all enrollments where the **instructor name is "Alex"** from `course_meta`.

```sql
SELECT student_name, course_name
FROM course_enrollments
WHERE course_meta->>'instructor' = 'Alex';

```

---

## 🧩 Exercise 4: ARRAY Condition

**Problem:** Find all students enrolled in courses that include **"TypeScript"** in the `skills` array.

```sql
SELECT student_name, course_name
FROM course_enrollments
WHERE 'TypeScript' = ANY(skills);

```

---

## 🧩 Exercise 5: GROUP BY + Condition

**Problem:** For **completed enrollments only**, find the **average rating per course**, sorted by highest rating first.

```sql
SELECT course_name, AVG(rating) AS avg_rating
FROM course_enrollments
WHERE completion_status = true
GROUP BY course_name
ORDER BY avg_rating DESC;

```

---

# 🏁 Bonus Challenge (Interview Level)

**Problem:** Find the **course name that has the highest number of enrollments**.

```sql
SELECT course_name, COUNT(*) AS total_enrollments
FROM course_enrollments
GROUP BY course_name
ORDER BY total_enrollments DESC
LIMIT 1;

```