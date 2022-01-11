<template>
  <section class="navbar">
    <span>CV-PAP</span>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/dexie">Dexie</router-link>
      <router-link to="/get-started" class="make-cv">Get Started</router-link>

      <div class="using" v-show="isAuth">
        <span class="username">{{ user.name }}</span>
        <span class="close" @click="logout">&times;</span>
      </div>
    </nav>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: "NavBar",
  setup() {

    const store = useStore();

    const router = useRouter();


    let user = computed(() => store.getters.getUser);
    
    
    let isAuth = computed(() => Object.keys(user.value).length > 0)


    function logout() {
      if (localStorage.getItem("fullUser")) {

      
        localStorage.removeItem("fullUser");

        store.dispatch("resetUser");

        store.dispatch("setNotification", "You Have Been Logged Out!");

      }
    }
    return {
      logout,
      isAuth,
      user
    };
  },
};
</script>

<style scoped>
section.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 15%;
  background-image: linear-gradient(45deg, #008f7a, #008e9b);
  color: white;
}

nav {
  display: flex;
  align-items: center;
}

.using {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.using .close {
  margin-left: 20px;
  font-size: 24px;
  cursor: pointer;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a.router-link-active.router-link-exact-active::before {
  content: "*";
  font-size: 20px;
  position: relative;
  bottom: -25%;
  left: -2px;
}

nav a:not(:last-child) {
  margin-right: 20px;
}

.make-cv {
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 20px;
  color: #008e9b;
  filter: drop-shadow(0 0 0.75rem #11111133);
}
</style>
