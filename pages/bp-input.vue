<template>
  <div
    id="next"
    style="height: calc(100% - 64px)"
    class="flex flex-col flex-1 text-gray-600 bg-white rounded-t-lg"
  >
    <ark-progress backTo="/next-question" value="85" />
    <div class="p-6">blood pressure input</div>
  </div>
</template>

<script>
import ArkMoreInfoButton from "../components/ArkMoreInfoButton.vue";
import ArkProgress from "../components/ArkProgress.vue";
export default {
  components: { ArkProgress, ArkMoreInfoButton },
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