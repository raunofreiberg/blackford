exports.up = (knex, Promise) => {
    return knex.schema.createTable('photos', (table) => {
        table.increments();
        table.text('iso').notNullable();
        table.text('aperture').notNullable();
        table.text('lens').notNullable();
        table.text('img').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('photos');
};

