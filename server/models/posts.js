const fs = require('fs');
const knex = require('../dbConnect');
const { verifyToken } = require('../auth/utils');

const insertPost = (req) => {
    const decoded = verifyToken(req);
    const { path, destination } = req.file;
    let { originalname } = req.file;

    originalname = originalname.replace(/\s/g, "-");
    const filename = `${new Date().valueOf()}_${originalname}`;

    fs.rename(path, `${destination}/${filename}`, (err) => {
        if (err) throw err;
    });

    return knex('posts')
        .insert({
            image: filename,
            user_id: decoded.id,
            description: req.body.description,
        }).returning('*');
};

// Join the `posts` and `users` tables and grab the related user information along with the post.
const queryPosts = () => (
    knex('posts')
        .join('users', 'posts.user_id', 'users.id')
        .select('posts.*', 'users.username', 'users.avatar')
        .orderBy('posts.posted_at', 'desc')
);

const deletePost = (req) => {
    try {
        const decoded = verifyToken(req);
        const userId = decoded.id;
        const postId = req.params.id;

        return knex('posts')
            .where({
                id: postId,
                user_id: userId,
            })
            .del()
            .then(() => queryPosts());
    } catch (err) {
        throw err;
    }
};

const editPost = (req) => {
    try {
        const decoded = verifyToken(req);
        const userId = decoded.id;

        return knex('posts')
            .where({
                id: req.params.id,
                user_id: userId,
            })
            .update({
                description: req.body.description,
            }).returning('*');
    } catch (err) {
        throw err;
    }
};

const queryPost = (req) => {
    return knex('posts')
        .where({
            id: req.params.id,
        }).first();
};

module.exports = {
    insertPost,
    queryPosts,
    queryPost,
    deletePost,
    editPost,
};
