const express = require('express');
const router = express.Router();

const { user_signup, user_login } = require('../controllers/userController');

const User = require('../models/userModel');


router.post('/register', user_signup);
router.post('/login', user_login);

module.exports = router;