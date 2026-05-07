-- ! docker run -d --name sql_class_pg -e POSTGRES_PASSWORD=postgres -p 5433:5432 postgres:15

-- ! docker exec -it sql_class_pg psql -U postgres

CREATE DATABASE sql_class_1_db;

-- 1. Create a database (Optional, usually we are already in one)
-- CREATE DATABASE web_dev_cohort_db;

-- 2. Basic Table Creation with Data Types and Constraints
-- Let's model our "Web Dev Cohort 2026" students!

DROP TABLE IF EXISTS students;

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY, -- Auto-incrementing ID, acts as Primary Key
    
    first_name VARCHAR(50) NOT NULL, -- Cannot be empty
    last_name VARCHAR(50), -- Can be null (some people only have one name!)
    
    email VARCHAR(100) UNIQUE NOT NULL, -- Must be unique across verify usually, and present
    phone_number CHAR(10) UNIQUE, -- Fixed length string for phone numbers
    
    -- CHECK CONSTRAINT: Ensure age is reasonable for a web dev course
    age INT CHECK (age > 12),
    
    -- DEFAULT and CHECK: Track status
    current_status VARCHAR(20) DEFAULT 'active' CHECK (current_status IN ('active', 'graduated', 'dropped_out', 'on_leave')),
    
    -- RELATABLE DATA: Masterji Handle (crucial for our community!)
    masterji_handle VARCHAR(50) UNIQUE,
    
    -- BOOLEAN: Has the student completed the initial setup?
    has_joined_masterji BOOLEAN DEFAULT FALSE,
    
    -- NUMERIC/DECIMAL: Maybe their aggregate assignment score percentage?
    current_score NUMERIC(5, 2) CHECK (current_score >= 0 AND current_score <= 100),
    
    enrollment_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO students (first_name, last_name, email, phone_number, age, current_status, masterji_handle, has_joined_masterji, current_score)
VALUES ('John', 'Doe', 'john.doe@example.com', '9876543210', 22, 'active', '@john_codes', TRUE, 85.50);

SELECT * FROM students;

-- 3. Adding a table for Assignments to demonstrate Foreign Keys

-- DROP TABLE IF EXISTS assignments;

-- CREATE TABLE assignments (
--     assignment_id SERIAL PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     max_score INT DEFAULT 100,
--     deadline TIMESTAMP NOT NULL
-- );

-- 4. Submissions table: Connecting Students and Assignments (Foreign Keys + Composite Keys)
-- ! take this in join class
-- DROP TABLE IF EXISTS submissions;

-- CREATE TABLE submissions (
--     submission_id SERIAL PRIMARY KEY,
    
--     -- Foreign Key to students table
--     student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    
--     -- Foreign Key to assignments table
--     assignment_id INT REFERENCES assignments(assignment_id) ON DELETE CASCADE,
    
--     submission_link TEXT NOT NULL, -- URL to their GitHub/Vercel
--     submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     status VARCHAR(20) CHECK (status IN ('pending', 'evaluated', 'missed')),
    
--     -- Constraint: A student can only submit once per assignment? 
--     -- Let's enforce that logic with a UNIQUE constraint on the pair
--     UNIQUE (student_id, assignment_id)
-- );

-- 5. Altering tables (DDL isn't just CREATE!)
-- Oops, we forgot to add a generic 'batch_name' column to students

ALTER TABLE students 
ADD COLUMN batch_name VARCHAR(50) DEFAULT 'Web Dev 2026';

-- Let's say we want to make sure the submission link is a valid URL format (simple check)
-- ALTER TABLE submissions
-- ADD CONSTRAINT check_link_format CHECK (submission_link LIKE 'http%');

-- -- 6. Dropping a constraint if needed
-- ALTER TABLE submissions DROP CONSTRAINT check_link_format;

/*
summary:
1. PRIMARY KEY: Uniquely identifies rows (student_id).
2. FOREIGN KEY: Links tables together (student_id in submissions).
3. CHECK: Validates data rules (age > 12, status IN (...)).
4. UNIQUE: Ensures no duplicates (email, masterji_handle).
5. NOT NULL: Mandatory fields.
6. DEFAULT: Automatic values if none provided.
7. Data Types: INT, VARCHAR, CHAR, BOOLEAN, DATE, TIMESTAMP, NUMERIC.
*/
