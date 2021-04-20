<template>
  <div
    id="next"
    class="flex flex-col flex-1 text-gray-600 bg-white rounded-t-lg"
  >
    <survey-progress
      :backTo="numOfMeds > 0 ? '/medications' : '/number'"
      value="75"
    />
    <div class="p-6 pt-0 mx-auto max-w-7xl">
      <h1 class="inline font-serif text-xl text-gray-700">
        This is the next question!
      </h1>
    </div>
  </div>
</template>

<script>
import SurveyProgress from "../components/SurveyProgress.vue";
export default {
  components: { SurveyProgress },
  layout: "welcome",
  computed: {
    numOfMeds() {
      return this.$store.state.numOfMeds;
    },
  },
};
</script>