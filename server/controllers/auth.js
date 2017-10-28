const { insertUser, queryUser } = require('../models/auth');
const { comparePass, encodeToken } = require('../auth/utils');

exports.createUser = async (req, res) => {
    try {
        const user = await insertUser(req);
        const token = encodeToken(user[0]);

        await res.status(200).json({
            status: 'success',
            token,
            user: {
                name: user[0].username,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            reason: err,
        });
    }
};

exports.logUserIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await queryUser(username);
        if (!user) {
            res.status(500).json({
                status: 'error',
                reason: 'User not found',
            });
        }

        const arePasswordsEqual = comparePass(password, user.password);

        if (arePasswordsEqual) {
            const token = encodeToken(user);
            res.status(200).json({
                status: 'success',
                token,
                user: {
                    name: user.username,
                },
            });
        } else {
            res.status(403).json({
                status: 'error',
                reason: 'Incorrect password',
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            reason: err,
        });
    }
};
