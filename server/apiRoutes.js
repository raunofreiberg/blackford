const express = require('express');
const router = express.Router();

const { fetchTodos } = require('./controllers/todos');
const { fetchTodo } = require('./controllers/todos');
const { createTodo } = require('./controllers/todos');
const { editTodo } = require('./controllers/todos');
const { deleteTodo } = require('./controllers/todos');
const { deleteTodos } = require('./controllers/todos');

router.get('/', fetchTodos);
router.post('/', createTodo);
router.get('/:id', fetchTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteTodos);

module.exports = router;
