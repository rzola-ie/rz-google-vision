<template>
  <div class="h-full flex flex-col items-center justify-center text-blue-900">
    <svg
      class="w-20 h-20 mb-6 stroke-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    </svg>
    <p class="text-center">one moment please...</p>
  </div>
</template>

<script>
import { auth } from "~/services/fireinit";

export default {
  data() {
    return {
      signInEmail: null,
    };
  },
  created() {
    this.signInEmail = localStorage.getItem("email");
    const url = location.href;

    if (auth.isSignInWithEmailLink(url)) {
      auth.signInWithEmailLink(this.signInEmail, url);

      this.$router.push("/home");
    } else {
      localStorage.removeItem("email");
      this.$router.push("/");
    }
  },
};
</script>