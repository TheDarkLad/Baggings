<template>
    <article class="container">
        <books-menu></books-menu>
        <transition>
            <router-view></router-view>
        </transition>
        <notifications group="foo" />
    </article>
</template>

<script>

import booksMenu from "./components/BooksMenu.vue";
export default {
    name: "app",
    components:{
        booksMenu
    }
};
</script>