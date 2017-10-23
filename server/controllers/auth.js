const { insertUser } = require('../models/auth');
const passport = require('../auth/local');

exports.createUser = (req, res) => {
    insertUser(req, res)
        .then((user) => {
            res.status(200).json({
                user,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when creating a user.',
                reason: err,
            });
        });
};
