<template>
  <div
    class="relative overflow-x-hidden pt-20 h-screen bg-gradient-to-bl from-green-200 to-blue-200"
  >
    <div
      class="fixed z-50 h-20 px-10 bg-white top-0 inset-x-0 shadow-md grid grid-col-3 items-center"
    >
      <div class="col-start-2 justify-self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="h-12 w-12 text-blue-900 fill-current"
        >
          <path
            fill-rule="evenodd"
            d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="col-start-3 justify-self-end text-blue-900">
        <div>
          <button @click="() => (open = !open)">
            <svg
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Nuxt />
    <div
      :class="[
        `absolute z-40 w-2/3 inset-y-0 top-0 pt-32 p-6 ${
          open ? 'right-0' : '-right-2/3'
        } shadow-md bg-white`,
      ]"
    >
      <div class="mb-10 text-2xl" @click="() => (open = !open)">
        <nuxt-link class="block" to="/game">Emoji Game</nuxt-link>
        <nuxt-link class="block" to="/labels">Labels</nuxt-link>
        <nuxt-link class="block" to="/dragdrop">Drag &amp; Drop</nuxt-link>
      </div>
      <nuxt-link to="/" class="btn btn-blue" @click="() => (open = !open)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 stroke-current inline-block mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>Logout</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>