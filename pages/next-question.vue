<template>
  <div
    id="next"
    class="flex flex-col flex-1 text-gray-600 bg-white rounded-t-lg"
  >
    <ark-progress :backTo="backLink" value="75" />
    <div class="p-6 pt-0 mx-auto max-w-7xl">
      <h1 class="inline font-serif text-xl text-gray-700">
        This is the next question!
      </h1>
    </div>
  </div>
</template>

<script>
import ArkProgress from "../components/ArkProgress.vue";
export default {
  components: { ArkProgress },
  layout: "welcome",
  computed: {
    numOfMeds() {
      return this.$store.state.numOfMeds;
    },
    backLink() {
      return this.numOfMeds > 0 ? "/medications" : "/number";
    },
  },
};
</script>