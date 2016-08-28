//Angular imports
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map'
import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BookLoader } from '../BookLoader';
import { Book } from '../Book';
//Local Imports
import { authorFilter, readFilter, readingFilter, unreadFilter } from '../_pipes/toggle.pipe';

@Component({
    moduleId: module.id,
    selector: 'bookList',
    templateUrl: './bookList.component.html',
    directives: [MODAL_DIRECTIVES],
    inputs: ['bookLists', 'ReadBooks', 'UnReadBooks', 'Reading', 'Authors'],
    pipes: [authorFilter, readFilter, readingFilter, unreadFilter]
})

export class BookListComponent {
    readBooks: boolean;
    unreadBooks: boolean;
    readingBooks: boolean;
    modelOpened: boolean;
    selectedBook: Book;
    @Input() Books: Array<Book>
    bookloader: BookLoader;
    @ViewChild('myModal')
    modal: ModalComponent; 
    
    constructor(http: Http){
        this.readBooks = false;
        this.unreadBooks = false;
        this.readingBooks = false;
        this.modelOpened = false;
        this.selectedBook = new Book();
        this.bookloader = new BookLoader(http, false);
    } 

    toggleFilter(property) {
        this.readBooks = false;
        this.unreadBooks = false;
        this.readingBooks = false;
        if (property != undefined) {
            this[property] = true;
        }
    }
    isActive(property) {
        if (property != undefined) { 
            return this[property] == true;
        }
        else
            return false;
    }


    close() {
        this.bookloader.SaveBook(this.Books);
        this.modal.close();
    }

    open(book: Book) {
        this.selectedBook = book;
        this.modal.open();
    } 
} 