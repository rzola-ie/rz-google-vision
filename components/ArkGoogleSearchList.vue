<template>
  <div>
    <ul v-if="googleSearched && loading" class="px-4 mb-4">
      <li class="w-full h-16 mb-4 bg-gray-200 rounded-sm animate-pulse"></li>
      <li class="w-full h-16 mb-4 bg-gray-200 rounded-sm animate-pulse"></li>
      <li class="w-full h-16 mb-4 bg-gray-200 rounded-sm animate-pulse"></li>
    </ul>
    <!-- loading -->
    <ul v-else-if="googleSearched && googleResults.length" class="px-4 mb-4">
      <li
        v-for="result in googleResults"
        :key="result"
        @click="addToList(result)"
        role="checkbox"
        :class="[
          `flex items-center p-4 text-2xl uppercase mb-2 cursor-pointer last:mb-0 ${
            selectedResults.includes(result) ? 'bg-blue-900 bg-opacity-20' : ''
          }`,
        ]"
      >
        <svg
          v-if="selectedResults.includes(result)"
          class="w-6 h-6 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          v-else
          class="w-6 h-6 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12 a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>{{ result }}</span>
      </li>
    </ul>
    <!-- results -->

    <div v-else>No search results, dummy</div>
    <!-- no results -->

    <div class="px-4 pb-8">
      <button
        v-if="googleResults.length"
        class="mb-2 btn btn-main btn-gray"
        @click="$emit('submit-selected', selectedResults)"
        :disabled="selectedResults.length === 0"
      >
        Search Term
      </button>

      <button
        v-if="!loading"
        class="border-2 border-ie-gray-500 btn btn-main text-ie-gray-500"
        @click="$emit('clear-photo')"
      >
        Re-Select
      </button>
    </div>
    <!-- buttons -->
  </div>
</template>

<script>
export default {
  props: ["googleSearched", "loading", "googleResults"],
  data() {
    return {
      selectedResults: [],
    };
  },
  methods: {
    addToList(term) {
      if (this.selectedResults.includes(term)) {
        const termIndex = this.selectedResults.indexOf(term);
        this.selectedResults.splice(termIndex, 1);
      } else {
        this.selectedResults.push(term);
      }
    },
    onClearResults() {
      this.selectedResults = [];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>