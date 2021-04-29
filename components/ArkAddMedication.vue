<template>
  <div
    class="relative flex flex-col w-full h-full max-w-2xl mx-auto text-gray-700"
  >
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
          <img
            src="/icn/icn-no-results.svg"
            alt="sad face no results"
            class="w-24 h-24 mx-auto mb-4"
          />
          lol what even is that?
        </div>
        <!-- no results -->
        <div v-else>
          <div v-if="hasPhoto">
            <ark-google-image-preview
              :loading="loading"
              :photoURL="photoURL"
              @show-photo-tips="onShowPhotoTips"
            />

            <ark-google-search-list
              :googleSearched="googleSearched"
              :loading="loading"
              :googleResults="googleResults"
              @clear-photo="onClearPhoto"
              @submit-selected="onSubmitSelected"
              ref="googleSearchList"
            />
          </div>

          <div v-else class="px-4">
            <img class="w-full mx-auto" src="/photos.png" alt="" />
          </div>
          <!-- default view - photo tips carousel -->
        </div>
        <!-- photo search results -->
      </div>
    </div>

    <ark-slide-up-page :isVisible="showPhotoTips" class="p-4">
      <div class="flex justify-end w-full mb-4" style="color: #95a2b8">
        <button @click="onDismissPhotoTips" class="text-xs font-bold">
          DISMISS
        </button>
      </div>
      <div class="w-full h-full p-4 border border-ie-gray-400 bg-ie-gray-200">
        <h1 class="text-2xl font-semibold text-center text-ie-gray-700">
          PHOTO TIPS HERE
        </h1>
      </div>
    </ark-slide-up-page>
  </div>
</template>

<script>
import axios from "axios";
import ArkMedicationResultList from "./ArkMedicationResultList.vue";
import ArkMedicationSearch from "./ArkMedicationSearch.vue";

import { blackList, whiteList, contras } from "~/lib/words";
import ArkGoogleSearchList from "./ArkGoogleSearchList.vue";
import ArkSlideUpPage from "./ArkSlideUpPage.vue";

export default {
  components: {
    ArkMedicationSearch,
    ArkMedicationResultList,
    ArkGoogleSearchList,
    ArkSlideUpPage,
  },
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
      showPhotoTips: false,
      gCloudVisionUrl: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.google_vision_key}`,
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

        this.googleResults = [...filtered];

        this.predictingImage = false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    onSubmitSelected(selectedResults) {
      this.searchTerm = [...selectedResults].join(" ");
      this.$refs.googleSearchList.onClearResults();
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

      try {
        this.searchResults = await this.$store.dispatch(
          "searchMeds",
          this.searchTerm
        );
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
    onShowPhotoTips() {
      console.log("got any more of them photo tips?");
      this.showPhotoTips = true;
    },
    onDismissPhotoTips() {
      this.showPhotoTips = false;
    },
  },
};
</script>