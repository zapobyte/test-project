<template>
  <section class="container home-view">
    <div class="row">
      <div class="col">
        <birthday-form></birthday-form>
      </div>
    </div>
  </section>
</template>

<script>
import BirthdayForm from "../components/BirthdayForm.vue";
export default {
  name: "HomeView",
  components: {
    BirthdayForm,
  },
};
</script>

<style scoped lang="scss"></style>
