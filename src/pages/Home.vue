<template>
  <section class="home-page">
    <router-link to="/get-started">Get Started</router-link>
  </section>
</template>

<script>
import { onMounted } from 'vue-demi';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const store = useStore();

    onMounted(() => {

      if(Object.keys(store.getters.getUser).length > 0){
        router.push('/get-started');

      }

    })
  },
};
</script>

<style scoped>
.home-page {
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  background: linear-gradient(90deg, #008f7a ,#008e9b,#0089ba,#0081cf,#2c73d2, #008f7a);
  background-size: 1000%;
  padding: 15px 40px;
  color: white;
  border-radius: 40px;
  filter: drop-shadow(0 0 0.75rem #11111155);
  text-decoration: none;
  animation: smoothgradient 30s linear infinite;
}

@keyframes smoothgradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 1000%;
  }
}
</style>
