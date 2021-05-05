<template>
  <div
    id="next"
    style="height: calc(100% - 64px)"
    class="relative flex flex-col flex-1 w-full max-w-2xl mx-auto text-gray-600 bg-white rounded-t-lg"
  >
    <ark-progress :backTo="backLink" value="75" />
    <div
      style="
        border-radius: 3rem 0 0 0;
        box-shadow: 0px -4px 10px rgb(0 0 0 / 20%);
      "
      class="relative w-full h-full p-5 overflow-x-hidden overflow-y-scroll text-white bg-ie-gray-600"
    >
      <h1 class="px-4 font-serif text-2xl">
        Before providing your blood pressure numbers, please review the
        checklist:
      </h1>

      <ark-slide-show />

      <div class="flex justify-center">
        <ark-more-info-button
          text-color="text-white"
          class="my-2"
          @click.native="onShowMoreInfo"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <button class="py-4 font-bold border-2 rounded-md border-ie-gray-300">
          Don't show again
        </button>
        <button class="py-4 font-bold rounded-md bg-ie-gray-500">
          <nuxt-link to="bp-input">Continue</nuxt-link>
        </button>
      </div>
    </div>
    <ark-more-info-content
      :currentInfo="$route.name"
      :isVisible="showMoreInfo"
      @dismiss-more-info="onDismissMoreInfo"
    />
    <!-- moew info -->
  </div>
</template>

<script>
import ArkSlideShow from "../components/ArkSlideShow.vue";
import ArkMoreInfoButton from "../components/ArkMoreInfoButton.vue";
import ArkProgress from "../components/ArkProgress.vue";
export default {
  components: { ArkProgress, ArkMoreInfoButton, ArkSlideShow },
  layout: "welcome",
  data() {
    return {
      showMoreInfo: false,
    };
  },
  computed: {
    numOfMeds() {
      return this.$store.state.numOfMeds;
    },
    backLink() {
      return this.numOfMeds > 0 ? "/medications" : "/number";
    },
  },
  methods: {
    onShowMoreInfo() {
      this.showMoreInfo = true;
    },
    onDismissMoreInfo() {
      this.showMoreInfo = false;
    },
  },
};
</script>