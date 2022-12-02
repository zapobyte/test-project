<template>
  <main class="container-fluid py-2 bg-dark app">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
}
</style>
