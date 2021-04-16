<template>
  <div class="flex flex-col h-full text-gray-600 bg-white rounded-t-lg">
    <survey-progress backTo="/home" value="25" />
    <div class="flex flex-col flex-1 px-6 pb-12 pt-36">
      <div class="flex flex-col flex-1">
        <p class="font-serif text-2xl">
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
        <div class="w-full h-20">
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
        </div>
      </div>
      <div>
        <button class="w-full h-16 text-2xl btn btn-gray" @click="onSubmit">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SurveyProgress from "../components/SurveyProgress.vue";
export default {
  components: { SurveyProgress },
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
    onChange(event) {
      this.number = event.target.value;
    },
    onSubmit() {
      this.$store.commit("ADD_MEDICATION_NUMBER", this.number);

      switch (+this.number) {
        case 0:
          this.$router.push("/next-question");
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          this.$router.push("/medications");
          break;
        default:
          this.$router.push("/kickout");
      }
    },
  },
};
</script>

<style scoped>
select {
  font-size: 2rem;
}

optgroup {
  font-size: 1rem;
}
</style>