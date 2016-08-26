import {Http, HTTP_PROVIDERS, Headers, RequestOptions} from '@angular/http';

import {Config} from './Config';
import {Book} from './Book';

export class BookLoader {
    http: Http;

    constructor(http: Http, loadbooks: boolean) {
        this.http = http;
        if (loadbooks)
            this.LoadBooks();
    }

    private LoadBooks() {
        let headers = new Headers();
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.

        this.http.get(Config.JSONPATH, headers)
            .map(res => res.json())
            .subscribe(
            data => this.HandleResponse(data),
            err => console.log(err) 
            );
    }

    SaveBook(books: Book[]) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        var postData = "json=" + JSON.stringify(books);
        this.http.post(Config.SaveFileEndpoint, postData, {
            headers: headers
        }).subscribe(res => {
            console.log('post result %o', res);
        });
    }

    UploadImage(file) {
        var url = Config.UploadFileEndpoint;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Every thing ok, file uploaded
                console.log(xhr.responseText); // handle response.
            }
        };
        fd.append("fileToUpload", file);
        xhr.send(fd);
    }

    RemoveImage(file) {
        var url = Config.RemoveFileEndpoint;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Every thing ok, file uploaded
                console.log(xhr.responseText); // handle response.
            }
        };
        fd.append("fileToRemove", file);
        xhr.send(fd);
    }
     
    //This can be overwitten.
    HandleResponse(data) {
     
    }    
}