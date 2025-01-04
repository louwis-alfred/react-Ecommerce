const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
    user: process.env.DB_USER, // Use environment variable for username
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, // Use environment variable for database name
    password: process.env.DB_PASSWORD, // Use environment variable for password
    port: process.env.DB_PORT,
});

// Connect to the database
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Connection error:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Example route (you can add your own routes here)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle process exit
process.on('exit', () => {
    pool.end(() => {
        console.log('Pool has ended');
    });
});