System.register(['angular2/http', './Config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Config_1;
    var BookLoader;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Config_1_1) {
                Config_1 = Config_1_1;
            }],
        execute: function() {
            BookLoader = (function () {
                function BookLoader(http) {
                    this.http = http;
                    this.LoadBooks();
                }
                BookLoader.prototype.LoadBooks = function () {
                    var _this = this;
                    this.http.get(Config_1.Config.JSONPATH)
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
            exports_1("BookLoader", BookLoader);
        }
    }
});
//# sourceMappingURL=BookLoader.js.map