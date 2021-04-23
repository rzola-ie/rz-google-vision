<template>
  <div
    v-if="searched && searchResults.length"
    class="h-full px-4 pb-12 overflow-y-scroll max-w-7xl"
  >
    <medication-result
      v-for="result in searchResults"
      :key="result.name"
      :medication="result"
      @add-med="onAddMed"
    />
  </div>
</template>

<script>
export default {
  props: ["searcResults"],
};
</script>

<style lang="scss" scoped>
</style>