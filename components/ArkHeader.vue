<template>
  <div>
    <div
      style="grid-template-columns: 1fr 5rem 1fr"
      class="fixed inset-x-0 top-0 z-30 grid items-center h-16 px-4 md:px-10"
    >
      <div
        v-show="openAccountMenu"
        class="fixed inset-0 z-40"
        @click="() => (openAccountMenu = !openAccountMenu)"
      >
        x
      </div>

      <div class="col-start-3 text-white justify-self-end">
        <div class="hidden lg:block">
          <nav class="flex items-center">
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
        <nuxt-link class="block" to="/number">Medications</nuxt-link>
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

<style lang="scss" scoped>
</style>