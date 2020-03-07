<template>
  <div>
    <form style="display:flex; flex-direction:row">
      <div style="width:50%">
        <v-text-field filled label="Title" v-model="currentBook.title"></v-text-field>
        <v-text-field filled label="Subtitle" v-model="currentBook.subtitle"></v-text-field>
        <v-text-field filled label="Series" v-model="currentBook.series"></v-text-field>
        <!-- <v-text-field label="Zoeken" v-model="currentBook.author"></v-text-field> -->
        <v-text-field filled label="Number" v-model="currentBook.number"></v-text-field>
        <v-textarea filled name="input-7-1" v-model="currentBook.comment" label="Comment"></v-textarea>
        <v-select
          filled
          :items="filterStatuses"
          v-model="currentBook.status"
          item-text="text"
          item-value="value"
          label="Status"
        ></v-select>
        <v-file-input label="Image" filled name="fileToUpload" id="fileToUpload"></v-file-input>

        <v-btn @click="save($event, 0)" style="margin-right:10px">Save</v-btn>
        <v-btn class="delete" @click="remove($event, currentBook.key)" v-if="currentBook.key">Delete</v-btn>
      </div>
      <div style="width:50%;">
        <v-img
          height="300"
          width="200px"
          style="margin-left: 20px;"
          v-if="currentBook.image"
          :src="currentBook.image"
          :alt="currentBook.image"
        />
      </div>
    </form>
    <br />
    <div class="form-group">
      <input type="text" v-model="searchText" class="form-control" id="Title" placeholder="Search" />
    </div>

    <v-card class="mx-auto" tile v-if="books && books.length">
      <v-list-item v-for="book in filteredBooks" :key="book.key">
        <v-list-item-content>
          <router-link :to="'/edit/' + book.key">
            <v-list-item-title>{{ book.title }} - {{ book.author }}</v-list-item-title>
            </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
import shared from "./../shared";

export default {
  mixins: [shared],
  data() {
    return {
      books: [],
      currentBook: {},
      searchText: undefined,
      filterStatuses: [
        { text: "", id: -1 },
        { text: "Nog te lezen", id: 0 },
        { text: "Gelezen", id: 1 },
        { text: "Mee Bezig", id: 2 }
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
        if (this.currentBook.image) {
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

      document.getElementById("fileToUpload").value = "";

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
        if (book) {
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
