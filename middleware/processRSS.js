'use strict';

const request = require('needle');
const { OKU_BASE_URL } = require('../lib/constants');

function processRSS(req, res, next) {
    const rssID = req.params.collectionId; 
    const url = OKU_BASE_URL + rssID;
    
    let XML;
    request.get(url, (err, resp, body) => {
        XML = body;
        res.locals.parsedXML = XML
        return next();
    });
}

module.exports = processRSS;
