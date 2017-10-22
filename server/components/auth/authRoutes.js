const express = require('express');
const router = express.Router();

const createUser = require('./controllers/createUser.js');

router.post('/register', createUser);

module.exports = router;
