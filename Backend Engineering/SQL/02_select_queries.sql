-- ====================================================
-- CLASS 1: TOPIC 3 - SELECT QUERIES (DQL)
-- ====================================================

-- ----------------------------------------------------
-- ! SETUP: Create a table with more data for querying
-- ----------------------------------------------------
DROP TABLE IF EXISTS ipl_players;

CREATE TABLE ipl_players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    team VARCHAR(50),
    role VARCHAR(50), -- Batsman, Bowler, All-Rounder
    runs_scored INT,
    wickets_taken INT,
    auction_price_crores DECIMAL(5, 2)
);

ALTER TABLE ipl_players ADD COLUMN nickname VARCHAR(50); -- Adding a new column for fun (can be NULL)

-- * insert we will see after this topic

-- Inserting Data (Mix of real and funny fictitious stats)
INSERT INTO ipl_players (name, team, role, runs_scored, wickets_taken, auction_price_crores, nickname) VALUES
('Virat Kohli', 'RCB', 'Batsman', 973, 0, 15.00, 'King Kohli'),
('MS Dhoni', 'CSK', 'Wicketkeeper', 450, 0, 12.00, 'Thala'),
('Jasprit Bumrah', 'Mumbai Indians', 'Bowler', 15, 27, 12.00, 'Jassi'),
('Hardik Pandya', 'Mumbai Indians', 'All-Rounder', 400, 15, 15.00, 'Kung Fu Pandya'),
('Sunil Narine', 'KKR', 'All-Rounder', 350, 20, 8.50, 'Carrom King'),
('Rohit Sharma', 'Mumbai Indians', 'Batsman', 550, 0, 16.00, 'Hitman'),
('Rashid Khan', 'Gujarat Titans', 'Bowler', 50, 19, 15.00, 'The Magician'),
('Rinku Singh', 'KKR', 'Batsman', 475, 0, 0.55, 'The Spirit'),
('Arjun Tendulkar', 'Mumbai Indians', 'Bowler', 10, 3, 0.30, 'Arjun'),
('Kane Williamson', 'LSG', 'Batsman', 600, 0, 11.00, 'Kane Mama'),
('Mystery Player', NULL, 'Batsman', 0, 0, 1.00, 'Mystery Man'); -- Unsold / No Team (NULL Demo)

-- ====================================================
-- ! 1. SELECT BASICS
-- ====================================================

