const express = require('express');
const router = express.Router();

const fetchPhotos = require('./components/photos/controllers/fetchPhotos.js');
const fetchTodo = require('./components/todos/controllers/fetchTodo.js');
const createPhoto = require('./components/photos/controllers/createPhoto.js');
const editTodo = require('./components/todos/controllers/editTodo.js');
const deleteTodo = require('./components/todos/controllers/deleteTodo.js');
const deleteTodos = require('./components/todos/controllers/deleteTodos.js');

router.get('/', fetchPhotos);
router.post('/', createPhoto);
router.get('/:id', fetchTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteTodos);

module.exports = router;
