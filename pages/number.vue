<template>
  <div
    id="number"
    class="flex flex-col flex-1 overflow-hidden text-gray-600 bg-white rounded-t-lg"
  >
    <ark-progress backTo="/home" value="25" />
    <div
      class="flex flex-col h-full max-w-2xl px-6 pb-8 mx-auto overflow-scroll md:px-16"
    >
      <h1 class="font-serif text-2xl">
        How many prescription medications do you currently take?
      </h1>

      <ark-more-info-button @click.native="onMoreInfo" />

      <ark-med-number
        class="mt-24 mb-36"
        v-model="number"
        @change="number = $event"
      />

      <button class="btn btn-main btn-gray" @click="onSubmit">Continue</button>
    </div>
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
  },
};
</script>