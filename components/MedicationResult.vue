<template>
  <div
    class="grid grid-rows-2 mb-4 overflow-hidden bg-white border border-gray-300 rounded-md last:mb-0"
    @click="addMedication(medication)"
  >
    <div class="w-full h-full">
      <img
        src="/results-pill.png"
        alt="pill image"
        class="object-cover h-full"
      />
    </div>
    <div class="flex flex-col w-full h-full p-4 mb-4">
      <div class="flex-1 text-gray-800">
        <h2 class="text-xl font-bold">{{ medication.name }}</h2>
        <p>{{ medication.description }}</p>
      </div>
      <div>
        <button class="w-full btn btn-blue">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["medication"],
  methods: {
    addMedication(newMed) {
      this.$store.commit("ADD_MEDICATION", newMed);
      this.$router.push("/medications");
    },
  },
};
</script>