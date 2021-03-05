<template>
  <div id="app" class="pt-6 h-full flex justify-center items-center">
    <!-- The emoji game -->
    <div class="container mt-5">
      <div class="grid grid-cols-3 gap-10 items-center">
        <div class="mb-10">
          <select
            class="h-12 w-full rounded-md shadow-md"
            v-model="selectedSource"
            @change="getStream()"
          >
            <option
              v-for="source in videoSources"
              :key="source.id"
              :value="source.id"
            >
              {{ source.text }}
            </option>
          </select>
        </div>
      </div>

      <!-- row -->
      <div class="flex gap-10">
        <div class="w-full h-full overflow-hidden rounded-t-md">
          <div>
            <video autoplay id="video1" ref="video1" class="w-full"></video>
            <canvas style="display: none" id="canvas1" ref="canvas1"></canvas>
          </div>
          <div class="mb-6">
            <button
              class="btn rounded-none rounded-b-md w-full bg-blue-500 text-blue-100 flex justify-center items-center"
              @click="captureImage()"
            >
              <div>
                <svg
                  class="h-6 w-6 mr-2 stroke-current inline-block"
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
                <span>Capture Image</span>
              </div>
            </button>
          </div>
        </div>
        <div class="w-full">
          <div>
            <div class="mb-6">
              <img
                class="w-48 mb-6"
                id="usercapture"
                ref="usercapture"
                src="http://via.placeholder.com/150x150"
                width="200"
                height="200"
              />
              <div class="mt-2">
                <button
                  class="btn btn-green w-48"
                  @click="predictImage()"
                  :disabled="predictingImage"
                >
                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="w-6 h-6 mr-2 stroke-current inline-block"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span>{{
                      predictingImage ? "Please Wait..." : "Predict Image"
                    }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <h2 class="text-3xl">Results</h2>
          <ul>
            <li
              v-for="(result, index) in predictionResponse.slice(1, 11)"
              :key="index"
              class="mb-2"
            >
              {{ result.description }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Modal -->
      <modal
        v-if="modal.show"
        @close="modal.show = false"
        :header="modal.header"
        :content="modal.content"
      ></modal>
    </div>
  </div>
</template> 

<script>
import axios from "axios";
import emojis from "emoji.json";

export default {
  name: "app",
  layout: "welcome",
  data() {
    return {
      videoSources: [],
      selectedSource: null,
      imageURL: null,
      predictingImage: false,
      predictionResponse: [],
      gCloudVisionUrl:
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBqHINyqX2rb2v7MddQ9fwDDE--fX-hnTE",
      timerHandle: null,
      timerStart: 60,
      inPlay: false,
      gameOver: false,
      modal: {
        show: false,
        header: "My header",
        content: "My Content",
      },
    };
  },
  mounted() {
    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices)
      .catch(this.handleError);
  },
  methods: {
    gotDevices(deviceInfos) {
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];

        if (deviceInfo.kind === "videoinput") {
          let option = {};

          option.id = deviceInfo.deviceId;
          option.text = deviceInfo.label || "camera " + (i - 1);

          this.videoSources.push(option);
        }
      }
    },
    async getStream() {
      if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }

      var constraints = {
        video: {
          deviceId: {
            exact: this.selectedSource,
          },
        },
      };

      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(this.gotStream)
        .catch((error) => {
          console.log(error);
        });
    },
    gotStream(stream) {
      this.$refs.video1.srcObject = stream;
    },
    handleError(error) {
      console.log(error);
    },
    playGame() {
      //Get Random Emoji
      this.switchEmoji();
      this.inPlay = true;

      //Start timer countdown
      this.setTimer();
    },
    skipEmoji() {
      this.switchEmoji();
      this.imageURL = null;
    },
    captureImage() {
      let canvas = this.$refs.canvas1;
      let videoElement = this.$refs.video1;

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d").drawImage(videoElement, 0, 0);

      let imgElement = this.$refs.usercapture;

      // Get image
      let image = canvas.toDataURL("image/png");

      //Trim signature to get pure image data
      this.imageURL = image.replace(/^data:image\/(png|jpg);base64,/, "");

      //Set the image element to the data url
      imgElement.src = image;
    },
    async predictImage() {
      if (this.imageURL) {
        let requestBody = {
          requests: [
            {
              image: {
                content: this.imageURL,
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                  maxResults: 100,
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
          this.predictionResponse =
            predictionResults.data.responses[0].textAnnotations;
          // let annotations = predictionResponse.labelAnnotations;
          // let allLabelDescriptions = annotations.map((annotation) =>
          //   annotation.description.toLowerCase()
          // );

          //Check if any of the prediction labels match the current emoji
          console.log(this.predictionResponse);

          // allLabelDescriptions.forEach((description) => {
          //   console.log(description);
          // });

          this.predictingImage = false;
        } catch (error) {
          this.handleError(error);
        }
      } else {
        console.error("You have not captured an image");
      }
    },
    startNewGame() {
      this.imageURL = null;
      this.totalScore = 0;
      this.gameOver = false;
      this.currentEmoji = {};
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
    
<style scoped>
#video1 {
  height: 400px;
  background-color: black;
}
.currentEmoji {
  font-size: 120px;
}
.user-details {
  color: white;
}
</style>