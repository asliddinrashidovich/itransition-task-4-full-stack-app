const pool = require('./models/db');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        last_login TIMESTAMP
      );
    `);
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_email_idx ON users(email);
    `);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
};
createTables();
