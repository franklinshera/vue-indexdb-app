<template>
  <section class="notification" v-show="message">
    <div class="alert">
      <p>{{ message }}</p>
      <span @click="clearNotification">&times;</span>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "Notification",

  setup() {
    const store = useStore();

    function clearNotification() {
      store.dispatch("clearNotification");
    }


    onMounted(() => setTimeout(clearNotification, 3500))


    let message = computed(() => store.getters.getNotification);

    watch(message, (newValue) => {

      if (newValue != "") {
        setTimeout(clearNotification, 3500);
      }
    });

    return {
      message,
      clearNotification,
    };
  },
};
</script>

<style scoped>
section.notification {
  position: fixed;
  z-index: 10000;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px;
}

.alert {
  padding: 15px 40px;
  min-width: 20%;
  background-color: #ffffffcc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  filter: drop-shadow(0 0 0.75rem #11111133);
}

.alert span {
  color: red;
  font-size: 30px;
  cursor: pointer;
}
</style>
