var bookApp = angular.module('BookApp', []);
var booksJson = "books.json?v=" + Date.now().valueOf();

bookApp.constant('filterTypes', {
    all: 0,
    read: 1,
    unread: 2,
    reading: 3
});

bookApp.controller('BookController', ['$scope', '$location', '$http', '$filter', 'filterTypes', function ($scope, $location, $http, $filter, filterTypes) {
    $scope.AllBooks = [];
    $scope.filterTypes = filterTypes;
    $scope.filter = $scope.filterTypes.all;

    $scope.Init = function () {
        $scope.all = true;

        $http.get(booksJson).then(function (result) {
            $scope.AllBooks = result.data
        }, function (err) {
            console.error(err);
        });
    }

    $scope.toggleFilter = function ($elem) {
        $scope.filter = $elem;
        $location.search('f', $elem);
    }

    $scope.setReadFilter = function () {
        var searchObject = $location.search();
        if (searchObject && searchObject.f)
            $scope.toggleFilter(parseInt(searchObject.f));
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
            var data = result.data;

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

        var stringified = JSON.stringify($scope.AllBooks);
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
        var stringified = JSON.stringify($scope.AllBooks, "Key", "Key", "Key");
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

bookApp.filter("groupBy", function () {
    var mArr = null,
        mGroupBy = null,
        mRetArr = null;
    return function (arr, groupBy) {
        if (!angular.equals(mArr, arr) || mGroupBy !== groupBy) {
            mArr = angular.copy(arr);
            mGroupBy = groupBy;
            mRetArr = [];
            var groups = {};
            angular.forEach(arr, function (item) {
                var groupValue = item[groupBy]
                if (groups[groupValue]) {
                    groups[groupValue].items.push(item);
                } else {
                    groups[groupValue] = {
                        items: [item]
                    };
                    groups[groupValue][groupBy] = groupValue;
                    mRetArr.push(groups[groupValue]);
                }
            });
        }
        return mRetArr;
    };
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