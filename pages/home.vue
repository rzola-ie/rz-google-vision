<template>
  <div id="app" class="pt-6 h-full flex justify-center items-center">
    <div class="flex justify-center items-center">
      <div class="bg-white p-10 rounded-md shadow-lg">
        <h1 class="text-3xl text-center text-blue-900 font-bold">Hi</h1>
        <p class="text-sm text-center text-blue-900">
          You're really going places...
        </p>
        <ul class="my-6 text-xl text-blue-700">
          <li class="mb-4">
            <nuxt-link to="/game">
              Play the Emoji Game
              <svg
                class="h-6 w-6 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </nuxt-link>
          </li>
          <li class="mb-4">
            <nuxt-link to="/labels"
              >Scan some labels
              <svg
                class="h-6 w-6 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </nuxt-link>
          </li>
          <li class="mb-4">
            <nuxt-link to="/medications"
              >Medications
              <svg
                class="h-6 w-6 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                /></svg
            ></nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "welcome",
};
</script>

<style lang="scss" scoped>
</style>