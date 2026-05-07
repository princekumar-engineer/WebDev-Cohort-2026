-- ====================================================
-- CLASS 2: TOPIC 1 - AGGREGATIONS & GROUP BY
-- ====================================================

-- ----------------------------------------------------
-- SETUP: Create a Smart Watch Sales Dataset
-- ----------------------------------------------------
DROP TABLE IF EXISTS smart_watch_sales;

CREATE TABLE smart_watch_sales (
    sale_id SERIAL PRIMARY KEY,
    brand VARCHAR(50), -- Boat, Noise, Apple, Samsung
    model VARCHAR(100),
    city VARCHAR(50),
    units_sold INT,
    price_per_unit DECIMAL(10, 2),
    sale_date DATE
);

-- Inserting Indian Context Data
INSERT INTO smart_watch_sales (brand, model, city, units_sold, price_per_unit, sale_date) VALUES
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Delhi', 15, 1500.00, '2023-10-02'),
('Noise', 'ColorFit', 'Bangalore', 20, 2000.00, '2023-10-01'),
('Noise', 'ColorFit', 'Mumbai', 5, 2000.00, '2023-10-03'),
('Apple', 'Watch Series 9', 'Mumbai', 2, 45000.00, '2023-10-01'),
('Apple', 'Watch Series 9', 'Bangalore', 8, 45000.00, '2023-10-02'),
('Samsung', 'Galaxy Watch', 'Delhi', 3, 25000.00, '2023-10-01'),
('Boat', 'Xtend', 'Pune', 25, 1200.00, '2023-10-04'),
('Noise', 'Pro 4', 'Delhi', 12, 2500.00, '2023-10-05');

-- ====================================================
-- 1. BASIC AGGREGATIONS
-- ====================================================

-- A. COUNT: How many sales records do we have?
SELECT COUNT(*) AS total_transactions FROM smart_watch_sales;

-- B. SUM: What is the total revenue? (Units * Price)
SELECT SUM(units_sold * price_per_unit) AS total_revenue 
FROM smart_watch_sales;

-- C. AVG: What is the average price of a watch sold?
SELECT AVG(price_per_unit) AS avg_watch_price 
FROM smart_watch_sales;

-- D. MIN/MAX: Cheapest and Most Expensive Price?
SELECT MIN(price_per_unit) AS cheapest, MAX(price_per_unit) AS costliest 
FROM smart_watch_sales;

-- ====================================================
-- 2. GROUP BY (The Powerhouse)
-- ====================================================

-- A. Sales by Brand
-- "Kiska market share zyada hai?"
SELECT brand, SUM(units_sold) AS total_units_sold
FROM smart_watch_sales
GROUP BY brand
ORDER BY total_units_sold DESC;

-- B. Revenue by City
-- "Where are the rich people?"
SELECT city, SUM(units_sold * price_per_unit) AS city_revenue
FROM smart_watch_sales
GROUP BY city
ORDER BY city_revenue DESC;

-- C. Multi-Level Grouping
-- Brand sales within each City
SELECT city, brand, SUM(units_sold) AS units
FROM smart_watch_sales
GROUP BY city, brand
ORDER BY city ASC, units DESC;

-- ====================================================
-- 3. HAVING (Filtering Groups)
-- ====================================================

-- A. Show brands that have sold more than 20 units total
-- We cannot use WHERE for 'SUM(units)'. We must use HAVING.
SELECT brand, SUM(units_sold) AS total_units, MAX(price_per_unit)
FROM smart_watch_sales
-- WHERE price_per_unit > 1000
GROUP BY brand
HAVING SUM(units_sold) > 20;

-- B. Show cities with average watch price > 10,000 (Premium Markets)
SELECT city, AVG(price_per_unit) AS avg_price
FROM smart_watch_sales
GROUP BY city
HAVING AVG(price_per_unit) > 10000;
