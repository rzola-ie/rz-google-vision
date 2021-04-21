<template>
  <div
    id="number"
    class="flex flex-col flex-1 overflow-hidden text-gray-600 bg-white rounded-t-lg"
  >
    <ark-progress backTo="/home" value="25" />
    <div class="flex flex-col max-w-2xl px-6 mx-auto md:px-16">
      <div class="flex flex-col mb-36">
        <p class="font-serif text-2xl">
          How many prescription medications do you currently take?
        </p>
        <div class="flex justify-center mb-24">
          <ark-more-info-button @click.native="onMoreInfo" />
        </div>
        <div class="w-full h-20">
          <ark-med-number v-model="number" @change="number = $event" />
        </div>
      </div>
      <div>
        <button class="btn btn-main btn-gray" @click="onSubmit">
          Continue
        </button>
      </div>
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
    onMoreInfo() {
      console.log("more info");
    },
  },
};
</script>