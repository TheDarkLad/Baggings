import nodeISBN from 'node-isbn';

/* Tries fetching a book using the node-isbn package from GOOGLE BOOKS API, OPENLIBRARY or WORLDCAT*/
export function fetchBook(isbn) {
    return new Promise((resolve, reject) => {
        try {
            nodeISBN.provider([nodeISBN.PROVIDER_NAMES.GOOGLE, nodeISBN.PROVIDER_NAMES.OPENLIBRARY, nodeISBN.PROVIDER_NAMES.WORLDCAT]).resolve(isbn).then((book) => {
                resolve(book);
            }).catch((err) => {
                reject(err)
            });
        }
        catch (ex) {
            reject("Something went wrong trying to fetch the book");
        }
    });
}

export function scan() {
    return new Promise((resolve, reject) => {
        try {
            // add logic
        }
        catch (ex) {
            reject("Something went wrong trying to scan the book");
        }
    });
}

export function deviceHasCamera() {
    navigator.getMedia =
        navigator.getUserMedia || // use the proper vendor prefix
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    return new Promise((resolve, reject) => {
        // navigator.getMedia({ video: true }, () => {
        resolve()
        // }, () => {
        //     reject();
        // });
    });
}
