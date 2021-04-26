<template>
  <div class="flex flex-col w-full h-full max-w-2xl mx-auto text-gray-700">
    <div class="flex justify-end w-full px-4 pt-4" style="color: #95a2b8">
      <button @click="onCancel" class="text-xs font-bold">CANCEL</button>
    </div>
    <div
      class="flex flex-col flex-1 w-full mx-auto"
      style="height: calc(100% - 32px)"
    >
      <h1 class="mb-4 font-serif text-xl text-center">Add Medication</h1>
      <div
        :class="`relative h-full ${
          hasPhoto ? 'pt-0' : 'pt-16'
        } overflow-y-scroll`"
      >
        <ark-medication-search
          class="absolute top-0 z-40"
          ref="medicationSearch"
          :hasPhoto="hasPhoto"
          @on-focus="$emit('on-focus')"
          @on-blur="$emit('on-blur')"
          @term-selected="selectTerm"
          @photo-added="onPhotoUpload($event)"
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
          class="flex flex-col items-center justify-center w-full h-full text-3xl font-semibold text-center text-ie-gray-700"
        >
          <svg
            class="w-24 h-24 mx-auto mb-4 animate-spin"
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
          class="flex flex-col items-center justify-center w-full h-full text-3xl font-semibold text-center text-ie-gray-700"
        >
          <svg fill="none" class="w-24 h-24 mx-auto mb-4">
            <path
              d="M36 28.024A18.05 18.05 0 0025.022 39M59.999 28.024A18.05 18.05 0 0170.975 39"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <ellipse
              cx="37.5"
              cy="43.5"
              rx="4.5"
              ry="7.5"
              fill="currentColor"
            ></ellipse>
            <ellipse
              cx="58.5"
              cy="43.5"
              rx="4.5"
              ry="7.5"
              fill="currentColor"
            ></ellipse>
            <path
              d="M24.673 75.42a9.003 9.003 0 008.879 5.563m-8.88-5.562A8.973 8.973 0 0124 72c0-7.97 9-18 9-18s9 10.03 9 18a9 9 0 01-8.448 8.983m-8.88-5.562C16.919 68.817 12 58.983 12 48c0-19.882 16.118-36 36-36s36 16.118 36 36-16.118 36-36 36a35.877 35.877 0 01-14.448-3.017"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M41.997 71.75A14.94 14.94 0 0148 70.5c2.399 0 4.658.56 6.661 1.556a3 3 0 003.999-4.066 12 12 0 00-10.662-6.49 11.955 11.955 0 00-7.974 3.032c1.11 2.37 1.917 4.876 1.972 7.217z"
              fill="currentColor"
            ></path>
          </svg>
          lol what is that?
        </div>
        <!-- no results -->
        <div v-else>
          <div v-if="hasPhoto">
            <div>
              <div class="flex w-full h-40 p-4">
                <div class="relative w-1/3 h-full mr-2">
                  <div
                    class="w-full h-full overflow-hidden bg-center bg-no-repeat bg-contain border bg-ie-gray-200"
                    :style="`background-image: url(${photoURL}); ${
                      loading ? 'filter: blur(1rem) brightness(.2)' : ''
                    }`"
                  >
                    <!-- <img
                      :style="`${
                        loading ? 'filter: blur(1rem) brightness(.5)' : ''
                      }`"
                      class="object-scale-down"
                      :src="photoURL"
                      alt="preview image"
                      ref="previewImg"
                    /> -->
                  </div>

                  <div
                    :class="`absolute inset-0 flex items-center justify-center text-4xl font-bold text-white ${
                      loading ? '' : 'hidden'
                    }`"
                  >
                    <svg
                      class="w-24 h-24 mx-auto animate-spin"
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
                  </div>
                </div>
                <div v-if="loading">
                  <p>Your photo is being processed</p>
                </div>
                <div v-else class="flex-1">
                  <h2 class="text-xl font-semibold leading-none">
                    Your photo has been successfully processed
                  </h2>
                  <p class="my-2 leading-none">
                    Select the appropriate words below to search
                  </p>
                  <button class="flex items-center text-lg font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Photo Tips
                  </button>
                </div>
              </div>
              <!-- <button
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
              </button> -->
            </div>
            <div>
              <ul v-if="googleSearched && loading">
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
                class="px-4 mb-4"
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
              <div class="px-4 pb-8">
                <button
                  v-if="googleResults.length"
                  class="mb-2 btn btn-main btn-gray"
                  @click="onSubmitSelected"
                >
                  Search Term
                </button>

                <button
                  v-if="!loading"
                  class="border-2 border-ie-gray-500 btn btn-main text-ie-gray-500"
                  @click="onClearPhoto"
                >
                  Re-Select
                </button>
              </div>
            </div>
          </div>

          <div v-else class="px-4">
            <img class="w-full mx-auto" src="/photos.png" alt="" />
          </div>
          <!-- default view - carousel -->
        </div>
        <!-- photo search results -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArkMedicationResultList from "./ArkMedicationResultList.vue";
import ArkMedicationSearch from "./ArkMedicationSearch.vue";

import { blackList, whiteList, contras } from "~/lib/words";

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
  mounted() {
    this.initialSuggested = [...contras];
    this.whiteList = [...whiteList];
    this.blackList = [...blackList];
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
    selectTerm(value) {
      this.$emit("on-blur");
      this.searchResults = [];
      this.searchTerm = value;

      this.getSearchResults();
    },
    async getSearchResults() {
      this.searched = true;
      this.loading = true;
      console.log("doin the search", this.searchTerm);
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