<template>
  <div
    :style="`
      ${
        isVisible
          ? 'height: calc(100% - 1rem); box-shadow: 0px -4px 10px rgb(0 0 0 / 20%);'
          : 'height: 0; box-shadow: none;'
      }`"
    :class="`absolute h-full w-full mt-4 bg-white shadow-lg rounded-t-lg ${
      isVisible ? 'top-0' : 'top-full'
    } transition-all duration-500 ease-in-out flex flex-col`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: ["isVisible"],
};
</script>

<style lang="scss" scoped>
</style>