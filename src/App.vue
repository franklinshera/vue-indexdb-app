<template>
  <Notification></Notification>
  <NavBar></NavBar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Notification from "./components/Notification.vue";
import { onMounted } from 'vue-demi';
import { db } from "./db";
import { useStore } from 'vuex';

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    Notification,
  },
  setup() {


    const store = useStore();

    onMounted(() => getProfiles())


    async function getProfiles(){
      const users = await db.users.toArray();
      store.dispatch('setProfiles',users);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
