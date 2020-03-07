<template>
  <v-app>
    <books-menu></books-menu>
    <article class="container">
      <transition>
        <router-view></router-view>
      </transition>
      <notifications group="foo" />
    </article>
  </v-app>
</template>

<script>
import booksMenu from "./components/BooksMenu";
export default {
  name: "app",
  components: {
    booksMenu
  },
};
</script>