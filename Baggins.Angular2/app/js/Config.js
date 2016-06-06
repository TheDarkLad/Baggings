System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Config;
    return {
        setters:[],
        execute: function() {
            Config = (function () {
                function Config() {
                }
                Config.JSONPATH = "books.json";
                Config.SaveFileEndpoint = "SaveFile.php";
                Config.UploadFileEndpoint = "upload.php";
                Config.RemoveFileEndpoint = "remove.php";
                Config.ImageFolder = "uploads/";
                return Config;
            }());
            exports_1("Config", Config);
        }
    }
});
//# sourceMappingURL=Config.js.map