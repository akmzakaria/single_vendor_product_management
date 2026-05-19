-- 1. DATABASE CREATED
-- CREATE DATABASE company_db
-- 2. TABLE CREATED
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(30),
  salary INT,
  department VARCHAR(15),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. EMPLOYEES INSERTED INTO THE TABLE
INSERT INTO
  employees (name, email, salary, department)
VALUES
  ('akm1', 'akm1@gmail.com', 10000, 'NAME'),
  ('akm2', 'akm2@gmail.com', 30000, 'IT'),
  ('akm3', 'akm3@gmail.com', 40000, 'BME'),
  ('akm4', 'akm4@gmail.com', 50000, 'HR'),
  ('akm5', 'akm5@gmail.com', 70000, 'CSE'),
  ('akm6', 'akm6@gmail.com', 80000, 'BME'),
  ('akm7', 'akm7@gmail.com', 90000, 'PME'),
  ('akm8', 'akm8@gmail.com', 83000, 'CSE'),
  ('akm9', 'akm9@gmail.com', 89000, 'NAME'),
  ('akm9', 'akm9@gmail.com', 26000, 'NAME'),
  ('akm9', 'akm9@gmail.com', 33000, 'CSE');

-- 4. SHOWED ALL EMPLOYEES
SELECT
  *
FROM
  employees;

-- 5. SHOWED ONLY NAME AND SALARY
SELECT
  name,
  salary
FROM
  employees;

-- 6. FILTERED EMPLOYEES WHOSE SALARY GREATER THAN 40000
SELECT
  *
FROM
  employees
WHERE
  salary > 40000;

-- 7. SHOWED EMPLOYEES ORDERED BY DESCENDING SALARY
SELECT
  *
FROM
  employees
ORDER BY
  salary DESC;

-- 8. SHOW TOP THREE HIGHES PAID EMPLOYEES
SELECT
  *
FROM
  employees
ORDER BY
  salary DESC
LIMIT
  (3);

-- 9. INCREASED THE SALARY OF EMPLOYEE(ID=13)
UPDATE employees
SET
  salary = salary + 5000
WHERE
  id = 13;

-- 10. DELETED AN EMPLOYEE(ID=15)
DELETE FROM employees
WHERE
  id = 15;

-- 11. FILTERED EMPLOYEES BETWEEN THE SALARY RANGE OF 30000 TO 60000
SELECT
  *
FROM
  employees
WHERE
  salary BETWEEN 30000 AND 60000;

-- 12. FILTERED EMPLOYEES FROM IT AND HR DEPARTMENT
SELECT
  *
FROM
  employees
WHERE
  department IN ('IT', 'HR');

-- 13. COUNTED TOTAL EMPLOYEES
SELECT
  COUNT(*) AS total_employees
FROM
  employees;

-- 14. GET AVERAGE SALARY
SELECT
  AVG(salary) AS average_salary
FROM
  employees;

-- 15. FILTERED TOTAL EMPLOYEES IN EACH DEPARTMENT
SELECT
  department,
  COUNT(*) AS total_employees
FROM
  employees
GROUP BY
  department;

-- 16. SHOWED DEPARTMENTS HAVING MORE THAN 2 EMPLOYEES
SELECT
  department,
  COUNT(*) AS total_employees
FROM
  employees
GROUP BY
  department
HAVING
  COUNT(*) > 2;

-- 17. TABLE CREATED WITH PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(10) DEFAULT 'active'
);

-- 19. ADDED FOREIGN KEY
-- USERS TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(20) UNIQUE
);

-- INSERTED USERS
INSERT INTO
  users (name, email)
VALUES
  ('akm1', 'akm1@gmail.com'),
  ('akm2', 'akm2@gmail.com');

-- ORDERS TABLE
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  amount INT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- INSERTED ORDERS
INSERT INTO
  orders (amount, user_id)
VALUES
  (500, 1),
  (700, 1),
  (900, 2);

-- 20. USED INNER JOIN
SELECT
  users.name,
  orders.amount
FROM
  users
  INNER JOIN orders ON users.id = orders.user_id;
