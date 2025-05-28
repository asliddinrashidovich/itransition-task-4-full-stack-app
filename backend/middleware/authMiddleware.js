const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../models/db');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

    if (!user.rows.length || user.rows[0].status === 'blocked') {
      return res.status(403).json({ message: 'Blocked or deleted' });
    }

    req.user = user.rows[0];
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
