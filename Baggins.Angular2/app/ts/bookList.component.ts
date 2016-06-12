import {Component, Input, EventEmitter, ViewChild} from 'angular2/core';
import {authorFilter, readFilter, readingFilter, unreadFilter} from './filters';
import { MODAL_DIRECTIVES, ModalComponent  } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'bookList',
    templateUrl: 'bookList.component.html',
    directives: [MODAL_DIRECTIVES],
    inputs: ['bookLists', 'Books', 'ReadBooks', 'UnReadBooks', 'Reading', 'Authors'],
    pipes: [authorFilter, readFilter, readingFilter, unreadFilter]
})

export class BookListComponent {
    readBooks: boolean;
    unreadBooks: boolean;
    readingBooks: boolean;
    modelOpened: boolean;

    @ViewChild('myModal')
    modal: ModalComponent;

    constructor() {
        this.readBooks = false;
        this.unreadBooks = false;
        this.readingBooks = false;
        this.modelOpened = false;
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
        this.modal.close();
    }

    open() {
        this.modal.open();
    }
} 