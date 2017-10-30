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
    insertFbUser: (username, profileId) => {
        return knex('users')
            .insert({
                username,
                profile_id: profileId,
                password: '',
            })
            .returning('*');
    },
    queryUsers: () => knex('users'),
    queryUser: username => knex('users').where({ username }).first(),
    queryFbUser: id => knex('users').where({ profile_id: id }).first(),
};
