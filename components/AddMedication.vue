<template>
  <div class="flex flex-col text-gray-700">
    <div class="flex justify-end w-full" style="color: #95a2b8">
      <button @click="$emit('cancel-add')" class="text-xs font-bold">
        CANCEL
      </button>
    </div>
    <h1 class="inline-block w-full mx-auto mb-4 font-serif text-xl text-center">
      Add Medication
    </h1>
    <div class="relative z-20">
      <div
        v-if="hasFocus"
        class="absolute top-0 bottom-0 left-0 right-0 w-full h-full inset-x-full inset-y-full"
      ></div>
      <div class="relative w-full">
        <input
          type="text"
          name=""
          id="text-search"
          @focus="onFocus"
          v-model="searchTerm"
          autocomplete="off"
          class="w-full h-12 px-12 text-2xl border border-gray-500 rounded-full outline-none"
        />

        <form
          class="absolute top-0 right-0 flex items-center justify-center w-12 h-12 text-ie-gray-900"
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
          style="max-height: 350px"
          class="px-4 py-2 -mx-4 overflow-y-scroll"
        >
          <ul v-if="!searchTerm">
            <p class="font-bold">Try Searching</p>
            <li
              v-for="(item, index) in initialSuggested"
              :key="index"
              class="p-2"
            >
              <button
                class="w-full h-full text-xl text-left"
                @click="selectTerm(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline w-8 h-8 mr-4"
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
                    transform-origin="center"
                    transform="rotate(-45) scale(0.8)"
                  />
                </svg>
                <span>{{ item }}</span>
              </button>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in filteredArray" :key="index" class="p-2">
              <button
                class="w-full h-full text-xl text-left"
                @click="selectTerm(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline w-8 h-8 mr-4"
                >
                  <circle cx="12" cy="12" r="12" stroke="none" fill="#97A2B6" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="white"
                    transform-origin="center"
                    transform="scale(0.6)"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span class="capitalize">{{ item }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blackList, whiteList } from "~/lib/words";

export default {
  data() {
    return {
      searchTerm: null,
      hasFocus: false,
      suggested: [],
      initialSuggested: ["Crestor", "Farxiga", "Warfrin"],
      whiteList: [],
    };
  },
  computed: {
    filteredArray() {
      return this.whiteList.filter((str) => {
        return str.includes(this.searchTerm.toLowerCase());
      });
    },
  },
  mounted() {
    this.whiteList = [...whiteList];
  },
  methods: {
    onFocus() {
      this.hasFocus = true;
      console.log("derp derp derp", this.hasFocus);
      this.$emit("on-focus");
    },
    onBlur: function () {
      this.hasFocus = false;
      console.log("blur blur blur", this.hasFocus);
    },
    selectTerm(item) {
      console.log("flenin", item);
      this.searchTerm = item.charAt(0).toUpperCase() + item.slice(1);
      this.hasFocus = false;
    },
  },
};
</script>

<style scoped>
#text-search {
  background-image: url("/icn-search.svg");
  background-repeat: no-repeat;
  background-size: 8%;
  background-position: 10px 10px;
}
</style>