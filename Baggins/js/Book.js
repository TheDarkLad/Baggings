var Baggins;
(function (Baggins) {
    Baggins.books;

    function levelRequestListener() {
        Baggins.books = JSON.parse(this.responseText);
    }

    var Book = (function () {
        function Book(id, title, author, subtitle, series, numberinseries, imageURL, read) {
            this.ID = id;
            this.Title = title;
            this.Author = author;
            this.SubTitle = subtitle;
            this.Series = series;
            this.Number = numberinseries;
            this.ImageURL = imageURL;
            this.Read = read;
        }
        Book.Save = function (books) {
            $.post("SaveFile.php", { json: JSON.stringify(books) }, function (data) {
            });
        };

        Book.Load = function () {
            var request = new XMLHttpRequest();
            request.onload = levelRequestListener;
            request.open("get", "books.json", false);
            request.send();
        };
        return Book;
    })();
    Baggins.Book = Book;
})(Baggins || (Baggins = {}));
