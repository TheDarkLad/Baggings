module Baggins {
    export var books: Book[];

    function levelRequestListener() {
        Baggins.books = JSON.parse(this.responseText);
    }

    export class Book {
        public static Save(jsonBooks: string) {
            $.post("SaveFile.php", { json: jsonBooks }, function (data) { });
        }

        public static RemoveImage(fileName) {
            $.post("remove.php", { fileToRemove: fileName }, function (data) { });
        }

        public static Http(method: string, url: string, done:any)
        {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                done(null, xhr.response);
            };
            xhr.onerror = function () {
                done(xhr.response);
            };
            xhr.send();
        }
    }
}