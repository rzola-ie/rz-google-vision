<template>
  <div>
    <div class="flex w-full h-40 p-4">
      <div class="relative w-1/3 h-full mr-2">
        <div
          class="w-full h-full overflow-hidden bg-center bg-no-repeat bg-contain border bg-ie-gray-200"
          :style="`background-image: url(${photoURL}); ${
            loading ? 'filter: blur(1rem) brightness(.2)' : ''
          }`"
        ></div>

        <div
          :class="`absolute inset-0 flex items-center justify-center text-4xl font-bold text-white`"
        >
          <svg
            v-if="loading"
            :class="`w-24 h-24 mx-auto animate-spin ${loading ? '' : 'hidden'}`"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            :class="`w-24 h-24 text-red-600 mx-auto ${
              !hasResults ? 'opacity-100' : 'opacity-0'
            }`"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke-width="1.7" />
            <path
              d="M 12 6 v6 m 0 5 v0.1"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      <div v-if="loading">
        <p>Your photo is being processed</p>
      </div>
      <div v-else-if="!loading && hasResults" class="flex-1">
        <h2 class="text-xl font-semibold leading-none">
          Your photo has been successfully processed
        </h2>
        <p class="my-2 leading-none">
          Select the appropriate words below to search
        </p>
        <button
          class="flex items-center text-lg font-semibold"
          @click="$emit('show-photo-tips')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          Photo Tips
        </button>
      </div>

      <div
        v-else-if="!loading && !hasResults"
        class="flex items-center flex-1 text-lg font-bold"
      >
        Image processing failed
      </div>
      <!-- no results -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading", "photoURL", "hasResults"],
};
</script>

<style lang="scss" scoped>
</style>