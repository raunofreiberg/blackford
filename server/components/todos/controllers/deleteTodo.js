const deleteTodo = require('../actions/deleteTodo.js');

module.exports = (req, res) => {
    deleteTodo(req, res)
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
