const express = require('express');
const { getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', protect, getProfile);

module.exports = router;
