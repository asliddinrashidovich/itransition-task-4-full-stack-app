const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/userRoutes');
app.use('/api/users', usersRouter);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Working');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
