<template>
  <div v-if="!hasPhoto" class="w-full px-4 bg-white">
    <input
      type="text"
      name=""
      id="text-search"
      @focus="onFocus"
      @input="filterSearch"
      v-model="searchTerm"
      autocomplete="off"
      class="w-full h-12 text-2xl uppercase rounded-md outline-none px-14 bg-ie-gray-100"
    />
    <!-- text search field -->

    <button
      class="absolute top-0 w-12 h-12 text-white rounded-md left-4 bg-ie-gray-500"
      @click="selectTerm(null)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 mx-auto stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
    <!-- search button -->

    <form
      class="absolute top-0 flex items-center justify-center w-12 h-12 right-5 text-ie-gray-500"
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
    >
      <input
        class="hidden"
        type="file"
        name="files[]"
        id="file"
        accept="image/*"
        @change="$emit('photo-added', $event)"
      />
      <label id="drag-drop-target" for="file" class="cursor-pointer">
        <svg
          class="w-8 h-8 mx-auto stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.7"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.7"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </label>
    </form>
    <!-- camera stuff -->

    <div
      v-if="hasFocus"
      class="p-1 mt-1 overflow-y-scroll rounded-md shadow-md bg-ie-blue-100"
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
      <!-- results for search term -->

      <ul v-else>
        <li
          v-for="(item, index) in filteredArray"
          :key="index"
          class="relative mb-1"
        >
          <button
            :class="`w-full h-full text-xl text-left p-3 rounded-md  transition duration-150 ease-in-out ${
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
      <!-- empty search term contra list -->
    </div>
    <!-- suggested results lists -->
  </div>
</template>

<script>
import { contras } from "~/lib/words";
import { debounce } from "debounce";

export default {
  props: ["hasPhoto"],
  data() {
    return {
      hasFocus: false,
      searchTerm: null,
      initialSuggested: [],
      filteredArray: [],
    };
  },
  mounted() {
    this.initialSuggested = [...contras];
  },
  methods: {
    filterSearch: debounce(async function (e) {
      this.filteredArray = await this.$store.dispatch(
        "filterSearch",
        e.target.value
      );
    }, 400),
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
      if (item) {
        this.searchTerm = item.charAt(0).toUpperCase() + item.slice(1);
      }

      if (!this.searchTerm) return;

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