<template>
  <!-- <router-link to="/">Home</router-link> -->
  <v-app-bar>
    <v-toolbar-title>Baggins</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon v-if="$route.name != 'add'" to="/add" class="left">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn icon v-else to="/" class="left">
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    
    <v-switch v-model="$vuetify.theme.dark" hide-details inset label="Theme Dark"></v-switch>
    
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  watch:{
    '$vuetify.theme.dark'(newValue){
      // save to localstorage
      localStorage.setItem('darkmode', newValue);
    }
  },
  created(){
      // get from localstorage
      let darkmode = localStorage.getItem('darkmode');
      if(!darkmode)
        darkmode = false;

      this.$vuetify.theme.dark = (darkmode === "true");
  },
};
</script>