const scrapeIt = require('scrape-it');
const { insertPhoto, queryPhotos } = require('./models/photos');
const knex = require('../../dbConnect');

const extractValue = (str, start, end) => str.match(new RegExp(`${start}(.*)${end}`))[1];

module.exports = () => {
    scrapeIt("https://pixelpeeper.com/lenses/?lens=13557", {
        photos: {
            listItem: ".image_box",
            data: {
                iso: {
                    selector: ".img_desc .img_info",
                    convert: x => extractValue(x, 'ISO: ', 'Focal'),
                },
                aperture: {
                    selector: ".img_desc .img_info",
                    convert: x => extractValue(x, 'Aperture: ', 'Exposure'),
                },
                lens: {
                    selector: ".img_desc .img_info",
                    convert: x => extractValue(x, 'Lens: ', 'ISO'),
                },
                img: {
                    selector: ".image_prev a img",
                    attr: "src",
                },
            },
        },
    }).then(obj => obj.photos.forEach(photo => insertPhoto(photo)))
    queryPhotos()
        .then(x => console.log(x))
};

