const { insertPhoto } = require('../models/photos.js');

module.exports = (req, res) => {
    insertPhoto(req, res)
        .then((photo) => {
            res.status(200).json({
                photo,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when adding a photo.',
                reason: err,
            });
        });
};
