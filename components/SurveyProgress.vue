<template>
  <div class="flex items-center p-4" style="color: #95a2b8">
    <nuxt-link :to="backTo" class="mr-4 text-xs font-bold">BACK</nuxt-link>
    <div class="w-full overflow-hidden rounded-full">
      <progress
        class="block w-full p-0 m-0"
        :value="value"
        max="100"
      ></progress>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backTo: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
progress[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
}

progress[value]::-webkit-progress-bar {
  height: 20px;
  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}

progress[value]::-webkit-progress-value {
  background-color: #95a2b8;
}
</style>