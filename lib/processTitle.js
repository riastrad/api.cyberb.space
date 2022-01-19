'use strict';

function processTitle(req, res, next) {
    res.locals.title = req.params.title;
    return next();
}

module.exports = processTitle;