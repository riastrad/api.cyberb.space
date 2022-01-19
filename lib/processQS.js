'use strict';

function processQS(req, res, next) {
    const { date, source } = req.query
    res.locals.date = date;
    res.locals.source = source;
    return next();
}

module.exports = processQS;