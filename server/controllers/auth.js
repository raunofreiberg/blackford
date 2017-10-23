const { insertUser, queryUser } = require('../models/auth');
const comparePass = require('../auth/utils');
const localAuth = require('../auth/local');

exports.createUser = (req, res) => (
    insertUser(req)
        .then(user => localAuth.encodeToken(user[0]))
        .then((token) => {
            res.status(200).json({
                status: 'success',
                token,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error',
                reason: err,
            });
        })
);

exports.logUserIn = (req, res) => {
    const { username, password } = req.body;
    return queryUser(username)
        .then((response) => {
            comparePass(password, response.password);
            return response;
        })
        .then(response => localAuth.encodeToken(response))
        .then((token) => {
            res.status(200).json({
                status: 'success',
                token,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error',
                reason: err,
            });
        });
};