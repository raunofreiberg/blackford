const todos = require('../models/todos');

exports.createTodo = (req, res) => {
    todos.insertTodo(req, res)
        .then((todo) => {
            res.status(200).json({
                todo,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when adding a todo.',
                reason: err,
            });
        });
};

exports.deleteTodo = (req, res) => {
    todos.deleteTodo(req, res)
        .then((todos) => {
            res.status(200).json({
                todos,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when deleting a todo.',
                reason: err,
            });
        });
};

exports.deleteTodos = (req, res) => {
    todos.deleteTodos(req, res)
        .then(() => {
            res.status(200).json({});
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when deleting a todo.',
                reason: err,
            });
        });
};

exports.editTodo = (req, res) => {
    todos.editTodo(req, res)
        .then((todo) => {
            res.status(200).json({
                todo,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when editing a todo.',
                reason: err,
            });
        });
};

exports.fetchTodo = (req, res) => {
    todos.queryTodo(req, res)
        .then((todo) => {
            res.status(200).json({
                todo,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when fetching a todo.',
                reason: err,
            });
        });
};

exports.fetchTodos = (req, res) => {
    todos.queryTodos(req, res)
        .then((todos) => {
            res.status(200).json({
                todos,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when fetching all todos.',
                reason: err,
            });
        });
};