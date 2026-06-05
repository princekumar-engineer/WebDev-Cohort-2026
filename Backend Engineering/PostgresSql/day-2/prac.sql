sql
-- 1. Table Creation with Modern Identity Syntax
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
  skills TEXT[]
);

-- 2. Seeding Data with International Names
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


-- 3. Execution Queries & Core Clauses

SELECT * FROM course_enrollments;

-- JSONB extraction syntax
SELECT course_meta->>'platform'
FROM course_enrollments;

-- Array containment check (@> checks if array contains ['React'])
SELECT *
FROM course_enrollments
WHERE skills @> ARRAY['React'];

-- Basic Filtering
SELECT * FROM course_enrollments
WHERE level = 'Beginner';

-- Distinct unique lists
SELECT DISTINCT course_name
FROM course_enrollments;

-- Sorting
SELECT student_name, price
FROM course_enrollments
ORDER BY price DESC;


-- 4. Pattern Matching (Adjusted for updated international data strings)

-- Matches names starting with 'A' or 'a' (e.g., Alex Mercer, Anna Schmidt)
SELECT *
-- Note: Replaced with ILIKE to handle case safety cleanly
FROM course_enrollments
WHERE student_name ILIKE 'a%';

-- Matches names ending with 'son' (e.g., Emma Watson)
SELECT *
FROM course_enrollments
WHERE student_name LIKE '%son';

-- Matches names with 'a' at position 5 (e.g., Emma Watson -> 'E-m-m-a')
SELECT *
FROM course_enrollments
WHERE student_name LIKE '____a%';


-- 5. Logical Operators

SELECT *
FROM course_enrollments
WHERE level = 'Intermediate'
AND completion_status = true;

SELECT *
FROM course_enrollments
WHERE level = 'Beginner'
OR level = 'Advanced';

-- Membership Set test
SELECT *
FROM course_enrollments
WHERE course_name IN ('Next.js Mastery', 'Node.js Pro');


-- 6. Aggregate Functions & Grouping Core

-- Total enrollments count
SELECT COUNT(*) FROM course_enrollments;

-- Summing up totals
SELECT SUM(price) FROM course_enrollments;

-- Aggregations grouped by attributes
SELECT course_name, SUM(price) AS revenue
FROM course_enrollments
GROUP BY course_name;

SELECT course_name, AVG(rating) AS avg_rating
FROM course_enrollments
GROUP BY course_name;

SELECT completion_status, COUNT(*)
FROM course_enrollments
GROUP BY completion_status;


-- 7. Basic Scalar String Conversions
SELECT UPPER(student_name)
FROM course_enrollments;

