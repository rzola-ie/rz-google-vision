<template>
  <div
    id="medications"
    class="relative h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-t-lg shadow-lg"
  >
    <div class="w-full h-full">
      <div
        v-if="isFocused"
        @click="onDismissFocus"
        class="absolute top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-transparent inset-x-full inset-y-full"
      ></div>
      <div class="flex flex-col h-full">
        <ark-progress backTo="/number" value="50" />
        <div
          :class="`flex flex-col w-full h-full max-w-2xl pb-8 mx-auto md:px-16 ${
            isAddingMed
              ? 'overflow-hidden'
              : 'overflow-x-hidden overflow-y-scroll'
          }`"
        >
          <div class="flex flex-col items-center px-6 mb-4">
            <h1 class="mx-auto font-serif text-2xl text-gray-700">
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

            <ark-more-info-button @click.native="onShowMoreInfo" />
          </div>
          <div class="flex-1 w-full h-full px-6">
            <div>
              <ul class="mb-4">
                <ark-medication-slot
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

              <div
                :class="`${
                  complete
                    ? 'pointer-events-auto transform translate-x-0 opacity-100'
                    : 'pointer-events-none transform translate-x-full opacity-0'
                } transition duration-500 ease-in-out flex flex-col justify-center mb-6`"
              >
                <p :class="complete ? 'opacity-100' : 'opacity-0'">
                  Need to add more?
                </p>
                <button
                  style="background-color: #d7ecf6"
                  class="text-lg font-semibold tracking-wider text-gray-700 rounded-md shadow-md btn-main"
                  @click="() => (isAddingMed = true)"
                >
                  <svg
                    class="inline-block w-6 h-6 mr-2 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Another Medication
                </button>
              </div>
              <!-- add more section -->
            </div>
            <div>
              <button
                style="background-color: #97a2b6"
                class="tracking-wider btn btn-main btn-gray"
                :disabled="
                  $store.state.medications.length < $store.state.numOfMeds
                "
                @click="onSubmit"
              >
                Confirm and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- added medications -->

    <ark-slide-up-page :isVisible="isAddingMed">
      <ark-add-medication
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
    </ark-slide-up-page>
    <!-- add new medication -->

    <ark-more-info-content
      :currentInfo="$route.name"
      :isVisible="showMoreInfo"
      @dismiss-more-info="onDismissMoreInfo"
    />
    <!-- moew info -->
  </div>
</template>

<script>
import ArkAddMedication from "../components/ArkAddMedication.vue";
import ArkProgress from "../components/ArkProgress.vue";
import ArkSlideUpPage from "../components/ArkSlideUpPage.vue";
export default {
  components: { ArkProgress, ArkAddMedication, ArkSlideUpPage },
  layout: "welcome",
  asyncData({ store, redirect }) {
    if (store.state.numOfMeds === null) {
      redirect("/number");
    }
  },
  data() {
    return {
      medications: [],
      complete: false,
      next: -1,
      isAddingMed: false,
      isFocused: false,
      showMoreInfo: false,
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
    async onSubmit() {
      if (this.medications.length >= 5) {
        this.$router.push("/kickout");
        return;
      }

      // construct ID array
      let drugIds = [];
      this.medications.forEach((medication) => {
        drugIds.push(medication.id);
      });

      await this.$store
        .dispatch("checkDrugToDrugInteractions", {
          drugIds,
        })
        .then(({ data }) => {
          const hasInteraction = data.some((item) => {
            return item.severity;
          });

          if (hasInteraction) {
            this.$router.push("/kickout");
            return;
          }

          this.$router.push("next-question");
        })
        .catch((error) => console.error(error));
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
    onShowMoreInfo() {
      this.showMoreInfo = true;
    },
    onDismissMoreInfo() {
      this.showMoreInfo = false;
    },
  },
};
</script>