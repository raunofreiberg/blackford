const knex = require('../../../dbConnect');

module.exports = {
    insertPhoto: photo => knex('photos')
        .insert({
            iso: photo.iso,
            aperture: photo.aperture,
            lens: photo.lens,
            img: photo.img,
        }).returning('*'),
    queryPhotos: () => knex('photos'),
};
