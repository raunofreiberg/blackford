const express = require('express');
const multer = require('multer');
const {
    fetchPosts,
    fetchPost,
    createPost,
    deletePost,
    editPost,
} = require('./controllers/posts');

const router = express.Router();
const dev = process.env.NODE_ENV === 'development';
const upload = multer({
    fileSize: '10MB',
    dest: dev ? 'client/uploads' : './uploads',
});


router.get('/', fetchPosts);
router.post('/', upload.single('image'), createPost);
router.get('/:id', fetchPost);
router.delete('/:id', deletePost);
router.put('/:id', editPost);

module.exports = router;
