<template>
  <div
    class="relative min-h-full p-4 md:p-8 bg-white bg-opacity-70 text-blue-900 flex flex-col"
  >
    <div class="relative mb-4 text-center">
      <nuxt-link to="/medications" class="absolute left-0 top-0">
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
      <h1 class="text-2xl text-blue-900 font-semibold text-center">
        {{ captureOption === "photo" ? "Add Photo" : "Text Search" }}
      </h1>
    </div>

    <div class="flex mb-4">
      <button
        @click="() => (captureOption = 'text')"
        :class="[
          `${
            captureOption === 'text'
              ? 'bg-blue-900 text-white'
              : 'bg-gray-300 text-blue-900'
          } py-4 w-1/2 rounded-l-md`,
        ]"
      >
        <svg
          class="mx-auto h-6 w-6 stroke-current"
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
        :class="[
          `${
            captureOption === 'photo'
              ? 'bg-blue-900 text-white'
              : 'bg-gray-300 text-blue-900'
          } py-4 w-1/2 rounded-r-md`,
        ]"
      >
        <svg
          class="mx-auto h-6 w-6 stroke-current"
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
    <!-- se;ect buttons -->

    <div class="flex flex-1">
      <div v-if="captureOption === 'photo'" class="flex flex-col flex-1 p-4">
        <form
          v-if="!imgPreview"
          class="relative p-4 mb-4 col-span-2 w-full mx-auto bg-gray-200 text-gray-700 flex flex-1"
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
              `flex items-center justify-center flex-1 text-gray-700 border-2 border-gray-400 border-dashed`,
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
          </div>
        </form>
        <!-- image upload -->

        <div v-else class="mb-4 flex-1 flex flex-col">
          <div class="p-4 bg-gray-200 flex-1">
            <div
              class="relative h-full p-4 border-2 border-gray-400 border-dashed flex items-center justify-center"
            >
              <img
                v-if="imgPreview && !loading"
                :src="imgPreview"
                alt=""
                class="mx-auto object-cover"
                id="output"
              />
            </div>
          </div>
        </div>
        <!-- image preview -->

        <div>
          <div v-if="selected">
            <button
              v-if="results.length === 0"
              @click="onSubmit"
              class="h-16 mb-4 w-full bg-blue-900 rounded-md text-2xl font-semibold tracking-wider text-white shadow-md"
            >
              Analyze
            </button>

            <button
              v-else
              class="h-16 mb-4 w-full bg-blue-700 rounded-md text-2xl font-semibold tracking-wider text-white shadow-md"
            >
              Find Medicine
            </button>

            <button
              @click="removeImage"
              class="h-16 w-full rounded-md text-2xl font-semibold tracking-wider text-gray-700 border border-gray-700 shadow-md"
            >
              Retake
            </button>
          </div>
        </div>
      </div>
      <!-- photo search -->

      <div v-else class="w-full">
        <form action="" class="w-full">
          <div>
            <label class="text-sm" for="name">Name</label>
            <input
              class="h-10 px-4 py-1 w-full shadow-sm"
              type="text"
              name="name"
              id=""
              placeholder="Search by name or brand"
            />
          </div>

          <div class="my-8 text-center text-2xl">Or</div>

          <div>
            <label class="text-sm" for="name">Imprint</label>
            <input
              class="h-10 px-4 py-1 w-full shadow-sm"
              type="text"
              name="name"
              id=""
            />
          </div>
        </form>
      </div>
      <!-- text search -->
    </div>
    <!-- capture options -->

    <div>
      <ul>
        <li
          v-for="{ description } in results.slice(1, 10)"
          :key="description"
          :class="[
            `px-8 py-4 text-2xl uppercase mb-2 last:mb-0 ${
              selectedResults.includes(description)
                ? 'bg-blue-900 bg-opacity-20'
                : ''
            }`,
          ]"
        >
          <input
            type="checkbox"
            class="mr-2"
            @change="addToList(description)"
          />
          <span>{{ description }}</span>
        </li>
      </ul>
    </div>
    <!-- results -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "welcome",
  data() {
    return {
      captureOption: "photo",
      imgSrc: null,
      imgPreview: null,
      hasAdvanced: false,
      loading: false,
      selected: false,
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