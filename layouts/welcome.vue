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
  mounted() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};
</script>

