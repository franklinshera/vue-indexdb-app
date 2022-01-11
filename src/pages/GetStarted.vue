<template>
  <section class="get-started-page">
    <section class="workspace" v-show="showUsername">
      <h3>Choose Your Workspace!</h3>
      <div class="profiles">
        <h4>Available Profiles ({{ profiles.length }})</h4>

        <form action="" @submit.prevent="useProfile">
          <select name="profile" id="profileSelect" v-model="choosenProfile">
            <option value="" selected disabled>Choose Profile</option>
            <option
              :value="profile"
              v-for="profile in profiles"
              :key="profile.id"
            >
              {{ profile.name }}
            </option>
          </select>
          <button type="submit" v-show="profileSelected">
            Continues as {{ choosenProfile.name }}
          </button>
        </form>
      </div>
      <form action="" @submit.prevent="setUsername">
        <div class="input-group">
          <label for="">Username</label>
          <input
            type="text"
            placeholder="enter your username..."
            v-model="user"
          />
        </div>
        <button>Create My Workspace</button>
      </form>
    </section>
    <CVLayouts v-show="showLayout" @cvLayout="setLayout"></CVLayouts>
  </section>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import CVLayouts from "../components/CVLayouts.vue";
import { db } from "../db";
import { useRouter } from "vue-router";
export default {
  name: "GetStarted",
  components: { CVLayouts },
  setup() {
    const store = useStore();

    const router = useRouter();

    const choosenProfile = ref({});
    const user = ref("");
    const username = ref("");
    const layout = ref(0);

    let fullUser = computed(() => store.getters.getUser);
    let profiles = computed(() => store.getters.getProfiles);

    let profileSelected = computed(
      () => Object.keys(choosenProfile.value).length > 0
    );

    let showUsername = computed(() => {
      if (Object.keys(fullUser.value).length == 0 && username.value == "") {
        return true;
      }

      return store.getters.getUser.name == "";
    });

    let showLayout = computed(() => {
      if (Object.keys(fullUser.value).length == 0 && !showUsername.value) {
        return true;
      }

      return fullUser.value.layout == 0;
    });

    function setUsername() {
      if (user.value === "") {
        store.dispatch("setNotification", "Username Cannot be null!");
        return;
      }
      username.value = user.value;
    }

    async function setLayout(lay) {
      layout.value = lay;

      if (layout.value != 0 && username.value != "") {
        const foundUser = await db.users.get({
          name: username.value,
          layout: layout.value,
        });

        storeUser(foundUser);
      }
    }

    async function storeUser(res) {
      if (typeof res === "undefined") {
        const id = await db.users.add({
          name: username.value,
          layout: layout.value,
        });

        localStorage.setItem(
          "fullUser",
          JSON.stringify({ name: username.value, layout: layout.value })
        );

        store.dispatch("setUser", { name: username.value, layout: layout.value });

        return;
      }
      if (localStorage.getItem("fullUser")) {
        localStorage.removeItem("fullUser");
      }

      localStorage.setItem(
        "fullUser",
        JSON.stringify({ name: res.name, layout: res.layout })
      );
      store.dispatch("setUser", { name: res.name, layout: res.layout });
    }

    async function checkIfStored() {
      if (layout.value != 0 && !showUsername.value) {
        const foundUser = await db.users.get({
          name: username.value,
          layout: layout.value,
        });

        storeUser(foundUser);
      }
    }

    function useProfile() {
      if (!profileSelected.value) {
        store.dispatch("setNotification", "Choose Profile First!");

        return;
      }

      storeUser(choosenProfile.value);

      choosenProfile.value = {};
    }

    watch(
      showLayout,
      () =>
        showUsername.value &&
        store.dispatch("setNotification", store.getters.getUser)
    );

    watch([showLayout, showUsername], checkIfStored);

    return {
      showLayout,
      showUsername,
      user,
      setUsername,
      setLayout,
      profiles,
      profileSelected,
      choosenProfile,
      useProfile,
    };
  },
};
</script>

<style scoped>
.workspace {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
}

.workspace form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.workspace form .input-group {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 0;
  width: 50%;
  gap: 0;
}

.workspace form .input-group input {
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  text-align: center;
}

.workspace form button {
  cursor: pointer;
  border: none;
  padding: 15px 35px;
  background-image: linear-gradient(45deg, #008f7a, #008e9b);
  color: white;
  filter: drop-shadow(0 0 0.75rem #11111133);
}

.workspace form button:hover {
  background-image: linear-gradient(45deg, #008f7a, #008f7a);
  border-radius: 5px;
}

.profiles {
  margin: 20px 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profiles h4 {
  text-align: center;
  font-weight: normal;
}
.profiles form select {
  width: 100%;
  padding: 7px 10px;
  text-align: center;
  color: white;
  border-radius: 3px;
  border: none;
  font-size: 17px;
  background-image: linear-gradient(45deg, #008f7a, #008f7a);
  margin-bottom: 20px;
}
</style>
