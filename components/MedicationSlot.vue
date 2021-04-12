<template>
  <li
    class="relative w-full h-20 mb-4 overflow-hidden bg-gray-300 rounded-md last:mb-0"
    :key="name"
  >
    <div v-if="name">
      <div v-if="name" class="absolute inset-y-0 left-0 w-20 bg-blue-900">
        <img src="/pill.png" alt="picture of medication" class="object-cover" />
      </div>
      <button
        v-if="name"
        class="absolute top-2 right-2"
        @click="$emit('remove')"
      >
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
      <div class="flex items-center h-full p-4 ml-20 text-xl truncate">
        <div class="w-full truncate">
          {{ name }}
        </div>
      </div>
    </div>
    <div v-else class="flex items-center h-full px-5">
      <nuxt-link
        class="text-lg font-semibold text-center text-blue-900"
        to="/add"
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
      </nuxt-link>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>