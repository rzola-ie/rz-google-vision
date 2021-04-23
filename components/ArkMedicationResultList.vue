<template>
  <div class="h-full px-4 pb-12 overflow-y-scroll max-w-7xl">
    <medication-result
      v-for="result in searchResults"
      :key="result.name"
      :medication="result"
      @add-med="$emit('add-med')"
    />
  </div>
</template>

<script>
export default {
  props: ["searchResults"],
  mounted() {
    console.log(this.searchResults);
  },
};
</script>

<style lang="scss" scoped>
</style>