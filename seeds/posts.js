exports.seed = async (knex) => {
    await knex('users').del();
    await knex('users').insert({
        id: 1,
        username: 'Test Dude',
        password: 'password',
    });

    await knex('posts').del();
    await knex('posts').insert([
        {
            id: 21,
            description: 'Post 21',
            image: 'post21.jpg',
            posted_at: '2017-11-02T23:37:26.590Z',
            user_id: 1,
        },
    ]);
};
