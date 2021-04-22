<template>
  <li
    :class="`med-slot last:mb-0 border ${
      name ? 'border-gray-500' : 'border-blue-900'
    } rounded-md`"
  >
    <div v-if="name" style="background-color: #f6f7f9">
      <div class="absolute inset-y-0 left-0 bg-blue-900">
        <img
          src="/pill.png"
          alt="picture of medication"
          class="object-cover h-full"
        />
      </div>
      <button class="absolute top-2 right-2" @click="$emit('remove')">
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
      <div class="p-4 pl-24 font-serif text-2xl" style="color: #5e6a7c">
        <h2 class="truncate">
          {{ name }}
        </h2>
        <p class="text-xs truncate">
          {{ description }}
        </p>
      </div>
    </div>
    <button
      v-else
      style="background-color: #f1f7ff"
      class="w-full h-full px-5 text-xl font-semibold text-left rounded-md outline-none"
      @click="$emit('add-medication')"
    >
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
  },
};
</script>

<style lang="scss" scoped>
</style>