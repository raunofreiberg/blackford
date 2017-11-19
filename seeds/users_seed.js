exports.seed = knex => (
    knex('users').del()
        .then(() => (
            knex('users').insert({
                id: 1,
                username: 'Test Dude',
                password: 'password',
            })
        ))
);
