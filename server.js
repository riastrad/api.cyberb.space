"use strict";

const express = require("express");
const setHeaders = require("./middleware/setHeaders");
const processParams = require("./middleware/processParams");
const generateImage = require("./lib/generateImage");
const processRSS = require("./middleware/processRSS");
const finalizeJSONResponse = require("./middleware/finalizeJSONResponse");

const server = express();
const port = process.env.SERVER_PORT || 3030;

server.use(setHeaders, (req, res, next) => {
  console.log(`req: ${decodeURI(req.originalUrl)}`);
  return next();
});

server.get("/", (req, res) => {
  res.send({ status: "OK" });
});

// card generator route
server.get("/cards/post.jpg", processParams, generateImage, (req, res) => {
  if (res.locals.finalImage) {
    res.type("jpg");
    res.send(res.locals.finalImage);
  } else {
    res.status(422).send("Unable to generate image");
  }
});

// rss feed converter route
server.get(
  "/oku/rss/collection/:collectionId",
  processRSS,
  finalizeJSONResponse
);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
