const bcrypt = require('bcryptjs');
const knex = require('../dbConnect');
const jwt = require('jsonwebtoken');

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
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return knex('users').where({ id: parseInt(decoded.id, 10) }).first()
            .then((user) => {
                next();
                return user;
            })
            .catch((err) => {
                res.status(500).json({
                    status: 'error',
                    reason: err,
                });
            });
    } catch (err) {
        return res.status(401).json({
            status: 'Token is invalid or has expired.',
        });
    }
};

exports.encodeToken = ({ id, username, avatar }) => {
    const payload = {
        id,
        username,
        avatar,
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '14 days',
    });
};

