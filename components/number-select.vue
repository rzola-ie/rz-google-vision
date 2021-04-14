<template>
  <select
    name="med-number"
    class="w-full p-2 px-4 border border-gray-400 rounded-md"
    @change="onChange($event)"
    v-model="number"
  >
    <optgroup style="font-size: 2rem">
      <option value="0">0 - no medications</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5 or more</option>
    </optgroup>
  </select>
</template>

<script>
export default {
  methods: {
    onChange(event) {},
  },
};
</script>

<style lang="scss" scoped>
</style>