-- A. Select Everything (Don't do this on huge tables!)
SELECT * FROM ipl_players;

-- B. Select Specific Columns (Good practice)
SELECT name, nickname, team, auction_price_crores FROM ipl_players;

-- ====================================================
-- ! 2. FILTERING WITH WHERE
-- ====================================================

-- ! A. Exact Match (=)
-- Find all players from 'Mumbai Indians'
SELECT * FROM ipl_players WHERE team = 'Mumbai Indians';

-- ! B. Comparison Operators (>, <, <=, >=)
-- Find players who cost more than 10 Crores
SELECT name, nickname, auction_price_crores FROM ipl_players WHERE auction_price_crores > 10.0;

-- ! C. Logic Operators (AND, OR)
-- Find All-Rounders who have taken more than 10 wickets
SELECT * FROM ipl_players WHERE role = 'All-Rounder' AND wickets_taken > 10;

-- Find players who are either from 'CSK' OR 'RCB' (The classic rivalry)
SELECT * FROM ipl_players WHERE team = 'CSK' OR team = 'RCB';

-- ! D. Pattern Matching (LIKE)
-- Find players whose name starts with 'R' (Rohit, Rashid, Rinku...)
-- SELECT * FROM ipl_players WHERE name LIKE 'R%';

-- E. Range (BETWEEN)
-- Find players sold between 5 and 12 Crores
SELECT * FROM ipl_players WHERE auction_price_crores BETWEEN 5 AND 12;

-- ! F. List Check (IN)
-- Find players from specific teams directly
-- ! G. Negation (!= or <>)
-- Find players who are NOT from 'Mumbai Indians'
SELECT * FROM ipl_players WHERE team != 'Mumbai Indians';
-- Standard SQL way (preferred in some DBs)
SELECT * FROM ipl_players WHERE team <> 'Mumbai Indians';

-- ! H. NULL Handling (IS NULL / IS NOT NULL)
-- Find players who don't have a team yet
SELECT * FROM ipl_players WHERE team IS NULL;

-- Find players who definitely have a team
SELECT * FROM ipl_players WHERE team IS NOT NULL;

-- ! I. Complex Logic (Parentheses Matter!)
-- Find Batsmen who are EITHER from RCB OR CSK (Correct way)
SELECT * FROM ipl_players 
WHERE role = 'Batsman' AND (team = 'RCB' OR team = 'CSK');

-- WRONG WAY: This would give All RCB players (even Bowlers) + CSK Batsmen
-- SELECT * FROM ipl_players WHERE role = 'Batsman' AND team = 'RCB' OR team = 'CSK';

-- ! J. Pattern Matching Wildcards ( _, % )
-- ! '%' matches any sequence of characters.
-- ! '_' matches EXACTLY ONE character.

-- Find players whose name has 'a' as the second letter (e.g., Hardik, Rashid)
SELECT * FROM ipl_players WHERE name LIKE '_a%';
SELECT * FROM ipl_players WHERE name LIKE '__r%';

-- ! Find players whose name does NOT start with 'R'
SELECT * FROM ipl_players WHERE name NOT LIKE 'R%';

-- ! K. NOT IN and NOT BETWEEN
-- Find players NOT from the big 3 teams
SELECT * FROM ipl_players WHERE team NOT IN ('Mumbai Indians', 'CSK', 'RCB');

-- Find players whose price is NOT between 10 and 15 crores
SELECT * FROM ipl_players WHERE auction_price_crores NOT BETWEEN 10 AND 15;

-- ====================================================
-- ! 3. SORTING (ORDER BY)
-- ====================================================

-- ! A. Highest Run Scorers (Descending Order)
SELECT name, nickname, runs_scored FROM ipl_players ORDER BY runs_scored DESC;

-- ! B. Lowest Price first (Ascending Order)
SELECT name, nickname, auction_price_crores FROM ipl_players ORDER BY auction_price_crores ASC;

-- ! C. Multiple Sorts
-- Sort by Team first, then by Price (High to Low within that team)
SELECT team, name, auction_price_crores 
FROM ipl_players 
ORDER BY team ASC, auction_price_crores DESC;

-- ====================================================
-- ! 4. LIMIT & OFFSET (Pagination)
-- ====================================================

-- ! A. Top 3 Most Expensive Players
SELECT name, auction_price_crores 
FROM ipl_players 
ORDER BY auction_price_crores DESC 
LIMIT 3;

-- ! B. The NEXT 3 Most Expensive Players (Page 2)
SELECT name, auction_price_crores 
FROM ipl_players 
ORDER BY auction_price_crores DESC 
LIMIT 3 OFFSET 3;

-- ====================================================
-- ! 5. AGGREGATES & MATH (Preview) Aliases as well
-- ====================================================

-- ! A. Basic Math in Select
-- Calculate price in Lakhs (1 Crore = 100 Lakhs)
SELECT name, nickname,
    auction_price_crores, (auction_price_crores * 100) AS price_in_lakhs 
FROM ipl_players;


SELECT name, nickname, 
auction_price_crores, auction_price_crores + 2 AS new_price
FROM ipl_players;

SELECT name, nickname,
       (runs_scored + (wickets_taken * 25)) AS total_impact
FROM ipl_players
ORDER BY total_impact DESC;

-- ! B. Distinct Values
-- List all unique roles in the dataset
SELECT DISTINCT role FROM ipl_players;
