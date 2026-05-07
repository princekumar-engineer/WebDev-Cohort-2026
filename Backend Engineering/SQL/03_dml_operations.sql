-- ====================================================
-- CLASS 1: TOPIC 4 - DML (INSERT, UPDATE, DELETE)
-- ====================================================

-- ----------------------------------------------------
-- SETUP: Create a fresh table
-- ----------------------------------------------------
DROP TABLE IF EXISTS canteen_menu;

CREATE TABLE canteen_menu (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100),
    category VARCHAR(50), -- Snacks, Beverages, Meals
    price INT,
    is_available BOOLEAN DEFAULT TRUE
);

-- ====================================================
-- 1. INSERT (The 'C' in CRUD)
-- ====================================================

-- A. Insert Single Row
INSERT INTO canteen_menu (item_name, category, price) 
VALUES ('Vada Pav', 'Snacks', 15);

-- B. Insert Multiple Rows
INSERT INTO canteen_menu (item_name, category, price) VALUES 
('Masala Chai', 'Beverages', 10),
('Samosa', 'Snacks', 12),
('Rajma Chawal', 'Meals', 60),
('Maggi', 'Snacks', 25),
('Ice Tea', 'Beverages', 40);

-- Check data
SELECT * FROM canteen_menu;

-- ====================================================
-- 2. UPDATE (The 'U' in CRUD)
-- ====================================================
-- CRITICAL: Always use WHERE!

-- A. Inflation hits! Increase Vada Pav price to 20.
UPDATE canteen_menu 
SET price = 20 
WHERE item_name = 'Vada Pav';

-- B. Bulk Update (Happy Hour!)
-- Reduce price of all Beverages by 5 rupees.
UPDATE canteen_menu
SET price = price - 5
WHERE category = 'Beverages';

-- C. Mark item as unavailable (Samosas are finished)
UPDATE canteen_menu
SET is_available = FALSE
WHERE item_name = 'Samosa';

-- Check changes
SELECT * FROM canteen_menu;

-- ====================================================
-- 3. DELETE (The 'D' in CRUD)
-- ====================================================
-- CRITICAL: Always use WHERE!

-- A. Delete specific item
-- Nobody buys Cold Coffee here, remove it.
DELETE FROM canteen_menu 
WHERE item_name = 'Cold Coffee';

-- B. Delete conditionally
-- Remove any item that costs more than 100 (Too expensive for students)
-- (We don't have any yet, but this is the logic)
DELETE FROM canteen_menu WHERE price > 50;

-- C. The DANGER ZONE: Delete everything
-- Uncommenting the line below would wipe the entire table clean!
-- DELETE FROM canteen_menu;

-- Check final state
SELECT * FROM canteen_menu;
