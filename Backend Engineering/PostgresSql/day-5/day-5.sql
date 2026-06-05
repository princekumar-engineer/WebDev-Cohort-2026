-- =========================================================================
-- 1. TABLE CREATION & MODERNIZED AUTO-INCREMENT SYNTAX
-- =========================================================================

CREATE TABLE tech_youtubers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    channel VARCHAR(100),
    tech VARCHAR(50),
    subscribers_millions NUMERIC(4,2),
    active BOOLEAN DEFAULT true
);


-- =========================================================================
-- 2. SEED DATA DESIGNED FOR INTERNATIONALLY ALIGNED CONTEXTS
-- =========================================================================

INSERT INTO tech_youtubers (name, channel, tech, subscribers_millions)
VALUES
('Alex Mercer', 'Dev & Coffee', 'JavaScript', 1.60),
('Emma Watson', 'Algorithm Arena', 'DSA', 0.85),
('Liam Nguyen', 'Namaste JavaScript', 'JavaScript', 1.20),
('Sophia Martinez', 'Tech Craft', 'Full Stack', 5.80),
('Ryan Gallagher', 'Cloud Native Lab', 'DSA', 1.00);

-- Table Verification
SELECT * FROM tech_youtubers;


-- =========================================================================
-- 3. USER DEFINED FUNCTIONS (UDFs) WITH RECTIFIED KEYWORDS & EXECUTIONS
-- =========================================================================

-- Example 1: Scalar Function returning an Integer metric
CREATE FUNCTION total_youtubers()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM tech_youtubers);
END;
$$;       

-- Execution (Fixed: Appended trailing invocation parentheses)
SELECT total_youtubers();


-- Example 2: Table Function returning a structured relation payload
CREATE FUNCTION get_youtubers_by_tech(p_tech VARCHAR)
RETURNS TABLE(name VARCHAR, channel VARCHAR) -- Fixed: Changed 'RETURN' to 'RETURNS'
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT t.name, t.channel
    FROM tech_youtubers t
    WHERE t.tech = p_tech;
END;
$$;

-- Execution
SELECT * FROM get_youtubers_by_tech('JavaScript');