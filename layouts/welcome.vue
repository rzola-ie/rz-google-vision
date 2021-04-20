<template>
  <div class="h-screen overflow-x-hidden bg-ie-gray-500">
    <ark-header />
    <Nuxt />
  </div>
</template>

<style scoped>
html {
  min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  min-height: calc(var(--vh, 1vh) * 100);
}

body {
  min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  min-height: calc(var(--vh, 1vh) * 100);
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

