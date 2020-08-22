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

</style>