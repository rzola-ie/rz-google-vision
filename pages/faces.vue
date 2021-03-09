<template>
  <div>
    <div class="relative mx-auto my-5 flex justify-center items-center w-4/5">
      <video
        class="w-full bg-gray-200 rounded-sm"
        autoplay
        id="video1"
        ref="video1"
      ></video>
      <canvas style="display: none" id="canvas1" ref="canvas1"></canvas>

      <div class="video-options absolute top-2 left-2">
        <select
          class="px-10 py-3 rounded-md shadow-md"
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

      <img class="screenshot-image d-none" alt="" />

      <div class="absolute flex top-2 right-2 controls text-white">
        <button
          class="p-2 bg-green-500 rounded-full shadow-md"
          @click="playStream"
          title="Play"
          ref="play"
        >
          <svg
            class="h-8 w-8 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
        </button>
        <button
          class="hidden p-2 bg-red-500 rounded-full shadow-md"
          @click="stopStream"
          title="Stop"
          ref="stop"
        >
          <svg
            class="h-8 w-8 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
        </button>
        <button
          class="hidden p-2 bg-red-500 rounded-full shadow-md"
          @click="pauseStream"
          title="Pause"
          ref="pause"
        >
          <svg
            class="h-8 w-8 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          class="hidden p-2 ml-2 bg-blue-500 rounded-full shadow-md"
          title="ScreenShot"
          ref="capture"
          @click="captureImage"
        >
          <svg
            class="h-8 w-8 stroke-current"
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
    </div>
    <div class="relative mx-auto flex flex-col w-4/5">
      <div>
        <img
          class="block"
          id="usercapture"
          ref="usercapture"
          src="http://via.placeholder.com/150x150"
          width="200"
          height="200"
        />
        <button
          class="bg-blue-500 text-white p-5 rounded-b"
          @click="predictImage"
        >
          Analyze Face
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "welcome",
  data() {
    return {
      videoSources: [],
      currentStream: null,
      selectedSource: null,
      streamStarted: false,
      imageURL: null,
      predictingImage: false,
      gCloudVisionUrl:
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBqHINyqX2rb2v7MddQ9fwDDE--fX-hnTE",
      constraints: {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
        },
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
    async getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      for (var i = 0; i !== devices.length; ++i) {
        var deviceInfo = devices[i];

        if (deviceInfo.kind === "videoinput") {
          let option = {};

          option.id = deviceInfo.deviceId;
          option.text = deviceInfo.label || "camera " + (i - 1);

          this.videoSources.push(option);
        }
      }
    },
    gotDevices(deviceInfos) {
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];

        if (deviceInfo.kind === "videoinput") {
          let option = {};

          option.id = deviceInfo.deviceId;
          option.text = deviceInfo.label || "camera " + (i - 1);

          this.videoSources.push(option);
          // this.selectedSource = this.videoSources[0];
        }
      }
    },
    async getStream() {
      if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }

      await navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.gotStream)
        .catch((error) => {
          console.log(error);
        });
    },
    gotStream(stream) {
      // this.$refs.video1.srcObject = stream;
      this.currentStream = stream;
    },
    playStream() {
      if (this.streamStarted) {
        this.$refs.video1.play();
        this.$refs.play.classList.add("hidden");
        this.$refs.pause.classList.remove("hidden");
        return;
      }

      if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
          ...this.constraints,
          deviceId: {
            exact: this.selectedSource.value,
          },
        };
        this.startStream(updatedConstraints);
      }
    },
    async startStream(constraints) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.handleStream(stream);
    },
    handleStream(stream) {
      this.$refs.video1.srcObject = stream;
      this.$refs.play.classList.add("hidden");
      this.$refs.stop.classList.remove("hidden");
      this.$refs.pause.classList.remove("hidden");
      this.$refs.capture.classList.remove("hidden");
      this.streamStarted = true;
    },
    pauseStream() {
      this.$refs.video1.pause();
      this.$refs.play.classList.remove("hidden");
      this.$refs.stop.classList.add("hidden");
      this.$refs.pause.classList.add("hidden");
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
      if (!this.imageURL) {
        console.warn("no image selected duh");
        return;
      }
      // console.log(this.imageURL);
      const requestBody = {
        requests: [
          {
            image: {
              content: this.imageURL,
            },
            features: [
              {
                maxResults: 10,
                type: "FACE_DETECTION",
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

        console.log(predictionResults);

        // let predictionResponse = predictionResults.data.responses[0];
      } catch (e) {}
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
