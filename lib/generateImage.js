'use strict';

const sharp = require('sharp');
const { 
    IMAGE_HEIGHT, 
    IMAGE_WIDTH, 
    TITLE_OFFSETS,
    AUTHOR_OFFSETS,
    SUMMARY_OFFSETS,
    DATE_OFFSETS
} = require('./constants');

const cardlines = Buffer.from(`
    <svg width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" >
      <line x1="160" y1="0" x2="160" y2="720" style="stroke:rgb(0,0,0);stroke-width:2;opacity:0.5" />
      <line x1="162" y1="0" x2="162" y2="720" style="stroke:rgb(238,238,51);stroke-width:2;opacity:0.5" />
      <line x1="200" y1="0" x2="200" y2="720" style="stroke:rgb(0,0,0);stroke-width:2;opacity:0.5" />
      <line x1="202" y1="0" x2="202" y2="720" style="stroke:rgb(238,238,51);stroke-width:2;opacity:0.5" />
      <line x1="0" y1="140" x2="960" y2="140" style="stroke:rgb(0,0,0);stroke-width:2opacity:0.5" />
      <line x1="0" y1="138" x2="960" y2="138" style="stroke:rgb(238,238,51);stroke-width:2opacity:0.5" />
      <circle cx="482" cy="632" r="50" stroke="rgb(238,238,51)" stroke-width="2" fill="none" />
      <circle cx="480" cy="630" r="50" stroke="black" stroke-width="2" fill="white" />
    </svg>
`);

const bgd = sharp({
    create: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        channels: 3,
        background: '#FFFFFF'
    }
});

async function generateImage(req, res, next) {
    const { 
        authorSVG,
        titleSVG,
        summarySVG,
        dateSVG
    } = res.locals;

    const finalImg = bgd
        .composite([
            {
                input: cardlines
            },
            {
                input: authorSVG,
                blend: 'atop',
                top: AUTHOR_OFFSETS.top,
                left: AUTHOR_OFFSETS.left
            },
            {
                input: titleSVG,
                blend: 'atop',
                top: TITLE_OFFSETS.top,
                left: TITLE_OFFSETS.left
            },
            {
                input: summarySVG,
                blend: 'atop',
                top: SUMMARY_OFFSETS.top,
                left: SUMMARY_OFFSETS.left
            },
            {
                input: dateSVG,
                blend: 'atop',
                top: DATE_OFFSETS.top,
                left: DATE_OFFSETS.left
            }
        ]);
    
    res.locals.finalImage = await finalImg.jpeg({ quality: 100 }).toBuffer();
    return next();
}

module.exports = generateImage;