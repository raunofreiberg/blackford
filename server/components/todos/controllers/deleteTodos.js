const deleteTodos = require('../actions/deleteTodos.js');

module.exports = (req, res) => {
    deleteTodos(req, res)
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
