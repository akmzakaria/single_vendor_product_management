# PRODUCT MANAGEMENT ER DIAGRAM (DARAZ)

[Click to see](https://drive.google.com/file/d/180tDV0piPBqmP-eRLWikWgHjO9QSB9iU/view?usp=sharing)

# LOGIN, REGISTER & VERIFYEMAIL API WITH BCRYPT & NODEMAILER

## REGISTER API RESPONSE

![alt text](<Screenshot From 2026-05-17 11-33-14-1.png>)

## VERIFY EMAIL API RESPONSE

![alt text](<Screenshot From 2026-05-17 11-35-08-1.png>)

## LOGIN API RESPONSE

![alt text](<Screenshot From 2026-05-17 12-54-42-1.png>)

# Question-Answers on Prisma ORM

## 1. What is Prisma ORM and why is it used in backend development?

Prisma ORM is a tool that helps you talk to a database using code instead of raw SQL.

It works as a bridge between your backend (Node.js) and your database.

Why it is used:
Easier database queries (no complex SQL)
Type-safe (helps catch errors early)
Auto-completion in code editor
Works well with TypeScript
Cleaner and faster development

## 2. Difference between findUnique() and findFirst() in Prisma

findUnique()
Used when searching by a UNIQUE field
Returns only one record or null

Example:

```ts
prisma.user.findUnique({
  where: {
    email: "test@gmail.com",
  },
});
```

Email must be UNIQUE in database

findFirst()
Returns the first matching record
Can use non-unique fields
Useful when multiple results exist

Example:

```ts
prisma.user.findFirst({
  where: {
    name: "John",
  },
});
```

Returns first "John" found

Simple difference:
findUnique → exact single unique record
findFirst → first match from multiple records

## 3. What is Prisma Migration and why is prisma migrate dev used?

Prisma Migration

Migration means updating your database structure safely when your schema changes.

Example:

```bash
adding a new table
adding a new column
changing a field type
prisma migrate dev
```

This command is used in development to:

```bash
create migration files
apply changes to database
sync Prisma schema with database
regenerate Prisma Client
```

Example:

```bash
npx prisma migrate dev --name add_user_table

```

## 4. Difference between select and include in Prisma?

select

Used to choose specific fields only

Example:

```bash
prisma.user.findMany({
select: {
id: true,
email: true
  }
})
```

Only returns id and email

include

Used to include related tables (relations)

Example:

```ts
prisma.user.findMany({
  include: {
    posts: true,
  },
});
```

Returns user + all related posts

Simple difference:
select → choose columns
include → bring related tables

## 5. Purpose of schema.prisma and its main sections

The schema.prisma file is the main configuration file in Prisma.

It defines how your database looks and how Prisma should connect and work with it.

### Main purpose:

Define database connection
Define tables (models)
Configure Prisma Client
Control how data is structured
Main sections of schema.prisma

### datasource

This section defines the database connection.

It tells Prisma:

which database you are using
how to connect to it

Example:

```ts
datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}
```

### generator

This section defines how Prisma Client is generated.

Prisma Client is the code you use to query the database.

Example:

```ts
generator client {
provider = "prisma-client-js"
}
```

### model

This is the most important part.

It defines your database tables and columns.

Each model becomes a table in the database.

Example:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

# Question-Answers on SQL

## 1. Difference Between DELETE, TRUNCATE, DROP

| Command  | Description                        |
| -------- | ---------------------------------- |
| DELETE   | Removes selected rows from a table |
| TRUNCATE | Removes all rows from a table      |
| DROP     | Deletes the entire table           |

## DELETE

```sql
DELETE FROM employees
WHERE
  id = 1;
```

## TRUNCATE

```sql
TRUNCATE TABLE employees;
```

## DROP

```sql
DROP TABLE employees;
```

---

## 2. What is a PRIMARY KEY?

A PRIMARY KEY:

- uniquely identifies each row
- cannot contain NULL values
- cannot contain duplicate values

Example:

```sql
id SERIAL PRIMARY KEY
```

---

## 3. Difference Between PRIMARY KEY and UNIQUE KEY

| PRIMARY KEY              | UNIQUE KEY            |
| ------------------------ | --------------------- |
| only one per table       | multiple allowed      |
| NULL not allowed         | NULL allowed          |
| uniquely identifies rows | ensures unique values |

Example:

```sql
id INT PRIMARY KEY,
email VARCHAR(50) UNIQUE
```

---

## 4. What is a FOREIGN KEY?

A FOREIGN KEY connects two tables.

Example:

```sql
FOREIGN KEY (user_id) REFERENCES users (id)
```

It connects:

- `orders.user_id`
  with
- `users.id`

---

## 5. What is JOIN in SQL?

JOIN combines data from multiple tables.

### INNER JOIN

Shows only matching rows.

```sql
SELECT
  users.name,
  orders.amount
FROM
  users
  INNER JOIN orders ON users.id = orders.user_id;
```

### LEFT JOIN

Shows all rows from the left table.

```sql
SELECT
  users.name,
  orders.amount
FROM
  users
  LEFT JOIN orders ON users.id = orders.user_id;
```

---

## 6. What is Normalization?

Normalization organizes data to reduce duplication.

### 1NF (First Normal Form)

- each column should contain single values
- no multiple values in one column

### 2NF (Second Normal Form)

- must follow 1NF
- all columns should depend on the full primary key

### 3NF (Third Normal Form)

- must follow 2NF
- non-key columns should depend only on the primary key

---

## 7. What is Indexing?

Indexing improves search speed in a database.

Why use indexing?

- faster data retrieval
- improves query performance

Example:

```sql
CREATE INDEX idx_email ON users (email);
```

---

## 8. Difference Between WHERE and HAVING

| WHERE                | HAVING               |
| -------------------- | -------------------- |
| filters rows         | filters grouped data |
| used before GROUP BY | used after GROUP BY  |

### WHERE Example

```sql
SELECT
  *
FROM
  employees
WHERE
  salary > 5000;
```

### HAVING Example

```sql
SELECT
  department,
  COUNT(*)
FROM
  employees
GROUP BY
  department
HAVING
  COUNT(*) > 2;
```

---

## 9. What is a Transaction in SQL?

A transaction is a group of SQL operations treated as one unit.

### COMMIT

Saves changes permanently.

```sql
COMMIT;
```

### ROLLBACK

Cancels changes.

```sql
ROLLBACK;
```

### Example

```sql
BEGIN;

UPDATE employees
SET
  salary = salary + 1000
WHERE
  id = 1;

ROLLBACK;
```

---

## 10. Query to Find Second Highest Salary

```sql
SELECT
  salary
FROM
  employees
ORDER BY
  salary DESC
LIMIT
  1
OFFSET
  1;
```

# Question-Answers on ERD

### What is the difference between Primary Key and Foreign Key?

A primary key uniquely identifies each row in a table and A foreign key connects one table to another table.

### Why is normalization important?

Normalization is important because it keeps your database clean, correct, and easy to manage by removing duplicate data, reducing data inconsistency, improving data integrity, making updates easier, saving storage space, and making the database easier to maintain.

### What is a JOIN?

A JOIN is used in SQL to combine rows from two or more tables based on a related column.

### Difference between SQL and MongoDB?

SQL uses structured tables with fixed schema, while MongoDB uses flexible JSON-like documents with dynamic schema.

### What is a composite key?

A composite key is a primary key made using two or more columns together.

### What is a weak entity?

A weak entity is an entity that cannot exist without a related strong entity and depends on it for identification.

### Why do we use constraints?

Constraints are used to enforce rules on data to keep it valid, accurate, and consistent.

### Explain many-to-many relationship.

A many-to-many relationship means multiple rows in one table can relate to multiple rows in another table, usually managed using a junction table.

### What is the difference between Clustered and Non-Clustered Index?

A clustered index sorts and stores data physically in order, while a non-clustered index creates a separate structure pointing to data rows.

### Explain Database Sharding and Partitioning. When would you use each?

Sharding splits a database across multiple servers for scaling large systems, while partitioning divides data within the same database for better performance and management.

I will use sharding when my application has very large data or very high traffic that one database server cannot handle, and I need to distribute the load across multiple servers.

I will partitioning when my data is growing but still manageable in a single database server, and I want better performance, faster queries, and easier maintenance without adding new servers.
