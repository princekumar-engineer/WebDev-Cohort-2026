import express from "express";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ==========================================
// 1. MIDDLEWARE
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. DATABASE CONFIGURATION & CONNECTION
// ==========================================
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'company_db', // Fixed typo: 'comapny_db' -> 'company_db'
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432", 10),
});

// Verify connection health safely using a lightweight query
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Connected to PostgreSQL database pool successfully'))
    .catch((err) => console.error('❌ Error connecting to the database:', err.stack));

// ==========================================
// 3. API ROUTES
// ==========================================

// Get all employees sorted by their ID
app.get("/api/employees", async (req, res) => {
    try {
        // Aligned 'emp_id' to 'employee_id' to match our earlier schema design
        const result = await pool.query(
            'SELECT * FROM employees ORDER BY employee_id ASC'
        );

        res.status(200).json({
            success: true, // Fixed typo: 'succcess' -> 'success'
            data: result.rows,
            count: result.rowCount
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employees from database',
            error: error.message
        });
    }
});

// ==========================================
// 4. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});