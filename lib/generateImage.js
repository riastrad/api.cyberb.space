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
      <line x1="80" y1="0" x2="80" y2="720" style="stroke:rgb(0,0,0);stroke-width:2;opacity:0.5" />
      <line x1="82" y1="0" x2="82" y2="720" style="stroke:rgb(238,238,51);stroke-width:2;opacity:0.5" />
      <line x1="120" y1="0" x2="120" y2="720" style="stroke:rgb(0,0,0);stroke-width:2;opacity:0.5" />
      <line x1="122" y1="0" x2="122" y2="720" style="stroke:rgb(238,238,51);stroke-width:2;opacity:0.5" />
      <line x1="0" y1="100" x2="720" y2="100" style="stroke:rgb(0,0,0);stroke-width:2opacity:0.5" />
      <line x1="0" y1="98" x2="720" y2="98" style="stroke:rgb(238,238,51);stroke-width:2opacity:0.5" />
      <circle cx="362" cy="322" r="15" stroke="rgb(238,238,51)" stroke-width="2" fill="none" />
      <circle cx="360" cy="320" r="15" stroke="black" stroke-width="2" fill="white" />
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