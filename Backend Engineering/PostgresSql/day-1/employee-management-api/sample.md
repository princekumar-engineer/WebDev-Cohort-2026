
---

## 🧱 The Matching PostgreSQL Schema

Run this SQL block in your database instance to match the expectations of your API code (including structural table support for the `updated_at` timestamps managed by your dynamic updates):

```sql
CREATE TABLE employees (
    emp_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    dept VARCHAR(100) NOT NULL,
    salary DECIMAL(12, 2) NOT NULLCHECK (salary >= 0),
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mock Data Seed
INSERT INTO employees (fname, lname, email, dept, salary, hire_date) VALUES
('Alex', 'Mercer', 'alex.mercer@example.com', 'Engineering', 95000.00, '2024-01-15'),
('Emma', 'Watson', 'emma.watson@example.com', 'Engineering', 105000.00, '2023-06-10'),
('Liam', 'Nguyen', 'liam.nguyen@example.com', 'Marketing', 75000.00, '2024-03-22'),
('Sophia', 'Martinez', 'sophia.m@example.com', 'Finance', 88000.00, '2025-01-05');

```

---

## 🛠️ Code Reviews & Critical Syntax Adjustments

While your backend application logic is solid, there is an **explicit routing bug** on line 42 (`GET /api/employees/search`) that will cause runtime conflicts if not adjusted.

### 1️⃣ Fix Route Collision (Critical)

In your file structure, you declared your search route *after* your generic ID parameter route:

* `GET /api/employees/:id`
* `GET /api/employees/search`

Because Express processes endpoints sequentially, requesting `/api/employees/search` will cause Express to mistake the word `"search"` for a literal parameter value `:id`. It tries to pass it to the lookup query (`WHERE emp_id = 'search'`), triggering a PostgreSQL cast syntax exception (`invalid input syntax for type integer`).

**Solution:** Always place absolute/static paths *above* dynamic parameter paths. Move **Section 8 (Search Employees)** directly above **Section 2 (Get Employee by ID)**.

### 2️⃣ Modernize pg Imports (Optional Best Practice)

If your environment runs Node Next with ES modules via your package json config, use standard destructuring or explicit defaults:

```javascript
// If using commonJS (require)
const { Pool } = require('pg');

// If migrating to ES Modules (import)
import pkg from 'pg';
const { Pool } = pkg;

```

---

## 🚀 Correctly Ordered, Final Runnable Code

Here is the fully organized JavaScript code with structural route order corrected and standard environmental variable defaults optimized:

