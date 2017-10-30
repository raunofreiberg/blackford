const express = require('express');
const passport = require('passport');
const router = express.Router();
require('./auth/facebook');

const { createUser, logUserIn, loginFacebook } = require('./controllers/auth');

router.post('/register', createUser);
router.post('/login', logUserIn);
router.post(
    '/facebook',
    passport.authenticate('facebook-token', { session: false }),
    loginFacebook,
);

module.exports = router;
