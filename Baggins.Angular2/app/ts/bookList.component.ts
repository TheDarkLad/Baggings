import {Component, Input} from 'angular2/core';
import {authorFilter, readFilter, readingFilter, unreadFilter} from './filters';

@Component({
    selector: 'bookList',
    templateUrl: 'bookList.component.html',
    inputs: ['bookLists', 'Books', 'ReadBooks', 'UnReadBooks', 'Reading', 'Authors'],
    pipes: [authorFilter, readFilter, readingFilter, unreadFilter]
})

export class BookListComponent {
    readBooks: boolean;
    unreadBooks: boolean;
    readingBooks: boolean;

    constructor() {
        this.readBooks = false;
        this.unreadBooks = false;
        this.readingBooks = false;
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
} 