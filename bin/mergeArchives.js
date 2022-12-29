"use strict";

const fs = require("fs");
const path = require("path");

// 6. [manually] add isbns for as many books as possible
// 7. [manually] add start dates for any oku books
// 8. [manually] add relative links to review posts

function loadArchive(source) {
  const archivePath = path.resolve(
    process.cwd(),
    `bin/archives/${source}.json`
  );

  const archive = fs.readFileSync(archivePath, { encoding: "utf-8" });
  return source === "goodreads"
    ? JSON.parse(archive).filter((book) => book["explanation"] === undefined)
    : JSON.parse(archive)["items"];
}

function standardizeData(book) {
  // "rating" indicates it came from GoodReads
  if (book.rating !== undefined) {
    return {
      title: book.book,
      author: "TKTK",
      status: book.read_status,
      started:
        book.started_at !== "(not provided)"
          ? new Date(book.started_at)
          : new Date(book.created_at),
      finished:
        book.read_at !== "(not provided)"
          ? new Date(book.read_at)
          : new Date(book.updated_at)
    };
  } else {
    return {
      title: book.title,
      author: book.author,
      status: "read",
      started: "--",
      finished: new Date(book.pubDate)
    };
  }
}

function mergeArchives() {
  const oku = loadArchive("oku").map(standardizeData);
  const goodreads = loadArchive("goodreads").map(standardizeData);

  const okuTitles = oku.map((i) => i.title);

  let combinedArchive = [...oku];
  goodreads.forEach((book) => {
    if (!okuTitles.includes(book.title)) {
      combinedArchive.push(book);
    } else {
      const ix = combinedArchive.findIndex(
        (element) => element.title === book.title
      );
      const entry = combinedArchive[ix];
      const updatedEntry = { ...entry, started: book.started };
      combinedArchive[ix] = updatedEntry;
    }
  });

  // drop anything that doesn't have the status 'read'
  const finalArchive = combinedArchive.filter((book) => book.status === "read");
  return finalArchive.sort((a, b) => b.finished - a.finished);
}

function saveAsTsv(results) {
  const toRows = (entry) => `${Object.values(entry).join("\t")}`;
  const columns = `${Object.keys(results[0]).join("\t")}\n`;
  const archiveAsTsv = columns + results.map(toRows).join("\n");

  const outputPath = path.resolve(process.cwd(), "bin/readlog.csv");
  fs.writeFileSync(outputPath, archiveAsTsv);
}

const result = mergeArchives();
saveAsTsv(result);
