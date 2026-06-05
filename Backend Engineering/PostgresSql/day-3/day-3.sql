-- =========================================================================
-- 1. BASE TABLE CREATION & STRUCTURE EVOLUTION (ALTER)
-- =========================================================================

-- Create the starting base table
CREATE TABLE movies (
    movie_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    release_year INTEGER
);

-- Add financial and metadata columns
ALTER TABLE movies
ADD COLUMN director VARCHAR(100),
ADD COLUMN budget DECIMAL(12, 2),
ADD COLUMN box_office DECIMAL(12, 2),
ADD COLUMN rating VARCHAR(10) DEFAULT 'PG-13',
ADD COLUMN duration_minutes INTEGER NOT NULL DEFAULT 120;

-- Drop structural columns not needed for core metrics
ALTER TABLE movies
DROP COLUMN budget,
DROP COLUMN box_office;

-- Rename structural columns for clean domain naming
ALTER TABLE movies RENAME COLUMN release_year TO year_released;
ALTER TABLE movies RENAME COLUMN title TO film_title;

-- Optimize column datatypes
ALTER TABLE movies ALTER COLUMN year_released TYPE SMALLINT;
ALTER TABLE movies ALTER COLUMN rating TYPE VARCHAR(20) USING rating::VARCHAR(20);

-- Enforce state defaults and missing structural constraints
ALTER TABLE movies ALTER COLUMN rating SET DEFAULT 'Not Rated';
UPDATE movies SET director = 'Unknown' WHERE director IS NULL;
ALTER TABLE movies ALTER COLUMN director SET NOT NULL;
ALTER TABLE movies ALTER COLUMN director SET DEFAULT 'Unknown';

-- Final table renaming to sync with downstream platform components
ALTER TABLE movies RENAME TO platform_movies;


-- =========================================================================
-- 2. SEEDING EXTENDED DOMAIN DATA (Using CASE logic safely)
-- =========================================================================

-- Reconstruct missing explicit attributes to mirror section 2 notes
ALTER TABLE platform_movies 
ADD COLUMN genre VARCHAR(50),
ADD COLUMN rating_score DECIMAL(3, 1),
ADD COLUMN content_rating VARCHAR(20);

-- Insert original mock dataset
INSERT INTO platform_movies (film_title, genre, rating_score, year_released, content_rating) VALUES
('Stellar Voyage', 'Sci-Fi', 8.7, 2023, 'PG-13'),
('Dark Alley', 'Thriller', 7.2, 2022, 'R'),
('Laugh Factory', 'Comedy', 6.5, 2024, 'PG'),
('Epic Quest', 'Fantasy', 9.1, 2023, 'PG-13'),
('True Crime Story', 'Documentary', 8.0, 2024, 'R');

-- Dynamic evaluations using conditional inline logic (CASE)
INSERT INTO platform_movies (film_title, genre, rating_score, year_released, content_rating)
VALUES (
    'New Action Film', 
    'Action', 
    7.5, 
    2025,
    CASE 
        WHEN 7.5 >= 8.0 THEN 'Premium'
        ELSE 'Standard'
    END
);


-- =========================================================================
-- 3. ANALYSIS & DATA CLASSIFICATION (CASE Expressions)
-- =========================================================================

-- Complex Multi-Condition Recommendation Query
SELECT 
    film_title,
    rating_score,
    content_rating,
    CASE 
        WHEN rating_score >= 9.0 THEN 'Must Watch'
        WHEN rating_score >= 8.0 AND content_rating IN ('PG', 'PG-13') THEN 'Family Friendly Hit'
        WHEN rating_score >= 7.0 THEN 'Worth Watching'
        WHEN rating_score >= 6.0 THEN 'Average'
        ELSE 'Skip'
    END AS recommendation,
    CASE 
        WHEN year_released >= 2024 THEN 'New Release'
        WHEN year_released >= 2022 THEN 'Recent'
        ELSE 'Catalog'
    END AS recency
FROM platform_movies;

-- Custom Order-by Sorting logic
SELECT film_title, genre, rating_score
FROM platform_movies
ORDER BY 
    CASE 
        WHEN genre = 'Fantasy' THEN 1
        WHEN genre