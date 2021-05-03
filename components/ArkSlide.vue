<template>
  <div
    class="flex flex-col w-full h-full p-4 rounded-md"
    style="background-color: #7081a3"
  >
    <img class="mb-2 rounded-md" :src="slideImage" alt="placeholder" />
    <div class="flex items-center justify-center flex-1">
      <slot />
    </div>
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