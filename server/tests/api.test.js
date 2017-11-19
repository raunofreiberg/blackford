const request = require('supertest');
const knex = require('../dbConnect');
const app = require('../server');
const { encodeToken } = require('../auth/utils');

describe('# Authentication', () => {
    beforeEach(async (done) => {
        await knex.migrate.latest();
        await knex.seed.run();
        done();
    });

    it('GET /', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('GET /api/posts without authentication', (done) => {
        request(app)
            .get('/api/posts')
            .expect('Content-type', /json/)
            .expect(403, done);
    });

    it('GET /api/posts with a JWT', async (done) => {
        const user = await knex('users').first();
        const token = encodeToken(user);

        request(app)
            .get('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-type', /json/)
            .expect(200, done);
    });
});