<template>
  <main class="container-fluid py-2 bg-dark app">
    <div class="text-center align-items-center d-flex flex-column justify-content-center vh-100" v-if="loading">
      <img src="./assets/undraw_birthday_cake.svg" class="img-fluid d-block" width="256" />
      <p class="text-white d-block">Loading</p>
    </div>
    <router-view v-else/>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const loading = ref(true);
    onMounted(()=>{
      setTimeout(()=>{
        loading.value = false;
      },1000);
    })
    return {
      loading
    }
  }
};
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
}
</style>
