//Angular imports
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Component, Input, OnInit, OnChanges, SimpleChange, Pipe, enableProdMode} from 'angular2/core';
import 'rxjs/add/operator/map'
enableProdMode();

//My Imports
import {Book} from './Book';
import {Config} from './Config';
import {BookLoader} from './BookLoader';
import {BookListComponent} from './bookList.component';

@Component({
    selector: 'my-app', 
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app.component.html',
    directives: [BookListComponent],
})

export class AppComponent extends BookLoader {
    @Input() model;
    Books: Array<Book>;
    AuthorBook: Array<Array<Book>>;
    ReadBooks:number;
    UnReadBooks: number;
    Reading: number;
    Authors: Array<string>;
    http: Http;

    constructor(http: Http) {
        super(http);
        this.Books = new Array<Book>();
        this.AuthorBook = new Array<Array<Book>>();
        this.ReadBooks = 0;
        this.UnReadBooks = 0;
        this.Reading = 0;
        this.Authors = new Array<string>();
        this.http = http;
    }

    HandleResponse(data) {
        if (data.length >= 1) {
            this.Books = Book.sortByKey(data, "Author", "Series", "Number");
            this.AuthorBook = this.CreateAuthorList(this.Books);
            this.ReadBooks = this.CountBooks('Read', true);
            this.UnReadBooks = this.CountUnReadBooks();
            this.Reading = this.CountBooks('Reading', true);
            this.Authors = this.CreatePropertyList("Author");
        }
    }

    

    CreateAuthorList(books) {
        var _bigList = [];
        var currentAuthor;
        var currentList = [];
         
        currentAuthor = books[0].Author;
        for (var i = 0; i < books.length; i++) {
            if (currentAuthor == books[i].Author) {
                currentList.push(books[i]);
                currentAuthor = books[i].Author;
            }
            else {
                _bigList.push(currentList);
                currentList = [];

                currentList.push(books[i]);
                currentAuthor = books[i].Author;
            }
        }
        _bigList.push(currentList);

        return _bigList;
    }

    CountBooks(property, value) {
        var countbooks = 0;
        for (var i = 0; i < this.Books.length; i++) {
            if (this.Books[i][property] == value) {
                countbooks++;
            }
        }
        return countbooks;
    }

    CountUnReadBooks() {
        var countbooks = 0;
        for (var i = 0; i < this.Books.length; i++) {
            if (this.Books[i].Read == false &&
                this.Books[i].Reading == false) {
                countbooks++;
            }
        }
        return countbooks;
    }

    CreatePropertyList(property) {
        var list = [];
        for (var i = 0; i < this.Books.length; i++) {
            if (list.indexOf(this.Books[i][property]) < 0) {
                list.push(this.Books[i][property]);
            }
        }
        return list;
    }
}