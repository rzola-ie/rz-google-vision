<template>
  <div
    style="max-height: 320px"
    class="grid grid-rows-2 mb-4 overflow-hidden bg-white border border-gray-300 rounded-md shadow-md last:mb-0"
  >
    <div class="w-full h-full overflow-hidden bg-gray-100">
      <img
        :src="medication.imgUrl ? medication.imgUrl : '/results-pill.png'"
        alt="pill image"
        class="object-cover w-full mx-auto"
      />
    </div>
    <div class="flex flex-col w-full h-full p-4">
      <div class="flex-1 text-gray-800">
        <h2 class="text-xl font-bold">{{ medication.name }}</h2>
        <p>{{ medication.description }}</p>
      </div>
      <div>
        <button class="w-full btn btn-gray" @click="addMedication(medication)">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["medication"],
  methods: {
    addMedication(newMed) {
      console.log("blern");
      this.$store.commit("ADD_MEDICATION", newMed);
      this.$router.push("/medications");
      this.$emit("add-med");
    },
  },
};
</script>