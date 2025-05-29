const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, last_login) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ token, user }); 
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: "Email already exists, Please login" });
    }
    return res.status(500).json({ error: "Server error" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: 'We could not find this account, please register' });

    const user = result.rows[0];

    if (user.status === 'blocked')
      return res.status(403).json({ message: 'Account is blocked, please try another account or create a new account' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Incorrect email or password, please try again' });

    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};


