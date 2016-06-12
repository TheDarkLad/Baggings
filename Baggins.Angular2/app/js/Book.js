System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Book;
    return {
        setters:[],
        execute: function() {
            Book = (function () {
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
            exports_1("Book", Book);
        }
    }
});
//# sourceMappingURL=Book.js.map