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
var core_1 = require('@angular/core');
var authorFilter = (function () {
    function authorFilter() {
    }
    authorFilter.prototype.transform = function (value, args) {
        var name = args[0];
        return value.filter(function (book) {
            if (name != undefined && name != "" && name != "undefined")
                return book[0].Author == name;
            else
                return book[0].Author;
        });
    };
    authorFilter = __decorate([
        core_1.Pipe({
            name: 'authorFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], authorFilter);
    return authorFilter;
}());
exports.authorFilter = authorFilter;
var readFilter = (function () {
    function readFilter() {
    }
    readFilter.prototype.transform = function (value, args) {
        var name = args[0];
        return value.filter(function (book) {
            if (name != undefined && name != "" && name != "undefined")
                return book.Read == true;
            else
                return book;
        });
    };
    readFilter = __decorate([
        core_1.Pipe({
            name: 'readFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], readFilter);
    return readFilter;
}());
exports.readFilter = readFilter;
var unreadFilter = (function () {
    function unreadFilter() {
    }
    unreadFilter.prototype.transform = function (value, args) {
        var name = args[0];
        return value.filter(function (book) {
            if (name != undefined && name != "" && name != "undefined")
                return book.Read == false && book.Reading == false;
            else
                return book;
        });
    };
    unreadFilter = __decorate([
        core_1.Pipe({
            name: 'unreadFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], unreadFilter);
    return unreadFilter;
}());
exports.unreadFilter = unreadFilter;
var readingFilter = (function () {
    function readingFilter() {
    }
    readingFilter.prototype.transform = function (value, args) {
        var name = args[0];
        return value.filter(function (book) {
            if (name != undefined && name != "" && name != "undefined")
                return book.Reading == true;
            else
                return book;
        });
    };
    readingFilter = __decorate([
        core_1.Pipe({
            name: 'readingFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], readingFilter);
    return readingFilter;
}());
exports.readingFilter = readingFilter;
//# sourceMappingURL=toggles.pipe.js.map