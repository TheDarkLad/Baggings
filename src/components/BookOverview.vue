<template>
  <div>
    <div class="form-group">
      <input type="text" v-model="searchText" class="form-control" id="Title" placeholder="Zoeken" />
    </div>
    <div class="form-group">
      <select v-model="filterStatus" class="form-control">
        <option
          v-for="status in filterStatuses"
          :key="status.id"
          :value="status.id"
          v-html="getCount(status)"
        ></option>
      </select>
    </div>

    <div class="author" v-for="author in filteredBooks" :key="author.author">
      <h3 v-html="author[0].author"></h3>
      <div class="books">
        <book v-for="book in orderedBooks(author)" :key="book.key" :book="book"></book>
      </div>
    </div>
    <a class="button add" @click="up()">
      <i class="fa fa-angle-up"></i>
    </a>
  </div>
</template>
<script>
import shared from "./../shared";
import book from "./Book";

export default {
  name: "books",
  mixins: [shared],
  props: [],
  data() {
    return {
      books: [],
      searchText: undefined,
      filterStatuses: [
        { text: "Alle boeken", id: -1 },
        { text: "Nog te lezen", id: 0 },
        { text: "Gelezen", id: 1 },
        { text: "Mee Bezig", id: 2 },
      ],
      filterStatus: -1,
    };
  },
  components: {
    book,
  },
  methods: {
    up() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    getCount(status) {
      if (!this.books || status.id < 0) return status.text;

      let count = this.books.filter((r) => r.status === status.id).length;
      if (status.id === 0) {
        count += this.books.filter((r) => r.status === 2).length;
      }

      return `${status.text} (${count})`;
    },
    groupBy(arr, prop) {
      const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
      arr.forEach((obj) => map.get(obj[prop]).push(obj));
      return Array.from(map.values());
    },
    orderedBooks(books) {
      if (books) {
        books = books.sort((a, b) => (a.series > b.series ? 1 : -1));
        books = books.sort((a, b) => (a.number > b.number ? 1 : -1));
      }
      return books;
    },
    loadData() {
      fetch(`${this.bookUrl}?v=` + Date.now().valueOf())
        .then((r) => r.json())
        .then((json) => {
          this.books = json;
        });
    },
  },
  computed: {
    filteredBooks() {
      let filteredBooks = this.books;
      if (filteredBooks) {
        // filter text
        if (this.searchText) {
          filteredBooks = filteredBooks.filter((x) => {
            var filterstrings = [this.searchText];
            var regex = new RegExp(filterstrings.join("|"), "i");
            return (
              (x.title && regex.test(x.title)) ||
              (x.author && regex.test(x.author)) ||
              (x.series && regex.test(x.series)) ||
              (x.subtitle && regex.test(x.subtitle))
            );
          });
        }

        // filter staus
        if (this.filterStatus > -1) {
          if (this.filterStatus === 0) {
            filteredBooks = filteredBooks.filter((x) => {
              return x.status === this.filterStatus || x.status === 2;
            });
          } else {
            filteredBooks = filteredBooks.filter((x) => {
              return x.status === this.filterStatus;
            });
          }
        }
        // sort
        filteredBooks = filteredBooks.sort((a, b) => {
          if (a.author > b.author) return 1;
          else if (a.author > b.author) return -1;
          else {
             if (a.series > b.series) return 1;
            else if (a.series > b.series) return -1;
          }
        });

        // group by author
        filteredBooks = this.groupBy(filteredBooks, "author");
      }
      return filteredBooks;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>