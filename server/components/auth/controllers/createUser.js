const { insertUser } = require('../models/auth');
const passport = require('../local');

module.exports = (req, res) => {
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


// router.post('/register', (req, res, next) => {
//     return authHelpers.createUser(req, res)
//         .then((response) => {
//             passport.authenticate('local', (err, user, info) => {
//                 if (user) {
//                     handleResponse(res, 200, 'success');
//                 }
//             })(req, res, next);
//         })
//         .catch((err) => {
//             handleResponse(res, 500, 'error');
//         });
// });

