"use strict";
var http_1 = require('@angular/http');
var Config_1 = require('./Config');
var BookLoader = (function () {
    function BookLoader(http, loadbooks) {
        this.http = http;
        if (loadbooks)
            this.LoadBooks();
    }
    BookLoader.prototype.LoadBooks = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.
        this.http.get(Config_1.Config.JSONPATH, headers)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.HandleResponse(data); }, function (err) { return console.log(err); });
    };
    BookLoader.prototype.SaveBook = function (books) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        var postData = "json=" + JSON.stringify(books);
        this.http.post(Config_1.Config.SaveFileEndpoint, postData, {
            headers: headers
        }).subscribe(function (res) {
            console.log('post result %o', res);
        });
    };
    BookLoader.prototype.UploadImage = function (file) {
        var url = Config_1.Config.UploadFileEndpoint;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Every thing ok, file uploaded
                console.log(xhr.responseText); // handle response.
            }
        };
        fd.append("fileToUpload", file);
        xhr.send(fd);
    };
    BookLoader.prototype.RemoveImage = function (file) {
        var url = Config_1.Config.RemoveFileEndpoint;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Every thing ok, file uploaded
                console.log(xhr.responseText); // handle response.
            }
        };
        fd.append("fileToRemove", file);
        xhr.send(fd);
    };
    //This can be overwitten.
    BookLoader.prototype.HandleResponse = function (data) {
    };
    return BookLoader;
}());
exports.BookLoader = BookLoader;
//# sourceMappingURL=BookLoader.js.map