<template>
  <select
    name="med-number"
    class="w-full p-2 px-4 text-2xl border border-gray-400 rounded-md md:text-3xl"
    @change="$emit('change', $event.target.value)"
    :value="value"
  >
    <optgroup>
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
  props: ["value"],
};
</script>

<style scoped>
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("/icn-chevron-down.svg");
  background-repeat: no-repeat;
  background-position: right 0.5rem top 50%, 0 0;
  background-size: 24px;
}
</style>