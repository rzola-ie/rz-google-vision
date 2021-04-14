<template>
  <li
    :class="`med-slot last:mb-0 ${
      name ? 'border border-gray-500 rounded-md' : 'border-none'
    }`"
  >
    <div v-if="name" style="background-color: #f6f7f9">
      <div class="absolute inset-y-0 left-0 w-20 bg-blue-900">
        <img src="/pill.png" alt="picture of medication" class="object-cover" />
      </div>
      <button class="absolute top-2 right-2" @click="remove">
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        class="flex flex-col justify-center h-full p-4 ml-20 font-serif text-2xl truncate"
        style="color: #5e6a7c"
      >
        <div class="w-full truncate">
          {{ name }}
        </div>
        <div class="text-xs">{{ description }}</div>
      </div>
    </div>
    <button
      v-else
      :style="`
        background-color: #f1f7ff;
        pointer-events: ${isDisabled ? 'none' : 'auto'};
        opacity: ${isDisabled ? 0.6 : 1};
        border: 1px solid ${isDisabled ? '#f1f7ff' : '#58739E'}`"
      class="w-full h-full px-5 text-left rounded-md disabled:border disabled:border-red-500"
      :disabled="isDisabled"
    >
      <nuxt-link class="text-lg font-semibold text-center" to="/add">
        <svg
          class="inline-block w-8 h-8 mr-5 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Medication
      </nuxt-link>
    </button>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true,
    };
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    index: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    next: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    console.log(this.next, this.index);
    this.isDisabled = !this.name && this.next !== this.index;
  },
  methods: {
    remove() {
      this.$emit("remove");

      this.$nextTick(() => {
        this.isDisabled = !this.name && this.next !== this.index;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>