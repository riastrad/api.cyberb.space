'use strict';

function finalizeJSONResponse(req, res, next) {
    const { parsedXML } = res.locals;
    const rootChannelChildren = parsedXML['children'][0]['children'];

    const bookList = rootChannelChildren
        .filter((i) => i.name === 'item')
        .map((i) => {
            const fullBook = {}
            i.children.forEach((book) => {
                if (book.name === 'dc:creator') {
                    fullBook.author = book.value;
                } else {
                    fullBook[book.name] = book.value;
                }
            });
            return fullBook;
        })

    const finalizedJSON = {};
    const nonBooks = rootChannelChildren.filter((i) => i.name !== 'item');
    nonBooks.forEach((datum) => {
        if (datum.name === 'atom:link') {
            finalizedJSON['rss'] = datum.attributes.href;
        } else {
            finalizedJSON[datum.name] = datum.value;
        }
    });

    finalizedJSON.items = bookList

    res.send(finalizedJSON);
}

module.exports = finalizeJSONResponse;
