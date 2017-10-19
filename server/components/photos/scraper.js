const scrapeIt = require('scrape-it');
const { insertPhoto } = require('./models/photos');

const extractValue = (str, start, end) => str.match(new RegExp(`${start}(.*)${end}`))[1];

const scrapeLargeImg = async (photo) => {
    const imgObj = await scrapeIt(photo.photoDetailUrl, {
        img: {
            selector: "#allsizes-photo img",
            attr: "src",
        },
    });
    const photoObj = await { ...imgObj, ...photo };
    await insertPhoto(photoObj);
};

module.exports = async () => {
    const res = await scrapeIt("https://pixelpeeper.com/lenses/?lens=13557", {
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
                photoDetailUrl: {
                    selector: ".image_prev a",
                    attr: "href",
                },
            },
        },
    });
    await res.photos.forEach(photo => scrapeLargeImg(photo));
};

