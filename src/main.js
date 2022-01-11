import { createApp } from 'vue'
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'

import { createStore } from 'vuex';


 import routes from './routes';
import mystore from './store';



const router = createRouter({
  history: createWebHistory(),
  routes
})


const store = createStore(mystore)


const app = createApp(App);

app.use(router)
app.use(store)

app.mount('#app')
