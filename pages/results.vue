<template>
  <div>
    <div class="w-full h-full px-6 pt-36">
      <div
        v-for="result in searchResults"
        :key="result.name"
        class="grid grid-rows-2 mb-4 overflow-hidden bg-white border border-gray-300 rounded-md last:mb-0"
      >
        <div class="w-full h-full">
          <img
            src="/results-pill.png"
            alt="pill image"
            class="object-cover h-full"
          />
        </div>
        <div class="flex flex-col w-full h-full p-4 mb-4">
          <div class="flex-1">
            <h2 class="text-xl font-bold">{{ result.name }}</h2>
            <p>{{ result.description }}</p>
          </div>
          <div>
            <button class="w-full btn btn-blue">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "welcome",
  data() {
    return {
      searchResults: null,
    };
  },
  mounted() {
    this.getSearchResults();
  },
  methods: {
    async getSearchResults() {
      try {
        this.searchResults = await this.$store.dispatch("searchMeds");
        console.log(this.searchResults);
      } catch (e) {
        console.error("oh no");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>