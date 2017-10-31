const { insertUser, queryUser } = require('../models/auth');
const { comparePass, encodeToken } = require('../auth/utils');

exports.createUser = async (req, res) => {
    try {
        const user = await insertUser(req);
        const token = encodeToken(user[0]);

        await res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        if (err.code === "23505") {
            res.status(500).json({
                status: 'error',
                message: 'User already exists',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: err,
            });
        }
    }
};

exports.logUserIn = async (req, res) => {
    const { username, password } = req.body;

    // TODO: validate form on client side so username & password are never empty.
    try {
        const user = await queryUser(username);
        if (!user) {
            res.status(500).json({
                status: 'error',
                message: 'User not found',
            });
        }

        const arePasswordsEqual = comparePass(password, user.password);

        if (arePasswordsEqual) {
            const token = encodeToken(user);
            res.status(200).json({
                status: 'success',
                token,
            });
        } else {
            res.status(403).json({
                status: 'error',
                message: 'Incorrect password',
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err,
        });
    }
};

exports.loginFacebook = (req, res) => {
    const { username, id, avatar } = req.user;

    try {
        const token = encodeToken({
            username,
            id,
            avatar,
        });

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err,
        });
    }
};