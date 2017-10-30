const passport = require('passport');
const FacebookStrategy = require('passport-facebook-token');
const { queryFbUser, insertFbUser } = require('../models/auth');

const passportConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
};

if (passportConfig.clientID) {
    passport.use(new FacebookStrategy(passportConfig, (accessToken, refreshToken, profile, done) => {
        const findOrCreateUser = async () => {
            let user;
            if (profile) {
                user = await queryFbUser(profile.id);
            }

            if (!user) {
                user = await insertFbUser(profile.displayName, profile.id);
            }
            return done(null, user);
        };

        findOrCreateUser();
    }));
}