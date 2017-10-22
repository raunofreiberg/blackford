const knex = require('../dbConnect');

module.exports = {
    insertTodo: req => (
        knex('todos')
            .insert({
                content: req.body.content,
            }).returning('*')
    ),
    deleteTodo: req => (
        knex('todos')
            .where({
                id: req.params.id,
            })
            .del()
            .then(() => knex('todos'))
    ),
    editTodo: req => (
        knex('todos')
            .where({
                id: req.params.id,
            })
            .update({
                content: req.body.content,
            })
    ),
    deleteTodos: () => knex('todos').del(),
    queryTodo: req => knex('todos').where({ id: req.params.id }).first(),
    queryTodos: () => knex('todos'),
};
