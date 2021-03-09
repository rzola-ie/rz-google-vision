<template>
  <div class="h-full flex flex-col bg-white bg-opacity-70">
    <div class="flex-1">
      <div
        class="relative my-4 pr-3 md:px-16 w-full grid grid-cols-6 md:grid-cols-12 justify-items-stretch gap-1 md:gap-5"
      >
        <div class="col-span-1">
          <button
            class="justify-self-auto text-blue-900 font-bold rounded-md w-full"
          >
            Back
          </button>
        </div>
        <div class="col-span-5 md:col-span-11 text-center flex items-center">
          <div
            class="relative h-1 w-full bg-gray-400 rounded-full overflow-hidden shadow-md"
          >
            <div
              class="absolute top-0 bottom-0 left-0 right-3/4 rounded-full bg-blue-900"
            ></div>
          </div>
        </div>
      </div>
      <div class="px-6 md:px-16">
        <div class="mb-4">
          <h1 class="text-2xl text-blue-900 font-semibold">
            Which medications are you taking currently?
          </h1>
          <p class="text-sm text-gray-800">List all that apply</p>
        </div>
        <div class="mb-16 flex flex-col items-center">
          <ul class="flex flex-wrap justify-center">
            <li>
              <nuxt-link
                class="h-full w-full text-blue-900 flex flex-col justify-center items-center"
                to="/add"
              >
                <svg
                  class="block h-10 w-10 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add
              </nuxt-link>
            </li>
            <li v-for="{ title } in medications" :key="title">{{ title }}</li>
          </ul>

          <button class="text-blue-900 font-bold">
            <svg
              class="h-5 w-5 stroke-current inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
        <div>
          <button
            class="h-16 w-full bg-blue-900 rounded-md text-2xl font-semibold tracking-wider text-white shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "welcome",
  data() {
    return {
      medications: [],
    };
  },
  mounted() {
    this.medications = [...this.$store.state.medications];

    if (this.medications.length < 8) {
      const length = this.medications.length;

      for (let i = length; i < 8; i++) {
        this.medications.push({});
      }
    }
  },
};
</script>

<style scoped>
li {
  @apply h-20 w-20 mr-4 mb-4 bg-gray-300 rounded-md flex items-center justify-center;
}

li:nth-child(3n + 3) {
  @apply mr-0;
}
</style>