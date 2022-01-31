'use strict';

const generateSVG = require('../lib/generateSVG');

function processParams(req, res, next) {
  const { title, summary, date, author, source, wc } = req.query;
  
  res.locals.titleSVG = generateSVG.title(title);
  res.locals.summarySVG = generateSVG.summary(summary, source);
  res.locals.dateSVG = generateSVG.date(date);
  res.locals.authorSVG = generateSVG.author(author);
  return next();
}

module.exports = processParams;
