<template>
  <div
    :class="`fixed inset-0 overflow-hidden bg-black bg-opacity-50 ${
      open ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'
    } transition-opacity ease-in-out duration-200 z-50`"
    @click="$emit('closed')"
  >
    <div
      :class="[
        `fixed z-40 w-2/3 inset-y-0 top-0 p-6 right-0 transform ${
          open ? '-translate-x-0' : 'translate-x-full'
        } shadow-md bg-white transition-transform ease-out duration-200 delay-200`,
      ]"
      @click="$emit('closed')"
    >
      <div class="flex items-center justify-between mb-2 border-b">
        <h1 class="py-2 text-center">
          signed in as<br />
          <span class="text-lg font-semibold">{{
            $store.state.user ? $store.state.user.displayName : ""
          }}</span>
        </h1>

        <div
          class="w-12 h-12 overflow-hidden rounded-full"
          v-if="$store.state.user"
        >
          <img
            class="h-full"
            :src="
              $store.state.user ? $store.state.user.photoURL : '/avatar.svg'
            "
            alt="account profile image"
          />
        </div>
      </div>
      <nav class="pb-2 mt-2 mb-5 text-lg border-b">
        <nuxt-link class="block p-2 mb-2" to="/home">
          <img src="/icn/icn-home.svg" alt="home" class="nav-icn" />
          Home
        </nuxt-link>
        <nuxt-link class="block p-2" to="/number">
          <img src="/icn/icn-beaker.svg" alt="beaker" class="nav-icn" />
          Medications</nuxt-link
        >
        <nuxt-link class="block p-2 mb-2" to="/profile">
          <img src="/icn/icn-profile.svg" alt="id card" class="nav-icn" />
          Profile</nuxt-link
        >
        <nuxt-link class="block p-2 mb-2" to="/order">
          <img src="/icn/icn-order.svg" alt="receipt" class="nav-icn" />
          Order History</nuxt-link
        >
        <nuxt-link class="block p-2 mb-2" to="/help">
          <img src="/icn/icn-help.svg" alt="life saver" class="nav-icn" />
          Help</nuxt-link
        >
        <nuxt-link class="block p-2" to="/settings">
          <img src="/icn/icn-settings.svg" alt="life saver" class="nav-icn" />
          Settings</nuxt-link
        >
      </nav>
      <button class="btn btn-blue btn-main" @click="logout">
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
  props: ["open"],
  data() {
    return {
      openAccountMenu: false,
    };
  },
  methods: {
    logout() {
      this.$emit("closed");
      this.$store.commit("REMOVE_USER");
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.nav-icn {
  @apply inline-block w-5 h-5 mr-2;
}

a.nuxt-link-active {
  @apply font-semibold text-blue-900;
}
</style>