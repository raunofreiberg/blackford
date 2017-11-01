const knex = require('../dbConnect');
const bcrypt = require('bcryptjs');

module.exports = {
    insertUser: (username, password) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        return knex('users')
            .insert({
                username,
                password: hash,
            })
            .returning('*');
    },
    /**
     * @param username {string} - Facebook displayName
     * @param profileId {string} - Facebook profile ID
     * @param avatar {string} - Facebook profile picture
     */
    insertFbUser: (username, profileId, avatar) => (
        knex('users')
            .insert({
                username,
                profile_id: profileId,
                password: '',
                avatar,
            })
            .returning('*')
    ),
    queryUsers: () => knex('users'),
    queryUser: username => knex('users').where({ username }).first(),
    queryFbUser: id => knex('users').where({ profile_id: id }).first(),
};
