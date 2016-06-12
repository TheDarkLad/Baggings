System.register(['angular2/http', 'rxjs/add/operator/map', 'angular2/core', './filters', 'ng2-bs3-modal/ng2-bs3-modal', './BookLoader', './Book'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, filters_1, ng2_bs3_modal_1, BookLoader_1, Book_1;
    var BookListComponent;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (filters_1_1) {
                filters_1 = filters_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (BookLoader_1_1) {
                BookLoader_1 = BookLoader_1_1;
            },
            function (Book_1_1) {
                Book_1 = Book_1_1;
            }],
        execute: function() {
            BookListComponent = (function () {
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
            exports_1("BookListComponent", BookListComponent);
        }
    }
});
//# sourceMappingURL=bookList.component.js.map