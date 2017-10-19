const { queryPhotos } = require('../models/photos.js');

module.exports = (req, res) => {
    queryPhotos(req, res)
        .then((photos) => {
            res.status(200).json({
                photos,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when fetching all photos.',
                reason: err,
            });
        });
};
