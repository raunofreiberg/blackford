const bcrypt = require('bcryptjs');
const knex = require('../dbConnect');
const jwt = require('jsonwebtoken');

const comparePass = (userPassword, dbPassword) => bcrypt.compareSync(userPassword, dbPassword);

const verifyToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, process.env.TOKEN_SECRET);
};

const ensureAuthenticated = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(403).json({
            status: 'User is not logged in.',
        });
    }

    try {
        const decoded = verifyToken(req);
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

/**
 * @param id {string} - User ID from db
 * @param username {string} - User display name
 * @param avatar {string} - URL of Facebook profile picture (optional)
 * @returns {string} - Encoded JWT
 */
const encodeToken = ({ id, username, avatar }) => {
    const payload = {
        id,
        username,
        avatar,
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '14 days',
    });
};

module.exports = {
    comparePass,
    ensureAuthenticated,
    encodeToken,
    verifyToken,
};

