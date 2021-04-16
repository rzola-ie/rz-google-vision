<template>
  <div class="text-gray-700">
    <h1 class="inline-block w-full mx-auto mb-4 font-serif text-xl text-center">
      Add Medication
    </h1>
    <div class="relative w-full">
      <input
        type="text"
        name=""
        id="text-search"
        class="w-full h-12 px-12 text-2xl border border-gray-500 rounded-full outline-none"
      />

      <form
        v-if="!imgPreview"
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
          @change="loadFile"
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#text-search {
  background-image: url("/icn-search.svg");
  background-repeat: no-repeat;
  background-size: 8%;
  background-position: 10px 10px;
}
</style>