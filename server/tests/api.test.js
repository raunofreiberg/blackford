const request = require('supertest');
const jwt = require('jsonwebtoken');

const knex = require('../dbConnect');
const app = require('../server');
const { encodeToken } = require('../auth/utils');

describe('# API Authentication', () => {
    let token;
    let user;

    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        user = await knex('users').where({
            id: 1,
            username: 'Test Dude',
            password: 'password',
        }).first();
        token = encodeToken(user);
    });

    it('GET /api/posts without authentication', () => {
        request(app)
            .get('/api/posts')
            .expect('Content-type', /json/)
            .expect(403)
            .end((err, res) => {
                if (err) throw err;

                expect(res.body).toEqual({ status: "User is not logged in." });
            });
    });

    it('GET /api/posts with a valid JWT and return all posts', async () => {
        const posts =
            await knex('posts')
                .join('users', 'posts.user_id', 'users.id')
                .select('posts.*', 'users.username', 'users.avatar')
                .orderBy('posts.posted_at', 'desc');

        request(app)
            .get('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                expect(res.body.posts).toHaveLength(posts.length);
                res.body.posts.forEach((post, idx) => {
                    expect(post).toEqual(expect.objectContaining({
                        id: posts[idx].id,
                        user_id: posts[idx].user_id,
                        username: posts[idx].username,
                        avatar: posts[idx].avatar,
                        image: posts[idx].image,
                    }));
                });
            });
    });

    it('GET /api/posts with a invalid JWT', async () => {
        const encodeFaultyJwt = ({ id, username, avatar }) => {
            const payload = {
                id,
                username,
                avatar,
            };

            return jwt.sign(payload, 'wrongSecretToken', {
                expiresIn: '14 days',
            });
        };

        const user = await knex('users').first();
        const token = encodeFaultyJwt(user);

        request(app)
            .get('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) throw err;

                expect(res.body).toEqual({ status: "Token is invalid or has expired." });
            });
    });

    it('GET /api/posts/:id with a valid JWT and return a single post', async () => {
        const POST_ID = 21;
        const queriedPost = await knex('posts').where({ user_id: user.id, id: POST_ID }).first();

        request(app)
            .get(`/api/posts/${POST_ID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-type', /json/)
            .end((err, res) => {
                if (err) throw err;
                const { description, id, image, user_id } = queriedPost;

                expect(res.body.post).toEqual(expect.objectContaining({
                    description,
                    id,
                    image,
                    user_id,
                }));
            });
    });

    it('POST /api/posts/ - add a new post with description & image', async () => {
        const filePath = `${__dirname}/files/file1.png`;
        const description = 'this is a dope post';

        request(app)
            .post('/api/posts/')
            .set('Authorization', `Bearer ${token}`)
            .attach('image', filePath)
            .field('description', description)
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                const { image, description } = res.body.post[0];
                expect(image).toEqual(expect.stringContaining('file1'));
                expect(description).toEqual(description);
            });
    });

    it('PUT /api/posts/ - edit a post', async () => {
        request(app)
            .put('/api/posts/')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
    });
});
