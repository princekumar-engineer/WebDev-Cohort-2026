-- ==========================================
-- 1. SETUP TABLES (Classes & Students)
-- ==========================================

CREATE TABLE classes (
  class_id INT PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL
);

CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  class_id INT
);

-- ==========================================
-- 2. SEED DATA (Classes & Students)
-- ==========================================

INSERT INTO classes (class_id, class_name) VALUES
(101, 'JavaScript'),
(102, 'Python'),
(103, 'Java');

INSERT INTO students (student_id, name, class_id) VALUES
(1, 'Alex Mercer', 101),
(2, 'Emma Watson', 102),
(3, 'Liam Nguyen', 101),
(4, 'Sophia Martinez', NULL);

-- Verification
SELECT * FROM classes;
SELECT * FROM students;


-- ==========================================
-- 3. JOIN QUERIES
-- ==========================================

-- INNER JOIN (Only matching records from both sides)
SELECT s.name, c.class_name
FROM students s
INNER JOIN classes c
ON s.class_id = c.class_id;

-- LEFT JOIN (Left table is always full, right table matching or NULL)
SELECT s.name, c.class_name
FROM students s
LEFT JOIN classes c
ON s.class_id = c.class_id;

-- RIGHT JOIN (Right table is always full, left table matching or NULL)
SELECT s.name, c.class_name
FROM students s
RIGHT JOIN classes c
ON s.class_id = c.class_id;

-- CROSS JOIN (Cartesian product - every possible combination)
SELECT s.name, c.class_name
FROM students s
CROSS JOIN classes c;


-- ==========================================
-- 4. VIEWS (Full Outer Join Demonstration)
-- ==========================================

CREATE VIEW student_classes AS
SELECT s.name, c.class_name
FROM students s
FULL OUTER JOIN classes c
ON s.class_id = c.class_id;

SELECT * FROM student_classes;


-- ==========================================
-- 5. SELF JOIN & HIERARCHY
-- ==========================================

CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  manager_id INT 
);

-- Add safety constraint mapping manager_id back to employee_id
ALTER TABLE employees
ADD CONSTRAINT fk_manager
FOREIGN KEY (manager_id)
REFERENCES employees(employee_id);

-- Seeding Hierarchical Data
INSERT INTO employees (employee_id, name, manager_id) VALUES
(1, 'Alex Mercer', NULL),         -- Top-level manager
(2, 'Emma Watson', 1),           -- Reports to Alex Mercer
(3, 'Liam Nguyen', 1),           -- Reports to Alex Mercer
(4, 'Sophia Martinez', 2);       -- Reports to Emma Watson (Corrected from invalid ID placeholder)

-- Querying Hierarchy via Self Join
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.employee_id;


-- ==========================================
-- 6. AGGREGATION & GROUP FILTERING
-- ==========================================

SELECT class_id, COUNT(*) AS total_students
FROM students
GROUP BY class_id
HAVING COUNT(*) > 1;