const bcrypt = require('bcryptjs');
const knex = require('../dbConnect');

const { decodeToken } = require('./local');

exports.comparePass = (userPassword, dbPassword) => bcrypt.compareSync(userPassword, dbPassword);

exports.ensureAuthenticated = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).json({
            status: 'User is not logged in.',
        });
    }
    // decode the token
    const header = req.headers.authorization.split(' ');
    const token = header[1];
    decodeToken(token, (err, payload) => {
        if (err) {
            return res.status(401).json({
                status: 'Token has expired.',
            });
        } else {
            // check if the user still exists in the db
            return knex('users').where({ id: parseInt(payload.sub, 10) }).first()
                .then((user) => {
                    return next();
                })
                .catch((err) => {
                    res.status(500).json({
                        status: 'error',
                        reason: err,
                    });
                });
        }
    });
};

