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
          <ul class="">
            <medication-slot
              v-for="({ name }, index) in medications"
              :name="name"
              :index="index"
              @remove="onRemove(index)"
              :key="index"
            />
          </ul>
          <div class="flex flex-col justify-center">
            <div
              :class="`${
                complete
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              } transition duration-250 ease-in-out `"
            >
              <p>Need to add more?</p>
              <button
                class="w-full h-16 text-2xl font-semibold tracking-wider text-white bg-blue-500 rounded-md shadow-md disabled:bg-gray-300 disabled:text-gray-700"
              >
                <nuxt-link class="text-lg font-semibold" to="/add">
                  <svg
                    class="inline-block w-8 h-8 mr-5 stroke-current"
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
                  Add Another Medication
                </nuxt-link>
              </button>
            </div>
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
      complete: false,
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
  beforeUpdate() {
    this.complete = this.medications.every((element) => !!element.name);
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
      if (this.medications.length - 1 < this.$store.state.numOfMeds) {
        this.medications[i] = { name: null, description: null };
        this.$store.commit("REMOVE_MEDICATION", i);
      } else {
        this.medications.splice(i, 1);
      }
    },
  },
};
</script>

<style scoped>
</style>