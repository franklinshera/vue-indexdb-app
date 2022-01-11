<template>
  <section class="layouts-page">
    <h1>Choose Your CV Layout</h1>
    <div class="layouts">
      <div class="lay" @click="setLayout(lay)" v-for="lay in lays" :key="lay">
        {{ lay }}
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "CVLayouts",
  setup(_,{emit}) {
    const lays = ref([1, 2, 3, 4, 5]);

    const store =  useStore();

    return {
      lays,
      setLayout: (layout) => emit('cvLayout',layout),
    };
  },
};
</script>

<style scoped>
section.layouts-page {
  background-color: #845ec2;
  padding: 30px 15%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

h1 {
  text-align: left;
  color: white;
}

.layouts {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.lay {
  cursor: pointer;
  height: 330px;
  min-width: 230px;
  margin: 30px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bolder;
  transition: all 0.3s ease-in-out;
}

.lay:hover {
  height: 370px;
  min-width: 250px;
  font-size: 45px;
  margin: 20px;
}
</style>
