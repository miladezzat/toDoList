const express = require('express');
const router = express.Router();

const { user_signup, user_login } = require('../controllers/userController');
router.get('/', (req, res) => {
    res.sendFile('../dist/index.html', { root: __dirname });
});
router.post('/register', user_signup);
router.post('/login', user_login);

module.exports = router;