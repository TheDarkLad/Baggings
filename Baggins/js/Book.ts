module Baggins {
    export var books: Book[];

    function levelRequestListener() {
        Baggins.books = JSON.parse(this.responseText);
    }

    export class Book {
        public ID: number;
        public Title: string;
        public Author: string;
        public SubTitle: string;
        public Series: string;
        public Number: number;
        public ImageURL: string;
        public Read: boolean;

        constructor(id: number, title: string, author: string, subtitle: string, series: string, numberinseries: number, imageURL: string, read: boolean)
        {
            this.ID = id;
            this.Title = title;
            this.Author = author;
            this.SubTitle = subtitle;
            this.Series = series;
            this.Number = numberinseries;
            this.ImageURL = imageURL;
            this.Read = read;
        }

        public static Save(books : Book[])
        {
            $.post("SaveFile.php", { json: JSON.stringify(books) }, function (data) { } );
        }

        public static Load()
        {
            var request = new XMLHttpRequest();
            request.onload = levelRequestListener;
            request.open("get", "books.json", false);
            request.send();
        }
    }
}