'use strict';

const express = require('express')
const processTitle = require('./lib/processTitle');
const processQS = require('./lib/processQS');

const server = express()
const port = 3030

server.get('/', (req, res) => {
    res.send({ status: 'OK' });
});

server.get('/:title.jpg', processTitle, processQS, /* generateImage */ (req, res) => {
    const postTitle = res.locals.title;
    const postDate = res.locals.date;
    const postSource = res.locals.source;
    res.send({ postTitle, postDate, postSource });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
