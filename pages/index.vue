<template>
  <div
    class="relative m-0 h-screen grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"
  >
    <div class="h-full">
      <video
        loop
        playsinline
        autoplay
        muted
        ref="video"
        class="object-cover object-center -z-1 transform -translate-y-36"
      >
        <source src="/logo.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="flex items-center bg-white z-10">
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
          <p class="text-xs pb-2 text-center text-gray-700">I'm not your mom</p>

          <form class="mx-auto w-full md:w-3/4" @submit.prevent="signin">
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
              class="btn bg-green-600 text-white w-full mb-2 py-2 md:mb-4 md:py-4 rounded-md tracking-wide text-2xl"
            >
              Sign In
            </button>
          </form>

          <div class="text-center">
            <p class="font-bold text-gray-700">Don't Have an Account?</p>
            <div>
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 inline-block mr-2 text-green-600 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  /></svg
              ></span>
              <a class="text-green-600" href="tel:+18882345678"
                >Call 1-888-234-5678</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/services/fireinit";

export default {
  data() {
    return {
      email: null,
      signInEmail: null,
    };
  },
  created() {
    this.signInEmail = localStorage.getItem("email");
    const url = location.href;

    if (auth.isSignInWithEmailLink(url)) {
      auth.signInWithEmailLink(this.signInEmail, url);
    }
  },
  mounted() {
    // this.$refs.video.src = "/logo.mp4";
    this.$refs.video.play();
  },
  methods: {
    async signin() {
      localStorage.setItem("email", this.email);

      const actionCodeSettings = {
        url: location.origin,
        handleCodeInApp: true,
      };

      try {
        await auth.sendSignInLinkToEmail(this.email, actionCodeSettings);

        this.$router.push("/email");
      } catch (error) {
        console.error(error);
      }
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
