const express = require('express');
const router = express.Router();

const { createUser, logUserIn } = require('./controllers/auth');

router.post('/register', createUser);
router.post('/login', logUserIn);

module.exports = router;