```javascript
// ============================================
// EMPLOYEE MANAGEMENT API - EXPRESS + POSTGRESQL
// ============================================

const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// DATABASE CONNECTION
// ============================================
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'company_db',
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Test database connection pool health safely
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Connected to PostgreSQL database pool successfully'))
    .catch((err) => console.error('❌ Error connecting to the database:', err.stack));

// ============================================
// ROUTES
// ============================================

// Home route - API documentation
app.get('/', (req, res) => {
    res.json({
        message: 'Employee Management API',
        version: '1.0.0',
        endpoints: {
            'GET /api/employees': 'Get all employees',
            'GET /api/employees/search': 'Search employees (query params: name, dept, min_salary, max_salary)',
            'GET /api/employees/:id': 'Get employee by ID',
            'GET /api/employees/dept/:dept': 'Get employees by department',
            'POST /api/employees': 'Create new employee',
            'PUT /api/employees/:id': 'Update employee',
            'DELETE /api/employees/:id': 'Delete employee',
            'GET /api/stats': 'Get employee statistics'
        }
    });
});

// ============================================
// 1. GET ALL EMPLOYEES
// ============================================
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees ORDER BY emp_id ASC');
        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employees',
            error: error.message
        });
    }
});

// ============================================
// 2. SEARCH EMPLOYEES (Moved UP to avoid dynamic route parameter collision)
// ============================================
app.get('/api/employees/search', async (req, res) => {
    try {
        const { name, dept, min_salary, max_salary } = req.query;

        let query = 'SELECT * FROM employees WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (name) {
            query += ` AND (fname ILIKE $${paramCount} OR lname ILIKE $${paramCount})`;
            values.push(`%${name}%`);
            paramCount++;
        }

        if (dept) {
            query += ` AND dept = $${paramCount}`;
            values.push(dept);
            paramCount++;
        }

        if (min_salary) {
            query += ` AND salary >= $${paramCount}`;
            values.push(min_salary);
            paramCount++;
        }

        if (max_salary) {
            query += ` AND salary <= $${paramCount}`;
            values.push(max_salary);
            paramCount++;
        }

        query += ' ORDER BY emp_id ASC';

        const result = await pool.query(query, values);

        res.json({
            success: true,
            count: result.rows.length,
            filters: { name, dept, min_salary, max_salary },
            data: result.rows
        });
    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching employees',
            error: error.message
        });
    }
});

// ============================================
// 3. GET EMPLOYEE BY ID
// ============================================
app.get('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM employees WHERE emp_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employee',
            error: error.message
        });
    }
});

// ============================================
// 4. GET EMPLOYEES BY DEPARTMENT
// ============================================
app.get('/api/employees/dept/:dept', async (req, res) => {
    try {
        const { dept } = req.params;
        const result = await pool.query(
            'SELECT * FROM employees WHERE dept = $1 ORDER BY emp_id ASC',
            [dept]
        );

        res.json({
            success: true,
            department: dept,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching employees by department:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employees by department',
            error: error.message
        });
    }
});

// ============================================
// 5. CREATE NEW EMPLOYEE
// ============================================
app.post('/api/employees', async (req, res) => {
    try {
        const { fname, lname, email, dept, salary, hire_date } = req.body;

        if (!fname || !lname || !email || !dept || !salary) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: fname, lname, email, dept, salary'
            });
        }

        const result = await pool.query(
            `INSERT INTO employees (fname, lname, email, dept, salary, hire_date)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [fname, lname, email, dept, salary, hire_date || new Date()]
        );

        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating employee:', error);
        if (error.code === '23505') {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error creating employee',
            error: error.message
        });
    }
});

// ============================================
// 6. UPDATE EMPLOYEE
// ============================================
app.put('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fname, lname, email, dept, salary, hire_date } = req.body;

        const checkResult = await pool.query('SELECT * FROM employees WHERE emp_id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        const updates = [];
        const values = [];
        let paramCount = 1;

        if (fname) { updates.push(`fname = $${paramCount++}`); values.push(fname); }
        if (lname) { updates.push(`lname = $${paramCount++}`); values.push(lname); }
        if (email) { updates.push(`email = $${paramCount++}`); values.push(email); }
        if (dept)  { updates.push(`dept = $${paramCount++}`); values.push(dept); }
        if (salary){ updates.push(`salary = $${paramCount++}`); values.push(salary); }
        if (hire_date) { updates.push(`hire_date = $${paramCount++}`); values.push(hire_date); }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);

        if (updates.length === 1) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE employees SET ${updates.join(', ')} WHERE emp_id = $${paramCount} RETURNING *`,
            values
        );

        res.json({
            success: true,
            message: 'Employee updated successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        if (error.code === '23505') {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error updating employee',
            error: error.message
        });
    }
});

// ============================================
// 7. DELETE EMPLOYEE
// ============================================
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM employees WHERE emp_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.json({
            success: true,
            message: 'Employee deleted successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting employee',
            error: error.message
        });
    }
});

// ============================================
// 8. GET EMPLOYEE STATISTICS
// ============================================
app.get('/api/stats', async (req, res) => {
    try {
        const deptStatsResult = await pool.query(
            `SELECT dept, COUNT(*) as employee_count, AVG(salary)::NUMERIC(10,2) as avg_salary, MIN(salary) as min_salary, MAX(salary) as max_salary
             FROM employees GROUP BY dept ORDER BY employee_count DESC`
        );

        const overallResult = await pool.query(
            `SELECT COUNT(*) as total_employees, AVG(salary)::NUMERIC(10,2) as avg_salary, MIN(salary) as min_salary, MAX(salary) as max_salary, MIN(hire_date) as earliest_hire_date, MAX(hire_date) as latest_hire_date
             FROM employees`
        );

        res.json({
            success: true,
            overall: overallResult.rows[0],
            by_department: deptStatsResult.rows
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⏳ Shutting down gracefully...');
    await pool.end();
    console.log('✅ Database connection pools dropped safely.');
    process.exit(0);
});

```