require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Kysely, PostgresDialect } = require('kysely');
const { Pool } = require('pg');

// Set up Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Create a Postgres connection pool using `pg` driver
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Set up Kysely with PostgresDialect
const db = new Kysely({
  dialect: new PostgresDialect({
    pool: pool,
  }),
});

// Test route to check database connection with Kysely
app.get('/test-db', async (req, res) => {
  try {
    // Kysely query to fetch current time
    const result = await db.raw('SELECT NOW() AS current_time');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Test route to use Kysely with table
app.get('/get-users', async (req, res) => {
  try {
    // Assuming you have a "users" table, fetch all users
    const users = await db.selectFrom('users').selectAll().execute();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/add-user', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    // Insert new user into the 'users' table
    await db.insertInto('users')
      .values({
        name: name,
        email: email,
        age: age,
      })
      .execute();

    res.status(201).json({ message: 'User added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
