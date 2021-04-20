<template>
  <div id="home" class="flex items-center justify-center">
    <div class="flex items-center justify-center">
      <div class="p-10 bg-white rounded-md shadow-lg">
        <h1 class="text-3xl font-bold text-center text-blue-900">Hi</h1>
        <p class="text-center text-blue-900">Health!</p>
        <ul class="my-6 text-xl text-blue-700">
          <li class="mb-4">
            <nuxt-link to="/number"
              >Begin Assessment
              <svg
                class="inline w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                /></svg
            ></nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "welcome",
};
</script>

<style scoped>
#home {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - 4rem);
}
</style>