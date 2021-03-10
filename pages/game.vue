<template>
  <div id="app" class="pt-6 h-full flex justify-center items-center">
    <div class="flex justify-center items-center" v-if="!instructions">
      <div class="bg-white p-10 rounded-md shadow-lg">
        <h1 class="text-3xl text-blue-900 font-bold">Play the Emoji Game!</h1>
        <p class="text-xl text-blue-900">Instructions</p>
        <ul class="my-6">
          <li class="mb-4">
            Select a camera feed of your choice from the drop down
          </li>
          <li class="mb-4">Click “Play” to start a new round</li>
          <li class="mb-4">
            Capture the correct image that matches the emoji displayed
          </li>
          <li class="mb-4">
            You can skip an emoji during a round if you can’t find the
            corresponding object around you to capture
          </li>
          <li class="mb-4">
            Click ‘Predict Image’ to compare your captured image against the
            emoji
          </li>
          <li class="mb-4">
            You gain 10 points for a correct prediction and lose 5 points for a
            wrong prediction
          </li>
          <li class="mb-4">If the clock runs out, it's Game Over!</li>
          <li class="text-xs">DISCLAIMER: THIS GAME KINDA SUCKS</li>
        </ul>
        <div class="mt-6">
          <button class="btn btn-blue" href="#" role="button" @click="login()">
            Start Game
          </button>
        </div>
      </div>
    </div>
    <!-- The emoji game -->
    <div class="container mt-5" v-else>
      <div class="grid grid-cols-3 gap-10 items-center">
        <div class="">
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

        <div class="text-2xl text-blue-900 justify-self-center">
          Countdown : {{ timerStart }}
        </div>
        <div class="text-2xl text-blue-900 justify-self-center">
          Total Score: {{ totalScore }}
        </div>
      </div>
      <div class="my-6" v-if="gameOver">
        <button class="btn btn-blue" @click="startNewGame()">
          Start New Game
        </button>
      </div>
      <div class="row my-6" v-else>
        <div class="col-md-6">
          <button
            class="btn btn-green w-48"
            :disabled="inPlay"
            @click="playGame()"
          >
            <div class="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 stroke-current inline-block mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Play</span>
            </div>
          </button>
          &nbsp;
          <button
            class="btn btn-red w-48"
            :disabled="!inPlay"
            @click="skipEmoji()"
          >
            <div class="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 mr-2 inline-block stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
              <span>Skip Emoji</span>
            </div>
          </button>
        </div>
      </div>
      <!-- row -->
      <div class="flex gap-10">
        <div class="w-full h-full overflow-hidden rounded-t-md">
          <div>
            <video autoplay id="video1" ref="video1"></video>
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
            <div class="">
              <img
                class="w-48"
                id="usercapture"
                ref="usercapture"
                src="http://via.placeholder.com/150x150"
                width="200"
                height="200"
              />
              <div class="">
                <button
                  class="btn btn-green rounded-none rounded-b-md w-48"
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
            <div class="col-md-6">
              <p class="currentEmoji w-48 text-center">
                {{ currentEmoji.char }}
              </p>
            </div>
          </div>
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
      instructions: false,
      videoSources: [],
      selectedSource: null,
      totalScore: 0,
      currentEmoji: {},
      imageURL: null,
      predictingImage: false,
      gCloudVisionUrl:
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBqHINyqX2rb2v7MddQ9fwDDE--fX-hnTE",
      timerHandle: null,
      timerStart: 60,
      pointsIncrement: 10,
      pointsDecrement: 5,
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
  computed: {
    gameEmojis() {
      return emojis.filter((emoji) => {
        return (
          emoji.category.includes("Objects") &&
          emoji.char.charCodeAt(0) != 55358
        );
      });
    },
  },
  methods: {
    // Log the user in
    login() {
      this.instructions = true;
      // this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
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
      this.showModal("Error", error.message);
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
      console.log(this.imageURL);
      if (this.imageURL) {
        let requestBody = {
          requests: [
            {
              image: {
                content: this.imageURL,
              },
              features: [
                {
                  type: "LABEL_DETECTION",
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
          let predictionResponse = predictionResults.data.responses[0];
          let annotations = predictionResponse.labelAnnotations;
          let allLabelDescriptions = annotations.map((annotation) =>
            annotation.description.toLowerCase()
          );

          //Check if any of the prediction labels match the current emoji
          let match = false;
          allLabelDescriptions.forEach((description) => {
            if (this.currentEmoji.name.includes(description)) {
              match = true;
            }
          });

          if (match == true) {
            this.totalScore += this.pointsIncrement;
            this.resetTimer();
            this.showModal(
              "Correct Answer",
              `<p class="mb-6">Congratulations, you have gained ${this.pointsIncrement} points!</p>
              <p>Your total score is now ${this.totalScore}</p>`
            );
          } else {
            this.totalScore -= this.pointsDecrement;
            this.showModal(
              "Wrong Answer",
              `<p class="mb-6">The answer you game was incorrect.</p>
              <p class="mb-6">Your captured image suggested the following: ${allLabelDescriptions}</p>
              <p class="mb-6">You have lost ${this.pointsDecrement} points.</p>
              <p class="mb-6">Your total is now ${this.totalScore}</p>
              `
            );
          }

          this.predictingImage = false;
        } catch (error) {
          this.handleError(error);
        }
      } else {
        this.showModal("Error", "You are yet to capture an image");
      }
    },
    switchEmoji() {
      let emojiIndex = this.getRandomInt(0, this.gameEmojis.length);
      this.currentEmoji = this.gameEmojis[emojiIndex];
    },
    setTimer() {
      this.resetTimer();
      this.timerHandle = setInterval(() => {
        if (this.timerStart > 0) {
          this.timerStart -= 1;
        } else {
          //Game Over
          this.endGame();
        }
      }, 1000);
    },
    resetTimer() {
      //Stop the Clock
      clearInterval(this.timerHandle);
      this.timerStart = 60;
    },
    endGame() {
      clearInterval(this.timerHandle);
      this.inPlay = false;
      this.gameOver = true;
      this.showModal(
        "Game Over",
        `<p>You could not complete the task before the time ran out.</p>
        <p>Your total score is <span class="font-bold">${this.totalScore}</span></p>
        <p class="my-6 font-bold text-xl">Thanks for playing!</p>`
      );
    },
    startNewGame() {
      this.imageURL = null;
      this.totalScore = 0;
      this.gameOver = false;
      this.currentEmoji = {};
    },
    showModal(title, body) {
      this.modal = {
        show: true,
        header: title,
        content: body,
      };
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