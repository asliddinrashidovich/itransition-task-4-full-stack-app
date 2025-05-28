const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUsers, updateUsers } = require('../controllers/userController');

router.get('/', auth, getUsers);
router.post('/update', auth, updateUsers);

module.exports = router;
