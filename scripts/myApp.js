/// <reference path="Book.ts" />
var bookApp = angular.module('BookApp', []);
bookApp.controller('BookController', ['$scope', '$location', function ($scope, $location) {
    //Order by Author
    function sortByKey(array, key, key2, key3) {
        return array.sort(function (a, b) {
            var x = a[key] + a[key2] + a[key3]; var y = b[key] + b[key2] + b[key3];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    $scope.BookList = [];

    $scope.Init = function () {
        $scope.all = true;

        Baggins.Book.Http('GET', "books.json?v=" + Date.now().valueOf(), function (err, json) {
            if (err) { throw err; }

            var data = sortByKey(JSON.parse(json), "Author", "Series", "Number");

            $scope.AllBooks = data.length;
            $scope.ReadBooks = $.grep(data, function (b) {
                return (b.Read === true);
            }).length;

            $scope.UnReadBooks = $.grep(data, function (b) {
                return (b.Read === false);
            }).length;

            $scope.Reading = $.grep(data, function (b) {
                return (b.Reading === true);
            }).length;

            var bookList = [];
            var AuthorList = [];
            var cAuthor = data[0].Author;
            for (var i = 0; i <= data.length; i++) {
                if (data[i] === undefined || cAuthor != data[i].Author) {
                    bookList.push({
                        Author: cAuthor,
                        Books: AuthorList
                    });
                    AuthorList = [];
                }
                if (data[i] !== undefined)
                {
                    AuthorList.push(data[i]);
                    cAuthor = data[i].Author;
                }
            }
            $scope.BookList = bookList;
            $scope.$apply();
        });
    }

    $scope.toggleFilter = function ($elem) {
        $scope.readBooks = false;
        $scope.unreadBooks = false;
        $scope.readingBooks = false;
        $scope.all = false;
        if ($elem != undefined) {
            $scope[$elem] = true;
            $location.search('f', $elem);
        }
    }

    $scope.isActive = function (property) {
        if (property != undefined) {
            return this[property] == true;
        }
        else
            return false;
    }

    $scope.setReadFilter = function () {
        var searchObject = $location.search();
        if (searchObject != undefined && searchObject.f != undefined)
            $scope.toggleFilter(searchObject.f);
    }
    $scope.Init();
    $scope.setReadFilter();
}]);


bookApp.controller('EditController', ['$scope', function ($scope) {
    function getBook() {
        var myParam = location.search.split('bookid=')[1]
        return myParam;
    }

    //Order by Author
    function sortByKey(array, key, key2, key3) {
        return array.sort(function (a, b) {
            var x = a[key] + a[key2] + a[key3]; var y = b[key] + b[key2] + b[key3];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    $scope.Init = function () {
        Baggins.Book.Http('GET', "books.json?v=" + Date.now().valueOf(), function (err, json) {

            var data = sortByKey(JSON.parse(json), "Author", "Series", "Number");

            $scope.book = {};
            var bookid = getBook();
            if (bookid != undefined) {
                $scope.book = $.grep(data, function (obj) {
                    return (obj.Key == bookid);
                })[0];
            }

            $scope.HasID = (bookid != undefined);
            $scope.AllBooks = data;

            $("#Author").autocomplete({
                source: $.map($scope.AllBooks, function (o) { return o.Author; })
            });

            $("#Series").autocomplete({
                source: $.map($scope.AllBooks, function (o) { return o.Series; })
            });

            $scope.$apply();
        });
    }
    $scope.Init();

    $scope.Save = function (e, key) {
        var element = document.getElementById("Image");
        if (element != null && element.value != undefined && element.value !== "") {
            $scope.book.Image = "uploads/" + element.value.split("\\")[element.value.split("\\").length - 1]
        }

        if ($scope.book.Key === undefined && ($scope.book.Title !== undefined && $scope.book.Title !== "")) {
            var keys = $.map($scope.AllBooks, function (o) { return o.Key; });
            var newKey = Math.max.apply(this, keys);
            $scope.book.Key = newKey + 1;
            $scope.AllBooks.push($scope.book);
        }

        var stringified = angular.toJson(sortByKey($scope.AllBooks, "Key", "Key", "Key"));
        Baggins.Book.Save(stringified);

        if (key == 0)
            location.reload();
    };

    $scope.Remove = function (e, key) {

        Baggins.Book.RemoveImage($scope.book.Image);

        var item = $.grep($scope.AllBooks, function (book) {
            return (book.Key == key);
        });
        var removeIndex = $scope.AllBooks.indexOf(item[0]);

        $scope.AllBooks.splice(removeIndex, 1);
        var stringified = angular.toJson(sortByKey($scope.AllBooks, "Key", "Key", "Key"));
        Baggins.Book.Save(stringified);

        if (key > 0)
            location.reload();// = location.href.split('?bookid=')[0];
    };
}]);


bookApp.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

bookApp.filter('readFilter', function () {
    return function (bookList, args) {
        return bookList.filter(book => {
            if (args != undefined && args != "" && args != "undefined")
                return book.Read == true;
            else
                return book
        });
    }
});
bookApp.filter('unreadFilter', function () {
    return function (bookList, args) {
        return bookList.filter(book => {
            if (args != undefined && args != "" && args != "undefined")
                return book.Read == false;
            else
                return book
        });
    }
});
bookApp.filter('readingFilter', function () {
    return function (bookList, args) {
        return bookList.filter(book => {
            if (args != undefined && args != "" && args != "undefined")
                return book.Reading == true;
            else
                return book
        });
    }
});