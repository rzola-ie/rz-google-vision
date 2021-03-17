<template>
  <div
    class="h-screen pt-20 overflow-x-hidden bg-gradient-to-bl from-green-200 to-blue-200"
  >
    <div
      style="grid-template-columns: 1fr 5rem 1fr"
      class="fixed inset-x-0 top-0 z-30 grid items-center h-20 px-4 bg-white shadow-md md:px-10"
    >
      <div
        v-show="openAccountMenu"
        class="fixed inset-0 z-40"
        @click="() => (openAccountMenu = !openAccountMenu)"
      ></div>
      <div class="col-start-2 justify-self-center">
        <nuxt-link to="/home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-12 h-12 text-blue-900 fill-current"
          >
            <path
              fill-rule="evenodd"
              d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
              clip-rule="evenodd"
            />
          </svg>
        </nuxt-link>
      </div>
      <div class="col-start-3 text-blue-900 justify-self-end">
        <div class="hidden lg:block">
          <nav class="flex items-center">
            <nuxt-link class="mr-4" to="/game">Emoji Game </nuxt-link>
            <nuxt-link class="mr-4" to="/medications">Medications</nuxt-link>
            <div class="relative h-full">
              <button
                class="flex items-center h-10 p-2 text-gray-900 rounded-full"
                @click="() => (openAccountMenu = !openAccountMenu)"
              >
                <div
                  class="w-8 h-8 overflow-hidden rounded-full"
                  v-if="$store.state.user"
                >
                  <img
                    class="h-full"
                    :src="
                      $store.state.user
                        ? $store.state.user.photoURL
                        : '/avatar.svg'
                    "
                    alt="account profile image"
                  />
                </div>
                <svg
                  class="w-3 h-3 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                :class="[
                  `absolute right-0 w-32 overflow-hidden p-4 bg-white shadow-md top-full transform ${
                    openAccountMenu ? 'scale-1 opacity-1' : 'scale-0 opacity-0'
                  } transition-all ease-in duration-150 origin-top-right z-50`,
                ]"
              >
                <h1
                  class="py-2 mb-4 text-lg font-semibold text-center border-b"
                >
                  {{ $store.state.user ? $store.state.user.displayName : "" }}
                </h1>
                <button
                  @click="logout"
                  class="flex items-center justify-center w-full px-1 py-2 transition-colors duration-150 ease-in rounded-sm hover:bg-gray-200"
                >
                  Log Out
                  <svg
                    class="w-4 h-4 ml-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div class="lg:hidden">
          <button @click="() => (open = !open)">
            <svg
              class="w-8 h-8"
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
    <!-- <footer class="px-4 text-gray-800 bg-white py-7">
      <div class="mx-auto text-center">
        <a href="#">Privacy Policy</a> <span class="mx-3">|</span>
        <a href="tel:18882345678">1-888-234-5678</a>
      </div>
    </footer> -->
    <div
      :class="[
        `fixed z-40 w-2/3 inset-y-0 top-0 pt-32 p-6 ${
          open ? 'right-0' : '-right-2/3'
        } shadow-md bg-white`,
      ]"
      @click="() => (open = !open)"
    >
      <div class="mb-10 text-2xl">
        <nuxt-link class="block mb-2" to="/game">Emoji Game</nuxt-link>
        <nuxt-link class="block" to="/medications">Medications</nuxt-link>
      </div>
      <button class="btn btn-blue" @click="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      openAccountMenu: false,
    };
  },
  methods: {
    logout() {
      this.open = false;
      this.$store.commit("REMOVE_USER");
      this.$router.replace("/");
    },
  },
};
</script>