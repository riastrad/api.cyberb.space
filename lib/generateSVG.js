'use strict';

const { TITLE_HEIGHT, TITLE_WIDTH } = require('./constants');

module.exports.author = (author) => {
    return Buffer.from(`
        <svg width="500" height="100" >
            <style>
            .author { fill: #001; font-family: Courier New; font-size: 3.5em; font-weight: bold; }
            .date { fill: #001; font-family: monospace; font-size: 2em; font-weight: bold; }
            </style>
            <text x="0" y="50" >
                <tspan class="author">${author}</tspan>
                <tspan y="45" class="date">, 1990 —</tspan>
            </text>
        </svg>
    `);
}

module.exports.title = (title) => {
    return Buffer.from(`
    <svg width="750" height="100" >
      <style>
      .title { fill: #001; font-family: monospace; font-size: 2.5em; font-weight: bold; }
      </style>
        <text x="0" y="40" class="title" >Title: ${title}</text>
    </svg>
    `);
}

module.exports.summary = (summary, source) => {
    return Buffer.from(`
        <svg width="750" height="100" >
            <style>
            .summary { fill: #001; font-family: Courier New; font-size: 1.5em; font-weight: bold; }
            .source { fill: #001; font-family: monospace; font-size: 1.5em; font-weight: bold; }
            </style>
            <text x="0">
                <tspan y="40" class="summary">"${summary}"</tspan>
                <tspan x="30" y="80" class="source">* a note from ${source} *</tspan>
            </text>
        </svg>
    `);
}

module.exports.date = (date) => {
    return Buffer.from(`
        <svg width="500" height="100" >
            <style>
            .date { fill: red; font-family: monospace; font-size: 3em; font-weight: bold; opacity: 0.45; }
            </style>
            <text x="0" y="30" class="date" transform="rotate(5)" >${date}</text>
        </svg>
    `);
}
