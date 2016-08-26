"use strict";
var Config = (function () {
    function Config() {
    }
    Config.JSONPATH = "books.json";
    Config.SaveFileEndpoint = "SaveFile.php";
    Config.UploadFileEndpoint = "upload.php";
    Config.RemoveFileEndpoint = "remove.php";
    Config.ImageFolder = "uploads/";
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map