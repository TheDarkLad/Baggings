export const statusses = {
    TODO: 0,
    DONE: 1,
    DOING: 2,
    ONHOLD: 3
};

export const shared = {
    computed: {
        rootPath() {
            let root = window.location.origin;
            if (window.location.pathname && window.location.pathname !== "/") {
                root += window.location.pathname;
                root = root.replace("/index.html", "")
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
};