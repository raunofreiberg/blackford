exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.boolean('admin').notNullable().defaultTo(false);
            table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.string('profile_id').unique();
            table.string('avatar');
        }),
        knex.schema.createTable('posts', (table) => {
            table.increments();
            table.text('description');
            table.text('image').notNullable();
            table.integer('user_id').unsigned().references('users.id');
            table.timestamp('posted_at').notNullable().defaultTo(knex.raw('now()'));
        }),
    ]);
};

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('posts'),
    ]);
};
