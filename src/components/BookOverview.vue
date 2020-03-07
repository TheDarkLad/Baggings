<template>
  <div>
    <v-select
      filled
      :items="filterStatuses"
      v-model="filterStatus"
      item-text="text"
      item-value="value"
      label="Standard"
    ></v-select>

    <v-text-field filled label="Zoeken" v-model="searchText"></v-text-field>

    <v-container>
      <v-row v-for="author in filteredBooks" :key="author.author">
        <h3 style="width:100%" v-html="author[0].author"></h3>
        <v-row>
          <v-card 
            :title="book.title"
            v-for="book in orderedBooks(author)"
            :key="book.key"
            class="ma-3"
          >
            <v-badge
              v-if="book.status === 1"
              bordered
              color="green darken-3"
              icon="mdi-check"
              overlap
            ></v-badge>
            <v-badge
              v-if="book.status === 2"
              bordered
              color="light-blue darken-3"
              icon="mdi-progress-clock"
              overlap
            ></v-badge>
            <div class="content">
              <v-img :src="book.image" class="white--text align-end"></v-img>
              <div class="grow">
                <v-card-title v-html="book.title"></v-card-title>
                <v-card-subtitle v-if="book.subtitle" v-html="book.subtitle"></v-card-subtitle>
                <v-card-subtitle v-if="book.series" v-html="book.series"></v-card-subtitle>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon :to="'/edit/' + book.key" class="left">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import shared from "./../shared";

export default {
  name: "books",
  mixins: [shared],
  props: [],
  data() {
    return {
      books: [],
      searchText: undefined,
      filterStatuses: [
        { text: "Alle boeken", value: -1 },
        { text: "Nog te lezen", value: 0 },
        { text: "Gelezen", value: 1 },
        { text: "Mee Bezig", value: 2 }
      ],
      filterStatus: -1
    };
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