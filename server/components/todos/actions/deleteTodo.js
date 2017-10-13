const knex = require('../../../dbConnect');

module.exports = req => (
    knex('todos')
        .where({
            id: req.params.id,
        })
        .del()
        .then(() => knex('todos'))
);
