<template>
  <div
    id="number"
    class="relative flex flex-col flex-1 overflow-hidden text-gray-600 bg-white rounded-t-lg"
  >
    <ark-progress backTo="/home" value="25" />
    <div
      class="flex flex-col flex-1 max-w-2xl px-6 pb-16 mx-auto overflow-y-scroll md:px-16"
    >
      <h1 class="font-serif text-2xl">
        How many prescription medications do you currently take?
      </h1>

      <ark-more-info-button
        @show-more-info="onShowMoreInfo"
        class="w-auto mx-auto mb-6"
      />
      <div class="flex-1 pt-8">
        <ark-med-number v-model="number" @change="number = $event" />
      </div>

      <button class="btn btn-main btn-gray" @click="onSubmit">Continue</button>
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
import ArkMedNumber from "../components/ArkMedNumber.vue";
import ArkMoreInfo from "../components/ArkMoreInfoButton.vue";
import ArkProgress from "../components/ArkProgress.vue";
export default {
  components: { ArkProgress, ArkMedNumber, ArkMoreInfo },
  layout: "welcome",
  data() {
    return {
      number: 0,
      showMoreInfo: false,
    };
  },
  mounted() {
    this.$store.state.numOfMeds
      ? (this.number = this.$store.state.numOfMeds)
      : (this.number = 0);
  },
  methods: {
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
    onMoreInfo() {
      console.log("more info");
    },
    onShowMoreInfo() {
      this.showMoreInfo = true;
      console.log("more info", this.showMoreInfo);
    },
    onDismissMoreInfo() {
      this.showMoreInfo = false;
    },
  },
};
</script>