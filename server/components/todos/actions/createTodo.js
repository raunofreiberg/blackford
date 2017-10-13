const knex = require('../../../dbConnect');

module.exports = req => (
    knex('todos')
        .insert({
            content: req.body.content,
        }).returning('*')
);
