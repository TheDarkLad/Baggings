import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Notifications from 'vue-notification'
import lazyimg from './directives/lazyimg'

Vue.use(VueRouter)
Vue.use(Notifications)
Vue.use(lazyimg)
Vue.prototype.$http = axios

import App from './App.vue'
import Home from './components/BookOverview.vue';
import Edit from './components/BookEditor.vue';
import Scan from './components/BookScanner.vue';

Vue.config.productionTip = false

const id = 0;
const isbn = 0;
const router = new VueRouter({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'add', path: '/add/:isbn?', component: Edit, params: { isbn } },
    { name: 'edit', path: '/edit/:id', component: Edit, params: { id } },
    { name: 'scan', path: '/scan', component: Scan },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
