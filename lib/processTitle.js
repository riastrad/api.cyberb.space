'use strict';

const { TITLE_HEIGHT, TITLE_WIDTH } = require('./constants');

function generateTitleSVG(text) {
    return Buffer.from(`
    <svg width="${TITLE_WIDTH}" height="${TITLE_HEIGHT}" >
      <style>
      .title { fill: #001; font-family: monospace; font-size: 4.3em; font-weight: bold; }
      </style>
      <g>
        <rect width="100%" height="100%" fill="yellow"/>
        <text y="70" class="title" >${text}</text>
      </g>
    </svg>
    `);
}

function processTitle(req, res, next) {
    res.locals.title = req.params.title;
    res.locals.titleSVG = generateTitleSVG(req.params.title);
    return next();
}

module.exports = processTitle;
