<template>
  <div class="flex flex-col h-screen overflow-hidden bg-ie-gray-500">
    <ark-header />
    <Nuxt />
  </div>
</template>

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

<style scoped>
html {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}

body {
  min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  min-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}
</style>