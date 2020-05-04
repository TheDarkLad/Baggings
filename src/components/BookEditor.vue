<template>
    <div>
        <books-menu></books-menu>
        <form>
            <fieldset>
                <div>
                    <input
                        type="text"
                        v-model="currentBook.title"
                        class="form-control"
                        id="Title"
                        placeholder="Title"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        v-model="currentBook.subtitle"
                        class="form-control"
                        id="Subtitle"
                        placeholder="Subtitle"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        v-model="currentBook.series"
                        class="form-control"
                        id="Series"
                        placeholder="Series"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        v-model="currentBook.author"
                        class="form-control AuthorAutoComplete"
                        id="Author"
                        placeholder="Author"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        v-model="currentBook.number"
                        class="form-control"
                        id="Number"
                        placeholder="Number"
                    />
                </div>

                <div>
                    <textarea
                        class="form-control"
                        id="exampleTextarea"
                        rows="2"
                        v-model="currentBook.comment"
                        placeholder="Comment"
                    ></textarea>
                </div>
                <div class="form-check mr-sm-2">
                    <select v-model="currentBook.status" class="form-control">
                        <option
                            v-for="status in filterStatuses"
                            :key="status.id"
                            :value="status.id"
                            v-html="status.text"
                        ></option>
                    </select>
                </div>
                <div class="form-check mr-sm-2">
                    <select v-model="currentBook.type" class="form-control">
                        <option
                            v-for="type in bookTypes"
                            :key="type.id"
                            :value="type.id"
                            v-html="type.text"
                        ></option>
                    </select>
                </div>
                  <div>
                    <button value="Add" @click="save($event, 0)">
                        <span class="fa fa-save"></span>
                    </button>
                    <button
                        value="Delete"
                        class="delete"
                        @click="remove($event, currentBook.key)"
                        v-if="currentBook.key"
                    >
                        <span class="fa fa-times"></span>
                    </button>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label class="custom-file">
                        <input
                            type="file"
                            name="fileToUpload"
                            id="fileToUpload"
                            class="custom-file-input"
                        />
                    </label>

                    <img v-if="currentBook.image" :src="currentBook.image" alt="currentBook.image" />
                </div>
            </fieldset>
        </form>
        <br />
        <div class="form-group">
            <input
                type="text"
                v-model="searchText"
                class="form-control"
                id="Title"
                placeholder="Search"
            />
        </div>

        <ul v-if="books && books.length">
            <li v-for="book in filteredBooks" :key="book.key">
                <router-link :to="'/edit/' + book.key">{{ book.title }} - {{ book.author }}</router-link>
            </li>
        </ul>
        <router-link :to="'/add/'" class="button add">
            <i class="fa fa-plus"></i>
        </router-link>
    </div>
</template>
<script>
import shared from "./../shared";
import booksMenu from "./BooksMenu.vue";

