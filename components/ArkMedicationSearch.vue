<template>
  <div v-if="!hasPhoto" class="w-full px-4">
    <input
      type="text"
      name=""
      id="text-search"
      @focus="onFocus"
      v-model="searchTerm"
      autocomplete="off"
      :style="`${
        hasFocus
          ? 'border-radius: 1.5rem 1.5rem 0 0; border-bottom: none;'
          : 'border-radius: 1.5rem'
      }`"
      class="w-full h-12 px-12 text-2xl uppercase border border-gray-500 outline-none"
    />

    <form
      class="absolute top-0 flex items-center justify-center w-12 h-12 right-4 text-ie-gray-900"
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
    >
      <input
        class="hidden"
        type="file"
        name="files[]"
        id="file"
        capture="environment"
        accept="image/*"
        @change="onPhotoUpload($event)"
      />
      <label id="drag-drop-target" for="file" class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-8 h-8 mx-auto stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </label>
    </form>
    <div
      v-if="hasFocus"
      class="p-2 overflow-y-scroll bg-white border border-t-0 border-gray-500 rounded-b-sm shadow-md"
    >
      <ul v-if="!searchTerm">
        <p class="px-2 text-sm font-bold">Try Searching</p>
        <li v-for="(item, index) in initialSuggested" :key="index" class="p-2">
          <button
            class="flex w-full h-full text-base text-left"
            @click="selectTerm(item.name)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mr-2"
            >
              <circle cx="12" cy="12" r="12" stroke="none" fill="#97A2B6" />
              <rect
                x="7"
                y="2"
                rx="5"
                ry="5"
                height="20"
                width="10"
                stroke="white"
                stroke-width="1.5"
                style="
                  transform-origin: center;
                  transform: rotate(-45deg) scale(0.8);
                "
              />
            </svg>
            <div class="flex-1">
              <span class="font-semibold text-blue-900"> {{ item.name }}</span
              >&nbsp;<span>({{ item.description }})</span>
            </div>
          </button>
        </li>
      </ul>
      <ul v-else>
        <li
          v-for="(item, index) in filteredArray"
          :key="index"
          class="relative mb-1"
        >
          <button
            :class="`w-full h-full text-xl text-left p-3 rounded-sm  transition duration-150 ease-in-out ${
              suggested(item)
                ? 'bg-blue-100 hover:bg-blue-200'
                : 'bg-transparent hover:bg-ie-gray-200'
            }`"
            @click="selectTerm(item)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline w-6 h-6 mr-2"
            >
              <circle cx="12" cy="12" r="12" stroke="none" fill="#97A2B6" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="white"
                style="transform-origin: center; transform: scale(0.6)"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="capitalize">{{ item }}</span
            ><span v-if="suggested(item)">*</span>
          </button>
          <div
            v-if="suggested(item)"
            class="absolute text-xs italic text-blue-600 top-1 right-2"
          >
            Contraindication
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { blackList, whiteList, contras } from "~/lib/words";
import axios from "axios";

export default {
  data() {
    return {
      hasFocus: false,
      hasPhoto: false,
      searchTerm: null,
      blackList: [],
      whiteList: [],
      initialSuggested: [],
    };
  },
  mounted() {
    this.initialSuggested = [...contras];
    this.whiteList = [...whiteList];
    this.blackList = [...blackList];
  },
  computed: {
    filteredArray() {
      let initials = [];
      this.initialSuggested.forEach(({ name }) =>
        initials.push(name.toLowerCase())
      );

      let sorted = [...initials, ...this.whiteList];
      let uniqueSorted = [...new Set([...initials, ...this.whiteList])];

      return uniqueSorted
        .sort((a, b) => {
          return a.indexOf(this.searchTerm[0]) - b.indexOf(this.searchTerm[0]);
        })
        .filter((str) => {
          return str.includes(this.searchTerm.toLowerCase());
        })
        .filter((_, index) => {
          return index < 5;
        });
    },
  },
  methods: {
    onFocus() {
      this.hasFocus = true;
      this.$emit("on-focus");
    },
    onBlur() {
      this.hasFocus = false;
    },
    onClearSearch() {
      this.searchTerm = null;
    },
    selectTerm(item) {
      this.searchTerm = item.charAt(0).toUpperCase() + item.slice(1);
      this.$emit("term-selected", this.searchTerm);
      this.hasFocus = false;
    },
    suggested(itemName) {
      let initials = [];
      this.initialSuggested.forEach(({ name }) =>
        initials.push(name.toLowerCase())
      );

      return initials.includes(itemName);
    },
  },
};
</script>

<style scoped>
#text-search {
  background-image: url("/icn-search.svg");
  background-repeat: no-repeat;
  background-size: 28px;
  background-position: 10px 10px;
}
</style>