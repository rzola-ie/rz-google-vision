<template>
  <ark-slide-up-page :isVisible="isVisible" class="p-4">
    <div class="flex justify-end w-full mb-4" style="color: #95a2b8">
      <button @click="$emit('dismiss-more-info')" class="text-xs font-bold">
        DISMISS
      </button>
    </div>
    <template v-if="currentInfo === 'number'">
      <div
        class="w-full h-full p-4 border rounded-sm border-ie-gray-400 bg-ie-gray-200"
      >
        <h1 class="text-2xl font-semibold text-center text-ie-gray-700">
          NUMBER MORE INFO HERE
        </h1>
      </div>
    </template>

    <template v-else-if="currentInfo === 'medications'">
      <div
        class="w-full h-full p-4 border rounded-sm border-ie-gray-400 bg-ie-gray-200"
      >
        <h1 class="text-2xl font-semibold text-center text-ie-gray-700">
          MEDICATIONS MORE INFO HERE
        </h1>
      </div>
    </template>

    <template v-else>idk how you got here...</template>
  </ark-slide-up-page>
</template>

<script>
export default {
  props: ["currentInfo", "isVisible"],
};
</script>
