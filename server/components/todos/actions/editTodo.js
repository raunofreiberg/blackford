const knex = require('../../../dbConnect');

module.exports = req => (
    knex('todos')
        .where({
            id: req.params.id,
        })
        .update({
            content: req.body.content,
        })
);