export default {
    components: {
        booksMenu
    },
    mixins: [shared],
    data() {
        return {
            books: [],
            currentBook: {},
            searchText: undefined,
            filterStatuses: [
                { text: "Nog te lezen", id: 0 },
                { text: "Gelezen", id: 1 },
                { text: "Mee Bezig", id: 2 }
            ],
            bookTypes: [
                { text: "Boek", id: 1 },
                { text: "Comic", id: 2 },
                { text: "Reference", id: 3 },
                { text: "Audiobook", id: 4 }
            ]
        };
    },
    watch: {
        $route(to) {
            this.setCurrentBook(to.params.id);
        }
    },
    computed: {
        booksByAuthor() {
            let booksByAuthor = this.books;
            if (booksByAuthor) {
                booksByAuthor = booksByAuthor.sort((a, b) =>
                    a.author > b.author ? 1 : -1
                );
                booksByAuthor = this.groupBy(booksByAuthor, "author");
            }
            return booksByAuthor;
        },
        filteredBooks() {
            let filteredBooks = this.books;
            // filter text
            if (this.searchText) {
                filteredBooks = filteredBooks.filter(x => {
                    var filterstrings = [this.searchText];
                    console.log(x);
                    var regex = new RegExp(filterstrings.join("|"), "i");
                    return (
                        (x.title && regex.test(x.title)) ||
                        (x.author && regex.test(x.author)) ||
                        (x.series && regex.test(x.series)) ||
                        (x.subtitle && regex.test(x.subtitle))
                    );
                });
            }

            filteredBooks = filteredBooks.sort((a, b) =>
                a.author > b.author ? 1 : -1
            );

            return filteredBooks;
        }
    },
    methods: {
        async init() {
            fetch(`${this.bookUrl}?v=` + Date.now().valueOf())
                .then(r => r.json())
                .then(json => {
                    this.books = json;
                    this.setCurrentBook(this.$route.params.id);
                });
        },
        setCurrentBook(id) {
            if (id) {
                let book = this.books.find(b => b.key == id);
                if (!book) this.$router.push({ path: `/add` });
                else this.currentBook = book;
            } else {
                this.currentBook = {};
            }
        },
        groupBy(arr, prop) {
            if (arr) {
                const map = new Map(Array.from(arr, obj => [obj[prop], []]));
                arr.forEach(obj => map.get(obj[prop]).push(obj));
                return Array.from(map.values());
            }
            return arr;
        },
        async save(e) {
            e.preventDefault();            
            let imageUploadElement = document.getElementById("fileToUpload");
            if (imageUploadElement && imageUploadElement.files.length > 0) {
                if(this.currentBook.image ){
                    await this.removeImage(this.currentBook.image);
                }
                let filename = await this.uploadImage(imageUploadElement.files[0]);
                this.currentBook.image = `uploads/${filename}`;
            }

            // new book
            if (!this.currentBook.key && this.currentBook.title) {
                var keys = this.books.map(o => o.key);
                var newKey = Math.max.apply(this, keys);
                this.currentBook.key = newKey + 1;
                this.books.push(this.currentBook);
            }

            await this.saveJsonBook(JSON.stringify(this.books));

            document.getElementById('fileToUpload').value='';

            // reroute
            if (this.$route.name === "add") {
                this.$router.push({ path: `/edit/${this.currentBook.key}` });
            }
        },
        async remove(e, key) {
            e.preventDefault();
            var removeIndex = this.books.findIndex(b => b.key === key);
            let book = this.books[removeIndex];

            if (removeIndex > -1) {
                if(book){
                    await this.removeImage(book.image);
                }

                this.books.splice(removeIndex, 1);
                console.log(this.books);
                await this.saveJsonBook(JSON.stringify(this.books));
                this.$notify({
                    group: "foo",
                    title: "Remove",
                    text: `${book.title} was removed`
                });
                this.$router.push({ path: `/add` });
            }
        },
        async uploadImage(file) {
            var fd = new FormData();
            fd.append("fileToUpload", file);
            await this.$http.post(this.uploadUrl, fd).then(() => {
                this.$notify({
                    group: "foo",
                    title: "Upload",
                    text: "file was uploaded"
                });
            });
            console.log(file.name);
            return file.name;
        },
        async removeImage(fileName) {
            var fd = new FormData();
            fd.append("fileToRemove", fileName);

            await this.$http.post(this.removeUrl, fd).then(() => {
                this.$notify({
                    group: "foo",
                    title: "Remove",
                    text: `${fileName} was removed`
                });
            });
        },
        async saveJsonBook(jsonBooks) {
            var fd = new FormData();
            fd.append("target", "books.json");
            fd.append("json", jsonBooks);

            await this.$http.post(this.saveUrl, fd).then(() => {
                this.$notify({
                    group: "foo",
                    title: "Save",
                    text: "Books where saved"
                });
            });
        }
    },
    async mounted() {
        await this.init();
    }
};
</script>
