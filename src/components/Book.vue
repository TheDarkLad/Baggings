<template>
  <div class="book">
    <router-link :to="'/edit/' + book.key">
      <div class="header">
        <figure v-bind:class="getClassByType(book.type)"
        v-lazyimg>          
          <img :alt="book.title"
              :data-url="book.image"
              decoding="async"
              loading="lazy"
              class="cover img-center" />
        </figure>
      </div>
      <div class="content">
        <p v-if="book.title" class="card-title" v-html="book.title"></p>
        <p v-if="book.subtitle" class="subtitle" v-html="book.subtitle"></p>
        <p v-if="book.series" class="series" v-html="book.series"></p>
      </div>
      <div class="banner">
        <svg height="100" width="100" v-if="book.status === 1">
          <polygon points="0,0 50,0 100,50 100,100" class="finished" />
          <text x="39" y="-12" fill="WHITE" transform="rotate(45)">GELEZEN</text>
        </svg>
        <svg height="100" width="100" v-if="book.status === 2">
          <polygon points="0,0 50,0 100,50 100,100" class="reading" />
          <text x="35" y="-12" fill="WHITE" transform="rotate(45)">MEE BEZIG</text>
        </svg>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["book"],
  methods: {
    getClassByType(type) {
      switch (type) {
        default:
        case 1:
          return "book";
        case 2:
          return "comic";
        case 3:
          return "reference";
        case 4:
          return "audio";
      }
    }
  }
};
</script>