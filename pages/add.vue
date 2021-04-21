/*  =============================
    THIS PAGE IS NO LONGER USED
    ============================= */

<template>
  <div
    style="min-height: calc(100% - 0px); color: #95a2b8"
    class="relative flex flex-col p-4 transition duration-150 ease-in bg-white md:pb-4 md:p-8 bg-opacity-70"
  >
    <div class="relative mb-4 text-center">
      <nuxt-link to="/medications" class="absolute top-0 left-0">
        <svg
          class="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </nuxt-link>
      <h1 class="text-2xl font-semibold text-center text-blue-900">
        {{ captureOption === "photo" ? "Add Photo" : "Text Search" }}
      </h1>
    </div>

    <div class="flex mb-4">
      <button
        @click="() => (captureOption = 'text')"
        :disabled="searched"
        :style="`${
          captureOption === 'text'
            ? 'background-color: #95a2b8; color: #F4F4F4;'
            : 'background-color: #F4F4F4; color: #95a2b8;'
        }`"
        :class="[
          `py-4 w-1/2 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed`,
        ]"
      >
        <svg
          class="w-6 h-6 mx-auto stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <button
        @click="() => (captureOption = 'photo')"
        :disabled="searched"
        :style="`${
          captureOption === 'photo'
            ? 'background-color: #95a2b8; color: #F4F4F4;'
            : 'background-color: #F4F4F4; color: #95a2b8;'
        }`"
        :class="[
          ` py-4 w-1/2 disabled:opacity-50 rounded-r-md disabled:cursor-not-allowed`,
        ]"
      >
        <svg
          class="w-6 h-6 mx-auto stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
    <!-- select buttons -->

    <div class="flex flex-col flex-1 mb-4">
      <div v-if="captureOption === 'photo'" class="flex flex-col flex-1">
        <form
          v-if="!imgPreview"
          class="relative flex flex-1 w-full col-span-2 p-4 mx-auto mb-4 text-gray-700 bg-gray-200"
          @submit.prevent="onSubmit"
          enctype="multipart/form-data"
        >
          <button
            v-show="imgPreview"
            class="absolute top-10 right-10"
            @click="removeImage"
            type="button"
          >
            <svg
              class="w-6 h-6"
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
          <div
            class="flex items-center justify-center flex-1 text-gray-700 border-2 border-gray-400 border-dashed"
          >
            <div v-if="!imgSrc" class="w-full h-full">
              <input
                class="hidden box__file"
                type="file"
                name="files[]"
                id="file"
                capture="environment"
                accept="image/*"
                @change="loadFile"
              />
              <label
                id="drag-drop-target"
                for="file"
                class="flex items-center justify-center w-full h-full text-center cursor-pointer"
              >
                <div>
                  <div>
                    <h2 class="text-2xl font-bold">Choose a file</h2>
                    <p class="text-xl">or drag one here</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-8 h-8 mx-auto mt-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
              </label>
            </div>
          </div>
        </form>
        <!-- image upload -->

        <div v-else class="flex flex-col flex-1 mb-4">
          <div class="flex flex-1 p-4 bg-gray-200">
            <div
              class="relative flex items-center justify-center flex-1 p-4 border-2 border-gray-400 border-dashed"
            >
              <img
                v-if="imgPreview"
                :src="imgPreview"
                alt=""
                :class="[
                  `mx-auto object-cover ${
                    loading ? 'opacity-40' : 'opacity-100'
                  }`,
                ]"
                id="output"
              />
              <h1
                v-if="loading"
                class="absolute left-0 right-0 z-10 text-2xl font-bold text-center transform -translate-y-1/2 top-50"
              >
                Loading...
              </h1>
            </div>
          </div>
        </div>
        <!-- image preview -->

        <div v-if="results.length">
          <p class="text-gray-700">Select items to search:</p>
          <ul>
            <li
              v-for="result in results"
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
        </div>
        <!-- results list -->

        <div>
          <div v-if="selected">
            <button
              v-if="results.length === 0"
              @click="onSubmit"
              style="background-color: #95a2b8"
              class="w-full h-16 mb-4 text-2xl font-semibold tracking-wider text-white rounded-md shadow-md"
            >
              Analyze
            </button>

            <button
              v-else
              @click="getSearchResults"
              style="background-color: #95a2b8"
              class="w-full h-16 mb-4 text-2xl font-semibold tracking-wider text-white rounded-md shadow-md disabled:bg-gray-300 disabled:text-gray-700"
              :disabled="selectedResults.length === 0"
            >
              Find Medicine
            </button>

            <button
              @click="removeImage"
              class="w-full h-16 text-2xl font-semibold tracking-wider text-gray-700 border border-gray-700 rounded-md shadow-md"
            >
              Retake
            </button>
          </div>
        </div>

        <div v-if="searched" class="flex flex-col flex-1">
          <div class="flex flex-col flex-1 mb-4">
            <div class="flex flex-wrap w-full mb-4 -mx-2">
              <button
                v-for="item in searchResults"
                :key="item"
                class="flex items-center h-10 px-4 py-1 m-2 uppercase bg-gray-300 rounded-md"
                @click="removeSelectedItem(item)"
              >
                {{ item }}
                <svg
                  class="w-4 h-4 ml-4"
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

            <div class="flex flex-col flex-1">
              <h2 class="text-gray-700">Select Medication</h2>
              <div class="flex items-center justify-center flex-1 bg-gray-200">
                <div
                  v-if="suggestedMedications.length === 0"
                  class="py-8 text-xl text-center"
                >
                  <p>Your search returned no results.</p>
                </div>
                <div v-else>
                  <div
                    v-for="(med, index) in suggestedMedications"
                    :key="index"
                  >
                    medicine {{ index }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              @click="removeImage"
              class="w-full h-16 text-2xl font-semibold tracking-wider text-gray-700 border border-gray-700 rounded-md shadow-md"
            >
              Retake
            </button>
          </div>
        </div>
      </div>
      <!-- photo search -->

      <div v-else-if="captureOption === 'text'" class="w-full">
        <div class="mb-4">
          <label class="text-sm" for="name">Medication</label>
          <vue-simple-suggest
            v-model="chosen"
            display-attribute="name"
            value-attribute="url"
            :filter-by-query="true"
            :list="getSuggestionList"
          >
          </vue-simple-suggest>
        </div>

        <div>
          <button
            style="background-color: #95a2b8"
            class="w-full h-16 text-2xl text-white btn"
            @click="getSearchResults"
          >
            Search
          </button>
        </div>

        <div v-if="searched">
          <div v-if="searchResults.length" class="w-full h-full mt-6">
            <!-- <div
              v-for="result in searchResults"
              :key="result.name"
              class="grid grid-rows-2 mb-4 overflow-hidden bg-white border border-gray-300 rounded-md last:mb-0"
              @click="addMedication(result)"
            >
              <div class="w-full h-full">
                <img
                  src="/results-pill.png"
                  alt="pill image"
                  class="object-cover h-full"
                />
              </div>
              <div class="flex flex-col w-full h-full p-4 mb-4">
                <div class="flex-1 text-gray-800">
                  <h2 class="text-xl font-bold">{{ result.name }}</h2>
                  <p>{{ result.description }}</p>
                </div>
                <div>
                  <button class="w-full btn btn-blue">Add</button>
                </div>
              </div>
            </div> -->
            <medication-result
              v-for="result in searchResults"
              :key="result.name"
              :medication="result"
            />
          </div>

          <div v-else>your search returned no results</div>
        </div>
        <!-- search results -->
      </div>
      <!-- text search -->

      <!-- <div v-else class="flex w-full">
        <qrcode-stream v-if="!qrResult" @decode="onDecode"></qrcode-stream>
        <div v-if="qrResult" class="flex-1">
          <h1 class="text-2xl font-bold">Your medication is:</h1>
          <p class="flex items-center font-semibold h-2/3">{{ qrResult }}</p>

          <button
            @click="onFindMeds"
            class="w-full h-16 mb-4 text-2xl font-semibold tracking-wider text-white bg-blue-700 rounded-md shadow-md disabled:bg-gray-300 disabled:text-gray-700"
            :disabled="!qrResult"
          >
            Find Medicine
          </button>

          <button
            @click="() => (qrResult = null)"
            class="w-full h-16 text-2xl font-semibold tracking-wider text-gray-700 border border-gray-700 rounded-md shadow-md"
          >
            Retake
          </button>
        </div>
      </div> -->
    </div>
    <!-- capture options -->
  </div>
</template>

<script>
import axios from "axios";
import { blackList, whiteList } from "~/lib/words";

// import MedicationResult from "../components/MedicationResult.vue";

export default {
  layout: "welcome",
  components: {
    // MedicationResult,
  },
  data() {
    return {
      captureOption: "photo",
      imgSrc: null,
      imgPreview: null,
      hasAdvanced: false,
      loading: false,
      selected: false,
      searched: false,
      results: [],
      selectedResults: [],
      suggestedMedications: [],
      gCloudVisionUrl:
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBqHINyqX2rb2v7MddQ9fwDDE--fX-hnTE",
      blackList: null,
      whiteList: null,
      qrResult: null,
      chosen: null,
      text: null,
      searchResults: [],
    };
  },
  mounted() {
    this.hasAdvanced = this.isAdvancedUpload();
    this.blackList = blackList;
    this.whiteList = whiteList;

    const target = document.getElementById("drag-drop-target");

    target.addEventListener("drop", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        this.imgSrc = base64String;
      };

      reader.readAsDataURL(e.dataTransfer.files[0]);
      this.imgPreview = URL.createObjectURL(e.dataTransfer.files[0]);
      this.selected = true;

      console.log(e.dataTransfer.files);
    });

    target.addEventListener("dragover", (e) => {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = "copy";
    });
  },
  methods: {
    loadFile(event) {
      let image = document.getElementById("output");
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        this.imgSrc = base64String;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.imgPreview = URL.createObjectURL(event.target.files[0]);
      this.selected = true;
    },
    isAdvancedUpload() {
      var div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    async onSubmit(e) {
      this.loading = true;

      if (this.imgSrc) {
        let requestBody = {
          requests: [
            {
              image: {
                content: this.imgSrc,
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
          this.predictingImage = true;
          let predictionResults = await axios.post(
            this.gCloudVisionUrl,
            requestBody
          );

          this.results = [
            ...predictionResults.data.responses[0].textAnnotations.map((r) =>
              r.description.toLowerCase()
            ),
          ];
          console.log(this.results);

          this.results.forEach((result, index) => {
            this.results[index] = result
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

          const filtered = this.results
            .filter(checkBlacklist)
            .filter(checkWhitelist)
            .reduce(
              (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
              []
            );

          console.log("filtered", filtered);

          // this.results = [...filtered1];

          this.results = [...filtered];

          this.predictingImage = false;
        } catch (error) {
          console.log(error);
          // this.handleError(error);
        } finally {
          this.loading = false;
        }
      } else {
        console.error("You have not captured an image");
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
    removeImage() {
      this.imgSrc = null;
      this.imgPreview = null;
      this.results = [];
      this.selectedResults = [];
      this.selected = false;
      this.searched = false;
    },
    removeSelectedItem(term) {
      if (this.selectedResults.includes(term)) {
        const termIndex = this.selectedResults.indexOf(term);
        this.selectedResults.splice(termIndex, 1);
      }
    },
    onFindMeds() {
      this.searched = true;
      this.$nextTick(() => {
        window.scrollTo(0, 0);
        console.log("bro");
      });
    },
    onDecode(decoded) {
      console.log(decoded);
      this.qrResult = decoded;
    },
    getSuggestionList() {
      return this.whiteList;
    },
    addMedication(newMed) {
      this.$store.commit("ADD_MEDICATION", newMed);
      this.$router.push("/medications");
    },
    async getSearchResults() {
      this.searched = true;
      try {
        this.searchResults = await this.$store.dispatch("searchMeds");
        console.log(this.searchResults);
      } catch (e) {
        console.error("oh no");
      }
    },
  },
};
</script>

<style>
.box__uploading,
.box__success,
.box__error {
  display: none;
}

.box.is-dragover {
  background-color: grey;
}

.box.is-uploading .box__input {
  visibility: none;
}
.box.is-uploading .box__uploading {
  display: block;
}

.box {
  font-size: 1.25rem; /* 20 */
  background-color: #c8dadf;
  position: relative;
  padding: 100px 20px;
}
.box.has-advanced-upload {
  outline: 2px dashed #92b0b3;
  outline-offset: -10px;

  -webkit-transition: outline-offset 0.15s ease-in-out,
    background-color 0.15s linear;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
}
.box.is-dragover {
  outline-offset: -20px;
  outline-color: #c8dadf;
  background-color: #fff;
}
.box__dragndrop,
.box__icon {
  display: none;
}
.box.has-advanced-upload .box__dragndrop {
  display: inline;
}
.box.has-advanced-upload .box__icon {
  width: 100%;
  height: 80px;
  fill: #92b0b3;
  display: block;
  margin-bottom: 40px;
}

.box.is-uploading .box__input,
.box.is-success .box__input,
.box.is-error .box__input {
  visibility: hidden;
}

.box__uploading,
.box__success,
.box__error {
  display: none;
}
.box.is-uploading .box__uploading,
.box.is-success .box__success,
.box.is-error .box__error {
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;

  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.box__uploading {
  font-style: italic;
}
.box__success {
  -webkit-animation: appear-from-inside 0.25s ease-in-out;
  animation: appear-from-inside 0.25s ease-in-out;
}
@-webkit-keyframes appear-from-inside {
  from {
    -webkit-transform: translateY(-50%) scale(0);
  }
  75% {
    -webkit-transform: translateY(-50%) scale(1.1);
  }
  to {
    -webkit-transform: translateY(-50%) scale(1);
  }
}
@keyframes appear-from-inside {
  from {
    transform: translateY(-50%) scale(0);
  }
  75% {
    transform: translateY(-50%) scale(1.1);
  }
  to {
    transform: translateY(-50%) scale(1);
  }
}

.box__restart {
  font-weight: 700;
}
.box__restart:focus,
.box__restart:hover {
  color: #39bfd3;
}

.js .box__file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.js .box__file + label {
  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
}
.js .box__file + label:hover strong,
.box__file:focus + label strong,
.box__file.has-focus + label strong {
  color: #39bfd3;
}
.js .box__file:focus + label,
.js .box__file.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
.js .box__file + label * {
  /* pointer-events: none; */ /* in case of FastClick lib use */
}

.no-js .box__file + label {
  display: none;
}

.no-js .box__button {
  display: block;
}
.box__button {
  font-weight: 700;
  color: #e5edf1;
  background-color: #39bfd3;
  display: none;
  padding: 8px 16px;
  margin: 40px auto 0;
}
.box__button:hover,
.box__button:focus {
  background-color: #0f3c4b;
}
</style>