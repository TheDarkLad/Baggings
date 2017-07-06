var Baggins;
(function (Baggins) {
    function levelRequestListener() {
        Baggins.books = JSON.parse(this.responseText);
    }
    var Book = (function () {
        function Book() {
        }
        Book.Save = function (jsonBooks) {
            $.post("SaveFile.php", { json: jsonBooks }, function (data) { });
        };
        Book.RemoveImage = function (fileName) {
            $.post("remove.php", { fileToRemove: fileName }, function (data) { });
        };
        Book.Http = function (method, url, done) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                done(null, xhr.response);
            };
            xhr.onerror = function () {
                done(xhr.response);
            };
            xhr.send();
        };
        return Book;
    }());
    Baggins.Book = Book;
})(Baggins || (Baggins = {}));
