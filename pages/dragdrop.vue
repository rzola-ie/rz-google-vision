<template>
  <div
    class="relative min-h-full p-4 md:p-8 grid grid-rows-3 grid-cols-2 md:grid-rows-2 gap-5"
  >
    <form
      class="relative col-span-2 w-full mx-auto bg-gray-200 p-6 text-gray-700"
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
          class="h-6 w-6"
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
        :class="[
          `min-h-full p-6 border-2 ${
            imgSrc ? 'border-green-600' : 'border-gray-400'
          } border-dashed flex items-center justify-center`,
        ]"
      >
        <div v-if="!imgSrc">
          <input
            class="box__file hidden"
            type="file"
            name="files[]"
            id="file"
            data-multiple-caption="{count} files selected"
            multiple
            @change="loadFile"
          />
          <label for="file" class="text-center cursor-pointer">
            <div class="font-bold text-2xl">Choose a file</div>
            <div v-if="hasAdvanced">or drag it here</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-8 w-8 mx-auto mt-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </label>
        </div>
        <div v-else>
          <img
            v-if="imgPreview"
            :src="imgPreview"
            alt=""
            class="mx-auto object-cover"
            id="output"
          />
          <button
            type="submit"
            class="font-semibold text-2xl h-full w-full px-4 rounded-b-md bg-green-400 bg-opacity-90 text-green-900 shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg transition ease-in duration-200"
          >
            Analyze
            <svg
              class="h-6 w-6 inline-block ml-2 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="box__uploading">Uploading…</div>
      <div class="box__success">Done!</div>
      <div class="box__error">Error! <span></span>.</div>
    </form>
    <!-- form -->

    <!-- <div class="h-full w-full p-6 bg-gray-200">
      <div
        :class="[
          `w-full h-full border-2  ${
            imgPreview ? 'border-green-600' : 'border-gray-400'
          } border-dashed overflow-hidden flex items-center justify-center`,
        ]"
      >
        <img
          v-if="imgPreview"
          :src="imgPreview"
          alt=""
          class="mx-auto object-cover"
          id="output"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-20 w-20 mx-auto text-gray-400 stroke-current"
          v-else
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div> -->
    <!-- image preview -->

    <div
      id="results"
      class="h-full w-full bg-gray-200 p-6 col-span-2 md:col-span-1"
    >
      <div
        class="h-full w-full bg-gray-200 p-6 border-2 border-gray-400 border-dashed"
      >
        <div class="flex items-center justify-center">
          <h1 class="text-2xl inline-block text-center">Results</h1>
          <svg
            class="h-6 w-6 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div class="flex-1">
          <div
            v-if="loading"
            class="h-full w-full flex items-center justify-center"
          >
            Loading...
          </div>
          <ul v-if="results && !loading">
            <li
              v-for="result in results.slice(1, 10)"
              :key="result.description.toLowerCase()"
            >
              <input
                type="checkbox"
                :name="result.description.toLowerCase()"
                id=""
                :value="result.description.toLowerCase()"
                v-model="selectedResults"
              />
              <label :for="result.description.toLowerCase()">{{
                result.description.toLowerCase()
              }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- results list -->

    <div class="h-full w-full bg-gray-200 p-6 col-span-2 md:col-span-1">
      <div
        class="h-full w-full bg-gray-200 p-6 border-2 border-gray-400 border-dashed"
      >
        <div class="flex items-center justify-center">
          <h1 class="text-2xl inline-block text-center">Selected</h1>
          <svg
            class="h-6 w-6 inline-block ml-2"
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
        </div>
        <div class="flex-1">
          <ul>
            <li v-for="item in selectedResults" :key="item" class="text-xl">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- selected list -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "welcome",
  data() {
    return {
      imgSrc: null,
      imgPreview: null,
      hasAdvanced: false,
      loading: false,
      results: [],
      selectedResults: [],
      gCloudVisionUrl:
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBqHINyqX2rb2v7MddQ9fwDDE--fX-hnTE",
    };
  },
  mounted() {
    this.hasAdvanced = this.isAdvancedUpload();
    console.log(this.hasAdvanced);
  },
  methods: {
    loadFile(event) {
      let image = document.getElementById("output");
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        console.log("imgData", base64String);
        this.imgSrc = base64String;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.imgPreview = URL.createObjectURL(event.target.files[0]);
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
      var elmnt = document.getElementById("results");
      elmnt.scrollIntoView();

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
                  maxResults: 10,
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
          this.results = predictionResults.data.responses[0].textAnnotations;
          // let annotations = predictionResponse.labelAnnotations;
          // let allLabelDescriptions = annotations.map((annotation) =>
          //   annotation.description.toLowerCase()
          // );

          //Check if any of the prediction labels match the current emoji
          console.log(this.results);

          // allLabelDescriptions.forEach((description) => {
          //   console.log(description);
          // });

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
      // this.selectedResults.push(term);
    },
    removeImage() {
      this.imgSrc = null;
      this.imgPreview = null;
      this.results = [];
      this.selectedResults = [];
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