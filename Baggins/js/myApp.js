/// <reference path="Book.ts" />

var bookApp = angular.module('BookApp', []);

function onInitFs(fs) {
    var booksString = JSON.stringify(books);
    fs.root.getFile('books.json', { create: true }, function (fileEntry) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function (e) {
                console.log('Write completed.');
            };

            fileWriter.onerror = function (e) {
                console.log('Write failed: ' + e.toString());
            };

            // Create a new Blob and write it to log.txt.
            var blob = new Blob(Baggins.books, { type: 'text/plain' });

            fileWriter.write(blob);

        }, errorHandler);

    }, errorHandler);

}

function errorHandler(e) {
    alert(e);
}

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
                return book.Read == false && book.Reading == false;
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

bookApp.controller('BookController', ['$scope', function ($scope) {
    Baggins.Book.Load();
    $scope.all = true;
    var json = Baggins.books;

    //Order by Author
    function sortByKey(array, key, key2, key3) {
        return array.sort(function (a, b) {
            var x = a[key] + a[key2] + a[key3]; var y = b[key] + b[key2] + b[key3];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    function CreateAuthorList()
    {
        var _bigList = [];
        var currentAuthor;
        var currentList = [];

        currentAuthor = json[0].Author;
        for (var i = 0; i < json.length; i++) {
            if (currentAuthor == json[i].Author) {
                currentList.push(json[i]);
                currentAuthor = json[i].Author;
            }
            else {
                _bigList.push(currentList);
                currentList = [];

                currentList.push(json[i]);
                currentAuthor = json[i].Author;
            }
        }
        _bigList.push(currentList);

        return _bigList;
    }

    var json = sortByKey(json, "Author", "Series", "Number");
    var bigList = CreateAuthorList();

    $scope.AuthorBook = bigList;

    $scope.Books = json;
    $scope.ReadBooks = ReadBooks(json);
    $scope.UnReadBooks = UnReadBooks(json);
    $scope.Reading = ReadingBooks(json);

    function ReadingBooks(json) {
        var readbooks = [];
        for (var i = 0; i < json.length; i++) {
            if (json[i].Reading == true) {
                readbooks.push(json[i]);
            }
        }
        return readbooks;
    }
    function UnReadBooks(json) {
        var readbooks = [];
        for (var i = 0; i < json.length; i++) {
            if (json[i].Read == false) {
                readbooks.push(json[i]);
            }
        }
        return readbooks;
    }
    function ReadBooks(json) {
        var readbooks = [];
        for (var i = 0; i < json.length; i++) {
            if (json[i].Read == true) {
                readbooks.push(json[i]);
            }
        }
        return readbooks;
    }

    function CreatePropertyList(property)
    {
        var AuthorList = [];
        for (var i = 0; i < json.length; i++) {
            if (AuthorList.indexOf(json[i][property]) < 0) {
                AuthorList.push(json[i][property]);
            }
        }
        return AuthorList;
    }

    $scope.toggleFilter = function($elem) {
        $scope.readBooks = false;
        $scope.unreadBooks = false;
        $scope.readingBooks = false;
        $scope.all = false;
        if ($elem != undefined) {
            $scope[$elem] = true;
        }
    }
    $scope.isActive = function(property) {
        if (property != undefined) {
            return this[property] == true;
        }
        else
            return false;
    }
    $scope.Authors = CreatePropertyList("Author");

}]);
bookApp.controller('GetBookController', ['$scope', function ($scope) {
	
    Baggins.Book.Load();
    var json = Baggins.books;
	
	
	function getBook() {
		var myParam = location.search.split('bookid=')[1]
		return myParam;
	}
	var bookid = getBook();
	var bookid = getBook();
	$scope.HasID = (bookid != undefined);
	$scope.AllBooks = json;
}]);
bookApp.controller('EditController', ['$scope', function ($scope) {
	function getBook() {
		var myParam = location.search.split('bookid=')[1]
		return myParam;
	}
	var bookid = getBook();
		
    Baggins.Book.Load();
    var b = Baggins.books;
	
	if(bookid != undefined){
		var json = b.filter(function( obj ) {
		  return obj.Key == bookid;
		});
    }
	else
		var json = b;
	
	//Order by Author
    function sortByKey(array, key, key2, key3) {
        return array.sort(function (a, b) {
            var x = a[key] + a[key2] + a[key3]; var y = b[key] + b[key2] + b[key3];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    var json = sortByKey(json, "Author", "Series", "Number");

    $scope.Save = function (e, key) {
		var list = Baggins.books;
        var item = {};
        var element = document.getElementById("Title_" + key);
        item["Title"] = (element != null) ? element.value : "";
        element = document.getElementById("Subtitle_" + key);
        item["Subtitle"] = (element != null) ? element.value : "";
        element = document.getElementById("Series_" + key);
        item["Series"] = (element != null) ? element.value : "";
        element = document.getElementById("Author_" + key);
        item["Author"] = (element != null) ? element.value : "";
        element = document.getElementById("Number_" + key);
        item["Number"] = (element != null) ? element.value : "";
        element = document.getElementById("Image_" + key);
        item["Image"] = (element != null) ? "uploads/" + element.value.split("\\")[element.value.split("\\").length - 1] : "";
        element = document.getElementById("Read_" + key);
        item["Read"] = (element != null) ? element.checked : "";
		element = document.getElementById("Listened_" + key);
        item["Listened"] = (element != null) ? element.checked : "";     
		element = document.getElementById("Reading_" + key);
        item["Reading"] = (element != null) ? element.checked : "";     

        if (key == 0) {
            var newKey = 0;
            for (var i = 0; i < Baggins.books.length; i++) {
                if (list[i].Key > newKey) {
                    newKey = list[i].Key;
                }
            }

            newKey = newKey + 1;
            item["Key"] = newKey;
			var imageURL = item["Image"];
            item["$$hashKey"] = "object:" + newKey;
            list.push(item);
        } else {
            for (var i = 0; i < Baggins.books.length; i++) {
                if (list[i].Key == key) {
                    list[i].Title = item.Title;
                    list[i].Subtitle = item.Subtitle;
                    list[i].Series = item.Series;
                    list[i].Author = item.Author;
                    list[i].Number = item.Number;
					if(item.Image != "uploads/"){
						list[i].Image = item.Image;
					}
                    list[i].Read = item.Read;
                    list[i].Listened = item.Listened;
					list[i].Reading = item.Reading;
                }
            }
        }
       
        Baggins.Book.Save(list);

		
        if (key == 0)
            location.reload();
    };
	
	$scope.Remove = function (e, key) {
	    var list = Baggins.books;
        
		var imagePath = "";
	    for (var i = 0; i < list.length; i++)
	    {
	        if (list[i].Key == key) {
	            var removeIndex = i;
				imagePath = list[i].Image;
	        }
	    }		
		list.splice(removeIndex, 1);
	    Baggins.Book.Save(list);
		
		if (key > 0)
			location.reload();// = location.href.split('?bookid=')[0];
    };
	
	function CreatePropertyList(property)
	{
        var AuthorList = [];
        for (var i = 0; i < json.length; i++) {
            if (AuthorList.indexOf(json[i][property]) < 0) {
                AuthorList.push(json[i][property]);
            }
        }
        return AuthorList;
    }

	$scope.HasID = (bookid != undefined);
    $scope.Books = json;

    $("#Author_0").autocomplete({
        source: CreatePropertyList("Author")
    });

    $("#Series_0").autocomplete({
        source:  CreatePropertyList("Series")
    });


}]);