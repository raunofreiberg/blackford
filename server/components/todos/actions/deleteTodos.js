const knex = require('../../../dbConnect');

module.exports = () => knex('todos').del()
