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
          v-html="status.text"
        ></option>
      </select>
    </div>

    <div class="author" v-for="author in filteredBooks" :key="author.author">
      <h3 v-html="author[0].author"></h3>
      <div class="books">
        <book v-for="book in orderedBooks(author)" :key="book.key" :book="book"></book>
      </div>
    </div>
    <router-link :to="'/add/'" class="button add">
      <i class="fa fa-plus"></i>
    </router-link>
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
        { text: "Mee Bezig", id: 2 }
      ],
      filterStatus: -1
    };
  },
  components: {
    book
  },
  methods: {
    groupBy(arr, prop) {
      const map = new Map(Array.from(arr, obj => [obj[prop], []]));
      arr.forEach(obj => map.get(obj[prop]).push(obj));
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
        .then(r => r.json())
        .then(json => {
          this.books = json;
        });
    }
  },
  computed: {
    filteredBooks() {
      let filteredBooks = this.books;
      if (filteredBooks) {
        // filter text
        if (this.searchText) {
          filteredBooks = filteredBooks.filter(x => {
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
          filteredBooks = filteredBooks.filter(x => {
            return x.status === this.filterStatus;
          });
        }
        // sort
        filteredBooks = filteredBooks.sort((a, b) =>
          a.author > b.author ? 1 : -1
        );

        // group by author
        filteredBooks = this.groupBy(filteredBooks, "author");
      }
      return filteredBooks;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>