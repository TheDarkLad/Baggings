export default {
    computed: {
        rootPath() {
            let root = window.location.origin;
            if (window.location.pathname && window.location.pathname !== "/") {
                root += window.location.pathname;
            }
            return root;
        },
        bookUrl() {
            return this.rootPath + "/books.json";
        },
        saveUrl() {
            return this.rootPath + "/save.php";
        },
        removeUrl() {
            return this.rootPath + "/remove.php";
        },
        uploadUrl() {
            return this.rootPath + "/upload.php";
        }
    }
}