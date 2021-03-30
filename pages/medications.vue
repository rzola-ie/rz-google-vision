<template>
  <div class="flex flex-col min-h-full pb-4 bg-white bg-opacity-70">
    <div class="flex-1">
      <div
        class="relative grid w-full grid-cols-6 gap-1 pr-3 my-4 md:px-16 md:grid-cols-12 justify-items-stretch md:gap-5"
      >
        <div class="col-span-1">
          <button
            class="w-full font-bold text-blue-900 rounded-md justify-self-auto"
            @click="goBack"
          >
            Back
          </button>
        </div>
        <div class="flex items-center col-span-5 text-center md:col-span-11">
          <div
            class="relative w-full h-1 overflow-hidden bg-gray-400 rounded-full shadow-md"
          >
            <div
              class="absolute top-0 bottom-0 left-0 bg-blue-900 rounded-full right-3/4"
            ></div>
          </div>
        </div>
      </div>
      <div class="px-6 md:px-16">
        <div class="mb-4">
          <h1 class="inline text-2xl font-semibold text-blue-900">
            Which medications are you taking currently?
          </h1>
          <span class="text-sm italic text-gray-700">List all that apply</span>
        </div>
        <div class="mb-4">
          <div
            class="flex flex-col items-center justify-center w-full h-20 p-2 mb-4 mr-4 bg-gray-300 rounded-md"
          >
            <nuxt-link
              class="text-lg font-semibold text-center text-blue-900"
              to="/add"
            >
              <svg
                class="block w-8 h-8 stroke-current"
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
          </div>
          <ul class="">
            <li
              class="relative w-full h-20 mb-4 overflow-hidden bg-gray-300 rounded-md last:mb-0"
              v-for="({ name }, index) in medications"
              :key="name"
            >
              <div
                v-if="name"
                class="absolute inset-y-0 left-0 w-20 bg-blue-900"
              >
                <img
                  src="/pill.png"
                  alt="picture of medication"
                  class="object-cover"
                />
              </div>
              <button
                v-if="name"
                class="absolute top-2 right-2"
                @click="onRemove(index)"
              >
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                class="flex items-center inline h-full p-4 ml-20 text-xl truncate"
              >
                <div class="w-full truncate">
                  {{ name }}
                </div>
              </div>
            </li>
          </ul>
          <div class="flex justify-center">
            <button class="px-4 py-1 font-bold text-blue-900">
              <svg
                class="inline-block w-5 h-5 stroke-current"
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
        </div>
        <div>
          <button
            class="w-full h-16 text-2xl font-semibold tracking-wider text-white bg-blue-900 rounded-md shadow-md disabled:bg-gray-300 disabled:text-gray-700"
            :disabled="$store.state.medications.length < $store.state.numOfMeds"
            @click="onSubmit"
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
    for (let i = 0; i < this.$store.state.numOfMeds; i++) {
      this.medications.push({});
    }

    if (this.$store.state.medications.length) {
      for (let i = 0; i < this.$store.state.medications.length; i++) {
        this.medications[i] = this.$store.state.medications[i];
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/number");
    },
    onSubmit() {
      if (this.medications.length >= 5) {
        this.$router.push("/kickout");
      }
    },
    onRemove(i) {
      this.medications[i] = {};
      this.$store.commit("REMOVE_MEDICATION", i);
    },
  },
};
</script>

<style scoped>
</style>