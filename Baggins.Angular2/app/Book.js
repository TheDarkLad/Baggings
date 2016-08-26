"use strict";
var Book = (function () {
    function Book() {
    }
    //Order by Author
    Book.sortByKey = function (array, key, key2, key3) {
        return array.sort(function (a, b) {
            var x = a[key] + a[key2] + a[key3];
            var y = b[key] + b[key2] + b[key3];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };
    return Book;
}());
exports.Book = Book;
//# sourceMappingURL=book.js.map