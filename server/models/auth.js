const knex = require('../dbConnect');
const bcrypt = require('bcryptjs');

module.exports = {
    insertUser: (req) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);

        return knex('users')
            .insert({
                username: req.body.username,
                password: hash,
            })
            .returning('*');
    },
    queryUsers: () => knex('users'),
    queryUser: username => knex('users').where({ username }).first(),
};
