<template>
  <div
    ref="content"
    id="content"
    class="grid h-full grid-cols-1 grid-rows-2 m-0 md:grid-cols-2 md:grid-rows-1"
  >
    <div
      class="overflow-hidden bg-center bg-cover"
      style="background-image: url(/cube.png)"
    >
      <video
        loop
        playsinline
        autoplay
        muted
        ref="video"
        class="hidden object-cover object-center w-full h-full -z-1 md:block"
      >
        <source src="/logo.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="z-10 flex pt-10 bg-white md:flex-col md:justify-center">
      <div class="w-full mx-auto">
        <h1
          class="mb-8 text-2xl font-bold tracking-wider text-center text-green-600 md:text-3xl"
        >
          WELCOME
        </h1>
        <div class="w-2/3 mx-auto text-lg">
          <div
            v-show="!isUsingEmail"
            class="flex flex-col justify-center text-base md:text-base lg:text-lg"
          >
            <button
              @click="() => (isUsingEmail = true)"
              style="
                background-image: url(/envelope.svg);
                background-size: 30px;
                background-repeat: no-repeat;
                background-position: 0.8rem 50%;
              "
              class="w-full px-3 py-3 mx-auto mb-4 text-base tracking-wide text-white bg-green-600 rounded-sm shadow-none pl-14 btn h-14 md:mb-4 md:py-4 md:w-2/3 whitespace-nowrap hover:bg-green-700"
            >
              Sign in with Email
            </button>

            <button
              class="w-full mb-4 text-base bg-gray-200 rounded-sm shadow-none pl-14 btn h-14 md:mb-4 md:py-4 md:w-2/3 md:mx-auto align-items whitespace-nowrap hover:bg-gray-300"
              style="
                background-image: url(/google-icon.svg);
                background-size: 26px;
                background-repeat: no-repeat;
                background-position: 0.8rem 50%;
                color: #8d8d8d;
              "
              @click="signinWithGoogle"
            >
              Sign in with Google
            </button>
            <button
              class="w-full mx-auto text-base text-white bg-black rounded-sm shadow-none pl-14 btn h-14 md:py-4 md:w-2/3 whitespace-nowrap"
              style="
                background-image: url(/apple-icon.svg);
                background-size: 22px;
                background-repeat: no-repeat;
                background-position: 0.8rem 50%;
              "
              @click="() => null"
            >
              Sign in with Apple
            </button>
            <p class="w-full mx-auto text-xs text-gray-600 md:w-2/3">
              This costs money, so no Apple yet.
            </p>
          </div>

          <form
            v-show="isUsingEmail"
            class="w-full mx-auto md:w-3/4"
            @submit.prevent="signin"
          >
            <div class="relative">
              <div
                class="absolute inset-y-0 flex items-center pl-3 text-green-600 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <input
                class="w-full h-10 pl-12 placeholder-gray-600 border border-gray-600 rounded-md"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="mb-4 text-base text-red-600"></div>

            <button
              type="submit"
              class="w-full px-3 py-3 tracking-wide text-white bg-green-600 rounded-sm shadow-none btn md:py-4 text-md"
            >
              Send my Sign In Link
            </button>

            <div class="relative flex justify-center mt-6 mb-5">
              <div
                class="absolute left-0 right-0 border border-green-600 top-1/2 -z-1"
              ></div>
              <div class="z-10 px-4 text-center bg-white">or</div>
            </div>

            <button
              type="button"
              @click="() => (isUsingEmail = false)"
              class="w-full text-sm text-green-600"
            >
              Choose another way to sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, GoogleProvider } from "~/services/fireinit";

export default {
  data() {
    return {
      isUsingEmail: false,
      email: null,
      provider: null,
    };
  },

  created() {
    this.provider = GoogleProvider;

    auth
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        this.$store.commit("SET_USER", result.user);
        this.$router.push("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  },
  methods: {
    async signin() {
      localStorage.setItem("email", this.email);

      const actionCodeSettings = {
        url: `${location.origin}/authenticate`,
        handleCodeInApp: true,
      };

      try {
        await auth.sendSignInLinkToEmail(this.email, actionCodeSettings);

        this.$router.push("/email");
      } catch (error) {
        console.error(error);
      }
    },
    signinWithGoogle() {
      auth.signInWithRedirect(this.provider);
    },
  },
};
</script>

<style>
#content {
  min-height: 100%;
}
</style>
