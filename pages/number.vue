<template>
  <div class="flex flex-col h-full bg-white bg-opacity-70">
    <div class="flex flex-col flex-1 px-12 py-36">
      <div class="flex flex-col flex-1">
        <p class="-mx-6 text-2xl">
          How many prescription medications do you currently take?
        </p>
        <div class="flex justify-center">
          <button class="px-5 py-2 mb-6 font-bold">
            <svg
              class="inline-block w-5 h-5 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            More Info
          </button>
        </div>
        <div
          class="grid w-full h-20 grid-cols-3 gap-2 p-2 text-5xl border border-gray-400 rounded-md"
        >
          <button
            class="w-full h-full bg-gray-400 rounded-md"
            :disabled="this.number === 0"
            @click="decrement"
          >
            <svg
              class="mx-auto w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />
            </svg>
          </button>
          <input
            class="w-full h-full text-center bg-gray-100"
            type="text"
            name=""
            id=""
            v-model="number"
          />
          <button
            class="w-full h-full bg-gray-400 rounded-md"
            @click="increment"
          >
            <svg
              class="w-8 h-8 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <button class="h-16 -mx-6 text-2xl btn btn-blue" @click="onSubmit">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "welcome",
  data() {
    return {
      number: 0,
    };
  },
  mounted() {
    this.$store.state.numOfMeds
      ? (this.number = this.$store.state.numOfMeds)
      : (this.number = 0);
  },
  methods: {
    increment() {
      this.number <= 19 ? this.number++ : this.number;
    },
    decrement() {
      this.number === 0 ? 0 : this.number--;
    },
    onSubmit() {
      this.$store.commit("ADD_MEDICATION_NUMBER", this.number);

      if (this.number < 5) {
        this.$router.push("/medications");
      } else {
        this.$router.push("/kickout");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>