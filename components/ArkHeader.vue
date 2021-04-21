<template>
  <div>
    <div
      style="grid-template-columns: 1fr 5rem 1fr"
      class="z-30 grid items-center h-16 px-4 md:px-10"
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
                class="flex items-center h-10 p-2 rounded-full"
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
                  class="w-6 h-6 ml-2"
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
                  `absolute right-0 w-64 overflow-hidden p-4 bg-white shadow-md top-full transform ${
                    openAccountMenu ? 'scale-1 opacity-1' : 'scale-0 opacity-0'
                  } transition-all ease-in duration-150 origin-top-right z-50 text-ie-gray-700`,
                ]"
              >
                <h1 class="py-2 text-center border-b">
                  signed in as&nbsp;
                  <span class="text-lg font-semibold">{{
                    $store.state.user ? $store.state.user.displayName : ""
                  }}</span>
                </h1>
                <ul class="mb-4 border-b">
                  <li class="p-2">
                    <nuxt-link to="/home">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="inline-block w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                      Profile
                    </nuxt-link>
                  </li>
                  <li class="p-2">
                    <nuxt-link to="/home">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="inline-block w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                        />
                      </svg>
                      Order History
                    </nuxt-link>
                  </li>
                  <li class="p-2">
                    <nuxt-link to="/home">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="inline-block w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Help
                    </nuxt-link>
                  </li>
                  <li class="p-2">
                    <nuxt-link to="/home">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="inline-block w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </nuxt-link>
                  </li>
                </ul>
                <button
                  @click="logout"
                  class="flex items-center justify-center w-full px-1 py-2 transition-colors duration-150 ease-in rounded-sm hover:bg-gray-200 btn-gray"
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
    <ark-mobile-drawer :open="open" @closed="() => (open = false)" />
  </div>
</template>

<script>
import ArkMobileDrawer from "./ArkMobileDrawer.vue";
export default {
  components: { ArkMobileDrawer },
  data() {
    return {
      open: false,
      openAccountMenu: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("REMOVE_USER");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>