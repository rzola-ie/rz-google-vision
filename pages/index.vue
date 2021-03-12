<template>
  <div
    ref="content"
    class="m-0 h-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"
  >
    <div
      class="max-h-full overflow-hidden bg-cover bg-center"
      style="background-image: url(/cube.png)"
    >
      <video
        loop
        playsinline
        autoplay
        muted
        ref="video"
        class="h-full w-full object-cover object-center -z-1 hidden md:block"
      >
        <source src="/logo.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="flex bg-white z-10 pt-10 md:flex-col md:justify-center">
      <div class="w-full mx-auto">
        <h1
          class="text-center font-bold text-2xl md:text-3xl tracking-wide text-green-600 mb-0 md:mb-10"
        >
          WELCOME
        </h1>
        <div class="w-2/3 mx-auto text-lg">
          <p class="text-base md:text-lg text-center text-gray-700">
            Sign in... or don't
          </p>
          <p class="mb-5 text-xs pb-2 text-center text-gray-700">
            I'm not your mom
          </p>

          <div v-show="!isUsingEmail">
            <button
              @click="() => (isUsingEmail = true)"
              class="btn bg-green-600 text-white w-full h-14 shadow-none mb-4 px-3 py-3 md:mb-4 md:py-4 md:w-2/3 mx-auto rounded-sm tracking-wide text-xl flex justify-between align-items"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-7 w-7 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Sign in with Email
            </button>

            <button
              class="btn bg-gray-200 h-14 mb-4 md:mb-4 md:py-4 md:w-2/3 mx-auto rounded-sm shadow-none w-full flex justify-between align-items text-xl"
              style="color: #8d8d8d"
              @click="signinWithGoogle"
            >
              <img class="h-full" src="/google-icon.svg" alt="" />
              Sign in with Google
            </button>
            <button
              class="btn bg-black h-14 mb-4 md:mb-4 md:py-4 md:w-2/3 mx-auto rounded-sm shadow-none w-full flex justify-between align-items text-xl text-white"
              type="button"
              @click="() => null"
            >
              <img
                class="h-full"
                src="/apple-icon.svg"
                alt="sign in with apple"
              />
              Sign in with Apple
            </button>
          </div>

          <form
            v-show="isUsingEmail"
            class="mx-auto w-full md:w-3/4"
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
                  class="h-6 w-6 stroke-current"
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
                class="w-full h-10 border rounded-md border-gray-600 placeholder-gray-600 pl-12"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="text-red-600 text-base mb-4"></div>

            <button
              type="submit"
              class="btn bg-green-600 text-white w-full shadow-none px-3 py-3 md:py-4 rounded-sm tracking-wide text-md"
            >
              Send my Sign In Link
            </button>

            <div class="relative mt-6 mb-5 flex justify-center">
              <div
                class="absolute top-1/2 left-0 right-0 border border-green-600 -z-1"
              ></div>
              <div class="text-center px-4 bg-white z-10">or</div>
            </div>

            <button
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
        iOS: {
          bundleId: "com.example.ios",
        },
        android: {
          packageName: "com.example.android",
          installApp: true,
          minimumVersion: "12",
        },
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
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
