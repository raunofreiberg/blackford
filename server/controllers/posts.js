const posts = require('../models/posts');

exports.createPost = (req, res) => {
    posts.insertPost(req)
        .then((post) => {
            res.status(200).json({
                post,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when inserting a post.',
                message: err,
            });
        });
};

exports.fetchPosts = (req, res) => {
    posts.queryPosts(req, res)
        .then((posts) => {
            res.status(200).json({
                posts,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when fetching all posts.',
                message: err,
            });
        });
};

exports.deletePost = (req, res) => {
    posts.deletePost(req, res)
        .then((posts) => {
            console.log(posts);
            res.status(200).json({
                posts,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when deleting a post.',
                message: err,
            });
        });
};

exports.editPost = (req, res) => {
    posts.editPost(req, res)
        .then((post) => {
            res.status(200).json({
                post,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when editing a post.',
                message: err,
            });
        });
};

exports.fetchPost = (req, res) => {
    posts.queryPost(req, res)
        .then((post) => {
            res.status(200).json({
                post,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when fetching a post.',
                message: err,
            });
        });
};

