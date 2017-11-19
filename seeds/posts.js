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
            id: 1,
            description: 'Post 1',
            image: 'post1.jpg',
            posted_at: '2017-11-02T23:37:26.590Z',
            user_id: 1,
        },
        {
            id: 2,
            description: 'Post 2',
            image: 'post2.jpg',
            posted_at: '2017-11-02T23:37:26.590Z',
            user_id: 1,
        },
        {
            id: 3,
            description: 'Post 3',
            image: 'post3.jpg',
            posted_at: '2017-11-02T23:37:26.590Z',
            user_id: 1,
        },
        {
            id: 4,
            description: 'Post 4',
            image: 'post3.jpg',
            posted_at: '2017-11-02T23:37:26.590Z',
            user_id: 1,
        },
        {
            id: 5,
            description: 'Post 5',
            image: 'post3.jpg',
            posted_at: '2017-11-02T23:37:26.590Z',
            user_id: 1,
        },
    ]);
};
