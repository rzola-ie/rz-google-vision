<template>
  <div
    class="flex flex-col w-full h-full p-4 rounded-md"
    style="background-color: #7081a3"
  >
    <img
      class="mb-2 rounded-md pointer-events-none"
      :src="slideImage"
      alt="placeholder"
    />

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    slideImage: {
      type: String,
      required: false,
      default: "/img-placeholder.png",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>