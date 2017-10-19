const express = require('express');
const router = express.Router();

const fetchPhotos = require('../photos/controllers/fetchPhotos.js');
const fetchTodo = require('./controllers/fetchTodo.js');
const createPhoto = require('../photos/controllers/createPhoto.js');
const editTodo = require('./controllers/editTodo.js');
const deleteTodo = require('./controllers/deleteTodo.js');
const deleteTodos = require('./controllers/deleteTodos.js');

router.get('/', fetchPhotos);
router.post('/', createPhoto);
router.get('/:id', fetchTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteTodos);

module.exports = router;
