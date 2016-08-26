//Angular imports
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';
import {Component, Input, OnInit, OnChanges, SimpleChange, Pipe, enableProdMode} from '@angular/core';
import 'rxjs/add/operator/map'
enableProdMode();

//My Imports
import {BookLoader} from './BookLoader';
import {Book} from './Book';
import {Config} from './Config';

@Component({
    selector: 'my-editor',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'editor.component.html',
})

export class EditorComponent extends BookLoader { 
    Books: Array<Book>; 
    CurrentBookID: number; 
    Book: Book;

    constructor(http: Http) {
        super(http, true);
        this.Books = new Array<Book>();
        this.Book = new Book();
    }

    HandleResponse(data) {
        this.Books = Book.sortByKey(data, "Title", "Series", "Number");
        this.Book = new Book();
        this.GetBook();
    }

    GetBook() {
        var bookID = Number(location.search.split('bookid=')[1]);
        if (this != undefined)
            this.CurrentBookID = bookID;

        var result;
        if (this.CurrentBookID != undefined && !isNaN(this.CurrentBookID)) {
            result = this.Books.filter(function (book) {
                return book.Key == bookID;
            });
        }
        if (result != undefined)
            this.Book = result[0];
        else
            this.Book = new Book();
    }

    IsNewInstance() {
        return (isNaN(this.CurrentBookID));
    }

    Add() {
        //Create a new Key
        var newKey = 0;
        for (var i = 0; i < this.Books.length; i++) {
            if (this.Books[i].Key > newKey) {
                newKey = this.Books[i].Key;
            }
        }

        //Add and Upload image
        this.GetAndUploadImage('uploadNew');

        //Add keys and Image to Book
        newKey = newKey + 1;
        this.Book["Key"] = newKey;
        this.Book["$$hashKey"] = "object:" + newKey;
        this.Books.push(this.Book);

        //Save and reload
        this.Save(false);
        location.href = location.href += '?bookid=' + newKey;
    }
    Save(uploadFile: boolean) {
        this.GetAndUploadImage('uploadOverwrite');
        this.SaveBook(this.Books);
    }

    Remove(bookID: number) {
        var imagePath = "";
        for (var i = 0; i < this.Books.length; i++) {
            if (this.Books[i].Key == bookID) {
                var removeIndex = i;
                imagePath = this.Books[i].Image;
            }
        }
        if (imagePath != "")
            this.RemoveImage(imagePath);

        this.Books.splice(removeIndex, 1);
        this.Save(false);

        location.href = location.href.split('?bookid=')[0];
    }   

    GetAndUploadImage(elementName: string) {
        //var uploadFiles = event.path[0];
        //var files = uploadFiles.files;
        var ele: any = document.getElementById(elementName)        
        var files = ele.files;

        if (files != undefined && files.length > 0) {
            //Remove old
            if (this.Book.Image != undefined && this.Book.Image != "") {
                this.RemoveImage(this.Book.Image);
            }

            for (var i = 0; i < files.length; i++) {
                var fileName = Config.ImageFolder + files[i].name;
                this.Book.Image = fileName;
                this.UploadImage(files[i]);
            }
        }
    }
}