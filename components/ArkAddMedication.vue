<template>
  <div class="flex flex-col w-full h-full max-w-2xl mx-auto text-gray-700">
    <div class="flex justify-end w-full px-4 pt-4" style="color: #95a2b8">
      <button @click="onCancel" class="text-xs font-bold">CANCEL</button>
    </div>
    <div class="w-full h-full mx-auto">
      <h1 class="mb-4 font-serif text-xl text-center">Add Medication</h1>
      <div
        :class="`h-full relative ${
          !hasPhoto ? 'pt-16 pb-8 overflow-y-scroll' : 'pt-0'
        }`"
      >
        <ark-medication-search
          class="absolute top-0 z-40"
          ref="medicationSearch"
          @on-focus="$emit('on-focus')"
          @on-blur="$emit('on-blur')"
          @term-selected="selectTerm"
        />
        <!-- search input -->

        <ark-medication-result-list
          v-if="searched && searchResults.length"
          :searchResults="searchResults"
          @add-med="onAddMed"
        />
        <!-- search results -->
        <div
          v-else-if="searched && loading"
          class="flex flex-col items-center justify-center w-full h-full text-3xl font-semibold text-center"
        >
          <svg
            class="w-24 h-24 mx-auto mb-4 text-ie-gray-900 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          loading...
        </div>
        <div
          v-else-if="searched && searchResults.length === 0"
          class="p-4 text-3xl font-bold text-center"
        >
          lol what is that?
        </div>
        <!-- no results -->
        <div v-else class="overflow-y-scroll">
          <div v-if="hasPhoto">
            <div class="relative mb-4">
              <img
                :style="`${loading ? 'filter: blur(1rem) brightness(.5)' : ''}`"
                class="mx-auto mb-4"
                :src="photoURL"
                alt="preview image"
                ref="previewImg"
              />
              <div
                :class="`absolute inset-0 flex items-center justify-center text-4xl font-bold text-white ${
                  loading ? '' : 'hidden'
                }`"
              >
                LOADING...
              </div>
              <button
                @click="onClearPhoto"
                class="absolute w-6 h-6 top-2 right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              <ul v-if="googleSearched && loading" class="mt-4">
                <li
                  class="w-full h-16 mb-4 bg-gray-200 rounded-sm animate-pulse"
                ></li>
                <li
                  class="w-full h-16 mb-4 bg-gray-200 rounded-sm animate-pulse"
                ></li>
                <li
                  class="w-full h-16 mb-4 bg-gray-200 rounded-sm animate-pulse"
                ></li>
              </ul>
              <!-- loading -->
              <ul
                v-else-if="googleSearched && googleResults.length"
                class="mt-4"
              >
                <li
                  v-for="result in googleResults"
                  :key="result"
                  @click="addToList(result)"
                  role="checkbox"
                  :class="[
                    `flex items-center p-4 text-2xl uppercase mb-2 cursor-pointer last:mb-0 ${
                      selectedResults.includes(result)
                        ? 'bg-blue-900 bg-opacity-20'
                        : ''
                    }`,
                  ]"
                >
                  <svg
                    v-if="selectedResults.includes(result)"
                    class="w-6 h-6 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    v-else
                    class="w-6 h-6 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12 a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>{{ result }}</span>
                </li>
              </ul>
              <!-- results -->

              <div v-else>No search results, dummy</div>
              <!-- no results -->
              <button
                v-if="googleResults.length"
                class="w-full btn btn-gray"
                @click="onSubmitSelected"
              >
                Search Term
              </button>
            </div>
          </div>
          <div v-else class="px-4">
            <img class="w-full mx-auto" src="/photos.png" alt="" />
          </div>
        </div>
        <!-- photo search results -->
      </div>
    </div>
  </div>
</template>

<script>
import ArkMedicationResultList from "./ArkMedicationResultList.vue";
import ArkMedicationSearch from "./ArkMedicationSearch.vue";

export default {
  components: { ArkMedicationSearch, ArkMedicationResultList },
  data() {
    return {
      predictingImage: false,
      searched: false,
      googleSearched: false,
      searchResults: [],
      hasPhoto: false,
      photoSrc: null,
      photoURL: null,
      loading: false,
      googleResults: [],
      selectedResults: [],
      gCloudVisionUrl: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.googleVisionKey}`,
    };
  },
  methods: {
    onBlur() {
      this.$refs.medicationSearch.onBlur();
    },
    onAddMed() {
      this.searchResults = [];

      this.$refs.medicationSearch.onClearSearch();
      this.searched = false;
      this.$emit("dismiss-add");
    },
    onCancel() {
      this.$refs.medicationSearch.onClearSearch();
      this.$refs.medicationSearch.onBlur();
      this.hasFocus = false;
      this.searched = false;
      this.googleSearched = false;
      this.predictingImage = false;
      this.searchResults = [];
      this.hasPhoto = false;
      this.photoSrc = null;
      this.photoURL = null;
      this.googleResults = [];
      this.selectedResults = [];
      this.$emit("dismiss-add");
    },
    selectTerm(value) {
      this.$emit("on-blur");
      this.searchResults = [];
      this.searchTerm = value;

      this.getSearchResults();
    },
    addMedication(newMed) {
      this.$store.commit("ADD_MEDICATION", newMed);
      this.$router.push("/medications");
    },
    async getSearchResults() {
      this.searched = true;
      this.loading = true;
      try {
        this.searchResults = await this.$store.dispatch(
          "searchMeds",
          this.searchTerm
        );
        console.log(this.searchResults);
      } catch (e) {
        console.error("oh no");
      } finally {
        this.loading = false;
      }
    },
    async onPhotoUpload(event) {
      // clear previous search
      this.hasFocus = false;
      this.searchResults = [];
      this.googleResults = [];
      this.searched = false;

      // prepare image for preview
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        this.sendToGoogleVision(base64String);
      };

      await reader.readAsDataURL(event.target.files[0]);
      this.photoURL = URL.createObjectURL(event.target.files[0]);
      this.hasPhoto = true;

      // save for later
      // this.$refs.previewImg.onload = () => {
      //   URL.revokeObjectURL(event.target.files[0]);
      // };
    },
    async sendToGoogleVision(photoSrc) {
      this.loading = true;
      this.googleSearched = true;

      if (!photoSrc) {
        console.warn("You have not captured an image");
        this.loading = false;
        return;
      }

      let requestBody = {
        requests: [
          {
            image: {
              content: photoSrc,
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 20,
              },
            ],
          },
        ],
      };

      try {
        let predictionResults = await axios.post(
          this.gCloudVisionUrl,
          requestBody
        );

        this.googleResults = [
          ...predictionResults.data.responses[0].textAnnotations.map((r) =>
            r.description.toLowerCase()
          ),
        ];

        this.googleResults.forEach((result, index) => {
          this.googleResults[index] = result
            .replace('"', "")
            .replace("(", "")
            .replace(")", "")
            .replace("'", "")
            .replace("©", "")
            .replace("®", "")
            .replace("™", "");
        });

        const checkBlacklist = (result) => {
          return this.blackList.indexOf(result) === -1;
        };

        const checkWhitelist = (result) => {
          return this.whiteList.indexOf(result) !== -1;
        };

        const filtered = this.googleResults
          .filter(checkBlacklist)
          .filter(checkWhitelist)
          .reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          );

        console.log("filtered", filtered);

        this.googleResults = [...filtered];

        console.log(this.googleResults);

        this.predictingImage = false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    addToList(term) {
      console.log(term);
      console.log(this.selectedResults);
      if (this.selectedResults.includes(term)) {
        const termIndex = this.selectedResults.indexOf(term);
        this.selectedResults.splice(termIndex, 1);
      } else {
        this.selectedResults.push(term);
      }
    },
    onSubmitSelected() {
      this.searchTerm = [...this.selectedResults].join(" ");
      this.selectedResults = [];
      this.hasPhoto = false;
      this.photoSrc = null;
      this.photoURL = null;
      this.googleResults = [];
      this.selectTerm(this.searchTerm);
    },
    onClearPhoto() {
      this.hasPhoto = false;
      this.photoSrc = null;
      this.photoURL = null;
      this.googleResults = [];
      this.googleSearched = false;
    },
  },
};
</script>