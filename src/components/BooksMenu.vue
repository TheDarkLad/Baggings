<template>
  <menu>
    <router-link v-if="$route.path !== '/'" to="/">Home</router-link>
    <router-link :to="'/add/'">Add</router-link>
  </menu>
</template>
<script>
export default { };
</script>
<style scoped>
menu {
  margin: -10px 0 30px 0;
  padding: 0;
}

menu a {
  margin: 0 10px 0 0;
}
</style>