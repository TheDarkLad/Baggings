"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Angular imports
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var filters_1 = require('../filters');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var BookLoader_1 = require('../BookLoader');
var Book_1 = require('../Book');
var BookListComponent = (function () {
    function BookListComponent(http) {
        this.readBooks = false;
        this.unreadBooks = false;
        this.readingBooks = false;
        this.modelOpened = false;
        this.selectedBook = new Book_1.Book();
        this.bookloader = new BookLoader_1.BookLoader(http, false);
    }
    BookListComponent.prototype.toggleFilter = function (property) {
        this.readBooks = false;
        this.unreadBooks = false;
        this.readingBooks = false;
        if (property != undefined) {
            this[property] = true;
        }
    };
    BookListComponent.prototype.isActive = function (property) {
        if (property != undefined) {
            return this[property] == true;
        }
        else
            return false;
    };
    BookListComponent.prototype.close = function () {
        this.bookloader.SaveBook(this.Books);
        this.modal.close();
    };
    BookListComponent.prototype.open = function (book) {
        this.selectedBook = book;
        this.modal.open();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BookListComponent.prototype, "Books", void 0);
    __decorate([
        core_1.ViewChild('myModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], BookListComponent.prototype, "modal", void 0);
    BookListComponent = __decorate([
        core_1.Component({
            selector: 'bookList',
            templateUrl: 'bookList.component.html',
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES],
            inputs: ['bookLists', 'ReadBooks', 'UnReadBooks', 'Reading', 'Authors'],
            pipes: [filters_1.authorFilter, filters_1.readFilter, filters_1.readingFilter, filters_1.unreadFilter]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BookListComponent);
    return BookListComponent;
}());
exports.BookListComponent = BookListComponent;
//# sourceMappingURL=bookList.component.js.map