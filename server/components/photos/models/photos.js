const knex = require('../../../dbConnect');

module.exports = {
    insertPhoto: ({ iso, aperture, lens, img }) =>
        knex('photos')
            .insert({
                iso,
                aperture,
                lens,
                img,
            }).returning('*'),
    queryPhotos: () => knex('photos'),
};
