'use strict';

const express = require('express')
const processParams = require('./middleware/processParams');
const generateImage = require('./lib/generateImage');

const server = express();
const port = 3030;

server.get('/', (req, res) => {
    res.send({ status: 'OK' });
});

server.use((req, res, next) => {
    console.log(`req: ${decodeURI(req.originalUrl)}`);
    return next();
});

server.get('/post.jpg', processParams, generateImage, (req, res) => {
    if (res.locals.finalImage) {
        res.type('jpg');
        res.send(res.locals.finalImage);
    } else {
        res.status(422).send('Unable to generate image');
    }
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
