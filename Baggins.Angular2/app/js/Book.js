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
                //constructor(key: number, title: string, author: string, subtitle: string, series: string, numberinseries: number, imageURL: string, read: boolean, reading: boolean, listening: boolean) {
                //    this.Key = key;
                //    this.Title = title;
                //    this.Author = author;
                //    this.SubTitle = subtitle;
                //    this.Series = series;
                //    this.Number = numberinseries;
                //    this.Image = imageURL;
                //    this.Read = read;
                //    this.Reading = reading;
                //    this.Listening = listening;
                //}  
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