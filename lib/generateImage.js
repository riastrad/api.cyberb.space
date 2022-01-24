'use strict';

const sharp = require('sharp');
const { IMAGE_HEIGHT, IMAGE_WIDTH } = require('./constants');

const bgd = sharp({
    create: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        channels: 3,
        background: '#FFFFFF'
    }
});

async function generateImage(req, res, next) {
    const titleSVG = res.locals.titleSVG;
    // TODO: load and composite date & source info

    const finalImg = bgd
        .composite([
            {
                input: titleSVG,
                top: 10,
                left: 10
            }
        ]);
    
    res.locals.finalImage = await finalImg.jpeg({ quality: 100 }).toBuffer();
    return next();
}

module.exports = generateImage;