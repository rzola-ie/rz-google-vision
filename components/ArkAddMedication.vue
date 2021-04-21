<template>
  <div class="flex flex-col w-full max-w-2xl mx-auto text-gray-700">
    <div class="flex justify-end w-full px-4 pt-4" style="color: #95a2b8">
      <button @click="onCancel" class="text-xs font-bold">CANCEL</button>
    </div>
    <div class="w-full mx-auto">
      <h1 class="mx-auto mb-4 font-serif text-xl text-center">
        Add Medication
      </h1>
      <div
        :class="`relative ${!hasPhoto ? 'pt-16 overflow-y-scroll' : 'pt-0'}`"
      >
        <div v-if="!hasPhoto" class="absolute top-0 z-40 w-full px-4">
          <input
            type="text"
            name=""
            id="text-search"
            @focus="onFocus"
            v-model="searchTerm"
            autocomplete="off"
            :style="`${
              hasFocus
                ? 'border-radius: 1.5rem 1.5rem 0 0; border-bottom: none;'
                : 'border-radius: 1.5rem'
            }`"
            class="w-full h-12 px-12 text-2xl uppercase border border-gray-500 outline-none"
          />

          <form
            class="absolute top-0 flex items-center justify-center w-12 h-12 right-4 text-ie-gray-900"
            @submit.prevent="onSubmit"
            enctype="multipart/form-data"
          >
            <input
              class="hidden"
              type="file"
              name="files[]"
              id="file"
              capture="environment"
              accept="image/*"
              @change="onPhotoUpload($event)"
            />
            <label id="drag-drop-target" for="file" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-8 h-8 mx-auto stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </label>
          </form>
          <div
            v-if="hasFocus"
            style="max-height: 350px"
            class="px-4 py-2 overflow-y-scroll bg-white border border-t-0 border-gray-500 shadow-md"
          >
            <ul v-if="!searchTerm">
              <p class="font-bold">Try Searching</p>
              <li
                v-for="(item, index) in initialSuggested"
                :key="index"
                class="p-2"
              >
                <button
                  class="w-full h-full text-xl text-left"
                  @click="selectTerm(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline w-8 h-8 mr-4"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      stroke="none"
                      fill="#97A2B6"
                    />
                    <rect
                      x="7"
                      y="2"
                      rx="5"
                      ry="5"
                      height="20"
                      width="10"
                      stroke="white"
                      stroke-width="1.5"
                      style="
                        transform-origin: center;
                        transform: rotate(-45deg) scale(0.8);
                      "
                    />
                  </svg>
                  <span>{{ item }}</span>
                </button>
              </li>
            </ul>
            <ul v-else>
              <li
                v-for="(item, index) in filteredArray"
                :key="index"
                class="p-2"
              >
                <button
                  class="w-full h-full text-xl text-left"
                  @click="selectTerm(item)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline w-8 h-8 mr-4"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      stroke="none"
                      fill="#97A2B6"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="white"
                      style="transform-origin: center; transform: scale(0.6)"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span class="capitalize">{{ item }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="searched && searchResults.length"
          class="px-4 pb-12 overflow-y-scroll max-w-7xl"
          style="height: calc(100% - 5rem)"
        >
          <medication-result
            v-for="result in searchResults"
            :key="result.name"
            :medication="result"
            @add-med="onAddMed"
          />
        </div>
        <!-- search results -->
        <div
          v-else-if="searched && loading"
          class="w-full p-4 text-3xl font-bold text-center"
        >
          loading...
        </div>
        <div
          v-else-if="searched && searchResults.length === 0"
          class="p-4 text-3xl font-bold text-center"
        >
          lol what is that?
        </div>
        <!-- no results -->
        <div v-else class="p-4 overflow-y-scroll">
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
          <div v-else>
            <img class="w-full mx-auto" src="/photos.png" alt="" />
          </div>
        </div>
        <!-- photo search results -->
      </div>
    </div>
  </div>
</template>

<script>
import { blackList, whiteList } from "~/lib/words";
import axios from "axios";

export default {
  data() {
    return {
      searchTerm: null,
      hasFocus: false,
      predictingImage: false,
      initialSuggested: ["Crestor", "Farxiga", "Warfrin"],
      blackList: [],
      whiteList: [],
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
  computed: {
    filteredArray() {
      return this.whiteList.filter((str) => {
        return str.includes(this.searchTerm.toLowerCase());
      });
    },
  },
  mounted() {
    this.whiteList = [...whiteList];
    this.blackList = [...blackList];
  },
  methods: {
    onFocus() {
      this.hasFocus = true;
      console.log("derp derp derp", this.hasFocus);
      this.$emit("on-focus");
    },
    onBlur() {
      this.hasFocus = false;
      console.log("blur blur blur", this.hasFocus);
    },
    onAddMed() {
      this.searchResults = [];
      this.searchTerm = null;
      this.searched = false;
      this.$emit("dismiss-add");
    },
    onCancel() {
      this.searchTerm = null;
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
    selectTerm(item) {
      this.$emit("on-blur");
      this.searchResults = [];
      this.searchTerm = item.charAt(0).toUpperCase() + item.slice(1);
      this.hasFocus = false;

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

<style scoped>
#text-search {
  background-image: url("/icn-search.svg");
  background-repeat: no-repeat;
  background-size: 28px;
  background-position: 10px 10px;
}
</style>