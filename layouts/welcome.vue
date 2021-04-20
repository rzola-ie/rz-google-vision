<template>
  <div class="h-screen overflow-x-hidden bg-ie-gray-500">
    <ark-header />
    <Nuxt />
  </div>
</template>

<style scoped>
html {
  height: -webkit-fill-available;
}

body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}
</style>

<script>
import ArkHeader from "../components/ArkHeader.vue";
export default {
  components: { ArkHeader },
};
</script>

