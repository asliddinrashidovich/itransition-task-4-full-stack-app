const pool = require('../models/db');

exports.getUsers = async (req, res) => {
  const users = await pool.query('SELECT id, name, email, status, last_login, created_at FROM users ORDER BY last_login DESC');
  res.json(users.rows);
};

exports.updateUsers = async (req, res) => {
  const { ids, action } = req.body;

  if (!ids.length) return res.status(400).json({ message: 'No users selected' });

  if (action === 'block') {
    await pool.query('UPDATE users SET status = $1 WHERE id = ANY($2)', ['blocked', ids]);
  } else if (action === 'unblock') {
    await pool.query('UPDATE users SET status = $1 WHERE id = ANY($2)', ['active', ids]);
  } else if (action === 'delete') {
    await pool.query('DELETE FROM users WHERE id = ANY($1)', [ids]);
  }

  res.status(200).json({ message: 'Action completed' });
};
