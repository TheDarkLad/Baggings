var bookApp = angular.module('BookApp', []);
var booksJson = "books.json?v=" + Date.now().valueOf();

bookApp.controller('BookController', ['$scope', '$location', '$http', '$filter', function ($scope, $location, $http, $filter) {
    $scope.BookList = [];

    $scope.Init = function () {
        $scope.all = true;

        $http.get(booksJson).then(function (result) {
            var data = sortByKey(result.data, "Author", "Series", "Number");

            $scope.AllBooks = data.length;
            $scope.ReadBooks = $filter('readFilter')(data, true).length;
            $scope.UnReadBooks = $filter('unreadFilter')(data, true).length;        
            $scope.Reading = $filter('readingFilter')(data, true).length;

            var bookList = [];
            var AuthorList = [];
            var cAuthor = data[0].Author;
            for (var i = 0; i <= data.length; i++) {
                if (data[i] === undefined || cAuthor !== data[i].Author) {
                    bookList.push({
                        Author: cAuthor,
                        Books: AuthorList
                    });
                    AuthorList = [];
                }
                if (data[i] !== undefined) {
                    AuthorList.push(data[i]);
                    cAuthor = data[i].Author;
                }
            }
            $scope.BookList = bookList;
        }, function (err) {
            console.error(err);
        });
    }

    $scope.toggleFilter = function ($elem) {
        $scope.readBooks = false;
        $scope.unreadBooks = false;
        $scope.readingBooks = false;
        $scope.all = false;
        if ($elem) {
            $scope[$elem] = true;
            $location.search('f', $elem);
        }
    }

    $scope.setReadFilter = function () {
        var searchObject = $location.search();
        if (searchObject && searchObject.f)
            $scope.toggleFilter(searchObject.f);
    }
    $scope.Init();
    $scope.setReadFilter();
}]);


bookApp.controller('EditController', ['$scope', '$http', function ($scope, $http) {
    function getBook() {
        var myParam = location.search.split('bookid=')[1]
        return myParam;
    }

    $scope.Init = function () {
        $http.get(booksJson).then(function (result) {
            var data = sortByKey(result.data, "Author", "Series", "Number");

            $scope.book = {};
            var bookid = parseInt(getBook());
            if (bookid) {
                $scope.book = $.grep(data, function (obj) {
                    return (obj.Key === bookid);
                })[0];
            }

            $scope.HasID = (bookid);
            $scope.AllBooks = data;

            var allAuthors = $.map($scope.AllBooks, function (o) { return o.Author; });
            $("#Author").autocomplete({
                source: allAuthors.unique()
            });

            var allSeries = $.map($scope.AllBooks, function (o) { return o.Series; });
            $("#Series").autocomplete({
                source: allSeries.unique()
            });
        }, function (err) {
            console.error(err);
        });
    }

    $scope.Save = function (e, key) {
        var imageUploadElement = document.getElementById("fileToUpload");
        if (imageUploadElement && imageUploadElement.files.length > 0) {
            $scope.UploadImage(imageUploadElement.files[0]);
            $scope.book.Image = "uploads/" + imageUploadElement.value.split("\\")[imageUploadElement.value.split("\\").length - 1];
        }

        if ($scope.book.Key === undefined && ($scope.book.Title !== undefined && $scope.book.Title !== "")) {
            var keys = $.map($scope.AllBooks, function (o) { return o.Key; });
            var newKey = Math.max.apply(this, keys);
            $scope.book.Key = newKey + 1;
            $scope.AllBooks.push($scope.book);
        }

        var stringified = angular.toJson(sortByKey($scope.AllBooks, "Key", "Key", "Key"));
        $scope.SaveJsonBook(stringified);

        if (key === 0)
            location.reload();
    };

    $scope.Remove = function (e, key) {
        $scope.RemoveImage($scope.book.Image);
        var item = $.grep($scope.AllBooks, function (book) {
            return (book.Key === key);
        });
        var removeIndex = $scope.AllBooks.indexOf(item[0]);

        $scope.AllBooks.splice(removeIndex, 1);
        var stringified = angular.toJson(sortByKey($scope.AllBooks, "Key", "Key", "Key"));
        $scope.SaveJsonBook(stringified);

        if (key > 0)
            location.href = location.href.split('?bookid=')[0];
    };

    $scope.UploadImage = function (file) {
        var fd = new FormData();
        fd.append('fileToUpload', file);

        $http.post("upload.php", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }
        }).then(function () {
            console.log("OK");
        }, function (err) {
            console.log(err);
        });
    }

    $scope.RemoveImage = function (fileName) {
        var fd = new FormData();
        fd.append('fileToRemove', fileName);

        $http.post("remove.php", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }
        }).then(function () {
            console.log("OK");
        }, function (err) {
            console.log(err);
        });
    }

    $scope.SaveJsonBook = function (jsonBooks) {
        var fd = new FormData();
        fd.append('json', jsonBooks);

        $http.post("SaveFile.php", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }
        }).then(function () {
            console.log("OK");
        }, function (err) {
            console.log(err);
        });
    }

    $scope.Init();
}]);


bookApp.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

bookApp.filter('readFilter', function () {
    return function (bookList, args) {
        return bookList.filter(book => {
            if (args && args !== "" && args !== "undefined")
                return book.Read === true;
            else
                return book
        });
    }
});
bookApp.filter('unreadFilter', function () {
    return function (bookList, args) {
        return bookList.filter(book => {
            if (args && args !== "" && args !== "undefined")
                return !book.Read || book.Read === false;
            else
                return book
        });
    }
});
bookApp.filter('readingFilter', function () {
    return function (bookList, args) {
        return bookList.filter(book => {
            if (args && args !== "" && args !== "undefined")
                return book.Reading === true;
            else
                return book
        });
    }
});

Array.prototype.contains = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

function sortByKey(array, key, key2, key3) {
    return array.sort(function (a, b) {
        var x = a[key] + a[key2] + a[key3]; var y = b[key] + b[key2] + b[key3];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}