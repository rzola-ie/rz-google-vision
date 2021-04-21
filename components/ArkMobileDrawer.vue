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
      <button class="btn btn-gray btn-main" @click="logout">
        Logout
        <svg
          class="inline-block w-5 h-5 ml-2 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          />
        </svg>
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