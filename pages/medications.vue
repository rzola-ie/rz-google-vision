<template>
  <div
    id="medications"
    class="relative flex flex-col mt-16 overflow-hidden bg-white rounded-t-lg"
  >
    <div
      v-if="isFocused"
      @click="onDismissFocus"
      class="absolute top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-transparent inset-x-full inset-y-full"
    ></div>
    <div class="flex flex-col flex-1">
      <survey-progress backTo="/number" value="50" />
      <div class="flex flex-col flex-1 max-w-2xl px-6 pb-12 mx-auto md:px-16">
        <div class="flex flex-col items-center">
          <h1 class="inline-block mx-auto font-serif text-2xl text-gray-700">
            Which
            <span v-if="medications.length === 1"> medication </span>
            <span v-else>
              <span class="text-3xl text-blue-900">{{
                medications.length
              }}</span>
              medications
            </span>
            are you currently taking?
            <span class="font-sans text-sm italic text-gray-700"
              >List all that apply
            </span>
          </h1>

          <button class="px-4 py-2 mx-auto my-2 font-bold text-blue-900">
            <svg
              class="inline-block w-5 h-5 mr-1 stroke-current"
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
        <div class="flex-1 mb-8">
          <ul class="">
            <medication-slot
              v-for="({ name, description }, index) in medications"
              :name="name"
              :description="description"
              :index="index"
              :next="next"
              @remove="onRemove(index)"
              @add-medication="() => (isAddingMed = true)"
              :key="index"
            />
          </ul>
          <div class="flex flex-col justify-center">
            <div
              :class="`${
                complete
                  ? 'pointer-events-auto transform translate-x-0 opacity-100'
                  : 'pointer-events-none transform translate-x-full opacity-0'
              } transition duration-500 ease-in-out `"
            >
              <p :class="complete ? 'opacity-100' : 'opacity-0'">
                Need to add more?
              </p>
              <button
                style="background-color: #d7ecf6"
                class="w-full h-16 text-2xl font-semibold tracking-wider text-gray-700 rounded-md shadow-md"
              >
                <button
                  class="text-lg font-semibold"
                  @click="() => (isAddingMed = true)"
                >
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
                </button>
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            style="background-color: #97a2b6"
            class="w-full h-16 text-2xl font-semibold tracking-wider text-white rounded-md shadow-md disabled:opacity-50 disabled:text-gray-700"
            :disabled="$store.state.medications.length < $store.state.numOfMeds"
            @click="onSubmit"
          >
            Confirm and Continue
          </button>
        </div>
      </div>
    </div>
    <div
      :style="`
        height: calc(100% - 1rem);
      ${
        isAddingMed
          ? 'box-shadow: 0px -4px 10px rgb(0 0 0 / 20%);'
          : 'box-shadow: none;'
      }`"
      :class="`absolute w-full mt-4 bg-white shadow-lg rounded-t-lg ${
        isAddingMed ? 'top-0' : 'top-full'
      } transition-all duration-500 ease-in-out flex flex-col`"
    >
      <add-medication
        ref="addMed"
        @on-focus="onInputFocus"
        @on-blur="isFocused = false"
        @dismiss-add="
          () => {
            isAddingMed = false;
            isFocused = false;
          }
        "
      />
    </div>
  </div>
</template>

<script>
import AddMedication from "../components/AddMedication.vue";
import SurveyProgress from "../components/SurveyProgress.vue";
export default {
  components: { SurveyProgress, AddMedication },
  layout: "welcome",
  data() {
    return {
      medications: [],
      complete: false,
      next: -1,
      isAddingMed: false,
      isFocused: false,
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

    this.next = this.medications.findIndex((element) => !element.name);
  },
  beforeUpdate() {
    if (this.$store.state.medications.length) {
      for (let i = 0; i < this.$store.state.medications.length; i++) {
        this.medications[i] = this.$store.state.medications[i];
      }
    }

    this.complete = this.medications.every((element) => !!element.name);
    this.next = this.medications.findIndex((element) => !element.name);
  },
  methods: {
    goBack() {
      this.$router.push("/number");
    },
    onSubmit() {
      if (this.medications.length >= 5) {
        this.$router.push("/kickout");
      } else {
        this.$router.push("/next-question");
      }
    },
    onAdd() {
      console.log("flippy flip");
      this.isAddingMed = true;
    },
    onInputFocus() {
      this.isFocused = true;
    },
    onDismissFocus() {
      this.$refs.addMed.onBlur();
      this.isFocused = false;
    },
    onRemove(i) {
      if (this.medications.length - 1 < this.$store.state.numOfMeds) {
        this.medications[i] = {};
        this.next = this.medications.findIndex((element) => !element.name);
      } else {
        this.medications.splice(i, 1);
      }

      this.$store.commit("REMOVE_MEDICATION", i);
    },
  },
};
</script>

<style scoped>
#medications {
  min-height: calc(100vh - 4rem);
}
</style>