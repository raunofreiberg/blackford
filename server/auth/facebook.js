const passport = require('passport');
const FacebookStrategy = require('passport-facebook-token');
const { queryFbUser, insertFbUser } = require('../models/auth');

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    let user;

    if (profile) {
        user = await queryFbUser(profile.id);
    }

    if (!user) {
        user = await insertFbUser(
            profile.displayName,
            profile.id,
            profile.photos[0].value,
        );
    }
    return done(null, user);
}));
