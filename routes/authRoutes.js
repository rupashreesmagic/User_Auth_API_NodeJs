const express = require('express');
const { signup, login, confirmEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/confirm-email', confirmEmail);

module.exports = router;
