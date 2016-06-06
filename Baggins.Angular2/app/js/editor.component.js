System.register(['angular2/http', 'angular2/core', 'rxjs/add/operator/map', './BookLoader', './Book', './Config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, BookLoader_1, Book_1, Config_1;
    var EditorComponent;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (BookLoader_1_1) {
                BookLoader_1 = BookLoader_1_1;
            },
            function (Book_1_1) {
                Book_1 = Book_1_1;
            },
            function (Config_1_1) {
                Config_1 = Config_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            EditorComponent = (function (_super) {
                __extends(EditorComponent, _super);
                function EditorComponent(http) {
                    _super.call(this, http);
                    this.Books = new Array();
                    this.Book = new Book_1.Book();
                }
                EditorComponent.prototype.HandleResponse = function (data) {
                    this.Books = Book_1.Book.sortByKey(data, "Title", "Series", "Number");
                    this.Book = new Book_1.Book();
                    this.GetBook();
                };
                EditorComponent.prototype.GetBook = function () {
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
                        this.Book = new Book_1.Book();
                };
                EditorComponent.prototype.IsNewInstance = function () {
                    return (isNaN(this.CurrentBookID));
                };
                EditorComponent.prototype.Add = function () {
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
                };
                EditorComponent.prototype.Save = function (uploadFile) {
                    if (uploadFile) {
                        //Remove old
                        this.RemoveImage(this.Book.Image);
                        //Upload new
                        this.GetAndUploadImage('uploadOverwrite');
                    }
                    this.SaveBook(this.Books);
                };
                EditorComponent.prototype.Remove = function (bookID) {
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
                };
                EditorComponent.prototype.GetAndUploadImage = function (elementName) {
                    //var uploadFiles = event.path[0];
                    //var files = uploadFiles.files;
                    var ele = document.getElementById(elementName);
                    var files = ele.files;
                    for (var i = 0; i < files.length; i++) {
                        var fileName = Config_1.Config.ImageFolder + files[i].name;
                        this.Book.Image = fileName;
                        this.UploadImage(files[i]);
                    }
                };
                EditorComponent = __decorate([
                    core_1.Component({
                        selector: 'my-editor',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        templateUrl: 'editor.component.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], EditorComponent);
                return EditorComponent;
            }(BookLoader_1.BookLoader));
            exports_1("EditorComponent", EditorComponent);
        }
    }
});
//# sourceMappingURL=editor.component.js.map