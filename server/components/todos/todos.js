const express = require('express');
const router = express.Router();

const fetchTodos = require('./controllers/fetchTodos.js');
const fetchTodo = require('./controllers/fetchTodo.js');
const createTodo = require('./controllers/createTodo.js');
const editTodo = require('./controllers/editTodo.js');
const deleteTodo = require('./controllers/deleteTodo.js');

router.get('/', fetchTodos);
router.post('/', createTodo);
router.get('/:id', fetchTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
